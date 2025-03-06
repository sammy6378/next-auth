import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/componets/Navbar";
import AuthProvider from "@/context/authContext";
import StoreProvider from "./storeProvider";
import { Toaster } from "react-hot-toast";
import TokenRefresher from "@/componets/tokenRefresher";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        <StoreProvider>
        <AuthProvider>
          <>
          <TokenRefresher />
          <Navbar />
          {children}
          <Toaster />
          </>
        </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
