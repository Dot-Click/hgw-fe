import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create Your Account",
  description: "Create your account to join the HGW Legend Vault.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
