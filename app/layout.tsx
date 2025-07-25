import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/app/providers'

const firaSans = Fira_Sans({
  variable: '--font-fira-sans',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'USPS Label Generator',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${firaSans.variable}
          grid min-h-[100dvh] grid-rows-[auto_1fr_auto] bg-background font-sans
          antialiased
        `}
      >
        <Providers>
          <header className="bg-linear-65 from-purple-500 to-pink-500 p-[1rem]">
            <h1
              className={`
                font-semibold
                md:text-[1.5rem]
              `}
            >
              USPS Label Generator
            </h1>
          </header>
          <main className={`w-full max-w-[50rem] justify-self-center p-[1rem]`}>{children}</main>
          <footer className="grid place-items-center p-[1rem]">made by @the.lucfer</footer>
        </Providers>
      </body>
    </html>
  )
}
