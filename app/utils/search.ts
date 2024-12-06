"use server";
// https://nextjs-ko.org/docs/app/building-your-application/data-fetching/fetching#orms-and-database-clients
import { cache } from "react";

export const search = cache(async (bookName: string) => {
    const pureBookName = bookName.trim();
    console.log(pureBookName + "에 대해서 검색하겠다!");
    return [pureBookName, pureBookName + "2"];
});
