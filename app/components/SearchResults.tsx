import { Books } from "@/app/utils/db";
import { getImageSrc } from "@/app/utils/util";
import Image from "next/image";
import Link from "next/link";

export default function SearchResults({ books }: { books: Books[] }) {
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
                    <Link href={"/" + bookObj.id}>
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
