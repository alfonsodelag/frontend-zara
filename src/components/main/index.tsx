import { Header } from "../header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <Header />
      <main className="px-6 pt-20">{children}</main>
    </section>
  );
};
