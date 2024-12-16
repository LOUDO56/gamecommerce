import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "GamEcommerce",
  description: "The website to buy your games.",
};

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: '400'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem 
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
