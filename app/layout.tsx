import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ToasterProvider } from "@/providers/toast-provider";

const inter = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gridwatch",
  description: "Get a heads up of an approaching Power cut",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
