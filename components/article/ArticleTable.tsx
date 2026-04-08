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
import { FiSearch, FiUser, FiCalendar, FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi'

const columns = [
  { name: "Title", id: "title" },
  { name: "Author", id: "author" },
  { name: "Date", id: "date" },
  { name: "Views", id: "views" },
  { name: "Status", id: "status" },
  { name: "Actions", id: "actions" },
]

const articles = [
  { id: 1, title: 'The Greatest of All Time Debate', author: 'Admin', date: '2026-04-01', views: '12,450', status: 'published' },
  { id: 2, title: 'Michael Jordan vs LeBron James', author: 'Editor', date: '2026-03-28', views: '8,320', status: 'published' },
  { id: 3, title: 'Top 10 Football Legends', author: 'Admin', date: '2026-03-25', views: '0', status: 'draft' },
  { id: 4, title: 'Tennis GOATs Through the Ages', author: 'Editor', date: '2026-03-20', views: '5,640', status: 'published' },
  { id: 5, title: 'The Rise of Modern Athletes', author: 'Admin', date: '2026-03-15', views: '0', status: 'draft' },
  { id: 6, title: 'Cricket Legends: Sachin vs Kohli', author: 'Editor', date: '2026-03-10', views: '9,210', status: 'published' },
  { id: 7, title: 'Boxing Hall of Fame: Who Deserves It?', author: 'Admin', date: '2026-03-05', views: '3,870', status: 'published' },
  { id: 8, title: 'F1 Racing: The Untold Stories', author: 'Editor', date: '2026-02-28', views: '0', status: 'draft' },
  { id: 9, title: 'Olympic Gold Medalists Ranked', author: 'Admin', date: '2026-02-22', views: '15,300', status: 'published' },
  { id: 10, title: 'NBA Draft 2026 Predictions', author: 'Editor', date: '2026-02-18', views: '7,150', status: 'published' },
  { id: 11, title: 'Swimming Records That Shocked the World', author: 'Admin', date: '2026-02-12', views: '0', status: 'draft' },
  { id: 12, title: 'Esports vs Traditional Sports', author: 'Editor', date: '2026-02-05', views: '11,820', status: 'published' },
]

const ArticleTable = () => {
  const [search, setSearch] = React.useState('')
  const [openDropdown, setOpenDropdown] = React.useState<number | null>(null)
  const [dropdownPos, setDropdownPos] = React.useState({ top: 0, right: 0 })
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const handleToggleDropdown = (articleId: number, e: React.MouseEvent) => {
    if (openDropdown === articleId) {
      setOpenDropdown(null)
      return
    }
    const btn = e.currentTarget.getBoundingClientRect()
    setDropdownPos({ top: btn.bottom + 4, right: window.innerWidth - btn.right })
    setOpenDropdown(articleId)
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

  const filteredArticles = React.useMemo(() => {
    if (!search.trim()) return articles
    const q = search.toLowerCase()
    return articles.filter((a) =>
      a.title.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q) ||
      a.status.toLowerCase().includes(q)
    )
  }, [search])

  const renderCell = React.useCallback((article: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "title":
        return (
          <span className="text-white font-[600] outfit text-sm md:text-base tracking-wide group-hover:text-[#00D4FF] transition-colors whitespace-nowrap">
            {article.title}
          </span>
        )
      case "author":
        return (
          <div className="flex items-center gap-2 text-zinc-400 outfit text-xs md:text-sm whitespace-nowrap">
            <FiUser size={14} className="text-zinc-600" />
            {article.author}
          </div>
        )
      case "date":
        return (
          <div className="flex items-center gap-2 text-zinc-400 outfit text-xs md:text-sm whitespace-nowrap">
            <FiCalendar size={14} className="text-zinc-600" />
            {article.date}
          </div>
        )
      case "views":
        return (
          <span className="text-zinc-400 outfit text-xs md:text-sm whitespace-nowrap">
            {article.views}
          </span>
        )
      case "status":
        return (
          <div className={cn(
            "inline-flex items-center capitalize outfit text-[11px] font-[500] px-3 h-7 rounded-full tracking-wider border-none",
            article.status === 'published'
              ? "bg-[#10B981]/10 text-[#10B981]"
              : "bg-[#F59E0B]/10 text-[#F59E0B]"
          )}>
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full mr-1.5 shadow-[0_0_8px]",
                article.status === 'published' ? "bg-[#10B981] shadow-[#10B981]" : "bg-[#F59E0B] shadow-[#F59E0B]"
              )}
            />
            {article.status}
          </div>
        )
      case "actions":
        return (
          <div className="flex items-center justify-end">
            <button
              onClick={(e) => handleToggleDropdown(article.id, e)}
              className="text-zinc-500 hover:text-white hover:bg-white/5 transition-all rounded-lg h-8 w-8 flex items-center justify-center"
            >
              <FiMoreVertical size={18} />
            </button>
          </div>
        )
      default:
        return article[columnKey as keyof typeof article]
    }
  }, [])

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
            placeholder="Search articles..."
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
      <div className="rounded-2xl border border-[#1E293B] bg-[#0B1121] shadow-2xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <Table className="bg-[#0B1121] border-none w-full min-w-[900px] shadow-none! [&_th:after]:hidden [&_th:before]:hidden">
            <TableContent aria-label="Articles management table" className="bg-transparent border-none">
              <TableHeader columns={columns} className="border-none outline-none">
                {(column) => (
                  <TableColumn
                    key={column.id}
                    id={column.id}
                    isRowHeader={column.id === "title"}
                    className={cn(
                      "bg-[#0B1121] text-zinc-500 border-b border-[#1E293B] py-3 md:py-5 px-4 md:px-8 text-[10px] md:text-[11px] font-bold uppercase tracking-widest outfit outline-none",
                      column.id === "actions" ? "text-right" : "text-left"
                    )}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={filteredArticles}>
                {(item) => (
                  <TableRow
                    key={item.id}
                    className="group hover:bg-[#1A2333]/40 bg-[#0B1121] transition-colors border-b border-[#1E293B]/50 last:border-none"
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id} className="py-3 md:py-5 bg-[#0B1121] px-4 md:px-8 outline-none">
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

export default ArticleTable