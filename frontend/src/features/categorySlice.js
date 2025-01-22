import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from "../utils/config.json";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await fetch(`${config.apiUrl}/api/categories`);
    if (!response.ok) {
        throw new Error('Error al obtener las categorías');
    }
    const data = await response.json();
    return data.data;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;