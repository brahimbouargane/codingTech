import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  records: [],
  loading: false,
  error: null,
  record: null,
  developer: {},
  experiences: [],
};
const API = "http://localhost:7777/";
//const API = "http://192.168.11.137:7777/";
const token = localStorage.getItem("jwt");

export const fetchDevelopers = createAsyncThunk(
  "developers/fetchDevelopers",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${API}developers`, {
        // headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch promotions");
      }

      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeveloper = createAsyncThunk(
  "developers/fetchDeveloper",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${API}developers/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch developer");
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDeveloper = createAsyncThunk(
  "developers/deleteDeveloper",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${API}developers/${id}`, {
        method: "DELETE",
        // headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error("Failed to delete developer");
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertDeveloper = createAsyncThunk(
  "developers/insertDeveloper",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${API}developers/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(item),
      });
      if (!res.ok) {
        throw new Error("Failed to insert developer");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addEducation = createAsyncThunk(
  "developers/addEducation",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const { dateFin, dateDebut, nomLentreprise, jobTitle, developer_id } = item;
    const data = { dateFin, dateDebut, jobTitle, nomLentreprise, developer_id };

    console.log(data.nomLentreprise);
    try {
      const response = await axios.put(
        `${API}developers/${item.developer_id}/experiences`,
        data
      );

      if (response.status !== 200) {
        // You can adjust the status code condition based on your API
        throw new Error("Failed to add education");
      }

      const addedEducation = response.data;
      return addedEducation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFormation = createAsyncThunk(
  "developers/addFormation",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const {
      dateFin,
      dateDebut,
      nomEcole,
      nomeDeplome,
      description,
      developer_id,
    } = item;
    const data = {
      dateFin,
      dateDebut,
      nomEcole,
      nomeDeplome,
      description,
      developer_id,
    };

    console.log(data);
    try {
      const response = await axios.put(
        `${API}developers/${item.developer_id}/education`,
        data
      );

      if (response.status !== 200) {
        // You can adjust the status code condition based on your API
        throw new Error("Failed to add education");
      }

      const addedEducation = response.data;
      return addedEducation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editDeveloper = createAsyncThunk(
  "developers/editDeveloper",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`${API}developers/${item.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          nom: item.nom,
          prenom: item.prenom,
          jobTitle: item.jobTitle,
          description: item.description,
          twitterUrl: item.twitterUrl,
          gitHubUrl: item.gitHubUrl,
          linkedinUrl: item.linkedinUrl,
          telephone: item.telephone,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to edit developer");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const developersSlice = createSlice({
  name: "developer",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.record = null;
    },
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
      state.developer = action.payload;
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
    },

    [addEducation.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addEducation.fulfilled]: (state, action) => {
      state.loading = false;
      state.developer = action.payload;
      state.records.push(action.payload);
    },
    [addEducation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [addFormation.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addFormation.fulfilled]: (state, action) => {
      state.loading = false;
      state.developer = action.payload;
      state.records.push(action.payload);
    },
    [addFormation.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default developersSlice.reducer;
