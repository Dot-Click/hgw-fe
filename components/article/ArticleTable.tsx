import { 
  Table, 
  TableContent, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  cn,
  Skeleton
} from '@heroui/react'
import { FiSearch, FiUser, FiCalendar, FiMoreVertical, FiEye, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { fetchArticles, deleteArticle } from '@/store/actions/articleActions'
import React from 'react'
import { createPortal } from 'react-dom'

const columns = [
  { name: "Title", id: "title" },
  { name: "Author", id: "author" },
  { name: "Date", id: "date" },
  { name: "Category", id: "category" },
  { name: "Status", id: "status" },
  { name: "Actions", id: "actions" },
]

interface ArticleTableProps {
  onEdit: (article: any) => void
}

const ArticleTable = ({ onEdit }: ArticleTableProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { articles, loading } = useSelector((state: RootState) => state.articles)
  
  const [search, setSearch] = React.useState('')
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [dropdownPos, setDropdownPos] = React.useState({ top: 0, right: 0 })
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  const handleToggleDropdown = (articleId: string, e: React.MouseEvent) => {
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
      a.authorName.toLowerCase().includes(q) ||
      (a.category?.name || "").toLowerCase().includes(q)
    )
  }, [search, articles])

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      await dispatch(deleteArticle(id))
      setOpenDropdown(null)
    }
  }

  const renderCell = React.useCallback((article: any, columnKey: React.Key) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col gap-1">
             <div className="flex items-center gap-2">
                <span className="text-white font-[600] outfit text-sm md:text-base tracking-wide group-hover:text-[#00D4FF] transition-colors whitespace-nowrap">
                    {article.title}
                </span>
                {article.featured && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
                        <FiStar size={10} />
                        Featured
                    </div>
                )}
             </div>
             <span className="text-[10px] text-zinc-500 outfit line-clamp-1 max-w-[250px]">{article.description}</span>
          </div>
        )
      case "author":
        return (
          <div className="flex items-center gap-2 text-zinc-400 outfit text-xs md:text-sm whitespace-nowrap">
            <FiUser size={14} className="text-zinc-600" />
            {article.authorName}
          </div>
        )
      case "date":
        return (
          <div className="flex items-center gap-2 text-zinc-400 outfit text-xs md:text-sm whitespace-nowrap">
            <FiCalendar size={14} className="text-zinc-600" />
            {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
          </div>
        )
      case "category":
        return (
          <div 
            className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[11px] font-semibold outfit"
            style={{ 
                backgroundColor: `${article.category?.color}15`, 
                color: article.category?.color,
                border: `1px solid ${article.category?.color}30`
            }}
          >
            {article.category?.name}
          </div>
        )
      case "status":
        const isPublished = article.status === 'PUBLISHED'
        return (
          <div className={cn(
            "inline-flex items-center capitalize outfit text-[11px] font-[500] px-3 h-7 rounded-full tracking-wider border-none",
            isPublished ? "bg-[#10B981]/10 text-[#10B981]" : "bg-orange-500/10 text-orange-500"
          )}>
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full mr-1.5 shadow-[0_0_8px]",
                isPublished ? "bg-[#10B981] shadow-[#10B981]" : "bg-orange-500 shadow-orange-500"
              )}
            />
            {article.status || 'DRAFT'}
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
  }, [handleToggleDropdown])

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
      <div className="rounded-2xl border border-[#1E293B] bg-[#0B1121] shadow-2xl overflow-hidden min-h-[400px]">
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
              <TableBody items={loading ? [] : filteredArticles}>
                {loading ? (
                    // This is handled by the emptyContent and a custom overlay if needed, 
                    // but usually better to have fixed number of skeleton rows
                    [] as any
                ) : (
                    (item: any) => (
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
                    )
                )}
              </TableBody>
            </TableContent>
          </Table>
          
          {!loading && filteredArticles.length === 0 && (
            <div className="w-full py-10 text-center text-zinc-500 outfit">
              No articles found
            </div>
          )}
          
          {loading && (
            <div className="flex flex-col">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex items-center gap-4 px-8 py-5 border-b border-[#1E293B]/50">
                        <Skeleton className="w-[30%] h-6 rounded-lg bg-[#1E293B]" />
                        <Skeleton className="w-[15%] h-6 rounded-lg bg-[#1E293B]" />
                        <Skeleton className="w-[15%] h-6 rounded-lg bg-[#1E293B]" />
                        <Skeleton className="w-[15%] h-6 rounded-lg bg-[#1E293B]" />
                        <Skeleton className="w-[15%] h-6 rounded-lg bg-[#1E293B]" />
                        <Skeleton className="w-8 h-8 rounded-lg bg-[#1E293B] ml-auto" />
                    </div>
                ))}
            </div>
          )}
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
            onClick={() => { 
                const art = articles.find(a => a.id === openDropdown)
                if (art) onEdit(art)
                setOpenDropdown(null) 
            }}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors outfit"
          >
            <FiEdit2 size={15} /> Edit Article
          </button>
          <div className="mx-3 my-1 border-t border-[#1E293B]" />
          <button
            onClick={() => handleDelete(openDropdown)}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors outfit"
          >
            <FiTrash2 size={15} /> Delete Article
          </button>
        </div>,
        document.body
      )}
    </div>
  )
}

export default ArticleTable
