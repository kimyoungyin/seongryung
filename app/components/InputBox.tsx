"use client";

import SearchResults from "@/app/components/SearchResults";
import { Books } from "@/app/utils/db";
import { search } from "@/app/utils/query";
import { KeyboardEvent, useState } from "react";

export default function InputBox() {
    const [value, setValue] = useState("");
    const [results, setResults] = useState<Books[] | null>(null);
    const [isFetching, setIsFetching] = useState(false);

    const handleSearch = async () => {
        setIsFetching(true);
        const response = await search(value.trim());
        setIsFetching(false);
        setResults(response);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleSearch();
    };

    return (
        <div>
            <input
                type="text"
                maxLength={100}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                disabled={value.trim() === ""}
                // 비활성화시 커서 비활성화
                onClick={handleSearch}
            >
                검색하기
            </button>
            {isFetching && <div>검색 중...</div>}
            {results !== null && <SearchResults books={results} />}
        </div>
    );
}
