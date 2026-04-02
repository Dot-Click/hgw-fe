import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Securely reset your HGW Legend Vault account password.",
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
