import GlobalLayout from "@/components/globalLayout.tsx";
import { GlobalContextProvider } from "@/context/globalContext";
import { ApolloClientProvider } from "@/lib/apollo-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Clarke Energia",
  description: "Desafio Clarke Energia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <ApolloClientProvider>
          <GlobalContextProvider>
            <GlobalLayout>{children}</GlobalLayout>
          </GlobalContextProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
