import React from 'react'
import '@/assets/styles/global.css';
import Navbar from '@/components/Navbar';
export const metadata = {
  title: 'PropertyPulse | Find the Perfect Rental',
  description : 'Find your dream rental property',
  keywords : 'rental , find rentls , find properties',
};

const MainLayout = ({children}) => {
  return (
    <html>
        <body>
          <Navbar/>
          <main>{children}</main>
        </body>    
    </html>
  );
}

export default MainLayout
