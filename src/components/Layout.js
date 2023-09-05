// components/Layout.js
import React from "react";
import Head from "next/head";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Your Blog App</title>
        {/* Add meta tags, stylesheets, or other head content here */}
      </Head>
      <header>{/* Add header content */}</header>
      <main>{children}</main>
      <footer>{/* Add footer content */}</footer>
    </div>
  );
}

export default Layout;
