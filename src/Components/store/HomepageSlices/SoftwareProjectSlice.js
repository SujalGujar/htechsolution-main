import { createSlice } from "@reduxjs/toolkit";

const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: storedProjects,
  },
  reducers: {
    addProject: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem("projects", JSON.stringify(state.list));
    },
    updateProject: (state, action) => {
      const { id, updatedProject } = action.payload;
      const index = state.list.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updatedProject };
        localStorage.setItem("projects", JSON.stringify(state.list));
      }
    },
    deleteProject: (state, action) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
      localStorage.setItem("projects", JSON.stringify(state.list));
    },
  },
});

export const { addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
