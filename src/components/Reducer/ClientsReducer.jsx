import { createSlice } from "@reduxjs/toolkit";
import clientList from "../Data/Data";

const clientSlice = createSlice({
  name: "client",
  initialState: clientList,
  reducers: {
    addCliient: (state, action) => {
      // console.log(action)
      state.push(action.payload);
    },
    updateClient: (state, action) => {
      const { id, fname, lname, location } = action.payload;
      const uc = state.find((client) => client.id == id);
      if (uc) {
        uc.fname = fname;
        uc.lname = lname;
        uc.location = location;
      }
    },
    deleteClient: (state, action) => {
      const { id } = action.payload;
      const uc = state.find((client) => client.id == id);
      if (uc) {
        return state.filter((f) => f.id !== id);
      }
    },
    addSchedule: (state, action) => {
      const { id, newApt } = action.payload;
      const client = state.find((client) => client.id === id);

      if (client) {
        client.apt.push(newApt);
      }
    },
    updateSchedule: (state, action) => {
      const { id, aptIndex, updatedApt } = action.payload;
      const client = state.find((client) => client.id === id);

      if (client && client.apt[aptIndex]) {
        // Use Immer to modify the draft directly
        //   if (client.apt[aptIndex]) {
        client.apt[aptIndex].date = updatedApt.date;
        client.apt[aptIndex].time = updatedApt.time;
        // }
      }
    },
    deleteSchedule: (state, action) => {
      const { id, aptIndex } = action.payload;
      const client = state.find((client) => client.id === id);

      if (client && client.apt[aptIndex]) {
        // if (client.apt[aptIndex]) {
        client.apt.splice(aptIndex, 1);
        // }
      }
    },
  },
});

export const {
  addCliient,
  updateClient,
  deleteClient,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} = clientSlice.actions;
export default clientSlice.reducer;
