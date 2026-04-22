"use client"

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
  toast,
  cn,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  Input,
  TextField,
  Label,
  useOverlayState
} from '@heroui/react'
import { FiSearch, FiMail, FiCalendar, FiChevronLeft, FiChevronRight, FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { fetchSubscribers, Subscriber } from '@/store/slices/subscriberSlice'
import { useIsAdmin } from '../../lib/auth-utils'

// Sub-components
import EditSubscriberModal from './EditSubscriberModal'
import DeleteSubscriberModal from './DeleteSubscriberModal'

const SubscribersTable = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { subscribers, loading } = useSelector((state: RootState) => state.subscribers)
    const { isAdmin } = useIsAdmin()

    const columns = useMemo(() => {
        const base = [
            { name: "Email", id: "email" },
            { name: "Date Subscribed", id: "date" },
            { name: "Source", id: "source" },
        ]
        if (isAdmin) base.push({ name: "Actions", id: "actions" })
        return base
    }, [isAdmin])
    
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [openDropdown, setOpenDropdown] = useState<string | null>(null)
    const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 })
    const dropdownRef = useRef<HTMLDivElement>(null)

    // State for modals - Single Source of Truth
    const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null)
    const [subscriberToManage, setSubscriberToManage] = useState<Subscriber | null>(null)

    // Fetch subscribers
    useEffect(() => {
        dispatch(fetchSubscribers())
    }, [dispatch])

    const handleToggleDropdown = (id: string, e: React.MouseEvent) => {
        if (!isAdmin) return; // Prevent dropdown for non-admins
        if (openDropdown === id) {
            setOpenDropdown(null)
            return
        }
        const btn = e.currentTarget.getBoundingClientRect()
        setDropdownPos({ top: btn.bottom + 4, right: window.innerWidth - btn.right })
        setOpenDropdown(id)
    }

    const handleEditOpen = (subscriber: Subscriber) => {
        if (!isAdmin) return;
        setSubscriberToManage(subscriber)
        setOpenDropdown(null)
        setModalType('edit')
    }

    const handleDeleteOpen = (subscriber: Subscriber) => {
        if (!isAdmin) return;
        setSubscriberToManage(subscriber)
        setOpenDropdown(null)
        setModalType('delete')
    }

    const handleCloseModal = () => {
        setModalType(null)
        setSubscriberToManage(null)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(null)
            }
        }
        if (openDropdown !== null) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [openDropdown])

    const filteredSubscribers = useMemo(() => {
        if (!search.trim()) return subscribers
        const q = search.toLowerCase()
        return subscribers.filter((s) =>
            s.email.toLowerCase().includes(q) ||
            (s.source?.toLowerCase() || '').includes(q)
        )
    }, [search, subscribers])

    const renderCell = useCallback((subscriber: Subscriber, columnKey: React.Key) => {
        switch (columnKey) {
            case "email":
                return (
                    <div className="flex items-center gap-2.5">
                        <FiMail className="text-zinc-600" size={14} />
                        <span className="text-white font-[400] outfit text-[16px] tracking-wide transition-colors whitespace-nowrap">
                            {subscriber.email}
                        </span>
                    </div>
                )
            case "date":
                return (
                    <div className="flex items-center gap-2.5 text-zinc-400 outfit text-sm whitespace-nowrap">
                        <FiCalendar size={14} className="text-zinc-600" />
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                    </div>
                )
            case "source":
                return (
                    <span className="text-zinc-400 outfit text-sm whitespace-nowrap">
                        {subscriber.source || 'N/A'}
                    </span>
                )
            case "actions":
                if (!isAdmin) return null; // Hide actions for non-admins
                return (
                    <div className="flex items-center justify-end">
                        <button
                            onClick={(e) => handleToggleDropdown(subscriber.id, e)}
                            className="text-zinc-500 hover:text-white hover:bg-white/5 transition-all rounded-lg h-8 w-8 flex items-center justify-center"
                        >
                            <FiMoreVertical size={18} />
                        </button>
                    </div>
                )
            default:
                return (subscriber as any)[columnKey as string]
        }
    }, [openDropdown, isAdmin])

    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Search Bar Container */}
            <div className="bg-[#0D1424] border border-[#1E293B] p-4 md:p-6 rounded-[20px] md:rounded-[24px]">
                <div className="relative max-w-md group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#00D4FF]/60 transition-colors">
                        <FiSearch size={20} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={cn(
                            "w-full h-10 md:h-12 bg-[#080C14] border border-[#1E293B] rounded-xl pl-14 pr-5 transition-all text-zinc-200 outfit text-xs md:text-sm placeholder:text-zinc-600 outline-none",
                            "hover:border-zinc-700 focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20"
                        )}
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="rounded-2xl border border-[#1E293B] bg-[#0B1121] shadow-2xl overflow-hidden mb-8 min-h-[400px] flex flex-col">
                <div className="overflow-x-auto scrollbar-hide flex-1">
                    <Table className="bg-[#0B1121] border-none w-full min-w-[800px] shadow-none! [&_th:after]:hidden [&_th:before]:hidden">
                        <TableContent aria-label="Subscribers management table" className="bg-transparent border-none">
                            <TableHeader columns={columns} className="border-none outline-none">
                                {(column) => (
                                    <TableColumn
                                        key={column.id}
                                        id={column.id}
                                        isRowHeader={column.id === "email"}
                                        className={cn(
                                            "bg-[#0B1121] text-zinc-500 border-b border-[#1E293B] py-3 md:py-5 px-4 md:px-8 text-[10px] md:text-[11px] font-bold uppercase tracking-widest outfit outline-none",
                                            column.id === "actions" ? "text-right" : "text-left"
                                        )}
                                    >
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow className="outline-none">
                                        <TableCell className="py-24 text-center bg-[#0B1121] outline-none">
                                            <div className="flex flex-col items-center justify-center gap-4 w-full absolute left-0 right-0">
                                                <Spinner color="accent" size="lg" />
                                                <span className="text-[#00D4FF] orbitron font-bold text-sm tracking-widest animate-pulse">
                                                    Loading Subscribers...
                                                </span>
                                            </div>
                                        </TableCell>
                                        {/* Placeholders for other columns to avoid layout shift */}
                                        {columns.slice(1).map(c => <TableCell key={c.id} className="bg-[#0B1121]" />)}
                                    </TableRow>
                                ) : filteredSubscribers.length === 0 ? (
                                    <TableRow className="outline-none">
                                        <TableCell className="py-24 text-center text-zinc-500 outfit bg-[#0B1121] outline-none">
                                            <div className="w-full absolute left-0 right-0">
                                                No subscribers found matching your search.
                                            </div>
                                        </TableCell>
                                        {columns.slice(1).map(c => <TableCell key={c.id} className="bg-[#0B1121]" />)}
                                    </TableRow>
                                ) : (
                                    filteredSubscribers.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            className="group hover:bg-[#1A2333]/40 bg-[#0B1121] transition-colors last:border-none outline-none"
                                        >
                                            {columns.map((column) => (
                                                <TableCell 
                                                    key={column.id} 
                                                    className="py-3 md:py-5 border-b border-[#1E293B] bg-transparent px-4 md:px-8 outline-none"
                                                >
                                                    {renderCell(item, column.id)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </TableContent>
                    </Table>
                </div>

                {/* Pagination & Summary Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-5 border-t border-[#1E293B]">
                    <p className="text-[13px] text-zinc-500 outfit">
                        Showing {filteredSubscribers.length} subscribers
                    </p>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <Button
                                variant="ghost"
                                className="bg-[#0B1221] text-zinc-400 border border-[#1E293B] rounded-xl hover:text-white h-9 px-4 transition-all disabled:opacity-30 text-[12px] font-medium outfit"
                                isDisabled={page === 1}
                                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                            >
                                <FiChevronLeft size={16} className="mr-1" /> Previous
                            </Button>

                            <div className="flex items-center gap-1.5 mx-1">
                                {[1].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={cn(
                                            "h-9 w-9 rounded-xl text-[13px] font-bold outfit transition-all border",
                                            page === p
                                                ? "bg-[#00D4FF] text-[#0B1221] border-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                                                : "bg-[#0B1121] text-zinc-500 border-[#1E293B] hover:border-zinc-700 hover:text-white"
                                        )}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>

                            <Button
                                variant="ghost"
                                className="bg-[#0B1221] text-zinc-400 border border-[#1E293B] rounded-xl hover:text-white h-9 px-4 transition-all disabled:opacity-30 text-[12px] font-medium outfit"
                                isDisabled={true}
                            >
                                Next <FiChevronRight size={16} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditSubscriberModal 
                isOpen={modalType === 'edit'}
                onClose={handleCloseModal}
                subscriber={subscriberToManage}
            />

            <DeleteSubscriberModal 
                isOpen={modalType === 'delete'}
                onClose={handleCloseModal}
                subscriber={subscriberToManage}
            />

            {/* Floating Dropdown Portal */}
            {openDropdown !== null && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed z-[9999] min-w-[160px] bg-[#111827] border border-[#1E293B] rounded-xl shadow-2xl shadow-black/40 py-1.5 animate-in fade-in zoom-in-95 duration-150"
                    style={{ top: dropdownPos.top, right: dropdownPos.right }}
                >
                    <button
                        onClick={() => {
                            const sub = subscribers.find(s => s.id === openDropdown)
                            if (sub) handleEditOpen(sub)
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors outfit"
                    >
                        <FiEdit2 size={15} /> Edit
                    </button>
                    <div className="mx-3 my-1 border-t border-[#1E293B]" />
                    <button
                        onClick={() => {
                            const sub = subscribers.find(s => s.id === openDropdown)
                            if (sub) handleDeleteOpen(sub)
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors outfit"
                    >
                        <FiTrash2 size={15} /> Delete
                    </button>
                </div>,
                document.body
            )}
        </div>
    )
}

export default SubscribersTable