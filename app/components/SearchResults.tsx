import { search } from "@/app/utils/actions";
import { getImageSrc } from "@/app/utils/util";
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
            <div>
                <h3>해당 제목의 책을 찾을 수 없어요..</h3>
                <span>
                    검색어의 철자가 정확한지 다시 한 번 확인해주세요. 검색어의
                    단어 수를 줄이거나, 두 단어 이상의 검색어인 경우, 띄어쓰기를
                    해주세요.
                </span>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto space-y-4 px-4">
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
        </div>
    );
}
