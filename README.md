# 승룡이네집 도서 검색 시스템

![seongryoung-base](https://github.com/user-attachments/assets/68ee4404-250a-4026-9a81-2d13fe30a9d1)

## 1. 배포 URL

[승룡이네집 도서 검색 시스템](https://seongryung.vercel.app/)

## 2. 프로젝트 소개

-   [승룡이네집](https://map.naver.com/p/entry/place/187115219?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=127.1287584&lat=37.5350510&c=15.00,0,0,0,dh)은 카페와 만화책, 문화프로그램이 있는 복합문화공간입니다. 하지만 아직 도서 검색 시스템은 없었기에, 읽고 싶은 만화책의 위치를 찾을 수 있도록 도와주는 검색 시스템을 개발하였습니다.
-   도서 제목을 검색하면, 유사한 제목을 가진 도서들을 간략한 정보가 담긴 목록 형태로 조회할 수 있고 각 도서의 위치 또한 지도를 통해 알 수 있습니다.
-   이제 더 이상 직접 읽고 싶은 도서를 찾아다니지 마시고 검색해보세요!

## 3. 개발 스택

-   Framework: [Next.js](https://nextjs.org/)(15.0.3)
    -   선택 이유: SEO 최적화를 통해, ROOT 페이지 뿐만이 아니라 책이 승룡이네집에 있다는 것 또한 검색 엔진을 통해 발견할 수 있도록 하고 싶었다.
-   Language: [Typescript](https://www.typescriptlang.org/)(^5)
-   CSS, UI: [Tailwindcss](https://tailwindcss.com/)(^3.4.1), [lucide-react](https://lucide.dev/guide/packages/lucide-react)(^0.479.0)
-   lint: [ESlint](https://eslint.org/)(^8)
-   DB: [AWS RDS](https://aws.amazon.com/ko/rds/)([mysql](https://www.mysql.com/)) - 모듈 [mysql2](https://www.npmjs.com/package/mysql2)(^3.12.0)

    <details>
      <summary>선택 이유</summary>
          - nosql vs sql
              - ‘도서’라는 규격화된 데이터: nosql보다 눈에 띄게 성능이 뒤쳐지거나 하지 않으면 sql을 사용하려고 했다.
              - 1000개 이하의 데이터 수: 소량의 데이터이기에 보통 Nosql이 sql보다 보통 CRUD 연산이 빠르다 하더라도 큰 차이가 없음.
              - ‘검색’이기에 select 쿼리를 주로 사용: Id로 읽는 경우는 mongodb가 매우 빠르지만 그게 아닌 ‘검색’은 mongodb와 10ms 정도 차이만 있음

    ![SQL vs NoSQL 비교](https://github.com/user-attachments/assets/9a2a5368-0ec0-4f48-9e22-3ed93059be75)

    [SQL vs NoSQL 비교 영상](https://www.youtube.com/watch?v=bluQwqMgTsw&t=674s)

    [(논문번역) SQL vs NoSQL: A Performance Comparison](https://velog.io/@park2348190/%EB%85%BC%EB%AC%B8%EB%B2%88%EC%97%AD-SQL-vs-NoSQL-A-Performance-Comparison)

    -   mysql vs postgresql

            대규모 데이트 셋, 복잡한 쿼리는 postgresql이 빠르지만, 읽기 전용 명령어는 mysql이 더 빠르기 때문에 mysql로 선택했다(대규모도 아니고).

                [https://www.youtube.com/watch?v=-PbP1TcD94Q&t=527s](https://www.youtube.com/watch?v=-PbP1TcD94Q&t=527s)

            [PostgreSQL과 MySQL 비교: 주요 차이점](https://www.integrate.io/ko/blog/postgresql-vs-mysql-which-one-is-better-for-your-use-case-ko/#five)

        </details>

    -   Storage: [AWS S3](https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiOrbzNobaMAxVTVQ8CHQs6BggYABAAGgJ0Yg&ae=2&aspm=1&co=1&ase=5&gclid=Cj0KCQjwna6_BhCbARIsALId2Z1lXcE0BEUn0cJv6SioSEO7FnysY_s80CZmQS55ArV7_ewMjwL67uUaAid7EALw_wcB&ohost=www.google.com&cid=CAESVuD2nRkIUyE7y312wUFvQqGn1eWSCkjaK28yT5hxrUEoJZRC29RRKXCK92DCMT01Mmcq8x_InO7BiBScvRJxSAFc-5QqoBP9TTKBxwY3NbV2zOF8zFcu&sig=AOD64_08-Hiu7Fr9vGLXfgKSKB2jRoRtrQ&q&adurl&ved=2ahUKEwjEibfNobaMAxXWi68BHZdFIakQ0Qx6BAgTEAE)
    -   Deployment, Analytics: [Vercel](https://vercel.com/)

## 4. 페이지별 기능

### [/]

-   만화책을 제목을 입력하여 검색할 수 있습니다. 최소 한 글자(공백 제외) 이상이어야 검색 가능합니다.
-   추천 검색어(강풀 작가님의 책으로 임의 구성) 클릭을 통해서도 검색할 수 있습니다.
-   도서 검색 가이드로 원하는 책을 찾기 쉽도록 합니다.

    <details>
    <summary>시연 화면</summary>

    ![스크린샷_2025-04-01_오후_4 41 22](https://github.com/user-attachments/assets/ab85604e-e0ee-407d-a526-da21600d572d)

    </details>

### [/?query=검색어]

-   state가 아닌 query 형태로 검색을 구현하였습니다. 때문에, 새로고침을 하더라도 검색 결과가 그대로 조회됩니다.
-   각 도서마다 간략한 정보가 나오고, 각 책 카드의 ‘위치 보기’ 버튼 클릭을 하면 `/location` route로 이동합니다.
-   도서가 많지 않기에 페이지네이션이나, 무한 스크롤은 구현하지 않았습니다.

    <details>
      <summary>시연 화면</summary>

    ![스크린샷_2025-04-01_오후_4 44 09](https://github.com/user-attachments/assets/201eb4e2-f8b0-45cb-adba-d088966f8a15)

    </details>

### [/location/:id]

-   책 위치를 보여주는 페이지이며, soft navigation과 hard navigation 모두 지원합니다.

-   soft navigation 시

    -   검색 결과 페이지에서 ‘위치 보기’를 클릭하면 스크롤 위치가 유지 + 모달 형태로 등장하는 Parallel route입니다. (intercepting route)
    -   ‘뒤로 가기’를 누르면 검색 결과 페이지로 이동합니다.

        <details>
        <summary>시연 화면</summary>

        ![스크린샷_2025-04-01_오후_4 55 53](https://github.com/user-attachments/assets/fe854440-4e20-43e5-a49b-151327e78ef2)

        </details>

-   hard navigation 시

    -   새로고침이나, url 직접 입력 시 보여주는 페이지입니다.
    -   이 앱의 첫 접근이기 때문에, 책 정보 또한 보여주도록 하였습니다.
    -   ‘뒤로 가기’를 누르면 홈으로 이동합니다.

        <details>
        <summary>시연 화면</summary>

        ![스크린샷_2025-04-01_오후_4 56 44](https://github.com/user-attachments/assets/099ee57a-4cf2-4c19-8810-377e3265e0db)

        </details>

## 5. 개발 로그 및 학습 내용

2025.03.03: 엑셀 데이터 rds에 삽입

<details>
<summary>2025.03.04: IAM cli, db 연결</summary>

-   iam 사용자 생성(키들은 프로젝트 .env에) → cli 로그인 → cli를 통해 s3 버킷 퍼블릭 읽기 되도록 한 후 이미지들 업로드
-   rds를 nextjs와 연결 후 `SELECT` 쿼리 작성

</details>
<br />

<details>
<summary>2025.03.05: 퍼블릭 읽기와 한글 파일명 문제 해결, 검색어 ‘포함’ 검색 쿼리</summary>

-   퍼블릭 읽기에 대한 것은 해결했으나(access denied 문제), 객체(이미지) url로 접근 시 `NoSuchKey` 에러가 계속 발생. 이는 해당 객체의 주소가 잘못되었거나 해당 파일 자체가 없을 경우 발생하는데, 갖가지 노력 끝에 **한글 파일명 때문임**을 알게 되었음. 아무리 `encodeURIcomponent` 와 같은 API를 사용하더라도 aws에서 한글을 인코딩하는 방식과 달라 이미지 주소명이 일치하지 않았던 것. 결국 **한글 파일명을 모두 DB에 저장된 데이터의 id값으로 전부 변경**하였더니 제대로 동작함. 이에 따라 필요없어진 table column인 `image_url`을 제거하였으며, id를 통해 해당 이미지 src를 생성함

    ```tsx
    import type { NextConfig } from "next";

    const nextConfig: NextConfig = {
        /* config options here */
        reactStrictMode: true,
        images: {
            remotePatterns: [
                {
                    protocol: "http",
                    hostname: "localhost",
                },
                {
                    protocol: "https",
                    hostname: (
                        process.env.NEXT_PUBLIC_S3_HOSTNAME as string
                    ).split("/")[2],
                },
            ],
        },
    };

    export default nextConfig;
    ```

-   검색어가 ‘포함된’ sql문으로 변경함. 또한 다행히 영어 대소문자 문제는 mysql이 알아서 해결해주는 듯 함.

    ```tsx
    export const search = cache(async (bookName: string) => {
        const pureBookName = bookName.trim();
        const sql = `SELECT * FROM books WHERE title LIKE ?`;
        // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
        return (await queryDatabase(sql, [`%${pureBookName}%`])) as Books[];
    });
    ```

    ![스크린샷_2025-03-05_오후_5 58 08](https://github.com/user-attachments/assets/41ae41b2-a8d0-425e-bb95-a231722d7875)

</details>
<br />

<details>
<summary>2025.03.06: 프리티어 기간이 지나 aws 계정 마이그레이션(S3)</summary>

s3는 chatgpt와 간단 해결

[[AWS] RDS 인스턴스 다른 계정으로 이관하기 (프리티어)](https://programforlife.tistory.com/108)

</details>
<br />

<details>
<summary>2025.03.07~2024.03.10: aws 계정 마이그레이션(rds)</summary>

기존 rds가 ‘암호화’가 되어있으면 마이그레이션을 하기 위해서 암호화 키(kms)를 공유해야 하는데, 이게 aws에서 관리하는 키인 경우 다른 계정과 공유가 안돼서, 스냅샷을 이용한 마이그레이션이 안됨.

-   rds에 mysql 데이터베이스를 생성할 때, 암호화를 하는 게 기본값이라 바꿔줬어야 됐다..
    대신 스냅샷을 복제할 때 KMS 키에 사용할 새 암호화 키를 선택해서 복사본을 만들면 가능하다.
    | 이전 계정 | 마이그레이션 계정 |
    | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | 0. 이미 aws 관리형 kms로 암호화된 RDS로 스냅샷 생성되어있음(자세히 초기설정 안하면 이게 기본) | 5. RDS → 스냅샷 → 나와 공유됨에서 스냅샷 찾기 → 스냅샷 복사 클릭 |
    | 1. 고객 관리형 KMS 키 생성(AWS 관리형으로는 다른 계정 공유가 안됨) | 6. 스냅샷 복사 시 ‘암호화’ 탭에서 ‘AWS KMS 키’ → ‘키 ARN 입력’ → 이전 계정에서 공유 허용했던 KMS 키의 ARN 붙여넣기 → ‘스냅샷 복사’ 클릭 |
    | 2. KMS 키 공유 ID로 마이그레이션 계정의 ROOT ID 등록 | 7. 고객 관리형 KMS 키 생성(이전 계정 KMS 키로부터 자유로워질 준비) |
    | 3. 스냅샷 복사. 이 때 암호화 키를 공유 허용한 KMS 키로 변경 | 8. 수동 → 복사된 스냅샷 → 스냅샷 복사 클릭(마이그레이션 계정에 있는 KMS로 암호화 해야 이전 계정으로부터 자유로워짐) → ‘AWS KMS 키’ → 이 계정에서 만든 KMS키 입력 → ‘스냅샷 복사’ 클릭 |
    | 4. KMS키로 암호화된 스냅샷을 마이그레이션 계정의 ROOT ID를 추가하여 공유 | 9. 수동 → 복사된 스냅샷 → ‘스냅샷 복원’ 클릭 |
    | | 10. 프리티어 조건에 맞게, 이전 계정 RDS 초기 설정과 동일하게(퍼블릭 읽기, 보안 그룹 등) 하여 복원! |
    | | END. 데이터베이스 초기 설정(user, password 등은 동일하게 복사되어있음!) |

</details>
<br />

<details>
<summary>2025.03.11: `useState` 를 사용하지 않고 SSR 방식으로 검색 구현, detail 페이지 blur skeleton</summary>

1. 검색 기능
    - 참고 공식문서
      [App Router: Adding Search and Pagination](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)
        - 여기서는 input이 바뀔 때마다 바로 검색(디바운싱 필요)했지만, 나는 검색 클릭(혹은 엔터) 시에만 replace를 진행했다.
        - `const { replace } = useRouter()` 로 히스토리를 남기지 않는 공식 문서 대신에, `const { push } = useRouter()` 를 사용해서 이전 검색으로 이동할 수 있도록 하였다.
    - 관련 코드
      [https://github.com/kimyoungyin/seongryung/commit/44c52e15589f15dbbc45c964d50ef8f5da35283c](https://github.com/kimyoungyin/seongryung/commit/44c52e15589f15dbbc45c964d50ef8f5da35283c)
2. detail 페이지

    [Comparing develop...feat/detail · kimyoungyin/seongryung](https://github.com/kimyoungyin/seongryung/compare/develop...feat/detail)

    - /id 에서 /detail/[id]로 변경
    - blur skeleton 이미지 받아와서 사용: [https://png-pixel.com](https://png-pixel.com/)

</details>
<br />

<details>
<summary>2025.03.12: tailwind와 책장 조감도 이용하여 특정 위치 표시, 세부 정보는 제거</summary>

템플릿 리터럴로 tailwind className을 동적으로 변환할 때 속성 전체를 온전히 사용해야 함

```tsx
const LOCATION_POSITION: {
    readonly [location: number]: string;
} = {
    1: `top-[0%] left-[0%]`,
    2: `top-[0%] left-[0%]`,
    3: `top-[0%] left-[0%]`,
    4: `top-[0%] left-[0%]`,
    5: `top-[0%] left-[0%]`,
    6: `top-[0%] left-[0%]`,
    78: `top-[84%] left-[85%]`,
    9: `top-[0%] left-[0%]`,
    10: `top-[0%] left-[0%]`,
    11: `top-[0%] left-[0%]`,
    12: `top-[0%] left-[0%]`,
    13: `top-[0%] left-[0%]`,
    14: `top-[0%] left-[0%]`,
};
```

하지만.. 반응형을 적용했을 때 위치를 가리켜주는 div 동그라미가 균일하지 않아 그냥 location마다 다른 이미지를 적용하기로 함. 위 방식은 제거

![스크린샷_2025-03-12_오후_5 39 59](https://github.com/user-attachments/assets/042ebf6c-9898-4417-92cd-a5b1fd32312f)

![스크린샷_2025-03-12_오후_5 39 32](https://github.com/user-attachments/assets/41802701-c853-4d58-a9f0-55142c0554ec)

</details>
<br />

<details>
<summary>2025.03.13: tailwind 초기 테마 세팅 및 SearchResults 스타일링 in feat/styles branch</summary>

-   tailwind 초기 테마 세팅
    [https://github.com/kimyoungyin/seongryung/commit/7f0924b0d5a10085d3f6ba2fe53294918c4c6211](https://github.com/kimyoungyin/seongryung/commit/7f0924b0d5a10085d3f6ba2fe53294918c4c6211)
    [Tailwind CSS에서 커스텀 컬러 설정하기](https://velog.io/@boorook/Tailwind-CSS%EC%97%90%EC%84%9C-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%BB%AC%EB%9F%AC-%EC%84%A4%EC%A0%95)

    ```tsx
    // tailwind.config.ts
    import type { Config } from "tailwindcss";

    export default {
        content: [
            "./pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./components/**/*.{js,ts,jsx,tsx,mdx}",
            "./app/**/*.{js,ts,jsx,tsx,mdx}",
        ],
        theme: {
            colors: {
                "base-bg": "#fff8e3", // 전체 배경
                "button-bg": "#d4b88a", // 버튼 배경
                "card-bg": "#fffdf8", // 카드 배경
                "input-border": "#e0d6c2", // Input border
                "text-primary": "#5d5348", // primary
                "text-secondary": "#726a5f", // secondary
            },
            extend: {
                colors: {
                    background: "var(--background)",
                    foreground: "var(--foreground)",
                },
            },
        },
        plugins: [],
    } satisfies Config;
    ```

-   SearchResults 반응형 스타일링

    [https://github.com/kimyoungyin/seongryung/commit/39064921fb81e37e9cf62a93c30df3000aec7f27](https://github.com/kimyoungyin/seongryung/commit/39064921fb81e37e9cf62a93c30df3000aec7f27)

    sm, md, lg 순: font-size, flex-direction, 이미지 사이즈 변경

    <img width="312" alt="스크린샷_2025-03-13_오후_4 40 08" src="https://github.com/user-attachments/assets/26b7e1f5-acba-4c31-a56d-352834b562b3" />

    <img width="671" alt="스크린샷_2025-03-13_오후_4 39 37" src="https://github.com/user-attachments/assets/e8e3fb38-2007-4ae7-a1a4-aa2db16e1a32" />

    <img width="821" alt="스크린샷_2025-03-13_오후_4 40 39" src="https://github.com/user-attachments/assets/85cd42da-d6f4-4ac0-ba52-7b67ed9d87ce" />

</details>
<br />

<details>
<summary>2025.03.14: 컴포넌트 스타일링 with AI</summary>

헤더의 승룡이 캐릭터 사진, 책장 조감도 사진들은 발전 필요

[https://github.com/kimyoungyin/seongryung/pull/7](https://github.com/kimyoungyin/seongryung/pull/7)

</details>
<br />

<details>
<summary>2025.03.17: 모바일 사이즈에 맞도록 반응형 사이즈 조절(텍스트, 여백)</summary>

-   vw, px, rem 등을 이용
-   계산 방식이 동일해서 유틸 함수로 만들어 tailwind className으로 사용하려고 하다가 그게 tailwind에서 인식을 못하므로 취소함

</details>
<br />

<details>
<summary>2025.03.18~2025.03.19: parallel route로 만든 모달 형태로 위치 표시하도록 변경</summary>

1. @location → location → [id] → page.tsx에 detail 페이지에 사용했던 것 이전하면서 모달화. 이 때, BookCard는 제외함

    ![스크린샷_2025-03-19_오후_5 53 19](https://github.com/user-attachments/assets/6cf2e7d8-d052-47ee-a0b1-ac76d5e88d56)

2. 이전 페이지(백그라운드 페이지)가 스크롤 되는 상태 일 때 렌더링 시

    - 해당 스크롤 위치 고정하여 자연스러움 유지(클라이언트 페이지로)
    - 스크롤 막기
      기능을 구현하기 위해 location 페이지를 **클라이언트 페이지**로 변경 후, useMemo로 직전 스크롤 값을 받아와 js 코드를 통해 스크롤 유지 및 이전으로 이동 시 스크롤 관련 설정 초기화.

        - useEffect 내에서 window.scrollY를 사용하면 componentDidMount 시점이기 때문에 이미 스크롤이 올라가버림. 그러므로 그 전에 미리 ‘한 번만’ 받아둔다

            ```tsx
            // @location/location/[id]/page.tsx
            const scrollY = useMemo(() => window.scrollY, []);

            useEffect(() => {
                const getBookData = async () => {
                    const params = await props.params;
                    // 비동기적으로 책 정보와 위치를 db에 검색 후 없으면 Redirect

                    // 동적 라우팅은 비동기적이므로
                    // npx @next/codemod@latest next-async-request-api --force
                    const bookId = Number(await params.id);
                    setBookInfo(await getBookLocationInfo(bookId));
                };
                getBookData();

                document.body.style.position = "fixed";
                document.body.style.top = `-${scrollY}px`;
                document.body.style.width = "100%";

                return () => {
                    document.body.style.position = "";
                    document.body.style.top = "";
                };
            }, []);
            ```

    </details>
    <br />

    2025.03.20: 스크롤바 삭제

<details>
<summary>2025.03.21~2025.03.24: 인터셉팅 Route로 hard navigation에 대응</summary>

-   parallel route 명 안겹치게 locationModal로 변경 후 **layout에도 변경된 이름 적용**

    ![스크린샷_2025-03-24_오후_6 27 04](https://github.com/user-attachments/assets/07bcc703-3c25-467c-8e62-166fc394b444)

    ![스크린샷_2025-03-24_오후_6 26 35](https://github.com/user-attachments/assets/214db75f-2ade-4086-82c7-d86bcff8cde6)

-   hard navigated 된 location Route

    -   책 세부 정보 가져와서 표시: server action 추가

        ```tsx
        export const getBookLocationAndBookInfo = cache(
            async (bookId: number) => {
                const sql = `SELECT * FROM books WHERE id = ? LIMIT 1`;
                // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
                const bookObj = (
                    (await queryDatabase(sql, [bookId])) as Book[]
                )[0];
                const floor =
                    bookObj.location < 11 || bookObj.location === 78 ? 2 : 1;

                return { ...bookObj, floor };
            }
        );
        ```

    -   뒤로 가기 버튼 클릭 시(뒤 페이지 없음) 홈(’/’)으로
        <img width="752" alt="스크린샷_2025-03-24_오후_6 29 27" src="https://github.com/user-attachments/assets/fc32eb24-f4fd-427c-9847-06ebfa99471c" />

</details>
<br />

<details>
<summary>2025.03.25~2025.0327: 동적/정적 메타데이터(metadata) 적용</summary>

1. 기존 최상단에 존재하는 `favicon.ico` 제거
2. public 폴더에 추가한 이미지 경로를 메타데이터 설정 시 추가

    ```tsx
    export async function generateMetadata({
    	searchParams,
    }: Props): Promise<Metadata> {
    	const query = (await searchParams).query || "";

    	const title =
    		(query ? query + " 검색 결과 | " : "") + "승룡이네집 도서 검색 시스템";
    	const description = "강동구 강풀만화거리 승룡이네집 만화책 위치 찾기";

    	return {
    		metadataBase: new URL("https://seongryung.vercel.app"),
    		title,
    		description,
    		// 여기
    		icons: {
    			icon: "/seongryoung-sm-round.jpeg",
    		},
    		// ...
    ```

3. 이후 페이지 별 메타데이터 작성과 오픈 그래프 반영

</details>
<br />

2025.03.28: 피드백 개선(키워드 상단으로), 빈 문자열 포함 문제 해결, vercel analytics, speedInsights 추가, master 브랜치 배포(v1.0)
