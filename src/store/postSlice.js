import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../appwrite/config";

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    try {
        let cursor = null;
        const limit = 15;
        let hasMore = true;
        let allPosts = [];

        while (hasMore) {
            const posts = await service.getPosts(cursor, limit);
            console.log("posts from postSlice CMP", posts);

            if (posts && posts.documents.length > 0) {
                allPosts = [...allPosts, ...posts.documents];

                cursor = posts.documents[posts.documents.length - 1].$id;
            } else {
                hasMore = false;
            }
        }
        return allPosts;
    } catch (error) {
        return error
    }
})

const initialState = {
    loading: false,
    posts: [],
    error: ''
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false,
                    state.posts = action.payload
            }),
            builder.addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
    }
})

export default postsSlice.reducer;