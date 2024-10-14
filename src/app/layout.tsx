import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import "./tailwind.css";

const font = Manrope({ subsets: ["latin"], display: "swap" });

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
      <body className={`${font.className} m-0 overflow-hidden flex`}>
        <Sidebar className="absolute left-0 top-0 z-10 xl:relative" />
        <div className="h-svh flex flex-col overflow-hidden xl:h-auto">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
