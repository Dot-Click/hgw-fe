import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Login",
  description: "Access your HGW Legend Vault account.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
