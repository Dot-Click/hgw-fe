"use client"

import React, { useState, useEffect } from 'react'
import { Button, Input, TextField, Label, toast, Spinner, Avatar } from '@heroui/react'
import { FiSave, FiUser } from 'react-icons/fi'
import { cn } from '@heroui/react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { updateProfile } from '@/store/actions/settingsActions'
import { resetSettingsState } from '@/store/slices/settingsSlice'
import { SettingsSkeleton } from './SettingsSkeleton'

const ProfileTab = () => {
    const dispatch = useAppDispatch()
    const { user, isInitialLoading } = useAppSelector((state) => state.auth)
    const { loading, success, error } = useAppSelector((state) => state.settings)

    const [name, setName] = useState("")

    useEffect(() => {
        if (user) {
            setName(user.name || "")
        }
    }, [user])

    useEffect(() => {
        if (success) {
            toast.success("Profile updated successfully")
            
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

    const getInitials = () => {
        if (user?.name) return user.name.substring(0, 2).toUpperCase()
        if (user?.email) return user.email.substring(0, 2).toUpperCase()
        return "AD"
    }

    if (isInitialLoading) {
        return <SettingsSkeleton />
    }

    const handleSave = () => {
        dispatch(updateProfile({ name }))
    }

    return (
        <div className="bg-[#0D1424] border border-[#1E293B] rounded-[24px] p-6 md:p-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="flex flex-col gap-1 mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-white orbitron tracking-wider">Admin Profile</h2>
                <p className="text-sm text-zinc-500 outfit">Update your personal vault credentials and identity.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-6">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#00D4FF] to-[#0080FF] rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-[#080C14] border-2 border-[#1E293B] flex items-center justify-center relative z-10 overflow-hidden shadow-2xl">
                            <Avatar className="w-full h-full bg-transparent border-none">
                                {user?.image && <Avatar.Image src={user.image} className="object-cover w-full h-full" />}
                                <Avatar.Fallback className="text-3xl md:text-4xl font-black text-[#00D4FF] orbitron tracking-tighter uppercase">
                                    {getInitials()}
                                </Avatar.Fallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                                <FiUser className="text-[#00D4FF] mb-1" size={28} />
                                <span className="text-[10px] font-bold text-white orbitron uppercase">Change</span>
                            </div>
                        </div>
                    </div>
                    <button className="text-[#00D4FF] text-xs font-[700] outfit uppercase tracking-[0.15em] hover:text-[#00D4FF]/80 transition-all cursor-pointer bg-transparent border-none outline-none">
                        Update Avatar
                    </button>
                </div>

                {/* Form Fields Section */}
                <div className="flex-1 flex flex-col gap-8">
                    <TextField className="flex flex-col  gap-1">
                        <Label className="text-[13px] font-[500] text-zinc-500 outfit uppercase tracking-wider px-1">Full Name</Label>
                        <Input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={cn(
                                "h-12 bg-[#080C14] border border-[#1E293B] rounded-[14px] px-5 transition-all text-white outfit text-sm placeholder:text-zinc-600 outline-none",
                                "hover:border-zinc-700 focus:border-[#00D4FF]/40"
                            )}
                        />
                    </TextField>

                    <TextField className="flex flex-col  gap-1">
                        <Label className="text-[13px] font-[500] text-zinc-500 outfit uppercase tracking-wider px-1">Email Address</Label>
                        <Input 
                            readOnly
                            value={user?.email || ""}
                            className={cn(
                                "h-12 bg-[#080C14]/50 border border-[#1E293B] rounded-[14px] px-5 transition-all text-zinc-500 outfit text-sm outline-none cursor-not-allowed"
                            )}
                        />
                    </TextField>

                    <TextField className="flex flex-col gap-1">
                        <Label className="text-[13px] font-[500] text-zinc-500 outfit uppercase tracking-wider px-1">User Role</Label>
                        <Input 
                            readOnly
                            value={user?.role || "User"}
                            className={cn(
                                "h-12 bg-[#080C14]/50 border border-[#1E293B] rounded-[14px] px-5 text-zinc-600 orbitron font-bold text-[11px] uppercase tracking-widest outline-none cursor-not-allowed"
                            )}
                        />
                    </TextField>

                    <div className="flex justify-end pt-4">
                        <Button 
                            onPress={handleSave}
                            isDisabled={loading}
                            className="bg-[#00D4FF] text-[#0B1221] font-[600]  text-[17px] outfit uppercase tracking-[0.1em] py-5 px-7
                             rounded-md shadow-[0_8px_30px_rgba(0,212,255,0.3)] hover:bg-[#00D4FF]/90 hover:scale-[1.02] transition-all 
                             flex items-center gap-3 active:scale-[0.98]"
                        >
                            {loading ? (
                                <Spinner size="sm" color="current" />
                            ) : (
                                <FiSave size={25} className="stroke-[3px]" />
                            )}
                            {loading ? "Saving..." : "Save Profile"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileTab
