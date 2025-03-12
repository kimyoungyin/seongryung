import { getBookDetail } from "@/app/utils/actions";
import { getImageSrc } from "@/app/utils/util";
import Image from "next/image";

interface PageProps {
    params: Promise<{ id: string }>;
}

const BLUR_SKELETON =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII=";

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
        <div className=" flex flex-col items-center gap-5">
            {/* 이후 이미지와 컨텐츠 반응형 처리 */}
            <div className="flex justify-between items-center gap-10">
                <div>
                    <Image
                        src={getImageSrc(bookObj.location, bookObj.id)}
                        alt={bookObj.title}
                        width={333}
                        height={500}
                        placeholder="blur"
                        blurDataURL={BLUR_SKELETON}
                        className="rounded-xl"
                    />
                </div>
                <div className="rounded-md bg-white flex flex-col justify-end items-center gap-3">
                    <h2 className="text-lg">
                        만화 <strong>{bookObj.title}</strong> 의 위치는{" "}
                        <strong>{bookFloor}층</strong>입니다
                    </h2>
                    <Image
                        src={`/location${bookObj.location}.png`}
                        alt={bookObj.location + `이 있는 ${bookFloor}층 이미지`}
                        width={FLOOR_IMAGE_SIZE[bookFloor].width}
                        height={FLOOR_IMAGE_SIZE[bookFloor].height}
                        className="w-[80%]"
                    />
                </div>
            </div>
            {/* {bookObj.author && <h3>{bookObj.author}</h3>}
            {bookObj.season && <h4>시즌: {bookObj.season}</h4>}
            {bookObj.publisher && <h5>{bookObj.publisher}</h5>}
            {bookObj.total_num && <span>총권: {bookObj.total_num}</span>}
            {bookObj.composition && <span>구성:{bookObj.composition}</span>}
            {bookObj.comment && <div>설명:{bookObj.comment}</div>} */}
        </div>
    );
}
