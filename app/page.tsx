import SearchResults from "@/app/components/SearchResults";
import InputBox from "./components/InputBox";
import { Suspense } from "react";

const fallback = <div>로딩 중...</div>;

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";

    return (
        <div>
            <h1 className="text-2xl">승룡이네집 도서 검색 시스템</h1>
            <InputBox />
            <Suspense fallback={fallback}>
                <SearchResults query={query} />
            </Suspense>
        </div>
    );
}
