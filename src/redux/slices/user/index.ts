import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";
import { UserKeys } from "@/configs";

const initialState: User = {
  _id: "",
  username: "",
  fullName: "",
  firstName: "",
  lastName: "",
  email: "",
  birthDay: null,
  nationality: "",
  gender: "",
  avatar: {
    secure_url: "",
    public_id: null
  }
};

const userSlice = createSlice({
  name: UserKeys.NAME,
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => ({
      ...state,
      ...action.payload,
    }),
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
