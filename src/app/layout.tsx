import MenuComponent from "@/components/globals/MenuComponent";
import "./globals.css";
import MenuComponent2 from "@/components/globals/Menu/MenuComponent2";
import FooterComponent from "@/components/globals/FooterComponent";
import Script from "next/script";
import { Lato, Inter } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-lato",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300","400", "500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        {/* Header */}
        <MenuComponent2 />

        {/* Main Content (grows to fill space) */}
        <main className="flex-1 min-h-screen">{children}</main>

        {/* Footer (always at bottom) */}
        <FooterComponent />
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
