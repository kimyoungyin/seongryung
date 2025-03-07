import { getBookDetail } from "@/app/utils/query";
import { getImageSrc } from "@/app/utils/util";
import Image from "next/image";

interface PageProps {
    params: Promise<{ id: string }>;
}

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
                <h2>책 위치</h2>
                <span>책 id: {bookId}</span>
            </div>
            <div>
                <Image
                    src={getImageSrc(bookObj.location, bookObj.id)}
                    alt={bookObj.title}
                    width={200}
                    height={400}
                />
            </div>
        </div>
    );
}
