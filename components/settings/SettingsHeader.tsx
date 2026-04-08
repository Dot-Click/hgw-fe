import React from 'react'

const SettingsHeader = () => {
    return (
        <div className="flex flex-col gap-1 pb-8 animate-in fade-in duration-500">
            <h1 className="text-2xl font-[900] text-white orbitron tracking-widest">Settings</h1>
            <p className="text-sm text-zinc-500 outfit">Manage your account and system preferences.</p>
        </div>
    )
}

export default SettingsHeader
