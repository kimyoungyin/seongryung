"use server";
import { Books, queryDatabase } from "@/app/utils/db";
// https://nextjs-ko.org/docs/app/building-your-application/data-fetching/fetching#orms-and-database-clients
import { cache } from "react";

export const search = cache(async (bookName: string) => {
    const pureBookName = bookName.trim();
    const sql = `SELECT * FROM books WHERE title LIKE ?`;
    // SELECT * FROM books WHERE title LIKE %?% 대신 다음과 같이 포함 검색
    return (await queryDatabase(sql, [`%${pureBookName}%`])) as Books[];
});
