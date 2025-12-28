import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

// Initialize the fonts
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair' // Custom variable for Tailwind
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata = {
  title: "StoryWeaver - Preserving Endangered Languages",
  description: "Preserving endangered dialects with Generative AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}