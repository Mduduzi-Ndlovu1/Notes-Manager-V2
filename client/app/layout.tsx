import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import { Inter} from "next/font/google" 

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
          <Toaster position="top-center"/> 
          <UserProvider>

          {children}
          </UserProvider>
        </body>

      
    </html>
  );
}
