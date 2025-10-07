'use client'; // 1. This is now a Client Component to use the hook.

import './globals.css'; 
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Providers from './components/shared/Providers';
import Sidebar from './components/shared/Sidebar'; // 2. Import the Sidebar
import { usePathname } from 'next/navigation'; // 3. Import the hook

// Metadata must be removed from Client Components, 
// but you can keep it in your individual page.jsx files.

export default function RootLayout({ children }) {
  const pathname = usePathname(); // 4. Get the current URL path

  // 5. Define which pages should NOT have a sidebar
  const noSidebarRoutes = [
    '/', // Homepage
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
  ];

  // const sidebarRoutes = [
  //   '/image-to-pdf',
  // ]

  // The sidebar should be shown if the current path is not in the list
  // and does not start with /blog (for the blog index and all posts)
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

