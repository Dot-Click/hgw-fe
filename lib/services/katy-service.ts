import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

export interface KatyResponse {
    text: string;
    chart?: {
        data: any[];
        title: string;
        dataKey: string;
        nameKey: string;
    };
    sql?: string;
}

/**
 * HELPER: Serialize BigInt to strings so they can be sent to the AI
 */
function serializeData(data: any): any {
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
    ));
}

const tools: OpenAI.Chat.ChatCompletionTool[] = [
    {
        type: "function",
        function: {
            name: "execute_database_query",
            description: "Execute a read-only SQL SELECT query. Use lowercase table names in double quotes like \"player\".",
            parameters: {
                type: "object",
                properties: {
                    sql: { type: "string", description: "The SQL SELECT query." },
                },
                required: ["sql"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "read_project_file",
            description: "Read a specific file's content (e.g., 'prisma/schema.prisma').",
            parameters: {
                type: "object",
                properties: {
                    filePath: { type: "string", description: "Relative path to the file." },
                },
                required: ["filePath"],
            },
        },
    },
    {
        type: "function",
        function: {
            name: "list_directory",
            description: "List all files and folders in a directory.",
            parameters: {
                type: "object",
                properties: {
                    dirPath: { type: "string", description: "Relative path to the directory (e.g., 'app' or 'components')." },
                },
                required: ["dirPath"],
            },
        },
    }
];

export class KatyService {
    static async processMessage(text: string): Promise<KatyResponse> {
        try {
            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey) return { text: "OpenAI API Key missing in .env file." };

            const openai = new OpenAI({ apiKey });

            const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
                {
                    role: "system",
                    content: `You are Katy AI, the professional Data Analyst brain of 'How Good Was' (HGW).
                
                CORE RULES:
                1. DATA ACCURACY: Use SQL for all data questions (counts, stats, trophies, scores).
                2. PLAYER INFO: If asked about a player (e.g., 'Aleem' or 'Usman'), fetch their specific metrics like dominance, longevity, championships, etc.
                3. PODCAST EXPERT: You can now answer questions about podcasts. Use the 'podcast' table. Check for 'featured' status and 'episodeNumber' to identify and track episodes.
                4. COMPARISON MASTER: If asked to compare two legends:
                   - Generate a professional Markdown Table.
                   - Compare all relevant metrics (Trophies, HGW Score, Longevity).
                   - Analyze the data and DECLARE A WINNER with a brief justification.
                5. PAGINATION: If there are more than 15 results (players or categories):
                   - List the first 10-15 clearly.
                   - Explicitly state: "I have X more players/categories in the system. Would you like to see more?"
                6. EXPLORATION: Use LIST/READ tools to find file logic, but use SQL for database content.
                7. WINNER LOGIC: When comparing, higher HGW Score usually wins, but consider dominance and trophies too.

                Always respond in a helpful, professional, and natural way. Never show raw SQL unless requested.`
                },
                { role: "user", content: text }
            ];

            let response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages,
                tools,
                tool_choice: "auto",
            });

            let responseMessage = response.choices[0].message;

            // Handle tool calls
            if (responseMessage.tool_calls) {
                messages.push(responseMessage);

                for (const toolCall of responseMessage.tool_calls) {
                    if (toolCall.type === 'function') {
                        const functionName = toolCall.function.name;
                        const functionArgs = JSON.parse(toolCall.function.arguments);
                        
                        const functionResponse = await this.handleFunctionCall(functionName, functionArgs);
                        
                        messages.push({
                            tool_call_id: toolCall.id,
                            role: "tool",
                            content: JSON.stringify(functionResponse),
                        } as any);
                    }
                }

                const secondResponse = await openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages,
                });
                
                return {
                    text: secondResponse.choices[0].message.content || "I'm processing that for you...",
                };
            }

            return {
                text: responseMessage.content || "I'm here to help!"
            };
        } catch (error: any) {
            console.error("KatyAI OpenAI Error:", error.message);
            return { text: `Sorry, I hit an error with OpenAI: ${error.message}` };
        }
    }

    private static async handleFunctionCall(name: string, args: any) {
        try {
            if (name === "execute_database_query") {
                const sql = args.sql;
                if (!sql.toLowerCase().trim().startsWith("select")) return { error: "Only SELECT allowed." };
                const data = await (prisma as any).$queryRawUnsafe(sql);
                return serializeData({ data, sql });
            }

            if (name === "read_project_file") {
                const fullPath = path.join(process.cwd(), args.filePath);
                if (fs.existsSync(fullPath)) {
                    return { content: fs.readFileSync(fullPath, "utf-8").substring(0, 8000) };
                }
                return { error: `File not found: ${args.filePath}` };
            }

            if (name === "list_directory") {
                const fullPath = path.join(process.cwd(), args.dirPath);
                if (fs.existsSync(fullPath) && fs.lstatSync(fullPath).isDirectory()) {
                    return { files: fs.readdirSync(fullPath) };
                }
                return { error: `Directory not found: ${args.dirPath}` };
            }
        } catch (e: any) {
            return { error: e.message };
        }
        return { error: "Unknown tool" };
    }
}
