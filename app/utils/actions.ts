"use server";
import { Book, queryDatabase } from "@/app/utils/db";
// https://nextjs-ko.org/docs/app/building-your-application/data-fetching/fetching#orms-and-database-clients
import { cache } from "react";

export const search = cache(async (bookName: string) => {
    const pureBookName = bookName.trim();
    const sql = `SELECT * FROM books WHERE title LIKE ?`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
    return (await queryDatabase(sql, [`%${pureBookName}%`])) as Book[];
});

export const getBookLocationInfo = cache(async (bookId: number) => {
    const sql = `SELECT location FROM books WHERE id = ? LIMIT 1`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
    const { location } = (
        (await queryDatabase(sql, [bookId])) as { location: number }[]
    )[0];
    const floor = location < 11 || location === 78 ? 2 : 1;

    return { location, floor };
});

export const getBookLocationAndBookInfo = cache(async (bookId: number) => {
    const sql = `SELECT * FROM books WHERE id = ? LIMIT 1`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
    const bookObj = ((await queryDatabase(sql, [bookId])) as Book[])[0];
    const floor = bookObj.location < 11 || bookObj.location === 78 ? 2 : 1;

    return { ...bookObj, floor };
});
