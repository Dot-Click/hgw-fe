"use client";

import React, { useMemo } from "react";
import { InputGroup, Button, Select, ListBox } from "@heroui/react";
import { FiSearch } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";
import { useAppSelector } from "@/store/hooks";

const DatabaseFilters = () => {
    const { categories } = useAppSelector((state) => state.categories);
    const { players } = useAppSelector((state) => state.players);

    // Dynamically derive categories from DB
    const dynamicCategories = useMemo(() => {
        const list = [{ id: "all", name: "All Categories" }];
        categories.forEach(cat => {
            list.push({ id: cat.id, name: cat.name });
        });
        return list;
    }, [categories]);

    // Dynamically derive unique countries from players
    const dynamicLocations = useMemo(() => {
        const uniqueCountries = Array.from(new Set(players.map(p => p.country))).filter(Boolean);
        const list = [{ id: "all", name: "All Locations" }];
        uniqueCountries.forEach(country => {
            list.push({ id: country.toLowerCase(), name: country });
        });
        return list;
    }, [players]);

    const FILTER_CONFIG = [
        {
            label: "Category",
            placeholder: "All Categories",
            options: dynamicCategories
        },
        {
            label: "Location",
            placeholder: "All Locations",
            options: dynamicLocations
        }
    ];

    return (
        <div className="w-full flex flex-col gap-6 outfit mt-4">
            {/* Search Bar & Filter Button Row */}
            <div className="flex items-center gap-3 w-full">
                <div className="grow relative h-14 md:h-16">
                    <InputGroup className="h-full px-3 bg-[#111217CC] border border-[#24262E] focus-within:border-[#00CCFF] rounded-[14px] flex items-center gap-2 transition-all group">
                        <InputGroup.Prefix>
                            <FiSearch className="text-[#7B899D] text-xl md:text-2xl" />
                        </InputGroup.Prefix>
                        <InputGroup.Input
                            placeholder="Search players, teams..."
                            type="text"
                            className="bg-transparent outline-none w-full font-[400] text-white outfit text-[18px] md:text-[18px] placeholder:text-[#7B899D]"
                            aria-label="Search input"
                        />
                    </InputGroup>
                </div>
                <Button 
                    className="h-14 md:h-16 bg-[#00CCFF] text-[#0B0B0F] rounded-[14px] px-6 font-[500]  text-[14px] md:text-[20px] shadow-[0_0_20px_rgba(0,204,255,0.3)] hover:bg-[#00B8E6] transition-all flex items-center gap-3"
                >
                    <LuSettings2 className="text-xl md:text-2xl" aria-hidden="true" />
                    <span>Filters</span>
                </Button>
            </div>


            {/* Dropdowns Row (Filters Container) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4 bg-[#111217] border border-[#24262E] rounded-[18px]">
                {FILTER_CONFIG.map((filter, index) => (
                    <div key={index} className="flex flex-col gap-2.5">
                        <span className="text-[#7B899DCC] text-[14px] font-[400] tracking-wider  ml-1">
                            {filter.label}
                        </span>
                        <Select
                            placeholder={filter.placeholder}
                            variant="primary"
                            className="w-full"
                            aria-label={filter.label}
                        >
                            <Select.Trigger className="h-[52px] px-3 border border-[#24262E] bg-[#1F2128CC] rounded-[12px] flex items-center justify-between hover:bg-[#24262E] transition-all">
                                <Select.Value className="text-white outfit text-[15px] font-normal" />
                                <Select.Indicator className="text-[#7B899D]" />
                            </Select.Trigger>
                            <Select.Popover className="bg-[#111217] border border-[#24262E] rounded-[12px] overflow-hidden">
                                <ListBox className="p-1">
                                    {filter.options.map((opt) => (
                                        <ListBox.Item 
                                            key={opt.id} 
                                            id={opt.id}
                                            textValue={opt.name}
                                            className="px-2.5 py-1.5 rounded-lg text-[#7B899D] hover:text-white hover:bg-[#24262E] transition-all cursor-pointer outfit text-[14px]"
                                        >
                                            {opt.name}
                                        </ListBox.Item>
                                    ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DatabaseFilters;
