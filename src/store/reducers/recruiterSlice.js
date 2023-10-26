import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { records: [], loading: false, error: null, record: null };
const API = "http://localhost:7777/";
const token = localStorage.getItem('jwt');

export const fetchPromotions = createAsyncThunk('promotions/fetchPromotions', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}recruiters`, {
            // headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            headers: { 'Content-Type': 'application/json' }

        });
        if (!res.ok) {
            throw new Error('Failed to fetch promotions');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchPromotion = createAsyncThunk('promotions/fetchPromotion', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}promotions/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch promotion');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deletePromotion = createAsyncThunk('promotions/deletePromotions', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}promotions/${id}`, {
            method: 'DELETE',
            // headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            throw new Error('Failed to delete promotion');
        }
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertPromotion = createAsyncThunk('promotions/insertPromotion', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}promotions/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            throw new Error('Failed to insert promotion');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editPromotion = createAsyncThunk('promotions/editPromotions', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}promotions/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                email: item.email,
                name: item.name,
                telephone: item.telephone,
                role_id: item.role_id
            })
        });
        if (!res.ok) {
            throw new Error('Failed to edit promotion');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const recruitersSlice = createSlice({
    name: 'recruiters',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        // get one promotion
        [fetchPromotion.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchPromotion.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchPromotion.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // fetch promotions
        [fetchPromotions.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchPromotions.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchPromotions.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create promotion
        [insertPromotion.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertPromotion.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertPromotion.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete promotion
        [deletePromotion.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deletePromotion.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deletePromotion.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // edit promotion
        [editPromotion.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editPromotion.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editPromotion.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default recruitersSlice.reducer;
