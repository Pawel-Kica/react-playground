import Link from 'next/link';

export default function Home() {
    return (
        <>
            <div>Home</div>
            <Link className="link" href="/form-builder">
                Form builder
            </Link>
        </>
    );
}
