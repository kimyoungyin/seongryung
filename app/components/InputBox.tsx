"use client";

import InitialNotification from "@/app/components/InitialNotification";
import { Search } from "lucide-react";
// import SearchResults from "@/app/components/SearchResults";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { KeyboardEvent } from "react";

const QUERY = "query";

export default function InputBox() {
    const searchParams = useSearchParams();
    // handleSearchParamsChange 뿐만 아니라, 다른 핸들러에도 사용해야 하는데,
    // 여기서 사용하는 리렌더링 관련 훅이 없으므로 최상단에 노출시킴
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { push } = useRouter();

    const handleSearchParamsChange = (term: string) => {
        const trimmedTerm = term.trim();
        if (trimmedTerm) {
            params.set(QUERY, trimmedTerm);
        } else {
            params.delete(QUERY);
        }
    };

    const handleSubmit = () => {
        if (params.get(QUERY)) push(`${pathname}?${params.toString()}`);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleSubmit();
    };

    const onKeywordClick = (keyword: string) => {
        params.set(QUERY, keyword.trim());
        push(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <div className="max-w-4xl mx-auto mb-6 sm:mb-8 text-[min(calc(((100vw-128px))/20),16px)]">
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        maxLength={100}
                        placeholder="만화책 제목 검색"
                        defaultValue={searchParams.get(QUERY)?.toString()}
                        onChange={(event) =>
                            handleSearchParamsChange(event.currentTarget.value)
                        }
                        onKeyDown={handleKeyDown}
                        className="flex-1 px-3 py-2 sm:py-3 border-2 border-input-border rounded-lg focus:ring-2 ring-button-bg outline-none bg-white/50"
                    />
                    <button
                        onClick={handleSubmit}
                        className="bg-button-bg text-text-primary px-4 sm:px-6 py-2 sm:py-3  rounded-lg hover:bg-button-bg-hover transition-colors flex items-center gap-2"
                    >
                        <Search className="w-[min(calc(((100vw-128px))/20),16px)] h-[min(calc(((100vw-128px))/20),16px)]" />
                        검색
                    </button>
                </div>
                <div className="ml-3 flex items-center gap-2 text-muted-foreground text-text-secondary text-[min(calc(((100vw-84px-1.5rem))/24),14px)]">
                    추천 검색어:
                    <div className="flex flex-wrap gap-3">
                        {["바보", "그대를 사랑합니다", "무빙"].map(
                            (keyword) => (
                                <button
                                    key={keyword}
                                    onClick={() => onKeywordClick(keyword)}
                                    className="px-2 py-1 sm:px-4 sm:py-2 bg-button-bg/10 text-text-primary bg-button-bg
						rounded-full hover:bg-text-primary/20 transition-colors
						active:ring-2 active:ring-text-primary/50 active:bg-text-primary/50"
                                >
                                    {keyword}
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
            {!params.get(QUERY) && pathname.substring(0, 9) !== "/location" && (
                <InitialNotification />
            )}
        </>
    );
}
