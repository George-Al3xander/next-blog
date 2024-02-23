import type { Metadata } from "next";
import { Nunito_Sans} from "next/font/google";
import Sidebar from "@/components/fundamental/sidebar/Sidebar";
import Header from "@/components/fundamental/Header";
import "./globals.css";
import{ Toaster } from 'react-hot-toast';

const inter = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetPublished",
  description: "Write something interesting and get published!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {/* <AnimationWrapper> */}
                <Sidebar />
          {/* </AnimationWrapper> */}
          <Header />
          <main className="lg:ml-[12vw]  pt-[6rem] pb-[10rem]  text-white ">
                <span className="block w-responsive mx-auto">             
                    {children}
                  <Toaster />
                </span> 
            </main>
        </body>
    </html>
  );
}
