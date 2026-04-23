import React, { useEffect } from 'react'
import { Switch, toast } from '@heroui/react'
import { FiMail, FiSmartphone, FiCalendar } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateAlerts } from '@/store/actions/settingsActions'
import { resetSettingsState } from '@/store/slices/settingsSlice'
import { SettingsSkeleton } from './SettingsSkeleton'

const NotificationsTab = () => {
    const dispatch = useAppDispatch()
    const { user, isInitialLoading } = useAppSelector((state) => state.auth)
    const { loading, success, error } = useAppSelector((state) => state.settings)

    useEffect(() => {
        if (success) {
            toast.success("Alert settings updated")
            dispatch(resetSettingsState())
        }
        if (error) {
            toast.danger(error)
            dispatch(resetSettingsState())
        }
    }, [success, error, dispatch])

    const handleToggle = (val: boolean) => {
        dispatch(updateAlerts({ emailAlerts: val }))
    }

    if (isInitialLoading) {
        return <SettingsSkeleton />
    }

    return (
        <div className="bg-[#0D1424] border border-[#1E293B] rounded-[20px] p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Header */}
            <div className="flex flex-col gap-1 mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-white orbitron tracking-wider">
                    Notification Settings
                </h2>
                <p className="text-sm text-zinc-500 outfit">
                    Configure how you receive updates from your vault.
                </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-6">
                <NotificationCard 
                    icon={<FiMail size={20} className="text-[#00D4FF]" />}
                    title="Email Alerts"
                    description="Receive important updates and subscriber reports."
                    isSelected={user?.emailAlerts || false}
                    onChange={handleToggle}
                    isLoading={loading}
                />

                {/* Browser Push - COMMENTED OUT AS REQUESTED */}
                {/* 
                <NotificationCard 
                    icon={<FiSmartphone size={20} className="text-[#00D4FF]" />}
                    title="Browser Push"
                    description="Get real-time notifications while browsing."
                    isSelected={false}
                    onChange={() => {}}
                    disabled
                />
                */}

                {/* Analytics Digest - COMMENTED OUT AS REQUESTED */}
                {/* 
                <NotificationCard 
                    icon={<FiCalendar size={20} className="text-[#00D4FF]" />}
                    title="Analytics Digest"
                    description="Weekly summary of performance and growth."
                    isSelected={false}
                    onChange={() => {}}
                    disabled
                />
                */}
            </div>
        </div>
    )
}

const NotificationCard = ({ 
    icon, 
    title, 
    description, 
    isSelected, 
    onChange,
    isLoading,
    disabled = false
}: { 
    icon: React.ReactNode; 
    title: string; 
    description: string; 
    isSelected: boolean; 
    onChange: (val: boolean) => void;
    isLoading?: boolean;
    disabled?: boolean;
}) => (
    <div className={`flex items-center justify-between p-4 rounded-xl border border-[#1E293B] bg-[#0B1221] hover:border-[#00D4FF]/40 transition-all group/card ${disabled ? 'opacity-50 grayscale' : ''}`}>

        {/* Left */}
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-[#1E293B] flex items-center justify-center shrink-0 group-hover/card:border-[#00D4FF]/30 transition-colors">
                {icon}
            </div>

            <div>
                <h3 className="text-white font-semibold text-base outfit">
                    {title}
                </h3>
                <p className="text-sm text-zinc-500 mt-0.5 max-w-md outfit">
                    {description}
                </p>
            </div>
        </div>

        {/* Switch */}
        {!disabled && (
            <Switch 
                isSelected={isSelected} 
                onChange={onChange}
                isDisabled={isLoading}
                className="group flex items-center cursor-pointer"
            >
                <Switch.Control className="w-12 h-6 rounded-full bg-[#05080F] border border-[#1E293B] flex items-center px-[3px] group-data-[selected=true]:bg-[#00D4FF]/20 group-data-[selected=true]:border-[#00D4FF]/40 transition-all">
                    <Switch.Thumb className="w-5 h-5 rounded-full bg-zinc-600 group-data-[selected=true]:bg-[#00D4FF] group-data-[selected=true]:translate-x-[5px] transition-all" />
                </Switch.Control>
            </Switch>
        )}
    </div>
)

export default NotificationsTab