"use client"

import React from 'react'
import CustomModal from './CustomModal'
import { Button, Spinner } from '@heroui/react'
import { FiTrash2, FiAlertTriangle } from 'react-icons/fi'

interface DeleteConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    message?: string
    isDeleting?: boolean
}

const DeleteConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Deletion", 
    message = "Are you sure you want to delete this? This action cannot be undone.",
    isDeleting = false
}: DeleteConfirmationModalProps) => {
    return (
        <CustomModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[400px]">
            <div className="flex flex-col items-center text-center p-8 bg-[#111217]">
                {/* Icon Circle */}
                <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)] rotate-3">
                    <FiAlertTriangle className="text-red-500" size={36} />
                </div>

                <h3 className="text-[20px] font-bold text-white orbitron mb-3 tracking-tight uppercase">
                    {title}
                </h3>
                <p className="text-[#7B899D] text-[14px] outfit leading-relaxed mb-10 max-w-[300px]">
                    {message}
                </p>

                <div className="flex items-center gap-3 w-full">
                    <Button 
                        onPress={onClose}
                        isDisabled={isDeleting}
                        className="flex-1 h-12 rounded-[20px] bg-transparent border border-[#24262E] text-[#7B899D] font-bold text-[14px] outfit hover:bg-white/5 transition-all"
                    >
                        Cancel
                    </Button>
                    <Button 
                        onPress={onConfirm}
                        isDisabled={isDeleting}
                        className="flex-1 h-12 bg-red-500 hover:bg-red-600 text-white font-bold rounded-[20px] shadow-[0_0_20px_rgba(239,68,68,0.3)] text-[14px] orbitron transition-all active:scale-95"
                    >
                        {isDeleting ? (
                            <Spinner size="sm" color="current" />
                        ) : (
                            <div className="flex items-center gap-2">
                                <FiTrash2 size={18} />
                                <span>DELETE</span>
                            </div>
                        )}
                    </Button>
                </div>
            </div>
        </CustomModal>
    )
}

export default DeleteConfirmationModal
