import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { records: [], loading: false, error: null, record: null };
// const API = "http://localhost:7777/";
const API = "http://192.168.11.137:7777/";
const token = localStorage.getItem('jwt');

export const fetchRecruiters = createAsyncThunk('recruiter/fetchRecruiters', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}recruiters`, {
            // headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            headers: { 'Content-Type': 'application/json' }

        });
        if (!res.ok) {
            throw new Error('Failed to fetch recruiters');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchRecruiter = createAsyncThunk('recruiter/fetchRecruiter', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}recruiters/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch recruiter');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteRecruiter = createAsyncThunk('recruiter/deleteRecruiter', async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}recruiters/${id}`, {
            method: 'DELETE',
            // headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) {
            throw new Error('Failed to delete recruiter');
        }
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const insertRecruiter = createAsyncThunk('recruiter/insertRecruiter', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}recruiters/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(item)
        });
        if (!res.ok) {
            throw new Error('Failed to insert recruiter');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editRecruiter = createAsyncThunk('recruiter/editRecruiter', async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`${API}recruiters/${item.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                // email: item.email,
                // name: item.name,
                // telephone: item.telephone,
                // role_id: item.role_id
            })
        });
        if (!res.ok) {
            throw new Error('Failed to edit recruiter');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const recruiterSlice = createSlice({
    name: 'recruiter',
    initialState,
    reducers: {
        cleanRecord: (state) => {
            state.record = null;
        }
    },

    extraReducers: {
        // get one promotion
        [fetchRecruiter.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchRecruiter.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchRecruiter.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // fetch promotions
        [fetchRecruiters.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchRecruiters.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = action.payload;
        },
        [fetchRecruiters.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // create promotion
        [insertRecruiter.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertRecruiter.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [insertRecruiter.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete promotion
        [deleteRecruiter.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deleteRecruiter.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        [deleteRecruiter.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // edit promotion
        [editRecruiter.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [editRecruiter.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [editRecruiter.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export default recruiterSlice.reducer;
