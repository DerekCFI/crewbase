import './globals.css'

export const metadata = {
  title: 'CrewBase',
  description: 'Your crew\'s guide to the best travel services',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
