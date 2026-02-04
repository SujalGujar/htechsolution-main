import { createSlice } from "@reduxjs/toolkit";


const loadAboutUsFromStorage = () => {
  const data = localStorage.getItem("aboutUsSection");
  return data ? JSON.parse(data) : [];
};


const saveToStorage = (data) => {
  localStorage.setItem("aboutUsSection", JSON.stringify(data));
};

const initialState = {
  aboutUsList: loadAboutUsFromStorage(),
};

const aboutUsSlice = createSlice({
  name: "aboutUsSection",
  initialState,
  reducers: {


    addAboutUs: (state, action) => {
      state.aboutUsList.push({
        ...action.payload,
        createdAt: new Date().toISOString(), 
      });
      saveToStorage(state.aboutUsList);
    },


    updateAboutUs: (state, action) => {
      const { index, updatedData } = action.payload;
      state.aboutUsList[index] = {
        ...updatedData,
        createdAt: state.aboutUsList[index].createdAt, 
      };
      saveToStorage(state.aboutUsList);
    },

    
    deleteAboutUs: (state, action) => {
      state.aboutUsList.splice(action.payload, 1);
      saveToStorage(state.aboutUsList);
    },

    
    clearAboutUs: (state) => {
      state.aboutUsList = [];
      localStorage.removeItem("aboutUsSection");
    },
  },
});

export const {
  addAboutUs,
  updateAboutUs,
  deleteAboutUs,
  clearAboutUs,
} = aboutUsSlice.actions;

export default aboutUsSlice.reducer;
