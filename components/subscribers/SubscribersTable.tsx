"use client"

import React from 'react'
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
  cn
} from '@heroui/react'
import { FiSearch, FiMail, FiCalendar, FiChevronLeft, FiChevronRight, FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'

const columns = [
  { name: "Email", id: "email" },
  { name: "Date Subscribed", id: "date" },
  { name: "Source", id: "source" },
  { name: "Actions", id: "actions" },
]

const subscribers = [
  { id: 1, email: 'john.doe@email.com', date: '2026-04-01', source: 'Homepage' },
  { id: 2, email: 'jane.smith@email.com', date: '2026-03-30', source: 'Article' },
  { id: 3, email: 'mike.wilson@email.com', date: '2026-03-28', source: 'Footer' },
  { id: 4, email: 'sarah.johnson@email.com', date: '2026-03-25', source: 'Homepage' },
  { id: 5, email: 'alex.brown@email.com', date: '2026-03-22', source: 'Popup' },
  { id: 6, email: 'emily.davis@email.com', date: '2026-03-20', source: 'Homepage' },
  { id: 7, email: 'chris.miller@email.com', date: '2026-03-18', source: 'Article' },
  { id: 8, email: 'lisa.taylor@email.com', date: '2026-03-15', source: 'Footer' },
  { id: 9, email: 'david.anderson@email.com', date: '2026-03-12', source: 'Homepage' },
  { id: 10, email: 'amy.thomas@email.com', date: '2026-03-10', source: 'Popup' },
]

const SubscribersTable = () => {
    const [page, setPage] = React.useState(1)
    const [search, setSearch] = React.useState('')
    const [openDropdown, setOpenDropdown] = React.useState<number | null>(null)
    const [dropdownPos, setDropdownPos] = React.useState({ top: 0, right: 0 })
    const dropdownRef = React.useRef<HTMLDivElement>(null)

    const handleToggleDropdown = (id: number, e: React.MouseEvent) => {
        if (openDropdown === id) {
            setOpenDropdown(null)
            return
        }
        const btn = e.currentTarget.getBoundingClientRect()
        setDropdownPos({ top: btn.bottom + 4, right: window.innerWidth - btn.right })
        setOpenDropdown(id)
    }

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpenDropdown(null)
            }
        }
        if (openDropdown !== null) document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [openDropdown])

    const filteredSubscribers = React.useMemo(() => {
        if (!search.trim()) return subscribers
        const q = search.toLowerCase()
        return subscribers.filter((s) =>
            s.email.toLowerCase().includes(q) ||
            s.source.toLowerCase().includes(q)
        )
    }, [search])

    const renderCell = React.useCallback((subscriber: any, columnKey: React.Key) => {
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
                        {subscriber.date}
                    </div>
                )
            case "source":
                return (
                    <span className="text-zinc-400 outfit text-sm whitespace-nowrap">
                        {subscriber.source}
                    </span>
                )
            case "actions":
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
                return subscriber[columnKey as keyof typeof subscriber]
        }
    }, [openDropdown])

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
            <div className="rounded-2xl border border-[#1E293B] bg-[#0B1121] shadow-2xl overflow-hidden mb-8">
                <div className="overflow-x-auto scrollbar-hide">
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
                            <TableBody items={filteredSubscribers}>
                                {(item) => (
                                        <TableRow
                                            key={item.id}
                                            className="group hover:bg-[#1A2333]/40 bg-[#0B1121] transition-colors last:border-none"
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
                                )}
                            </TableBody>
                        </TableContent>
                    </Table>
                </div>

                {/* Pagination & Summary Bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-6 py-5 border-t border-[#1E293B]">
                    <p className="text-[13px] text-zinc-500 outfit">
                        Showing 1-10 of 15,432 subscribers
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
                                {[1, 2, 3].map((p) => (
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
                                <span className="text-zinc-600 px-1 font-bold">...</span>
                            </div>

                            <Button
                                variant="ghost"
                                className="bg-[#0B1221] text-zinc-400 border border-[#1E293B] rounded-xl hover:text-white h-9 px-4 transition-all disabled:opacity-30 text-[12px] font-medium outfit"
                                onClick={() => setPage(prev => prev + 1)}
                            >
                                Next <FiChevronRight size={16} className="ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Dropdown Portal */}
            {openDropdown !== null && createPortal(
                <div
                    ref={dropdownRef}
                    className="fixed z-[9999] min-w-[160px] bg-[#111827] border border-[#1E293B] rounded-xl shadow-2xl shadow-black/40 py-1.5 animate-in fade-in zoom-in-95 duration-150"
                    style={{ top: dropdownPos.top, right: dropdownPos.right }}
                >
                    <button
                        onClick={() => { console.log("View", openDropdown); setOpenDropdown(null) }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors outfit"
                    >
                        <FiEye size={15} /> View
                    </button>
                    <button
                        onClick={() => { console.log("Edit", openDropdown); setOpenDropdown(null) }}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors outfit"
                    >
                        <FiEdit2 size={15} /> Edit
                    </button>
                    <div className="mx-3 my-1 border-t border-[#1E293B]" />
                    <button
                        onClick={() => { console.log("Delete", openDropdown); setOpenDropdown(null) }}
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