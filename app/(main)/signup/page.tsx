import { Metadata } from 'next';
import SignUpContainer from '@/components/auth/SignUpContainer';

export const metadata: Metadata = {
    title: 'Create Account | Join the HGW Legend Vault',
    description: 'Join How Good Was (HGW) today. Start ranking legends, compare players in death matches, and track your favorite legends in our definitive archive.',
    keywords: ['HGW Signup', 'Create HGW Account', 'Join Legend Vault', 'Sports Community Signup', 'GOAT Rankings'],
};

const SignupPage = () => {
    return (
        <SignUpContainer />
    );
};

export default SignupPage;