"use client";

import GobackButton from "@/app/components/GoBackButton";
import { getBookLocationInfo } from "@/app/utils/actions";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const FLOOR_IMAGE_SIZE: {
    readonly [floor: number]: {
        readonly width: number;
        readonly height: number;
    };
} = {
    1: { width: 476, height: 483 },
    2: { width: 794, height: 495 },
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page(props: PageProps) {
    const [bookInfo, setBookInfo] = useState<{
        location: number;
        floor: number;
    } | null>(null);

    const scrollY = useMemo(() => window.scrollY, []);

    useEffect(() => {
        const getBookData = async () => {
            const params = await props.params;
            // 비동기적으로 책 정보와 위치를 db에 검색 후 없으면 Redirect

            // 동적 라우팅은 비동기적이므로
            // npx @next/codemod@latest next-async-request-api --force
            const bookId = Number(await params.id);
            setBookInfo(await getBookLocationInfo(bookId));
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
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg px-4 flex flex-col items-center">
                        {bookInfo && (
                            <>
                                <div
                                    className={
                                        "mt-8 px-6 text-xl sm:text-2xl text-text-primary"
                                    }
                                >
                                    <strong className="text-2xl sm:text-3xl font-bold">
                                        {bookInfo.floor}
                                    </strong>{" "}
                                    층,{" "}
                                    <strong className="text-2xl sm:text-3xl font-bold">
                                        {bookInfo.location === 78
                                            ? "7~8"
                                            : bookInfo.location}
                                    </strong>{" "}
                                    책장에 있습니다
                                </div>
                                {bookInfo.floor && (
                                    <Image
                                        src={`/location${bookInfo.location}.png`}
                                        alt={
                                            bookInfo.location +
                                            `이 있는 ${bookInfo.floor}층 평면도`
                                        }
                                        width={
                                            FLOOR_IMAGE_SIZE[bookInfo.floor]
                                                .width
                                        }
                                        height={
                                            FLOOR_IMAGE_SIZE[bookInfo.floor]
                                                .height
                                        }
                                        className="w-[80%] my-4"
                                        priority={true}
                                    />
                                )}
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <GobackButton />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
