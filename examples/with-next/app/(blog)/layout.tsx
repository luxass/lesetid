import type { PropsWithChildren } from "react"
import { Footer } from "../../components/Footer"
import { Header } from "../../components/Header"

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="flex-1 p-4 prose">{children}</main>
      <Footer />
    </>
  )
}
