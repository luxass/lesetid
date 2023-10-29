import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[100dvh] flex gap-4 flex-col items-center justify-center">
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
