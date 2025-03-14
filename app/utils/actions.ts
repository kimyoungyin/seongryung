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

export const getBookDetail = cache(async (bookId: number) => {
    const sql = `SELECT * FROM books WHERE id = ? LIMIT 1`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
    return (await queryDatabase(sql, [bookId])) as [Book];
});
