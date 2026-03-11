import { createServerClient } from "@supabase/ssr";

export const createClient = () =>
    createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get() {
                    return undefined;
                },
                set() {
                    // Auth 세션을 사용하지 않으므로 noop
                },
                remove() {
                    // Auth 세션을 사용하지 않으므로 noop
                },
            },
        },
    );
