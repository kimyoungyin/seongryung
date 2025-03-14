import { search } from "@/app/utils/actions";
import { getImageSrc } from "@/app/utils/util";
import { BookOpenCheck, SearchX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SearchResults({ query }: { query: string }) {
    // 첫 렌더링 시에 전체 검색 불러오지 않도록 수정
    const books = query ? await search(query) : null;
    // 검색을 아직 안 했을 초기 상태. 아무런 안내도 띄우지 않는다.
    if (books === null) return null;
    // 검색을 했으나 결과가 없을 때
    if (books.length === 0)
        return (
            <div className="bg-[#fffdf8] rounded-xl min-h-[60vh] flex items-center justify-center p-6">
                <div className="max-w-2xl text-center space-y-8">
                    {/* 아이콘 그룹 */}
                    <div className="relative mx-auto w-fit">
                        <SearchX className="w-32 h-32 text-[#5d5348] animate-float" />
                    </div>

                    {/* 텍스트 영역 */}
                    <div className="space-y-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#5d5348]">
                            <span className="block mb-2">
                                검색 결과가 없어요...
                            </span>
                        </h1>
                        <span className="block text-md sm:text-lg font-normal text-[#726a5f]">
                            찾으시는 책이 있을 수 있으니 검색어를 수정해보세요!
                        </span>

                        <div className="py-4 px-6 bg-[#e8e0d5]/30 rounded-lg inline-block">
                            <p className="text-sm sm:text-base text-[#5d5348]/80">
                                ✓ 책 제목의 일부만 입력해보세요
                                <br />✓ 띄어쓰기를 정확히 해보세요
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <>
            {books.map((bookObj) => (
                <div
                    key={bookObj.id}
                    className="bg-card-bg rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                >
                    <div className="flex gap-6">
                        <div className="relative sm:w-24 sm:h-36 w-16 h-24 self-center">
                            <Image
                                src={getImageSrc(bookObj.location, bookObj.id)}
                                alt={bookObj.title}
                                fill
                                sizes="(min-width: 640px) 6rem, 4rem" // w-24, w-16
                                className="object-cover rounded-lg"
                                quality={80}
                            />
                        </div>
                        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                                <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 text-text-primary">
                                    {bookObj.title}
                                </h2>
                                <div className="space-y-1 flex flex-col gap-1 text-text-secondary text-md md:text-lg lg:text-xl">
                                    {bookObj.author && (
                                        <p>작가: {bookObj.author}</p>
                                    )}
                                    {bookObj.season && (
                                        <p>시즌: {bookObj.season}기</p>
                                    )}
                                    {bookObj.total_num && (
                                        <p>총 권수: {bookObj.total_num}권</p>
                                    )}
                                    {bookObj.comment && (
                                        <p className="mt-3 text-text-primary">
                                            {bookObj.comment}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="self-end sm:self-center text-xs md:text-sm lg:text-md">
                                <Link
                                    href={`/detail/${bookObj.id}`}
                                    className="bg-[#e8e0d5] text-text-primary px-4 py-2 rounded-md hover:bg-[#dcd4c9] transition-colors whitespace-nowrap"
                                >
                                    위치 보기 →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
