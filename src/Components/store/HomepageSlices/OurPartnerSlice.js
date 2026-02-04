import { createSlice } from "@reduxjs/toolkit";

/* Load from localStorage */
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("teamMembers");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("LocalStorage error:", err);
    return [];
  }
};

/* Save to localStorage */
const saveToLocalStorage = (data) => {
  localStorage.setItem("teamMembers", JSON.stringify(data));
};

const teamSlice = createSlice({
  name: "team",
  initialState: {
    members: loadFromLocalStorage(),
  },
  reducers: {
    addMember: (state, action) => {
      state.members.push(action.payload);
      saveToLocalStorage(state.members);
    },

    updateMember: (state, action) => {
      const index = state.members.findIndex(
        (m) => m.id === action.payload.id
      );
      if (index !== -1) {
        state.members[index] = action.payload;
        saveToLocalStorage(state.members);
      }
    },

    deleteMember: (state, action) => {
      state.members = state.members.filter(
        (m) => m.id !== action.payload
      );
      saveToLocalStorage(state.members);
    },
  },
});

export const { addMember, updateMember, deleteMember } = teamSlice.actions;
export default teamSlice.reducer;
