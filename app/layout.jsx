import React from 'react'
import AuthProvider from '@/components/AuthProvider';
import '@/assets/styles/global.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata = {
  title: 'PropertyPulse | Find the Perfect Rental',
  description : 'Find your dream rental property',
  keywords : 'rental , find rentls , find properties',
};


const MainLayout = ({children}) => {
  return (
    <AuthProvider>      
      <html lang='en'>
        <body>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
          <ToastContainer/>
        </body>    
      </html>
    </AuthProvider>

  );
}

export default MainLayout
