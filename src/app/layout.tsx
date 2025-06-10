import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { getClassName } from '@/shared/helpers/getClassNames'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

const yFont = localFont({
    src: '../fonts/YandexSansDisplay-Regular.woff2',
    variable: '--font-y',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'My Summary',
    description: 'My Summary',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ru">
            <body className={getClassName(geistSans.variable, geistMono.variable, yFont.variable)}>
                {children}
            </body>
        </html>
    )
}
