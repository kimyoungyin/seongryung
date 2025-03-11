import SearchResults from "@/app/components/SearchResults";
import InputBox from "./components/InputBox";

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
            <SearchResults query={query} />
        </div>
    );
}
