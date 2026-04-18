import { 
  FiUsers, 
  FiCheckCircle, 
  FiFileText, 
  FiMail 
} from "react-icons/fi"
import DashboardHeader from "@/components/dashboard/DashboardHeader"
import StatsCard, { type StatsColor } from "@/components/dashboard/StatsCard"
import GrowthAnalytics from "@/components/dashboard/GrowthAnalytics"
import ArticlesPublished from "@/components/dashboard/ArticlesPublished"
import Calender from "@/components/dashboard/Calender"
import RecentPlayers from "@/components/dashboard/RecentPlayers"
import SystemHealth from "@/components/dashboard/SystemHealth"


interface StatItem {
  label: string
  value: string
  change: string
  icon: any
  color: StatsColor
}

const AdminDashboardPage = () => {
  const stats: StatItem[] = [
    {
      label: "Total Players",
      value: "2,847",
      change: "+12% this month",
      icon: FiUsers,
      color: "cyan",
    },
    {
      label: "Published",
      value: "2,156",
      change: "+8% this month",
      icon: FiCheckCircle,
      color: "green",
    },
    {
      label: "Articles",
      value: "156",
      change: "+24% this month",
      icon: FiFileText,
      color: "orange",
    },
    {
      label: "Subscribers",
      value: "15,432",
      change: "+32% this month",
      icon: FiMail,
      color: "purple",
    },
  ]

  return (
    <div className="flex flex-col gap-8 py-2">
      <DashboardHeader />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Growth Analytics Section */}
      <div className="mt-2">
        <GrowthAnalytics />
      </div>

      {/* Secondary Analytics Row */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ArticlesPublished />
        <Calender />
      </div>

      {/* Tertiary Row: Recent Players & System Health */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentPlayers />
        </div>
        <div className="lg:col-span-1">
          <SystemHealth />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
