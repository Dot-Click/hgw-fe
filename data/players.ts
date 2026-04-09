export interface PlayerData {
    id: number;
    rank: string;
    rankIcon?: string;
    name: string;
    lastName?: string; // Added for the split-color header design
    role: string;
    stats: {
        apps: string;
        years: string;
        country: string;
    };
    category: string;
    trophies: number;
    score: number;
    image: string;
    glowColor?: string;
    // Detail page specific info
    location?: string;
    lifespan?: string;
    era?: string;
    tags?: string[];
}

export const PLAYERS_DATA: PlayerData[] = [
    {
        id: 1,
        rank: "#1",
        rankIcon: "👑",
        name: "Lionel",
        lastName: "Messi",
        role: "Forward",
        stats: { apps: "1050 apps", years: "2000s-2020s", country: "Argentina" },
        category: "FOOTBALL",
        trophies: 44,
        score: 98.5,
        image: "/assets/img3.png",
        glowColor: "border-[#FFBF00] shadow-[0_0_20px_#FFBF0033]",
        location: "Rosario, Argentina",
        lifespan: "1987-Present",
        era: "2000s-Present",
        tags: ["GOAT", "Barcelona", "Inter Miami"]
    },
    {
        id: 2,
        rank: "#2",
        rankIcon: "🏆",
        name: "Pelé",
        lastName: "(Edson Arantes)",
        role: "Forward",
        stats: { apps: "1363 apps", years: "1950s-1970s", country: "Brazil" },
        category: "FOOTBALL",
        trophies: 26,
        score: 97.8,
        image: "/assets/img5.png",
        glowColor: "border-[#00CCFF] shadow-[0_0_20px_#00CCFF33]",
        location: "Três Corações, Brazil",
        lifespan: "1940-2022",
        era: "1950s-1970s",
        tags: ["Santos", "3 World Cups"]
    },
    {
        id: 3,
        rank: "#3",
        rankIcon: "🏆",
        name: "Cristiano",
        lastName: "Ronaldo",
        role: "Forward",
        stats: { apps: "1200 apps", years: "2000s-2020s", country: "Portugal" },
        category: "FOOTBALL",
        trophies: 35,
        score: 97.1,
        image: "/assets/img2.png",
        glowColor: "border-[#F97316] shadow-[0_0_20px_#F9731633]",
        location: "Funchal, Portugal",
        lifespan: "1985-Present",
        era: "2000s-Present",
        tags: ["Real Madrid", "Man Utd", "Al Nassr"]
    },
    {
        id: 4,
        rank: "#4",
        name: "Diego",
        lastName: "Maradona",
        role: "Attacking Midfielder",
        stats: { apps: "491 apps", years: "1980s-1990s", country: "Argentina" },
        category: "FOOTBALL",
        trophies: 11,
        score: 96.2,
        image: "/assets/img4.png",
        location: "Lanús, Argentina",
        lifespan: "1960-2020",
        era: "1980s-1990s",
        tags: ["Napoli", "Boca Juniors", "Hand of God"]
    },
    {
        id: 5,
        rank: "#5",
        name: "Zinedine",
        lastName: "Zidane",
        role: "Attacking Midfielder",
        stats: { apps: "689 apps", years: "1990s-2000s", country: "France" },
        category: "FOOTBALL",
        trophies: 16,
        score: 95.3,
        image: "/assets/img2.png",
        location: "Marseille, France",
        lifespan: "1972-Present",
        era: "1990s-2000s",
        tags: ["Real Madrid", "Juventus", "World Cup Winner"]
    },
    {
        id: 6,
        rank: "#6",
        name: "Bob",
        lastName: "Marley",
        role: "Vocalist / Songwriter",
        stats: { apps: "1960s-1980s", years: "Jamaica", country: "" },
        category: "MUSIC",
        trophies: 8,
        score: 94.6,
        image: "/assets/img6.png",
        location: "Nine Mile, Jamaica",
        lifespan: "1945-1981",
        era: "1960s-1980s",
        tags: ["Reggae", "The Wailers", "Solo"]
    },
    {
        id: 7,
        rank: "#7",
        name: "Richie",
        lastName: "McCaw",
        role: "Flanker",
        stats: { apps: "148 apps", years: "2000s-2010s", country: "New Zealand" },
        category: "RUGBY",
        trophies: 12,
        score: 93.7,
        image: "/assets/img7.png",
        location: "Oamaru, New Zealand",
        lifespan: "1980-Present",
        era: "2000s-2010s",
        tags: ["All Blacks", "Crusaders", "World Cup Captain"]
    },
    {
        id: 8,
        rank: "#8",
        name: "Jonah",
        lastName: "Lomu",
        role: "Wing",
        stats: { apps: "73 apps", years: "1990s-2000s", country: "New Zealand" },
        category: "RUGBY",
        trophies: 4,
        score: 91.4,
        image: "/assets/img1.png",
        location: "Auckland, New Zealand",
        lifespan: "1975-2015",
        era: "1990s-2000s",
        tags: ["All Blacks", "Hurricanes", "Icon"]
    },
    {
        id: 9,
        rank: "#9",
        name: "Johan",
        lastName: "Cruyff",
        role: "Total Footballer",
        stats: { apps: "752 apps", years: "1960s-1980s", country: "Netherlands" },
        category: "FOOTBALL",
        trophies: 22,
        score: 90.8,
        image: "/assets/img3.png",
        location: "Amsterdam, Netherlands",
        lifespan: "1947-2016",
        era: "1960s-1980s",
        tags: ["Ajax", "Barcelona", "Total Football"]
    },
    {
        id: 10,
        rank: "#10",
        name: "Usain",
        lastName: "Bolt",
        role: "Sprinter",
        stats: { apps: "8x Gold", years: "2000s-2010s", country: "Jamaica" },
        category: "ATHLETICS",
        trophies: 19,
        score: 89.9,
        image: "/assets/img1.png",
        location: "Sherwood Content, Jamaica",
        lifespan: "1986-Present",
        era: "2000s-2010s",
        tags: ["Olympics", "World Record Holder", "Fastest Man"]
    },
    {
        id: 11,
        rank: "#11",
        name: "Franz",
        lastName: "Beckenbauer",
        role: "Libero",
        stats: { apps: "754 apps", years: "1960s-1980s", country: "Germany" },
        category: "FOOTBALL",
        trophies: 20,
        score: 89.2,
        image: "/assets/img2.png",
        location: "Munich, Germany",
        lifespan: "1945-2024",
        era: "1960s-1980s",
        tags: ["Der Kaiser", "Bayern Munich", "World Cup Winner"]
    },
    {
        id: 12,
        rank: "#12",
        name: "Dan",
        lastName: "Carter",
        role: "Fly-half",
        stats: { apps: "112 apps", years: "2000s-2010s", country: "New Zealand" },
        category: "RUGBY",
        trophies: 9,
        score: 88.5,
        image: "/assets/img7.png",
        location: "Southbridge, New Zealand",
        lifespan: "1982-Present",
        era: "2000s-2010s",
        tags: ["All Blacks", "Crusaders", "All-time Points Leader"]
    }
];
