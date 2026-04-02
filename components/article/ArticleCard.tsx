import { Card, Button } from "@heroui/react";
import React from "react";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";

interface ArticleCardProps {
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
}

const ArticleCard = ({ title, description, image, category, date, readTime }: ArticleCardProps) => {
    return (
        <Card className="bg-[#11121780] border border-[#747A94] p-0 outfit rounded-[22px] flex flex-col hover:border-[#00CCFF55] transition-all duration-300 overflow-hidden shadow-none h-full">
            <Card.Header className="p-0 border-none relative h-60 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute flex justify-center items-center top-4 left-4 bg-[#111217CC] px-3 py-1 rounded-full border border-[#24262ECC]">
                    <span className="text-[12px]  font-[400] text-[#7B899D] uppercase tracking-widest">{category}</span>
                </div>
            </Card.Header>

            <Card.Content className="flex flex-col gap-1 p-4 bg-transparent grow">
                <Card.Title className="orbitron text-[#E7EBEF] text-[15px] font-[700] tracking-wider">
                    {title}
                </Card.Title>
                <Card.Description className="text-[#7B899D] outfit text-[14px]">
                    {description}
                </Card.Description>
            </Card.Content>

            <div className=" mx-auto w-[95%] h-px bg-[#24262E]"></div>

            <Card.Footer className="px-6 pb-2 bg-transparent flex items-center justify-between">
                <div className="flex items-center gap-4 text-[#7B899D] text-[14px] font-[400] outfit">
                    <div className="flex items-center gap-1.5">
                        <FiCalendar className="" />
                        <span>{date}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-[#7B899D] text-[14px] font-[400] outfit">
                    <FiClock className="" />
                    <span>{readTime}</span>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default ArticleCard;