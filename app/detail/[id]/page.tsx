import BookCard from "@/app/components/BookCard";
import GobackButton from "@/app/components/GoBackButton";
import { getBookDetail } from "@/app/utils/actions";
import Image from "next/image";

interface PageProps {
    params: Promise<{ id: string }>;
}

const FLOOR_IMAGE_SIZE: {
    readonly [floor: number]: {
        readonly width: number;
        readonly height: number;
    };
} = {
    1: { width: 476, height: 483 },
    2: { width: 794, height: 495 },
};

export default async function Page(props: PageProps) {
    const params = await props.params;
    // 비동기적으로 책 정보와 위치를 db에 검색 후 없으면 Redirect

    // 동적 라우팅은 비동기적이므로
    // npx @next/codemod@latest next-async-request-api --force
    const bookId = Number(await params.id);
    const bookObj = (await getBookDetail(bookId))[0];
    const bookFloor = bookObj.location < 11 || bookObj.location === 78 ? 2 : 1;

    return (
        <div className="mx-auto p-6 pt-0">
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 items-center">
                <div className="self-start">
                    <GobackButton />
                </div>
                <div className="w-full border-b-2 border-input-border flex justify-center">
                    <div className="w-[90%]">
                        <BookCard bookObj={bookObj} isAboutLocation={true} />
                    </div>
                </div>
                <div
                    className={
                        "mt-8 px-6 text-xl sm:text-2xl text-text-primary"
                    }
                >
                    <strong className="text-2xl sm:text-3xl font-bold">
                        {bookFloor}
                    </strong>{" "}
                    층,{" "}
                    <strong className="text-2xl sm:text-3xl font-bold">
                        {bookObj.location === 78 ? "7~8" : bookObj.location}
                    </strong>{" "}
                    책장에 있습니다.
                </div>
                <Image
                    src={`/location${bookObj.location}.png`}
                    alt={bookObj.location + `이 있는 ${bookFloor}층 평면도`}
                    width={FLOOR_IMAGE_SIZE[bookFloor].width}
                    height={FLOOR_IMAGE_SIZE[bookFloor].height}
                    className="w-[80%]"
                />
            </div>
        </div>
    );
}
