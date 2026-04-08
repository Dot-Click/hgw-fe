import React from 'react'
import { Metadata } from 'next'
import SettingsHeader from '@/components/settings/SettingsHeader'
import SettingsTabs from '@/components/settings/SettingsTabs'

export const metadata: Metadata = {
    title: 'Settings | HGW Admin',
    description: 'Manage your HGW account and system preferences.',
}

const Settings = () => {
    return (
        <div className="flex flex-col gap-2">
            <SettingsHeader />
            <SettingsTabs />
        </div>
    )
}

export default Settings