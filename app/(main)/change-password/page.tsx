import { Metadata } from 'next';
import ChangePasswordContainer from '@/components/auth/ChangePasswordContainer';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Change Password | HGW',
    description: 'Create a new password for your HGW account.',
};

const ChangePasswordPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChangePasswordContainer />
        </Suspense>
    );
};

export default ChangePasswordPage;
