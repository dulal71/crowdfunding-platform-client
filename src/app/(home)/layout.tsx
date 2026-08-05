import Footer from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default HomePageLayout;