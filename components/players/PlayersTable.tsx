"use client"

import React from "react"
import {
    Table,
    TableContent,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Button,
    cn,
} from "@heroui/react"

import { FiMoreHorizontal, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { LuArrowUpDown } from "react-icons/lu"

const columns = [
    { name: <span className="whitespace-nowrap">#</span>, id: "id" },
    {
        name: (
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors whitespace-nowrap">
                Player <LuArrowUpDown size={14} className="text-zinc-600" />
            </div>
        ), id: "player"
    },
    { name: <span className="whitespace-nowrap">Category</span>, id: "category" },
    { name: <span className="whitespace-nowrap">Country</span>, id: "country" },
    { name: <span className="whitespace-nowrap">Era</span>, id: "era" },
    {
        name: (
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors whitespace-nowrap">
                HGW Score <LuArrowUpDown size={14} className="text-zinc-600" />
            </div>
        ), id: "score"
    },
    { name: <span className="whitespace-nowrap">Status</span>, id: "status" },
    { name: <span className="whitespace-nowrap">Actions</span>, id: "actions" },
]

interface PlayersTableProps {
    data: any[]
}

const PlayersTable = ({ data }: PlayersTableProps) => {
    const [page, setPage] = React.useState(1)

    const renderCell = React.useCallback((player: any, columnKey: React.Key) => {
        switch (columnKey) {
            case "id":
                return <span className="text-zinc-500 text-[13px] outfit">{player.id}</span>

            case "player":
                return (
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full border border-[#2A3040] bg-[#1A2333] text-[11px] font-bold text-[#00D4FF] orbitron">
                            {player.initials}
                        </div>
                        <span className="text-[14px] font-bold text-white orbitron tracking-wider whitespace-nowrap">
                            {player.name}
                        </span>
                    </div>
                )

            case "category":
                return (
                    <div className="px-2 py-0.5 rounded-full border border-[#1E293B] bg-[#1A2333]/50 text-zinc-400 text-[11px] font-medium outfit w-fit">
                        {player.category}
                    </div>
                )

            case "country":
                return <span className="text-zinc-400 text-[13px] outfit whitespace-nowrap">{player.country}</span>

            case "era":
                return <span className="text-zinc-500 text-[13px] outfit font-medium whitespace-nowrap">{player.era}</span>

            case "score":
                return <span className="text-[15px] font-bold text-[#00D4FF] orbitron tracking-wide whitespace-nowrap">{player.score}</span>

            case "status":
                const isPublished = player.status === "published"
                return (
                    <div className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest outfit w-fit",
                        isPublished
                            ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20"
                            : "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
                    )}>
                        {player.status}
                    </div>
                )

            case "actions":
                return (
                    <div className="flex items-center justify-center">
                        <Button isIconOnly variant="ghost" size="sm" className="text-zinc-500 hover:text-white border-none min-w-0 h-8 w-8">
                            <FiMoreHorizontal size={18} />
                        </Button>
                    </div>
                )

            default:
                return player[columnKey as keyof typeof player]
        }
    }, [])

    return (
        <div className="flex flex-col gap-4">

            {/* Table */}
            <div className="rounded-2xl border border-[#1E293B] bg-[#0B1121] shadow-2xl overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide">
                    <Table className="bg-[#0B1121] border-none w-full min-w-[1100px] md:min-w-full shadow-none! [&_th:after]:hidden [&_th:before]:hidden">
                        <TableContent aria-label="Players management table" className="bg-transparent border-none">
                            <TableHeader columns={columns} className="border-none outline-none">
                                {(column) => (
                                    <TableColumn
                                        key={column.id}
                                        id={column.id}
                                        isRowHeader={column.id === "player"}
                                        className={cn(
                                            "bg-[#0B1121] text-zinc-500  border-b border-[#1E293B] py-5 px-6 text-[11px] font-bold uppercase tracking-widest outfit outline-none",
                                            column.id === "actions" ? "text-center" : "text-left"
                                        )}
                                    >
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody items={data}>
                                {(item) => (
                                    <TableRow
                                        key={item.id}
                                        className="group hover:bg-[#1A2333]/40 bg-[#0B1121] transition-colors border-b border-[#1E293B]/50 last:border-none"
                                    >
                                        {columns.map((column) => (
                                            <TableCell key={column.id} className="py-4 bg-[#0B1121] px-6">
                                                {renderCell(item, column.id)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )}
                            </TableBody>
                        </TableContent>
                    </Table>
                </div>
            </div>

            {/* Pagination & Summary Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-2 mt-2">
                <p className="text-[13px] text-zinc-500 outfit">
                    {data.length > 0 
                      ? `Showing 1-${data.length} of ${data.length} players`
                      : "No players found matching your search."
                    }
                </p>
  
                {data.length > 0 && (
                    <div className="flex items-center gap-2">
                        <Pagination className="justify-end">
                            <Pagination.Content className="gap-2">                     
                                <Pagination.Item>
                                    <Pagination.Previous  
                                        isDisabled={page === 1}
                                        onPress={() => setPage(1)}
                                        className="bg-[#0B1121] text-zinc-400 border border-[#1E293B] rounded-lg hover:text-white h-9 px-4 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[12px] font-medium outfit"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            <FiChevronLeft size={16} /> Previous
                                        </div>
                                    </Pagination.Previous>
                                </Pagination.Item>

                                <Pagination.Item>
                                    <Pagination.Link
                                        isActive={true}
                                        className="h-9 w-9 min-w-0 flex items-center justify-center bg-[#00D4FF] text-[#0B1121] border border-[#00D4FF] rounded-lg shadow-[0_0_20px_rgba(0,212,255,0.4)] text-[13px] outfit font-bold"
                                    >
                                        1                    
                                    </Pagination.Link>
                                </Pagination.Item>

                                <Pagination.Item>
                                    <Pagination.Next
                                        isDisabled={true}
                                        className="bg-[#0B1121] text-zinc-400 border border-[#1E293B] rounded-lg hover:text-white h-9 px-4 transition-all opacity-30 cursor-not-allowed text-[12px] font-medium outfit"
                                    >
                                        <div className="flex items-center gap-1.5">
                                            Next <FiChevronRight size={16} />
                                        </div>
                                    </Pagination.Next>
                                </Pagination.Item>
                            </Pagination.Content>
                        </Pagination>
                    </div>
                )}
            </div>
        </div>
    )
}


export default PlayersTable