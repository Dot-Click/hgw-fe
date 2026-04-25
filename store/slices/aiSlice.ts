import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sendAiMessage } from '../actions/aiActions';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'katy';
    chart?: {
        data: any[];
        title: string;
        dataKey: string;
        nameKey: string;
    };
    sql?: string;
}

interface AiState {
    messages: Message[];
    isTyping: boolean;
    error: string | null;
}

const initialState: AiState = {
    messages: [
        {
            id: '1',
            sender: 'katy',
            text: "Hey! I'm Katy. Ask me anything about the HGW Legend Vault or the 10 Pillars! 🏆"
        }
    ],
    isTyping: false,
    error: null,
};

const aiSlice = createSlice({
    name: 'ai',
    initialState,
    reducers: {
        addUserMessage: (state, action: PayloadAction<string>) => {
            state.messages.push({
                id: Date.now().toString(),
                sender: 'user',
                text: action.payload
            });
            state.isTyping = true;
            state.error = null;
        },
        clearChat: (state) => {
            state.messages = initialState.messages;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendAiMessage.fulfilled, (state, action) => {
                state.isTyping = false;
                state.messages.push({
                    id: (Date.now() + 1).toString(),
                    sender: 'katy',
                    ...action.payload
                });
            })
            .addCase(sendAiMessage.rejected, (state, action) => {
                state.isTyping = false;
                state.error = action.payload as string;
                state.messages.push({
                    id: (Date.now() + 1).toString(),
                    sender: 'katy',
                    text: action.payload as string || "I'm having trouble connecting to the vault right now. Let's try again in a bit!"
                });
            });
    },
});

export const { addUserMessage, clearChat } = aiSlice.actions;
export default aiSlice.reducer;
