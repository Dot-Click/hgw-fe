import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../actions/articleActions";

interface ArticleState {
    articles: any[];
    loading: boolean;
    error: string | null;
}

const initialState: ArticleState = {
    articles: [],
    loading: false,
    error: null,
};

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        clearArticleError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Fetch Articles
        builder.addCase(fetchArticles.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.articles = action.payload;
        });
        builder.addCase(fetchArticles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Create Article
        builder.addCase(createArticle.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createArticle.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            
            // If the new article is featured, set all other articles to non-featured
            if (action.payload.featured) {
                state.articles = state.articles.map(article => ({
                    ...article,
                    featured: false
                }));
            }
            
            state.articles.unshift(action.payload);
        });
        builder.addCase(createArticle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Update Article
        builder.addCase(updateArticle.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateArticle.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            
            // If the updated article is featured, set all other articles to non-featured
            if (action.payload.featured) {
                state.articles = state.articles.map(article => 
                    article.id === action.payload.id ? action.payload : { ...article, featured: false }
                );
            } else {
                state.articles = state.articles.map(article => 
                    article.id === action.payload.id ? action.payload : article
                );
            }
        });
        builder.addCase(updateArticle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Delete Article
        builder.addCase(deleteArticle.fulfilled, (state, action: PayloadAction<string>) => {
            state.articles = state.articles.filter(article => article.id !== action.payload);
        });
    },
});

export const { clearArticleError } = articleSlice.actions;
export default articleSlice.reducer;
