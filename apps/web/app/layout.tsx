import './globals.css'
import ClientProviders from './components/ClientProviders'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Lembo - Connecting Communities Worldwide</title>
        <meta name="description" content="The premier platform for African diaspora communities. Connect, celebrate, and thrive together." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300">
        <ClientProviders>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </ClientProviders>
      </body>
    </html>
  )
}
