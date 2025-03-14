import BookCard from "@/app/components/BookCard";
import { search } from "@/app/utils/actions";
import { SearchX } from "lucide-react";

export default async function SearchResults({ query }: { query: string }) {
    // 첫 렌더링 시에 전체 검색 불러오지 않도록 수정
    const books = query ? await search(query) : null;
    // 검색을 아직 안 했을 초기 상태. 아무런 안내도 띄우지 않는다.
    if (books === null) return null;
    // 검색을 했으나 결과가 없을 때
    if (books.length === 0)
        return (
            <div className="bg-card-bg rounded-xl min-h-[60vh] flex items-center justify-center p-6">
                <div className="max-w-2xl text-center space-y-8">
                    {/* 아이콘 그룹 */}
                    <div className="mx-auto w-fit">
                        <SearchX className="w-24 h-24 sm:w-32 sm:h-32 text-text-primary animate-float" />
                    </div>

                    {/* 텍스트 영역 */}
                    <div className="space-y-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
                            <span className="block mb-2">
                                검색 결과가 없어요...
                            </span>
                        </h1>
                        <span className="block text-md sm:text-lg font-normal text-text-secondary">
                            찾으시는 책이 있을 수 있으니 검색어를 수정해보세요!
                        </span>

                        <div className="py-4 px-6 bg-skeleton/30 rounded-lg inline-block">
                            <div className="text-sm sm:text-base text-text-primary/80 flex flex-col gap-4">
                                <p className="flex flex-col">
                                    ✓ 책 제목의 일부만 입력해보세요
                                    <span className="text-xs">
                                        ("그대를 사랑합니다" -&gt; "그대를")
                                    </span>
                                </p>
                                <p className="flex flex-col">
                                    ✓ 띄어쓰기를 정확히 해보세요.
                                    <span className="text-xs">
                                        ("그대를사랑합니다" -&gt; "그대를
                                        사랑합니다")
                                    </span>
                                </p>
                                <p className="flex flex-col">
                                    ✓ 영어 제목은 한글로 변경해보세요
                                    <span className="text-xs">
                                        (Marvel -&gt; 마블)
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <>
            {books.map((bookObj) => (
                <BookCard
                    key={bookObj.id}
                    bookObj={bookObj}
                    isAboutLocation={false}
                />
            ))}
        </>
    );
}
