import { createSlice } from '@reduxjs/toolkit';

const initialFilters = {
  filter: '',
};

const filtersSlice = createSlice({
  name: 'filter',
  initialState: initialFilters,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filtersSlice.actions;
export const filterReduser = filtersSlice.reducer;
