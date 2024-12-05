"use server";

export const search = async (bookName: string) => {
    const pureBookName = bookName.trim();
    console.log(pureBookName + "에 대해서 검색하겠다!");

    return [pureBookName, pureBookName + "2"];
};
