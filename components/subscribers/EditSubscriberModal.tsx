"use client"

import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  Button,
  Input,
  TextField,
  Label,
  cn,
  toast
} from '@heroui/react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { updateSubscriber, Subscriber } from '@/store/slices/subscriberSlice'

import BaseModal from '../common/BaseModal'

interface EditSubscriberModalProps {
  isOpen: boolean
  onClose: () => void
  subscriber: Subscriber | null
}

const EditSubscriberModal = ({ isOpen, onClose, subscriber }: EditSubscriberModalProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const [editData, setEditData] = useState({ email: '', source: '' })
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        if (subscriber && isOpen) {
            setEditData({ email: subscriber.email, source: subscriber.source || '' })
        }
    }, [subscriber, isOpen])

    const handleUpdate = async () => {
        if (!subscriber) return
        setIsUpdating(true)
        try {
            await dispatch(updateSubscriber({ 
                id: subscriber.id, 
                data: editData 
            })).unwrap()
            toast.success('Subscriber updated')
            onClose()
        } catch (err: any) {
            toast.danger(err || 'Failed to update')
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
            <ModalHeader className="px-6 py-5 border-b border-[#1E293B] text-white flex flex-col gap-1">
                <h2 className="orbitron uppercase tracking-[0.2em] text-lg font-black">Edit Subscriber</h2>
                <p className="outfit text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Update subscription details</p>
            </ModalHeader>
            <ModalBody className="p-6 flex flex-col gap-5">
                <TextField className="flex flex-col gap-2">
                    <Label className="text-[11px] font-bold text-zinc-500 outfit uppercase tracking-[0.15em] px-1">
                        Email Address
                    </Label>
                    <Input
                        type="email"
                        placeholder="Enter email"
                        value={editData.email}
                        onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                        className={cn(
                            "h-11 w-full bg-[#080C14] border border-[#1E293B] rounded-xl px-4 transition-all text-zinc-200 outfit text-sm placeholder:text-zinc-600 outline-none",
                            "hover:border-zinc-700 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20"
                        )}
                    />
                </TextField>

                <TextField className="flex flex-col gap-2">
                    <Label className="text-[11px] font-bold text-zinc-500 outfit uppercase tracking-[0.15em] px-1">
                        Source
                    </Label>
                    <Input
                        type="text"
                        placeholder="e.g. Footer, NewsLetter"
                        value={editData.source}
                        onChange={(e) => setEditData(prev => ({ ...prev, source: e.target.value }))}
                        className={cn(
                            "h-11 w-full bg-[#080C14] border border-[#1E293B] rounded-xl px-4 transition-all text-zinc-200 outfit text-sm placeholder:text-zinc-600 outline-none",
                            "hover:border-zinc-700 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20"
                        )}
                    />
                </TextField>
            </ModalBody>
            <ModalFooter className="px-6 py-5 flex justify-center items-center w-full gap-3 border-t border-[#1E293B] bg-[#0D1424]/50">
                <Button 
                    variant="ghost" 
                    onPress={onClose}
                    className="text-zinc-500 border-[#1E293B] w-full hover:bg-white/5 outfit text-lg font-semibold px-3 h-12"
                >
                    Cancel
                </Button>
                <Button 
                    className="bg-[#00D4FF] text-[#0B1121] outfit text-lg w-full font-semibold shadow-[0_0_20px_rgba(0,212,255,0.2)] px-3 h-12"
                    onPress={handleUpdate}
                    isDisabled={isUpdating}
                >
                    {isUpdating ? 'Saving...' : 'Update'}
                </Button>
            </ModalFooter>
        </BaseModal>
    )
}

export default EditSubscriberModal
