import { createSlice } from "@reduxjs/toolkit";


const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("ourServices");
    return data ? JSON.parse(atob(data)) : [];
  } catch (error) {
    console.error("LocalStorage error:", error);
    return [];
  }
};


const saveToLocalStorage = (data) => {
  localStorage.setItem("ourServices", btoa(JSON.stringify(data)));
};


const initialState = {
  services: loadFromLocalStorage(),
};

const ourServiceSlice = createSlice({
  name: "ourServices",
  initialState,
  reducers: {
    /* ---------- ADD ---------- */
    addService: (state, action) => {
      state.services.push(action.payload);
      saveToLocalStorage(state.services);
    },

    /* ---------- UPDATE ---------- */
    updateService: (state, action) => {
      const index = state.services.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.services[index] = action.payload;
        saveToLocalStorage(state.services);
      }
    },

    /* ---------- DELETE ---------- */
    deleteService: (state, action) => {
      state.services = state.services.filter(
        (item) => item.id !== action.payload
      );
      saveToLocalStorage(state.services);
    },
  },
});

export const { addService, updateService, deleteService } =
  ourServiceSlice.actions;

export default ourServiceSlice.reducer;
