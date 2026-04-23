"use client"

import React from 'react'
import BaseModal from './BaseModal'
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
        <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
            <div className="flex flex-col items-center text-center p-8">
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                    <FiAlertTriangle className="text-red-500" size={32} />
                </div>

                <h3 className="text-xl font-bold text-white outfit mb-2 tracking-wide">
                    {title}
                </h3>
                <p className="text-zinc-400 text-sm outfit leading-relaxed mb-8 max-w-[280px]">
                    {message}
                </p>

                <div className="flex items-center gap-3 w-full">
                    <button 
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 h-12 rounded-xl text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-white hover:bg-white/5 border border-white/10 transition-all outline-none disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 h-12 bg-red-500 hover:bg-red-600 disabled:bg-red-500/50 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2 outline-none active:scale-[0.98] uppercase text-xs tracking-widest"
                    >
                        {isDeleting ? (
                            <Spinner size="sm" color="white" />
                        ) : (
                            <>
                                <FiTrash2 size={16} />
                                <span>Delete</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </BaseModal>
    )
}

export default DeleteConfirmationModal
