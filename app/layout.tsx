import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export default function RootLayout({
    children,
    locationModal,
}: Readonly<{
    children: React.ReactNode;
    locationModal: React.ReactNode; // @경로 이름 적어줘야!!
}>) {
    return (
        <html lang="ko">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="min-h-screen bg-base-bg">
                    <header className="w-full bg-base-bg px-4 pt-3 pb-1 sm:px-8 sm:pt-6 sm:pb-3 flex justify-center">
                        <div className="justify-center sm:justify-start flex-1 max-w-4xl flex items-center h-12 sm:h-16 gap-3">
                            {/* 이미지 영역 (테마 색상 적용) */}
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-button-bg/20 border-2 border-input-border">
                                {/* 여기 캐릭터 이미지 올려야  */}
                                <Image
                                    src={"/seongryoung-sm-round.jpeg"}
                                    alt="승룡이네집"
                                    width={32}
                                    height={32}
                                    className="w-full h-full bg-contain"
                                />
                            </div>

                            {/* 텍스트 계층 구조 개선 */}
                            <h1 className="text-[min(calc(((100vw-128px))/13),30px)] font-extrabold text-text-primary">
                                승룡이네집 도서 검색 시스템
                            </h1>
                        </div>
                    </header>
                    <div className="max-w-4xl mx-auto p-4 sm:p-6">
                        {children}
                        {locationModal}
                    </div>
                </div>
            </body>
        </html>
    );
}
