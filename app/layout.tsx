import "./globals.css";

export const metadata = {
  title: "Frigobar Express",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          <div className="max-w-md w-full p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
