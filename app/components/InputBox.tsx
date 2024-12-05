"use client";

import SearchResults from "@/app/components/searchResults";
import { search } from "@/app/queries/search";
import { useState } from "react";

export default function InputBox() {
    const [value, setValue] = useState("");
    const [results, setResults] = useState<string[]>([]);

    const handleSearch = async () => {
        const resposne = await search(value.trim());
        setResults(resposne);
    };

    return (
        <div>
            <input
                type="text"
                maxLength={100}
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                onKeyDown={(event) => event.key === "Enter" && handleSearch}
            />
            <button
                disabled={value.trim() === ""}
                // 비활성화시 커서 비활성화
                onClick={handleSearch}
            >
                검색하기
            </button>
            {results.length > 0 && <SearchResults books={["heelo"]} />}
        </div>
    );
}
