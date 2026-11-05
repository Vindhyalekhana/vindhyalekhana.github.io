import type { Metadata } from 'next'
import './globals.css'
import WelcomeScreen from '@/components/WelcomeScreen'

export const metadata: Metadata = {
  title: 'Vindhya Lekhana — Personal Portfolio',
  description: 'Full Stack Developer specializing in Web Applications, System Design, AI Solutions, and Enterprise Software Development.',
  icons: {
    icon: '/profile.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <WelcomeScreen />
        {children}
      </body>
    </html>
  )
}

