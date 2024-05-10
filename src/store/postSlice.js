import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import service from "../appwrite/config";

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    try {
        const posts = await service.getPosts();
        return posts.documents;
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