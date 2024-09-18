import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "./asyncActions";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false
    },
    // Code logic xử lý sync action
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        logout: (state, action) => {
            //console.log(action)
            state.isLoggedIn = false
            state.token = null
            state.current = null
        }
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action (Promise pending)
        builder.addCase(getCurrentUser.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action thành công (Promise fulfilled)
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            //console.log(action);
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.current = action.payload;
        });

        // Khi thực hiện action thất bại (Promise rejected)
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.current = null;
        });
    },
});

export const { login, logout } = userSlice.actions;
//export reducer = reducer(s) = extrareducers
export default userSlice.reducer;
