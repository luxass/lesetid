import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://next-example.lesetid.dev"),
  title: "lesetid | next example",
  description: "A example next app using lesetid.dev",
  other: {
    "darkreader-lock": "",
  },
  openGraph: {
    type: "website",
    siteName: "lesetid.dev",
    url: "https://next-example.lesetid.dev",
    title: "lesetid | next example",
    description: "A example next app using lesetid.dev",
    images: `https://image.luxass.dev/api/image/text?input=${encodeURIComponent(
      JSON.stringify({
        width: 300,
        height: 300,
      }),
    )}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "lesetid | next example",
    description: "A example next app using lesetid.dev",
    images: `https://image.luxass.dev/api/image/text?input=${encodeURIComponent(
      JSON.stringify({
        width: 300,
        height: 300,
      }),
    )}`,
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${dmSans.variable} font-sans`}>{children}</body>
    </html>
  )
}
