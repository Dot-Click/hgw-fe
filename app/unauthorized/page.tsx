import Link from 'next/link';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F] text-white p-4">
            <div className="text-center space-y-6 max-w-md">
                <h1 className="text-6xl font-bold orbitron text-[#FF3333] shadow-[0_0_20px_#FF33334D]">403</h1>
                <h2 className="text-2xl font-bold orbitron">Unauthorized Access</h2>
                <p className="text-[#7B899D] outfit">
                    You do not have the required permissions to access this section of the vault. 
                    Please contact an administrator if you believe this is an error.
                </p>
                <div className="pt-4">
                    <Link 
                        href="/"
                        className="bg-[#00CCFF] text-[#0B0B0F] font-bold orbitron px-8 py-3 rounded-lg hover:bg-[#00B8E6] transition-all inline-block"
                    >
                        Back to Safety
                    </Link>
                </div>
            </div>
        </div>
    );
}
