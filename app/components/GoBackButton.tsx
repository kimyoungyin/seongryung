"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GobackButton() {
    const { back } = useRouter();

    return (
        <button
            onClick={back}
            className="bg-skeleton text-text-primary px-4 py-2 rounded-md hover:bg-skeleton-hover transition-colors whitespace-nowrap flex items-center"
            aria-label="뒤로 가기"
        >
            <ArrowLeft className="mr-2 h-5 w-5 stroke-[2.5]" />
            <span className="text-sm sm:text-md font-medium tracking-tight">
                뒤로 가기
            </span>
        </button>
    );
}
