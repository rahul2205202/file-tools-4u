import './globals.css'; // Your global styles
import Header from './components/shared/Header'; // Adjust path if needed
import Footer from './components/shared/Footer'; // Adjust path if needed
import Providers from './components/shared/Providers'; // 1. Import the new client component

export const metadata = {
  title: 'File Tools 4U',
  description: 'Free online tools to compress, convert, and create images and PDFs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 2. Use the Providers component to wrap your layout */}
        <Providers>
          <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow py-8">
              <div className="container mx-auto px-4">
                <div className="flex justify-center">
                  {children}
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
