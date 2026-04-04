import { Metadata } from 'next';
import ResetPasswordContainer from '@/components/auth/ResetPasswordContainer';

export const metadata: Metadata = {
    title: 'Reset Password | HGW Legend Vault',
    description: 'Recover access to your HGW account. Enter your email to receive a password reset link.',
    keywords: ['HGW Reset Password', 'Recover Account HGW', 'Forgot Password Sports Ranking'],
};

const ResetPasswordPage = () => {
    return (
        <ResetPasswordContainer />
    );
};

export default ResetPasswordPage;