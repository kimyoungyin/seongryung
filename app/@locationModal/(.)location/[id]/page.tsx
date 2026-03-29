"use client";

import GobackButton from "@/app/components/GoBackButton";
import { getBookLocation } from "@/app/utils/actions";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import {
    LOCATION_IMAGE_SIZE,
    LOCATION_MAP_IMAGE_SIZES,
} from "@/app/utils/constants";
import { getLocationImageSrc } from "@/app/utils/util";

/**
 * 배경 스크롤 잠금: `useEffect`는 페인트 이후라 레이아웃이 한 박자 밀리며
 * lazy 이미지·CLS가 커질 수 있어 `useLayoutEffect`에서 처리합니다.
 * `react-remove-scroll` 등 라이브러리는 번들 대비 이중 스크롤·iOS 이슈가 남으면 도입 검토.
 */
function useScrollLock() {
    useLayoutEffect(() => {
        const scrollY = window.scrollY;
        const html = document.documentElement;
        const { body } = document;
        const prevHtmlOverflow = html.style.overflow;
        html.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.width = "100%";

        return () => {
            html.style.overflow = prevHtmlOverflow;
            body.style.position = "";
            body.style.top = "";
            body.style.width = "";
            window.scrollTo(0, scrollY);
        };
    }, []);
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function Page(props: PageProps) {
    const [bookInfo, setBookInfo] = useState<{
        location: number;
    } | null>(null);

    useScrollLock();

    useEffect(() => {
        const getBookData = async () => {
            const params = await props.params;
            const bookId = Number(params.id);
            setBookInfo(await getBookLocation(bookId));
        };
        getBookData();
        // 이 인터셉트 모달은 마운트 시점의 `id`만 조회하면 됨. props.params는 렌더마다 새 Promise일 수 있음.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            aria-busy={bookInfo === null}
        >
            <h2 id="modal-title" className="sr-only">
                {bookInfo?.location != null
                    ? `${bookInfo.location}번 책장 위치`
                    : "위치 불러오는 중"}
            </h2>
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
