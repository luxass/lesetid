import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[100dvh] flex flex-col items-center justify-center gap-4">
      <h1 className="text-8xl text-blue-600">
        404
      </h1>
      <p className="mb-8 text-2xl">
        Page not found
      </p>
      <Link href="/">
        Go back
      </Link>
    </div>
  );
}
