// import { createSlice } from "@reduxjs/toolkit";


// const loadAboutUsFromStorage = () => {
//   const data = localStorage.getItem("aboutUsSection");
//   return data ? JSON.parse(data) : [];
// };


// const saveToStorage = (data) => {
//   localStorage.setItem("aboutUsSection", JSON.stringify(data));
// };

// const initialState = {
//   aboutUsList: loadAboutUsFromStorage(),
// };

// const aboutUsSlice = createSlice({
//   name: "aboutUsSection",
//   initialState,
//   reducers: {


//     addAboutUs: (state, action) => {
//       state.aboutUsList.push({
//         ...action.payload,
//         createdAt: new Date().toISOString(), 
//       });
//       saveToStorage(state.aboutUsList);
//     },


//     updateAboutUs: (state, action) => {
//       const { index, updatedData } = action.payload;
//       state.aboutUsList[index] = {
//         ...updatedData,
//         createdAt: state.aboutUsList[index].createdAt, 
//       };
//       saveToStorage(state.aboutUsList);
//     },

    
//     deleteAboutUs: (state, action) => {
//       state.aboutUsList.splice(action.payload, 1);
//       saveToStorage(state.aboutUsList);
//     },

    
//     clearAboutUs: (state) => {
//       state.aboutUsList = [];
//       localStorage.removeItem("aboutUsSection");
//     },
//   },
// });

// export const {
//   addAboutUs,
//   updateAboutUs,
//   deleteAboutUs,
//   clearAboutUs,
// } = aboutUsSlice.actions;

// export default aboutUsSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/project-deliverables";

// Define just one thunk first to test
export const fetchAboutUs = createAsyncThunk(
  "aboutUsSection/fetch",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

const initialState = {
  aboutUsList: [],
  status: 'idle',
  error: null
};

const aboutUsSlice = createSlice({
  name: "aboutUsSection",
  initialState,
  reducers: {
    addAboutUsLocal: (state, action) => {
      state.aboutUsList.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    },
    updateAboutUsLocal: (state, action) => {
      const { index, updatedData } = action.payload;
      if (state.aboutUsList[index]) {
        state.aboutUsList[index] = {
          ...updatedData,
          createdAt: state.aboutUsList[index].createdAt,
        };
      }
    },
    deleteAboutUsLocal: (state, action) => {
      state.aboutUsList.splice(action.payload, 1);
    },
    clearAboutUs: (state) => {
      state.aboutUsList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.aboutUsList = action.payload;
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { 
  addAboutUsLocal, 
  updateAboutUsLocal, 
  deleteAboutUsLocal, 
  clearAboutUs 
} = aboutUsSlice.actions;

export default aboutUsSlice.reducer;