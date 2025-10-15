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
      <body className={` antialiased`}>
        <MenuComponent2/>
        {children}
        <FooterComponent/>
        </body>
    </html>
  );
}
