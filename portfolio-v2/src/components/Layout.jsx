import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Routes that render without the site chrome (header + footer).
// /links is the semi-hidden QR-code landing page.
const BARE_ROUTES = ['/links'];

function Layout() {
  const { pathname } = useLocation();
  const isBare = BARE_ROUTES.includes(pathname.replace(/\/+$/, '') || '/');

  return (
    <>
      {!isBare && <Header />}
      <main>
        <Outlet />
      </main>
      {!isBare && <Footer />}
    </>
  );
}

export default Layout;
