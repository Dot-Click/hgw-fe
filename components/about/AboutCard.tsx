import { Card } from "@heroui/react";
import React from "react";

interface AboutCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const AboutCard = ({ title, description, icon }: AboutCardProps) => {
    return (
        <Card className="bg-[linear-gradient(125.68deg,_#1B1C22_0%,_#0D0E12_100%)] border border-[#24262E] py-7 px-7 rounded-[12px] flex flex-col gap-5 hover:border-[#00CCFF55] hover:bg-[#16171D] transition-all duration-300  shadow-none">
            <Card.Header className="p-0 border-none bg-transparent">
                <div className="text-[32px] rounded-2xl  text-[#00CCFF] transition-all">
                    {icon}
                </div>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3 p-0 bg-transparent">
                <Card.Title className="orbitron text-[#E7EBEF] text-[20px] font-[600] tracking-wide">{title}</Card.Title>
                <Card.Description className="text-[#7B899D] outfit text-[16px]">
                    {description}
                </Card.Description>
            </Card.Content>
        </Card>
    );
};

export default AboutCard;
