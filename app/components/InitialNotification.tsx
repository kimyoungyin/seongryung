import { SearchCheck } from "lucide-react";

export default function InitialNotification() {
    return (
        <div
            className="bg-guide-bg/50 border-none shadow-guide 
		  backdrop-blur-sm p-8 mx-auto max-w-3xl transition-opacity bg-card-bg rounded-xl shadow-md"
        >
            {/* 제목 영역 */}
            <div className="flex items-center gap-3 mb-6 text-text-primary">
                <SearchCheck className="w-8 h-8" size={18} />
                <h2 className="text-[min(calc(((100vw-128px))/9),24px)] font-bold tracking-tighter">
                    도서 검색 가이드
                </h2>
            </div>

            {/* 사용 팁 */}
            <div className="space-y-2 text-muted-foreground text-[min(calc(100vw/30),14px)]">
                <p className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    책 제목의 일부만 입력해보세요
                    <span className="opacity-60">
                        (&ldquo;그대를 사랑합니다&ldquo; -&gt;
                        &ldquo;그대를&ldquo;)
                    </span>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    띄어쓰기를 정확히 해보세요
                    <span className="opacity-60">
                        (&ldquo;그대를사랑합니다&ldquo; -&gt; &ldquo;그대를
                        사랑합니다&ldquo;)
                    </span>
                </p>
                <p className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    영어 제목은 한글로 변경해보세요
                    <span className="opacity-60">
                        (&ldquo;Marvel&ldquo; -&gt; &ldquo;마블&ldquo;)
                    </span>
                </p>
            </div>
        </div>
    );
}
