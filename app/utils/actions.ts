"use server";
import { Book } from "@/app/utils/db";
// https://nextjs-ko.org/docs/app/building-your-application/data-fetching/fetching#orms-and-database-clients
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getBookMetadata = cache(async (bookId: number) => {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("books")
        .select("id,title,author,location")
        .eq("id", bookId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error("Book not found");
    }

    return data;
});

export const search = cache(async (bookName: string) => {
    const pureBookName = bookName.trim();
    const supabase = createClient();

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .ilike("title", `%${pureBookName}%`);

    if (error) {
        throw error;
    }

    return (data ?? []) as Book[];
});

export const getBookLocation = cache(async (bookId: number) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("books")
        .select("location")
        .eq("id", bookId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error("Book not found");
    }

    const { location } = data as { location: number };

    return { location };
});

export const getBookLocationAndBookInfo = cache(async (bookId: number) => {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", bookId)
        .maybeSingle();

    if (error) {
        throw error;
    }

    if (!data) {
        throw new Error("Book not found");
    }

    return data as Book;
});
