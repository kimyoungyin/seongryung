"use client";

import { Loader2 } from "lucide-react";
import InitialNotification from "@/app/components/InitialNotification";
import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { KeyboardEvent } from "react";

const QUERY = "query";

export default function InputBox() {
    const [isSearching, setIsSearching] = useState(false);
    const [searchingKeyword, setSearchingKeyword] = useState(null);
    // 현재 검색 쿼리
    const searchParams = useSearchParams();
    // 검색할 새로운 쿼리
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { push } = useRouter();

    useEffect(() => {
        setIsSearching(false);
        setSearchingKeyword(null);
    }, [searchParams]);

    const handleSearchParamsChange = (term: string) => {
        const trimmedTerm = term.trim();
        if (trimmedTerm) {
            params.set(QUERY, trimmedTerm);
        } else {
            params.delete(QUERY);
        }
    };

    const handleSubmit = () => {
        const currentQuery = searchParams.get(QUERY);
        const newQuery = params.get(QUERY);
        // 검색어가 있고, 현재 검색어와 다를 때
        if (newQuery && newQuery !== currentQuery) {
            setIsSearching(true);
            push(`${pathname}?${params.toString()}`);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleSubmit();
    };

    const onKeywordClick = (keyword: string) => {
        const currentQuery = searchParams.get(QUERY);
        const newQuery = keyword.trim();
        // 검색어가 있고, 현재 검색어와 다를 때
        if (newQuery !== currentQuery) {
            params.set(QUERY, newQuery);
            setSearchingKeyword(keyword);
            push(`${pathname}?${params.toString()}`);
        }
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
                        disabled={isSearching}
                        aria-label="검색"
                        aria-disabled={isSearching}
                        className="bg-button-bg text-text-primary px-4 sm:px-6 py-2 sm:py-3  rounded-lg hover:bg-button-bg-hover transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSearching ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>위치 찾는 중...</span>
                            </>
                        ) : (
                            <>
                                <Search className="w-[min(calc(((100vw-128px))/20),16px)] h-[min(calc(((100vw-128px))/20),16px)]" />
                                검색
                            </>
                        )}
                    </button>
                </div>
                <div className="ml-3 flex items-center gap-2 text-muted-foreground text-text-secondary text-[min(calc(((100vw-84px-1.5rem))/24),14px)]">
                    추천 검색어:
                    <div className="flex flex-wrap gap-3">
                        {["바보", "그대를 사랑합니다", "무빙"].map(
                            (keyword) => {
                                const isKeywordSearching =
                                    searchingKeyword === keyword;
                                return (
                                    <button
                                        key={keyword}
                                        onClick={() => onKeywordClick(keyword)}
                                        disabled={isKeywordSearching}
                                        aria-label={`${keyword} 검색`}
                                        aria-disabled={isKeywordSearching}
                                        className="px-2 py-1 sm:px-4 sm:py-2 bg-button-bg/10 text-text-primary bg-button-bg
						rounded-full flex gap-2 items-center hover:bg-text-primary/20 transition-colors
						active:ring-2 active:ring-text-primary/50 active:bg-text-primary/50
						disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isKeywordSearching ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span>검색 중...</span>
                                            </>
                                        ) : (
                                            keyword
                                        )}
                                    </button>
                                );
                            }
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
