import SideNav from "@/app/ui/dashboard/sidenav";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Rally Base',
    default: 'Rally Base',
  },
  description: 'The official Rally Base dashboard.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};



export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen" >
      <SideNav />
      <main className="flex-1 p-6 bg-[#071a0d] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
