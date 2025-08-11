import './globals.css'; // Your global styles
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Providers from './components/shared/Providers';

export const metadata = {
  title: 'File Tools 4U',
  description: 'Free online tools to compress, convert, and create images and PDFs.',
  
  // Add the verification object here
  verification: {
    google: 'raHDLajP5qtyDJSsSCnhrazmj8pd8auC3R5H2lExA3E',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow">
              <div className="container mx-auto">
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
