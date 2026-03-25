"use client";

import GobackButton from "@/app/components/GoBackButton";
import { getBookLocation } from "@/app/utils/actions";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
    LOCATION_IMAGE_SIZE,
    LOCATION_MAP_IMAGE_SIZES,
} from "@/app/utils/constants";
import { getLocationImageSrc } from "@/app/utils/util";
interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page(props: PageProps) {
    const [bookInfo, setBookInfo] = useState<{
        location: number;
    } | null>(null);

    const scrollY = useMemo(() => window.scrollY, []);

    useEffect(() => {
        const getBookData = async () => {
            const params = await props.params;
            // 비동기적으로 책 정보와 위치를 db에 검색 후 없으면 Redirect

            // 동적 라우팅은 비동기적이므로
            // npx @next/codemod@latest next-async-request-api --force
            const bookId = Number(await params.id);
            setBookInfo(await getBookLocation(bookId));
        };
        getBookData();

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
        };
    }, []);

    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="fixed inset-0 bg-base-bg/75 transition-opacity overflow-hidden"
                aria-hidden="true"
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-3xl px-4 pb-3 flex flex-col items-center">
                        {bookInfo?.location ? (
                            <div
                                className="relative mt-3 w-full"
                                style={{
                                    aspectRatio: `${LOCATION_IMAGE_SIZE.width} / ${LOCATION_IMAGE_SIZE.height}`,
                                }}
                            >
                                <Image
                                    src={getLocationImageSrc(bookInfo.location)}
                                    alt={bookInfo.location + `번 책장 위치`}
                                    fill
                                    sizes={LOCATION_MAP_IMAGE_SIZES}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        ) : (
                            <div
                                className="mt-3 w-full rounded-xl bg-card-bg animate-pulse"
                                style={{
                                    aspectRatio: `${LOCATION_IMAGE_SIZE.width} / ${LOCATION_IMAGE_SIZE.height}`,
                                }}
                            />
                        )}
                        <div className="px-4 pt-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <GobackButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
