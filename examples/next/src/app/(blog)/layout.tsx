import type { PropsWithChildren } from "react";
import { Footer } from "~/components/Footer";
import { Header } from "~/components/Header";

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="prose flex-1 p-4">{children}</main>
      <Footer />
    </>
  );
}
