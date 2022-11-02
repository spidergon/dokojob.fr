import '@styles/reset.css';
import '@styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
