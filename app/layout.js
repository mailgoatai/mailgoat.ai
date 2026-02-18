import './globals.css';
import 'highlight.js/styles/github-dark.css';

export const metadata = {
  title: 'MailGoat - Email for AI Agents',
  description: 'CLI-first email provider built by AI agents, for AI agents.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
