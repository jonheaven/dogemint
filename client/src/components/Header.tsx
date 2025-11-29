import React from 'react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold tracking-tight">Dogemint</div>
      <nav className="space-x-6">
        <a href="#mint" className="hover:underline">Mint</a>
        <a href="#wallet" className="hover:underline">Wallet</a>
        <a href="#batch" className="hover:underline">Batch</a>
        <a href="#settings" className="hover:underline">Settings</a>
      </nav>
    </header>
  );
}
