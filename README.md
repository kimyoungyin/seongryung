## License

이 프로젝트는 NonCommercial License에 따라 배포됩니다. 비상업적 용도로만 사용 가능합니다.

---

# 승룡이네집 도서 검색 시스템

![seongryoung-base](https://github.com/user-attachments/assets/68ee4404-250a-4026-9a81-2d13fe30a9d1)

## 1. 배포 URL

[승룡이네집 도서 검색 시스템](https://seongryung.vercel.app/)

<img width="312" alt="qrcode" src="https://github.com/user-attachments/assets/9cf456c9-9ecb-43a3-b228-b157fd3fd478" />    

## 2. 프로젝트 소개

-   [승룡이네집](https://map.naver.com/p/entry/place/187115219?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=127.1287584&lat=37.5350510&c=15.00,0,0,0,dh)은 카페와 만화책, 문화프로그램이 있는 복합문화공간입니다. 하지만 아직 도서 검색 시스템은 없었기에, 읽고 싶은 만화책의 위치를 찾을 수 있도록 도와주는 검색 시스템을 개발하였습니다.
-   도서 제목을 검색하면, 유사한 제목을 가진 도서들을 간략한 정보가 담긴 목록 형태로 조회할 수 있고 각 도서의 위치 또한 지도를 통해 알 수 있습니다.
-   이제 더 이상 직접 읽고 싶은 도서를 찾아다니지 마시고 검색해보세요!

## 3. 개발 스택

-   Framework: [Next.js](https://nextjs.org/)(15.1.9)
    -   선택 이유: SEO 최적화를 통해, ROOT 페이지 뿐만이 아니라 책이 승룡이네집에 있다는 것 또한 검색 엔진을 통해 발견할 수 있도록 하고 싶었다.
-   Language: [Typescript](https://www.typescriptlang.org/)(^5)
-   CSS, UI: [Tailwindcss](https://tailwindcss.com/)(^3.4.1), [lucide-react](https://lucide.dev/guide/packages/lucide-react)(^0.479.0)
-   lint: [ESlint](https://eslint.org/)(^8)
-   DB: [AWS RDS](https://aws.amazon.com/ko/rds/)([mysql](https://www.mysql.com/)) - 모듈 [mysql2](https://www.npmjs.com/package/mysql2)(^3.12.0)

    <details>
    <summary>선택 이유</summary>

    -   nosql vs sql

        -   ‘도서’라는 규격화된 데이터: nosql보다 눈에 띄게 성능이 뒤쳐지거나 하지 않으면 sql을 사용하려고 했다.
        -   1000개 이하의 데이터 수: 소량의 데이터이기에 보통 Nosql이 sql보다 보통 CRUD 연산이 빠르다 하더라도 큰 차이가 없음.
        -   ‘검색’이기에 select 쿼리를 주로 사용: Id로 읽는 경우는 mongodb가 매우 빠르지만 그게 아닌 ‘검색’은 mongodb와 10ms 정도 차이만 있음

            ![SQL vs NoSQL 비교](https://github.com/user-attachments/assets/9a2a5368-0ec0-4f48-9e22-3ed93059be75)

            [SQL vs NoSQL 비교 영상](https://www.youtube.com/watch?v=bluQwqMgTsw&t=674s)

            [(논문번역) SQL vs NoSQL: A Performance Comparison](https://velog.io/@park2348190/%EB%85%BC%EB%AC%B8%EB%B2%88%EC%97%AD-SQL-vs-NoSQL-A-Performance-Comparison)

    -   mysql vs postgresql

        대규모 데이트 셋, 복잡한 쿼리는 postgresql이 빠르지만, 읽기 전용 명령어는 mysql이 더 빠르기 때문에 mysql로 선택했다(대규모도 아니고).

        [https://www.youtube.com/watch?v=-PbP1TcD94Q&t=527s](https://www.youtube.com/watch?v=-PbP1TcD94Q&t=527s)

        [PostgreSQL과 MySQL 비교: 주요 차이점](https://www.integrate.io/ko/blog/postgresql-vs-mysql-which-one-is-better-for-your-use-case-ko/#five)

        </details>
        <br />

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

