import SearchResults from "@/app/components/SearchResults";
import InputBox from "./components/InputBox";
import { Suspense } from "react";
import BookCardSkeleton from "@/app/components/BookCardSkeleton";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";

    return (
        <div>
            <InputBox />
            <div className="space-y-4 px-4">
                <Suspense
                    fallback={
                        <>
                            <BookCardSkeleton />
                            <BookCardSkeleton />
                        </>
                    }
                >
                    <SearchResults query={query} />
                </Suspense>
            </div>
        </div>
    );
}
