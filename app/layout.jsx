import React from 'react'
import '@/assets/styles/global.css';
export const metadata = {
  title: 'PropertyPulse | Find the Perfect Rental',
  description : 'Find your dream rental property',
  keywords : 'rental , find rentls , find properties',
};

const MainLayout = ({children}) => {
  return (
    <html>
        <body>
            <div>{children}</div>
        </body>    
    </html>
  );
}

export default MainLayout
