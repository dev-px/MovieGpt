import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUserInfo: (state, action) => {
            return action.payload;
        },
        removeUserInfo: () => {
            return null;
        }
    }
})

export const { addUserInfo, removeUserInfo } = userSlice.actions;

export default userSlice.reducer;