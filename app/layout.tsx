import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});

const share = Share_Tech_Mono({
  variable: "--font-share",
  subsets: ["latin"],
  weight: "400",
});

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "SAMHDDEV | توسعه‌دهنده فول‌استک",
  description:
    "پورتفولیوی SAMHDDEV. طراحی و توسعه وب‌اپلیکیشن با Next.js و React، همراه با معماری پایگاه داده.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${orbitron.variable} ${share.variable} ${vazir.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
