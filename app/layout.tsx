import { Playfair_Display } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","600","700"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={playfair.className}>
        {children}
      </body>
    </html>
  )
}