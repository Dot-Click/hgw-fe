"use client"

import React, { useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Modal, ModalBackdrop, ModalContainer, ModalDialog, cn } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  maxWidth?: string // e.g., 'max-w-md', 'max-w-lg'
  className?: string
}

const BaseModal = ({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    maxWidth = 'max-w-md',
    className 
}: BaseModalProps) => {
    
    // Handle Body Scroll Lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Close on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [isOpen, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <Modal isOpen={true} onOpenChange={(open) => !open && onClose()}>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9998] bg-black/50"
                        onClick={onClose}
                    />
                    
                    {/* Content Container */}
                    <ModalContainer className="fixed inset-0 z-[9999] flex items-center justify-center p-4 w-screen h-screen pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="pointer-events-auto w-full flex justify-center"
                        >
                            <ModalDialog 
                                className={cn(
                                    "bg-[#0B1121] border border-[#1E293B] rounded-[28px] w-full shadow-3xl overflow-hidden outline-none",
                                    maxWidth,
                                    className
                                )}
                            >
                                {children}
                            </ModalDialog>
                        </motion.div>
                    </ModalContainer>
                </Modal>
            )}
        </AnimatePresence>
    )
}

export default BaseModal
