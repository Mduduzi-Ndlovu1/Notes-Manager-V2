import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import { Inter} from "next/font/google" 
import MiniSideBar from "./Components/MiniSideBar/MiniSideBar";
import Header from "./Components/Header/Header";
import MainContentLayout from "@/providers/MainContentLayout";
import SideBarProvider from "@/providers/SideBarProvider";
import MainLayout from "@/providers/MainLayout";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes Manager V2",
  description: "Notes Manager Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
        <body
          className={inter.className}
        >
          <UserProvider>
            <Toaster position="top-center"/> 

            <div className="h-full flex overflow-hidden">
              <MiniSideBar/>
              <div className="flex-1 flex flex-col">
                <Header/>
                <MainContentLayout>
                  <MainLayout>
                    {children}
                  </MainLayout>
                  <SideBarProvider/>
                </MainContentLayout>
              </div>
            </div>
          </UserProvider>
        </body>

      
    </html>
  );
}