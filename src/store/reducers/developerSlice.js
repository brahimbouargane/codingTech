import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { records: [], loading: false, error: null, record: null };
// const API = "http://localhost:7777/";
const API = "http://192.168.11.137:7777/";
const token = localStorage.getItem('jwt');

export const fetchDevelopers = createAsyncThunk('developers/fetchDevelopers', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}developers`, {
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

export const fetchDeveloper = createAsyncThunk('developers/fetchDeveloper', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}developers/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch developer');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteDeveloper = createAsyncThunk('developers/deleteDeveloper', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}developers/${id}`, {
            method: 'DELETE',
            // headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            throw new Error('Failed to delete developer');
        }
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertDeveloper = createAsyncThunk('developers/insertDeveloper', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}developers/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            throw new Error('Failed to insert developer');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editDeveloper = createAsyncThunk('developers/editDeveloper', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}developers/${item.id}`, {
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
            throw new Error('Failed to edit developer');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const developersSlice = createSlice({
    name: 'developer',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        // get one promotion
        [fetchDeveloper.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchDeveloper.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchDeveloper.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // fetch promotions
        [fetchDevelopers.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchDevelopers.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchDevelopers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create promotion
        [insertDeveloper.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertDeveloper.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertDeveloper.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete promotion
        [deleteDeveloper.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteDeveloper.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteDeveloper.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // edit promotion
        [editDeveloper.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editDeveloper.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editDeveloper.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default developersSlice.reducer;
