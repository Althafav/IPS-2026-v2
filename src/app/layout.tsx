import MenuComponent from "@/components/globals/MenuComponent";
import "./globals.css";
import MenuComponent2 from "@/components/globals/Menu/MenuComponent2";
import FooterComponent from "@/components/globals/FooterComponent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        {/* Header */}
        <MenuComponent2 />

        {/* Main Content (grows to fill space) */}
        <main className="flex-1 min-h-screen">{children}</main>

        {/* Footer (always at bottom) */}
        <FooterComponent />
      </body>
    </html>
  );
}
