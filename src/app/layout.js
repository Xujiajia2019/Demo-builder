import './globals.css'
import { Inter } from 'next/font/google'
import themeStyle from '../../theme_style.json';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html  data-theme={themeStyle.style} lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
