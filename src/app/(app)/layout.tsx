import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'
interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col from-teal-400 via-blue-500 to-purple-600"
    >
    <Navbar />
    {children}
    <Footer/>
  </div>
  
  );
}