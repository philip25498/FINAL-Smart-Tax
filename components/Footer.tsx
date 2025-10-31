
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 dark:bg-black text-white dark:text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} SmartTax. All Rights Reserved.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">"Lipa Ushuru Ujitegemee"</p>
      </div>
    </footer>
  );
};

export default Footer;
