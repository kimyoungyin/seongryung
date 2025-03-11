import { getBookDetail } from "@/app/utils/actions";
import { getImageSrc } from "@/app/utils/util";
import Image from "next/image";

interface PageProps {
    params: Promise<{ id: string }>;
}

const BLUR_SKELETON =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8UA8AAiUBUcc3qzwAAAAASUVORK5CYII=";

export default async function Page(props: PageProps) {
    const params = await props.params;
    // 비동기적으로 책 정보와 위치를 db에 검색 후 없으면 Redirect

    // 동적 라우팅은 비동기적이므로
    // npx @next/codemod@latest next-async-request-api --force
    const bookId = Number(await params.id);
    const bookObj = (await getBookDetail(bookId))[0];

    return (
        <div>
            {/* 이후 이미지와 컨텐츠 반응형 처리 */}

            <div>
                <Image
                    src={getImageSrc(bookObj.location, bookObj.id)}
                    alt={bookObj.title}
                    height={500}
                    width={333}
                    placeholder="blur"
                    blurDataURL={BLUR_SKELETON}
                />
            </div>
            <h2>{bookObj.title}</h2>
            {bookObj.author && <h3>{bookObj.author}</h3>}
            {bookObj.season && <h4>시즌: {bookObj.season}</h4>}
            {bookObj.publisher && <h5>{bookObj.publisher}</h5>}
            {bookObj.total_num && <span>총권: {bookObj.total_num}</span>}
            {bookObj.composition && <span>구성:{bookObj.composition}</span>}
            {bookObj.comment && <div>설명:{bookObj.comment}</div>}
            {bookObj.location && (
                <div>
                    <strong>위치: {bookObj.location}</strong>
                </div>
            )}
        </div>
    );
}
