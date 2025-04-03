"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ToLocationButton({ bookId }: { bookId: number }) {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/") {
            setIsLoading(false); // 함수 호출로 수정
        }
    }, [pathname]);

    return (
        <Link
            href={`/location/${bookId}`}
            className={
                "bg-skeleton text-text-primary px-4 py-2 rounded-md hover:bg-skeleton-hover transition-colors whitespace-nowrap inline-flex items-center gap-2 " +
                (isLoading ? "cursor-not-allowed opacity-50" : "")
            }
            onClick={() => setIsLoading(true)}
            aria-label="위치 보기"
            aria-disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>위치 찾는 중...</span>
                </>
            ) : (
                "위치 보기 →"
            )}
        </Link>
    );
}
