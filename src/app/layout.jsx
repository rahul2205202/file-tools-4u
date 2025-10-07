'use client'; // Client Component for hooks like usePathname

import './globals.css'; 
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Providers from './components/shared/Providers';
import Sidebar from './components/shared/Sidebar';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Script from 'next/script';

// Your GA4 Measurement ID
const GA_ID = 'G-90ZGVP1H92';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const noSidebarRoutes = [
    '/',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ];

  const showSidebar = !noSidebarRoutes.includes(pathname) && !pathname.startsWith('/blog');

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        send_to: GA_ID,
      });
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>=
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false });
          `}
        </Script>
      </head>

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
