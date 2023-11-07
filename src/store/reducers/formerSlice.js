import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { records: [], loading: false, error: null, record: null,former:{} };
const API = "http://localhost:7777/";
//const API = "http://192.168.11.137:7777/";
const token = localStorage.getItem('jwt');

export const fetchFormers = createAsyncThunk('formers/fetchFormers', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}formateurs`, {
            // headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            headers: { 'Content-Type': 'application/json' }

        });
        if (!res.ok) {
            throw new Error('Failed to fetch formers');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchFormer = createAsyncThunk('formers/fetchFormer', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}formateurs/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch former');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteFormer = createAsyncThunk('formers/deleteFormer', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}formateurs/${id}`, {
            method: 'DELETE',
            // headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            throw new Error('Failed to delete former');
        }
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertFormer = createAsyncThunk('formers/insertformer', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}formateurs/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            throw new Error('Failed to insert fromer');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editFormer = createAsyncThunk('formers/editFormers', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}formateurs/${item.id}`, {
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
            throw new Error('Failed to edit former');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const formerSlice = createSlice({
    name: 'former',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        // get one promotion
        [fetchFormer.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchFormer.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
            state.former = action.payload;
        },
        [fetchFormer.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // fetch promotions
        [fetchFormers.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchFormers.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchFormers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create promotion
        [insertFormer.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertFormer.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertFormer.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete promotion
        [deleteFormer.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteFormer.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteFormer.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // edit promotion
        [editFormer.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editFormer.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editFormer.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default formerSlice.reducer;
