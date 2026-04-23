import React, { useState, useEffect } from 'react'
import { Button, Input, TextField, Label, cn, toast, Spinner } from '@heroui/react'
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updatePassword } from '@/store/actions/settingsActions'
import { resetSettingsState } from '@/store/slices/settingsSlice'
import { SettingsSkeleton } from './SettingsSkeleton'

const SecurityTab = () => {
    const dispatch = useAppDispatch()
    const { user, isInitialLoading } = useAppSelector((state) => state.auth)
    const { loading, success, error } = useAppSelector((state) => state.settings)

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })

    const isOAuth = user?.isOAuth || false

    useEffect(() => {
        if (success) {
            toast.success("Password updated successfully")
            setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' })
            
            // Add a slight delay to prevent transition errors if the session is refreshing
            const timer = setTimeout(() => {
                dispatch(resetSettingsState())
            }, 500)
            
            return () => clearTimeout(timer)
        }
        if (error) {
            toast.danger(error)
            dispatch(resetSettingsState())
        }
    }, [success, error, dispatch])

    const handleUpdate = () => {
        if (!formData.newPassword || !formData.confirmNewPassword) {
            toast.danger("Please fill in all required fields")
            return
        }
        if (formData.newPassword !== formData.confirmNewPassword) {
            toast.danger("Passwords do not match")
            return
        }
        dispatch(updatePassword(formData))
    }

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    if (isInitialLoading) {
        return <SettingsSkeleton />
    }

    return (
        <div className="bg-[#0D1424] border border-[#1E293B] rounded-[20px] p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col gap-1 mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-white orbitron tracking-wider">Change Password</h2>
                <p className="text-sm text-zinc-500 outfit">Ensure your account is using a strong, unique password.</p>
                {isOAuth && (
                    <div className="mt-2 p-3 bg-[#00D4FF1A] border border-[#00D4FF33] rounded-lg">
                        <p className="text-[12px] text-[#00D4FF] outfit">
                            You are signed in via OAuth. You can set a password directly without providing a current one.
                        </p>
                    </div>
                )}
            </div>

            {/* Form Fields Section */}
            <div className="flex flex-col gap-6 max-w-2xl">
                {/* Current Password - Only for non-OAuth users */}
                {!isOAuth && (
                    <TextField className="flex flex-col gap-2">
                        <Label className="text-[13px] font-semibold text-zinc-500 outfit uppercase tracking-wider px-1">Current Password</Label>
                        <div className="relative">
                            <Input 
                                value={formData.currentPassword}
                                onChange={(e) => handleChange('currentPassword', e.target.value)}
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                className={cn(
                                    "h-12 w-full bg-[#080C14] border border-[#1E293B] rounded-xl px-5 transition-all text-white outfit text-sm placeholder:text-zinc-600 outline-none pr-12",
                                    "hover:border-zinc-700 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20"
                                )}   
                            />
                            <button 
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-[#00D4FF] transition-colors bg-transparent 
                                 border-none outline-none cursor-pointer"
                            >
                                {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </TextField>
                )}

                {/* New Password */}
                <TextField className="flex flex-col gap-2">
                    <Label className="text-[13px] font-semibold text-zinc-500 outfit uppercase tracking-wider px-1">New Password</Label>
                    <div className="relative">
                        <Input 
                            value={formData.newPassword}
                            onChange={(e) => handleChange('newPassword', e.target.value)}
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className={cn(
                                "h-12 w-full bg-[#080C14] border border-[#1E293B] rounded-xl px-5 transition-all text-white outfit text-sm placeholder:text-zinc-600 outline-none pr-12",
                                "hover:border-zinc-700 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20"
                            )}
                        />
                        <button           
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-[#00D4FF] transition-colors bg-transparent border-none outline-none cursor-pointer"
                        >
                            {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>                  
                    </div>
                </TextField>  
                                  
                {/* Confirm New Password */}
                <TextField className="flex flex-col gap-2">
                    <Label className="text-[13px] font-semibold text-zinc-500 outfit uppercase tracking-wider px-1">Confirm New Password</Label>
                    <div className="relative">
                        <Input 
                            value={formData.confirmNewPassword}
                            onChange={(e) => handleChange('confirmNewPassword', e.target.value)}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-type your new password"
                            className={cn(
                                "h-12 w-full bg-[#080C14] border border-[#1E293B] rounded-xl px-5 transition-all text-white outfit text-sm placeholder:text-zinc-600 outline-none pr-12",
                                "hover:border-zinc-700 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20"
                            )}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-[#00D4FF] transition-colors bg-transparent border-none outline-none cursor-pointer"
                        >
                            {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                </TextField>

                {/* Submit Action */}
                <div className="flex justify-end pt-4">
                    <Button 
                        onPress={handleUpdate}
                        isDisabled={loading}
                        className="bg-[#00D4FF] text-[#0B1221] font-[600] outfit uppercase tracking-wide py-5 px-8 text-[17px] rounded-md shadow-[0_4px_20px_rgba(0,212,255,0.2)] hover:bg-[#00D4FF]/90 transition-all flex items-center gap-2"
                    >
                        {loading ? (
                            <Spinner size="sm" color="current" />
                        ) : (
                            <FiLock size={25} />
                        )}
                        {loading ? "Updating..." : "Update Password"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SecurityTab
