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
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <ClientProviders>
          <SiteHeader />
          <main className="min-h-screen">{children}</main>
          <SiteFooter />
        </ClientProviders>
      </body>
    </html>
  )
}
