'use client'; // 1. This is now a Client Component to use the hook.

import './globals.css'; 
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Providers from './components/shared/Providers';
import Sidebar from './components/shared/Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noSidebarRoutes = [
    '/',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ];

  // const sidebarRoutes = [
  //   '/image-to-pdf',
  // ]

  const showSidebar = !noSidebarRoutes.includes(pathname) && !pathname.startsWith('/blog');

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-grow py-1">
              {showSidebar ? (
                <div className="flex lg:pl-30 lg:pr-30 py-5 mx-auto px-4">
                  <div className="flex flex-col lg:flex-row gap-5">
                    <div className="flex-1">
                      {children}
                    </div>
                    <Sidebar />
                  </div>
                </div>

              ) : (
                <div className="flex lg:pl-30 lg:pr-30 py-5 mx-auto px-4">
                   <div className="flex justify-center">
                      {children}
                   </div>
                </div>
              )}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

