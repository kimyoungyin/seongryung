"use client";

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
            params.set(QUERY, term);
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
    return (
        <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-2">
                <input
                    type="text"
                    maxLength={100}
                    placeholder="만화책 제목 검색"
                    defaultValue={searchParams.get(QUERY)?.toString()}
                    onChange={(event) =>
                        handleSearchParamsChange(event.currentTarget.value)
                    }
                    onKeyDown={handleKeyDown}
                    className="flex-1 p-3 border-2 border-input-border rounded-lg focus:ring-2 ring-button-bg outline-none bg-white/50"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-button-bg text-text-primary px-6 py-3 rounded-lg hover:bg-[#c0a97e] transition-colors flex items-center gap-2"
                >
                    <Search size={20} />
                    검색
                </button>
            </div>
        </div>
    );
}
