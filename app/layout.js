import Provider from "@/components/Providers";
import "./globals.css";

export const metadata = {
  title: "e-com(Admin)",
  description: "start selling your products and make a living.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
