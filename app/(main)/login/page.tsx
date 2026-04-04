import { Metadata } from 'next';
import LoginContainer from '@/components/auth/LoginContainer';

export const metadata: Metadata = {
    title: 'Login | Access the HGW Legend Vault',
    description: 'Log in to your HGW account to access the legend vault, manage your comparisons, and participate in the community scoring system.',
    keywords: ['HGW Login', 'Sign In HGW', 'Legend Vault Access', 'Sport Ranking Login'],
};

const LoginPage = () => {
    return (
        <LoginContainer />
    );
};

export default LoginPage;