import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 px-8 text-center mt-12">
      <div>© {new Date().getFullYear()} Dogemint. All rights reserved.</div>
      <div className="mt-2 text-xs">Built for decentralized Doginals minting and wallet management.</div>
    </footer>
  );
}
