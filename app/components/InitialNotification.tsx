import { HelpCircle, SearchCheck } from "lucide-react";

export default function InitialNotification({
    onClick,
}: {
    onClick: (value: string) => void;
}) {
    return (
        <div
            className="bg-guide-bg/50 border-none shadow-guide 
		  backdrop-blur-sm p-8 mx-auto max-w-3xl transition-opacity bg-card-bg rounded-xl shadow-md"
        >
            {/* 제목 영역 */}
            <div className="flex items-center gap-3 mb-6 text-text-primary">
                <SearchCheck className="w-8 h-8" />
                <h2 className="text-2xl font-bold tracking-tighter">
                    도서 검색 가이드
                </h2>
            </div>

            {/* 키워드 추천 */}
            <div className="space-y-4 mb-8">
                <p className="flex items-center gap-2 text-muted-foreground text-text-secondary text-base sm:text-lg">
                    <HelpCircle className="w-5 h-5" />
                    예시 검색어를 클릭하거나 직접 입력해보세요
                </p>
                <div className="flex flex-wrap gap-3 text-sm sm:text-base">
                    {["바보", "그대를 사랑합니다", "무빙"].map((keyword) => (
                        <button
                            key={keyword}
                            onClick={() => onClick(keyword)}
                            className="px-4 py-2 bg-button-bg/10 text-text-primary bg-button-bg
					rounded-full hover:bg-text-primary/20 transition-colors
					focus:ring-2 focus:ring-text-primary/50 focus:bg-text-primary/50"
                        >
                            {keyword}
                        </button>
                    ))}
                </div>
            </div>

            {/* 사용 팁 */}
            <div className="space-y-2 text-muted-foreground text-xs sm:text-sm">
                <p className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    ✓ 책 제목의 일부만 입력해보세요
                    <span className="opacity-60">
                        (&ldquo;그대를 사랑합니다&ldquo; -&gt;
                        &ldquo;그대를&ldquo;)
                    </span>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    ✓ 띄어쓰기를 정확히 해보세요
                    <span className="opacity-60">
                        (&ldquo;그대를사랑합니다&ldquo; -&gt; &ldquo;그대를
                        사랑합니다&ldquo;)
                    </span>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    ✓ 영어 제목은 한글로 변경해보세요
                    <span className="opacity-60">
                        (&ldquo;Marvel&ldquo; -&gt; &ldquo;마블&ldquo;)
                    </span>
                </p>
            </div>
        </div>
    );
}
