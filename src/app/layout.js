import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "Learning Tracker | Keshav & Dipesh",
  description: "Keshav & Dipesh's track to get a Data Analytics job — GFG Puzzles, Daily SQL & Progress",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#6366f1",
          colorBackground: "#ffffff",
          colorInputBackground: "#f8fafc",
          colorText: "#0f172a",
        },
      }}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
