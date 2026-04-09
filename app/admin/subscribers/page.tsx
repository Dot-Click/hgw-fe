import React from 'react'
import { Metadata } from 'next'
import SubscribersHeader from '@/components/subscribers/SubscribersHeader'
import SubscribersDetails from '@/components/subscribers/SubscribersDetails'
import SubscribersTable from '@/components/subscribers/SubscribersTable'

export const metadata: Metadata = {
    title: 'Subscribers | HGW Admin',
    description: 'Manage and export your newsletter subscribers.',
    keywords: ['Subscribers Management', 'Newsletter Subscribers', 'Email List', 'HGW Subscribers', 'Admin Subscribers'],
}

const Subscribers = () => {
    return (
        <div className="flex flex-col gap-2">
            <SubscribersHeader />
            <SubscribersDetails />
            <SubscribersTable />
        </div>
    )
}

export default Subscribers