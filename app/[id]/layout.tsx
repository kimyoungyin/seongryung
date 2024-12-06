import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <nav className="border-b-2">
                <Link href="/">
                    <h1>승룡이네집</h1>
                </Link>
            </nav>
            <section>{children}</section>
        </>
    );
}
