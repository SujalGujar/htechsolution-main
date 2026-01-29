import { createSlice } from "@reduxjs/toolkit";

/* ---------- LocalStorage Helpers ---------- */
const loadFromStorage = () => {
  const data = localStorage.getItem("ourAchievementsSection");
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(
      "ourAchievementsSection",
      JSON.stringify(data)
    );
  } catch (error) {
    console.error("Storage limit exceeded", error);
    alert(
      "Storage limit exceeded. Please reduce image size or remove old achievements."
    );
  }
};


/* ---------- Initial State ---------- */
const initialState = {
  achievementsList: loadFromStorage(),
};

/* ---------- Slice ---------- */
const ourAchievementsSlice = createSlice({
  name: "ourAchievementsSection",
  initialState,
  reducers: {
    addAchievement: (state, action) => {
      state.achievementsList.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
      saveToStorage(state.achievementsList);
    },

    updateAchievement: (state, action) => {
      const { index, updatedData } = action.payload;

      state.achievementsList[index] = {
        ...updatedData,
        createdAt:
          state.achievementsList[index].createdAt,
      };

      saveToStorage(state.achievementsList);
    },

    deleteAchievement: (state, action) => {
      state.achievementsList.splice(action.payload, 1);
      saveToStorage(state.achievementsList);
    },

    clearAchievements: (state) => {
      state.achievementsList = [];
      localStorage.removeItem("ourAchievementsSection");
    },
  },
});

/* ---------- ACTION EXPORTS ---------- */
export const {
  addAchievement,
  updateAchievement,
  deleteAchievement,
  clearAchievements,
} = ourAchievementsSlice.actions;

/* ✅ THIS LINE FIXES YOUR ERROR */
export default ourAchievementsSlice.reducer;
