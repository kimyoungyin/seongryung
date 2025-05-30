// Hard navigation으로 들어왔을 때(새로고침, 혹은 url 직접 접근) 보여줄 화면

import GobackButton from "@/app/components/GoBackButton";
import {
    getBookLocationAndBookInfo,
    getBookMetadata,
} from "@/app/utils/actions";
import { getImageSrc } from "@/app/utils/util";
import { Metadata } from "next";
import Image from "next/image";
import { LOCATION_IMAGE_SIZE } from "@/app/utils/constants";

interface PageProps {
    params: Promise<{ id: number }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const bookObj = await getBookMetadata((await params).id);

    const title = `${bookObj.title}${
        bookObj.author ? ` | ${bookObj.author}` : ""
    } - 승룡이네집 도서 검색 시스템`;

    return {
        title,
        icons: {
            icon: "/seongryoung-sm-round.jpeg",
        },
        keywords: [
            // 살짝 책 제목 집어 넣어주기
            bookObj.title,
            "강풀만화거리",
            "강풀",
            "승룡이네집",
            "만화카페",
            "카페",
            "만화방",
        ],
        openGraph: {
            title,
            siteName: "승룡이네집 도서 검색 시스템",
            locale: "ko_KR",
            type: "website",
            images: [
                {
                    url: getImageSrc(bookObj.location, bookObj.id),
                    width: 96,
                    height: 144,
                },
                { url: "/seongryoung-base.jpeg", width: 225, height: 225 },
            ],
        },
    };
}

export default async function Page(props: PageProps) {
    const params = await props.params;
    // 비동기적으로 책 정보와 위치를 db에 검색 후 없으면 Redirect

    // 동적 라우팅은 비동기적이므로
    // npx @next/codemod@latest next-async-request-api --force
    const bookId = Number(await params.id);
    const bookInfo = await getBookLocationAndBookInfo(bookId);

    return (
        <>
            <div className="mx-auto overflow-hidden rounded-lg bg-white py-4 text-left shadow-xl sm:my-8 sm:max-w-3xl px-4 flex flex-col items-center">
                <>
                    <div className="self-start py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <GobackButton toHome />
                    </div>
                    {/* bookInfo 제목 들어갈 곳 */}
                    <div
                        className={
                            "w-full mt-8 text-xl sm:text-2xl text-text-primary"
                        }
                    >
                        <div className="w-full flex justify-around items-center gap-2 mb-6">
                            <div className="relative sm:w-24 sm:h-36 w-16 h-24 self-center">
                                <Image
                                    src={getImageSrc(
                                        bookInfo.location,
                                        bookInfo.id
                                    )}
                                    alt={bookInfo.title}
                                    fill
                                    sizes="(min-width: 640px) 6rem, 4rem" // w-24, w-16
                                    className="object-cover rounded-lg"
                                    quality={80}
                                />
                            </div>
                            <div className="flex justify-between  gap-4">
                                <div>
                                    <h2 className="text-base md:text-lg lg:text-xl font-bold mb-2 text-text-primary">
                                        {bookInfo.title}
                                    </h2>
                                    <div className="space-y-1 flex flex-col text-text-secondary text-sm md:text- lg:text-lg">
                                        {bookInfo.author && (
                                            <p>작가: {bookInfo.author}</p>
                                        )}
                                        {bookInfo.season && (
                                            <p>시즌: {bookInfo.season}기</p>
                                        )}
                                        {bookInfo.total_num && (
                                            <p>
                                                총 권수: {bookInfo.total_num}권
                                            </p>
                                        )}
                                        {bookInfo.comment && (
                                            <p className="mt-3 text-text-primary">
                                                {bookInfo.comment}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Image
                        src={`/location${bookInfo.location}.jpg`}
                        alt={bookInfo.title + `이 있는 책장`}
                        width={LOCATION_IMAGE_SIZE.width}
                        height={LOCATION_IMAGE_SIZE.height}
                        className="w-full mt-4"
                    />
                </>
            </div>
        </>
    );
}
