import SearchResults from "@/app/components/SearchResults";
import InputBox from "./components/InputBox";
import { Suspense } from "react";
import BookCardSkeleton from "@/app/components/BookCardSkeleton";
import { Metadata, Viewport } from "next";

type Props = {
    searchParams: Promise<{
        query?: string;
    }>;
};

export async function generateMetadata({
    searchParams,
}: Props): Promise<Metadata> {
    const query = (await searchParams).query || "";

    const title =
        (query ? query + " 검색 결과 | " : "") + "승룡이네집 도서 검색 시스템";
    const description = "강동구 강풀만화거리 승룡이네집 만화책 위치 찾기";

    return {
        metadataBase: new URL("https://seongryung.vercel.app"),
        title,
        description,
        icons: {
            icon: "/seongryoung-sm-round.jpeg",
        },
        keywords: [
            "강풀만화거리",
            "강풀",
            "승룡이네집",
            "만화카페",
            "카페",
            "만화방",
        ],
        openGraph: {
            title,
            description,
            siteName: "승룡이네집 도서 검색 시스템",
            locale: "ko_KR",
            type: "website",
            images: [
                { url: "/seongryoung-base.jpeg", width: 225, height: 225 },
            ],
        },
    };
}

export const viewport: Viewport = {
    initialScale: 1.0,
    userScalable: false,
    maximumScale: 1,
    width: "device-width",
};

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
