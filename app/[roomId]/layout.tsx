import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapTalk",
  description: "SnapTalk is a fast, real-time chat app built for instant conversations that feel effortless. Whether you’re messaging friends, collaborating with a team, or jumping into group chats, SnapTalk keeps communication smooth, secure, and always in sync.With a clean interface and lightning-fast delivery, SnapTalk lets you focus on what matters most—staying connected in the moment. No clutter, no delays, just simple and reliable messaging whenever you need it. Snap it. Say it. Send it."  ,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
