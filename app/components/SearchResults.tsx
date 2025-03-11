import { search } from "@/app/utils/actions";
import { getImageSrc } from "@/app/utils/util";
import Image from "next/image";
import Link from "next/link";

export default async function SearchResults({ query }: { query: string }) {
    // 첫 렌더링 시에 전체 검색 불러오지 않도록 수정
    const books = query ? await search(query) : null;
    // 검색을 아직 안 했을 초기 상태. 아무런 안내도 띄우지 않는다.
    if (books === null) return null;
    // 검색을 했으나 결과가 없을 때
    if (books.length === 0)
        return (
            <div>
                <h3>해당 제목의 책을 찾을 수 없어요..</h3>
                <span>
                    검색어의 철자가 정확한지 다시 한 번 확인해주세요. 검색어의
                    단어 수를 줄이거나, 두 단어 이상의 검색어인 경우, 띄어쓰기를
                    해주세요.
                </span>
            </div>
        );

    return (
        <div>
            {books.map((bookObj) => (
                // bookId 쓸 것
                <li key={bookObj.id}>
                    <Link href={"detail/" + bookObj.id}>
                        <div>{bookObj.title}</div>
                        <div>
                            <Image
                                src={getImageSrc(bookObj.location, bookObj.id)}
                                alt={bookObj.title + " 에 대한 이미지"}
                                width={300}
                                height={200}
                            />
                        </div>
                    </Link>
                </li>
            ))}
        </div>
    );
}
