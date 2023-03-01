import Link from 'next/link';

export default function Home() {
    return (
        <div className="m-2 flex flex-col gap-2">
            <div>Home</div>
            <Link className="btn-builder block w-fit" href="/form-builder">
                Form builder
            </Link>
        </div>
    );
}
