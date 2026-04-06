import { Button } from '@heroui/react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'
import { FiCalendar, FiClock, FiExternalLink, FiHeadphones } from 'react-icons/fi'
import { IoMicOutline, IoPersonOutline, IoStarOutline } from 'react-icons/io5'

const PodcastHeader = () => {
  return (
       <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-20 flex flex-col gap-3 relative z-10">

                {/* Section Title */}
                <div className="flex items-center gap-2 text-[#00CCFF]  font-[500]">
                    <IoMicOutline className="text-[18px] md:text-[22px]" />
                    <span className="text-[11px] md:text-[15px] uppercase outfit">HGW PODCAST</span>
                </div>

                {/* Featured Episode Section (Two Columns) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10  items-start">

                    {/* Left Column: Featured Image Card */}
                    <div className="lg:col-span-6 xl:col-span-6 relative">
                        <div className="relative h-[220px] md:h-[400px] lg:h-[400px]  xl:h-[360px] w-full rounded-[23px] overflow-hidden border border-[#747A9499] shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
                            <Image
                                src="/assets/pdimg.svg"
                                alt="Podcast Featured Episode"
                                fill
                                className="object-cover lg:object-right xl:object-center h-full transition-transform duration-700"
                                priority
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                            {/* Featured Badge */}
                            <div className="absolute top-3 left-3 bg-[#FFBF00] text-[#0B0B0F] px-3 py-1.5 rounded-full text-[8px] md:text-[10px]  font-[600] orbitron tracking-wider">
                                FEATURED EP #12
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Button className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#00CCFF] text-[#0B0B0F] min-w-0 p-0 shadow-[0_0_30px_rgba(0,204,255,0.4)] hover:bg-[#0aabd3]">
                                    <FaPlay className="text-5xl text-white ml-1" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Episode Details */}
                    <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-3 py-3">

                        {/* Category Tag */}
                        <div>
                            <span className="px-3 py-1.5 rounded-full bg-[#00CCFF33] border border-[#00CCFF4D] text-[#00CCFF] text-[12px] tracking-wider font-[600] outfit">
                                Football
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-[17px] md:text-[24px] lg:text-[30px] orbitron font-[900] leading-tight text-[#FFFFFF]">
                            Why Messi is the GOAT – A Statistical Breakdown
                        </h1>

                        {/* Description */}
                        <p className="text-[#7B899D] text-[15px] md:text-[16px] font-[400] outfit leading-relaxed max-w-xl">
                            We break down Lionel Messi's career using the 10 Pillars of Domination. From longevity to clutch factor, every metric is dissected.
                        </p>

                        {/* Stats Row */}
                        <div className="flex flex-wrap items-center gap-6 text-[#7B899D] font-[400] text-[14px] md:text-[16px] outfit">
                            <div className="flex items-center gap-2">
                                <FiClock className="text-[#00CCFF]" />
                                <span>45 min</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiCalendar className="text-[#00CCFF]" />
                                <span>2024-12-01</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiHeadphones className="text-[#00CCFF]" />
                                <span>48,200 listens</span>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <IoPersonOutline className="text-[#FFBF00] text-lg" />
                                <span className="text-[#7B899D] text-[14px] font-[400] md:text-[15px] outfit">
                                    Guests: <span className="text-[#E7EBEF]">Dr. Alex Torres, HGW Analytics Team</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <IoStarOutline className="text-[#FFBF00] text-lg" />
                                <span className="text-[#7B899D] text-[14px] font-[400] md:text-[15px] outfit">
                                    Legends: <span className="text-[#00CCFF] font-medium cursor-pointer hover:underline">Lionel Messi</span> <span className="text-[#00CCFF] font-medium cursor-pointer hover:underline ml-2">Cristiano Ronaldo</span>
                                </span>
                            </div>
                        </div>

                        {/* Platform Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <Button className="py-2 px-3 bg-[#1F2128CC] border border-[#24262E80] text-[#7B899D] rounded-[23px] flex items-center gap-2 hover:bg-white/5 transition-all text-[11px] md:text-[13px] font-[400]">
                                <FiExternalLink className="" />
                                Spotify
                            </Button>
                            <Button className="py-2 px-3 bg-[#1F2128CC] border border-[#24262E80] text-[#7B899D] rounded-[23px] flex items-center gap-2 hover:bg-white/5 transition-all text-[11px] md:text-[13px] font-[400]">
                                <FiExternalLink className="" />
                                Apple Podcasts
                            </Button>
                            <Button className="py-2 px-3 bg-[#1F2128CC] border border-[#24262E80] text-[#7B899D] rounded-[23px] flex items-center gap-2 hover:bg-white/5 transition-all text-[11px] md:text-[13px] font-[400]">
                                <FiExternalLink className="" />
                                YouTube
                            </Button>
                        </div>

                    </div>
                </div>

            </div>
  )
}

export default PodcastHeader