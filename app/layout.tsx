import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { InterviewProvider } from '@/context/InterviewContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'InterviewAI - AI-Powered Mock Interview Simulator',
  description: 'Master your interviews with AI-powered practice sessions, real-time feedback, and personalized coaching.',
  keywords: ['interview', 'AI', 'mock interview', 'practice', 'career', 'job preparation'],
  authors: [{ name: 'InterviewAI Team' }],
  icons: {
    // icon: [
    // {
    //   url: '/icon-light-32x32.png',
    //   media: '(prefers-color-scheme: light)',
    // },
    // {
    //   url: '/icon-dark-32x32.png',
    //   media: '(prefers-color-scheme: dark)',
    // },
    // {
    //   url: '/icon.svg',
    //   type: 'image/svg+xml',
    // },

    icon: [
      '/online-interview.png',

    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background dark">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <InterviewProvider>
              {children}
            </InterviewProvider>
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
