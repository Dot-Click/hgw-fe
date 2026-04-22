"use client"

import React, { useState } from 'react'
import {
  ModalHeader,
  Button,
  Spinner,
  toast
} from '@heroui/react'
import { FiTrash2 } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { deleteSubscriber, Subscriber } from '@/store/slices/subscriberSlice'

import BaseModal from '../common/BaseModal'

interface DeleteSubscriberModalProps {
  isOpen: boolean
  onClose: () => void
  subscriber: Subscriber | null
}

const DeleteSubscriberModal = ({ isOpen, onClose, subscriber }: DeleteSubscriberModalProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!subscriber) return
        setIsDeleting(true)
        try {
            await dispatch(deleteSubscriber(subscriber.id)).unwrap()
            toast.success('Subscriber deleted')
            onClose()
        } catch (err: any) {
            toast.danger(err || 'Error deleting subscriber')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[400px]">
            <div className="flex flex-col">
                <ModalHeader className="px-6 py-4 border-b border-[#1E293B] text-white flex flex-col gap-1">
                    <h2 className="orbitron uppercase tracking-[0.2em] text-lg font-black">Delete Entry</h2>
                    <p className="outfit text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Permanent removal</p>
                </ModalHeader>

                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                        <FiTrash2 className="text-red-500" size={26} />
                    </div>
                    
                    <p className="text-[#7B899D] outfit text-base leading-relaxed mb-2 px-2">
                        Remove <span className="text-white font-bold">{subscriber?.email}</span>? 
                    </p>
                    <p className="text-red-500/60 outfit text-[12px] uppercase font-black tracking-widest">
                        This action is irreversible
                    </p>
                </div>

                <div className="px-6 py-6 flex flex-col gap-3 border-t border-[#1E293B] bg-[#0D1424]/50">
                    <Button 
                        className="bg-red-500 hover:bg-red-600 text-white outfit text-lg w-full font-semibold shadow-[0_0_20px_rgba(239,68,68,0.2)] h-12"
                        onPress={handleDelete}
                        isDisabled={isDeleting}
                    >
                        {isDeleting ? <Spinner size="sm" color="current" /> : 'Delete Now'}
                    </Button>
                    <Button 
                        variant="ghost" 
                        onPress={onClose}
                        className="text-zinc-500 border-[#1E293B] w-full hover:bg-white/5 outfit text-lg font-semibold h-12"
                    >
                        Keep Entry
                    </Button>
                </div>
            </div>
        </BaseModal>
    )
}

export default DeleteSubscriberModal
