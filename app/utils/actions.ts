"use server";
import { Book, queryDatabase } from "@/app/utils/db";
// https://nextjs-ko.org/docs/app/building-your-application/data-fetching/fetching#orms-and-database-clients
import { cache } from "react";

export const getBookMetadata = cache(async (bookId: number) => {
    const sql = `SELECT id,title,author,location FROM books WHERE id = ?`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색

    return (
        (await queryDatabase(sql, [bookId])) as {
            id: number;
            title: string;
            author: string | null;
            location: number;
        }[]
    )[0];
});

export const search = cache(async (bookName: string) => {
    const pureBookName = bookName.trim();
    const sql = `SELECT * FROM books WHERE title LIKE ?`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
    return (await queryDatabase(sql, [`%${pureBookName}%`])) as Book[];
});

export const getBookLocation = cache(async (bookId: number) => {
    const sql = `SELECT location FROM books WHERE id = ? LIMIT 1`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
    const { location } = (
        (await queryDatabase(sql, [bookId])) as { location: number }[]
    )[0];

    return { location };
});

export const getBookLocationAndBookInfo = cache(async (bookId: number) => {
    const sql = `SELECT * FROM books WHERE id = ? LIMIT 1`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
    return ((await queryDatabase(sql, [bookId])) as Book[])[0];
});
