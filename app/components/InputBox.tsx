"use client";

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
    const { replace } = useRouter();

    const handleSearchParamsChange = (term: string) => {
        const trimmedTerm = term.trim();
        if (trimmedTerm) {
            params.set(QUERY, term);
        } else {
            params.delete(QUERY);
        }
    };

    const handleSubmit = () => {
        if (params.get(QUERY)) replace(`${pathname}?${params.toString()}`);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleSubmit();
    };

    return (
        <div>
            <input
                type="text"
                maxLength={100}
                placeholder={"검색할 책 제목..."}
                defaultValue={searchParams.get(QUERY)?.toString()}
                onChange={(event) =>
                    handleSearchParamsChange(event.currentTarget.value)
                }
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit}>검색하기</button>
        </div>
    );
}
