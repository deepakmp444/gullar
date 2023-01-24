import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/Constant";
const initialState = {
  userProfile: {},
  logout: false,
  profileLoading: true,
  loginButtonBasedOnProfile: false,
  error: "",
  updated: false,
  accountCreated: false,
  accountCreatedButton: false,
  deleted: false,
  accountVarified: false,
  accountVarifiedError: "",
  userProfileChangeMessage: "",
  userProfileChangeMessageError: "",
  forgotPasswordInfo: "",
  forgotPasswordInfoError: "",
  PasswordChangeInfo: "",
  PasswordChangeInfoError: "",
};

// ! User create account
export const createAccount = createAsyncThunk(
  "createAccount",
  async ({ name, email, password }) => {
    return await axios
      .post(`${url}/api/v1/user/create-account`, {
        name,
        email,
        password,
      })
      .then((res) => res.data.status)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error("Bad Request");
        }
        if (err.response.status === 500) {
          throw Error("Server Errors");
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

// ! User login
export const loginAccount = createAsyncThunk(
  "loginAccount",
  async ({ email, password }) => {
    return await axios
      .post(`${url}/api/v1/user/login`, {
        email,
        password,
      })
      .then((res) => res.data.profile)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error(err.message);
        }
        if (err.response.status === 500) {
          throw Error(err.message);
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

// !  getUserProfile
export const getUserProfile = createAsyncThunk("getUserProfile", async () => {
  return await axios
    .get(`${url}/api/v1/user/me`)
    .then((res) => res.data.profile)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 404) {
        throw Error(err.message);
      }
      if (err.response.status === 500) {
        throw Error(err.message);
      }
      if (err.response.status !== 404) {
        throw Error(err.response.data.message);
      }
    });
});

// !  userLogout
export const userLogout = createAsyncThunk("userLogout", async () => {
  return await axios
    .post(`${url}/api/v1/user/logout`)
    .then((res) => res.data.succes)
    .catch((err) => {
      console.log("err", err);
      if (err.response.status === 404) {
        throw Error(err.message);
      }
      if (err.response.status === 500) {
        throw Error(err.message);
      }
      if (err.response.status !== 404) {
        throw Error(err.response.data.message);
      }
    });
});

// !  userVarified
export const userVarified = createAsyncThunk(
  "userVarified",
  async ({ email }) => {
    return await axios
      .post(`${url}/api/v1/user/verify-email`, { email })
      .then((res) => res.data.success)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error(err.message);
        }
        if (err.response.status === 500) {
          throw Error(err.message);
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

// !  user Name change
export const userNameUpdate = createAsyncThunk(
  "userNameUpdate",
  async ({ email, name }) => {
    return await axios
      .put(`${url}/api/v1/nameChange`, { email, name })
      .then((res) => res.data.message)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error(err.message);
        }
        if (err.response.status === 500) {
          throw Error(err.message);
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

// !  user Password change
export const userPasswordUpdate = createAsyncThunk(
  "userPasswordUpdate",
  async ({ email, oldPassword, newPassword }) => {
    return await axios
      .put(`${url}/api/v1/passwordChange`, { email, oldPassword, newPassword })
      .then((res) => res.data.message)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error(err.message);
        }
        if (err.response.status === 500) {
          throw Error(err.message);
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

// !  User Name & Password change
export const userNamePasswordUpdate = createAsyncThunk(
  "userNamePasswordUpdate",
  async ({ email, name, oldPassword, newPassword }) => {
    return await axios
      .put(`${url}/api/v1/passwordNameChange`, {
        email,
        name,
        oldPassword,
        newPassword,
      })
      .then((res) => res.data.message)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error(err.message);
        }
        if (err.response.status === 500) {
          throw Error(err.message);
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

// !  User Forgot Password
export const userForgotPassword = createAsyncThunk(
  "userForgotPassword",
  async ({ email }) => {
    return await axios
      .post(`${url}/api/v1/forgotpassword`, {
        email,
      })
      .then((res) => res.data.message)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error(err.message);
        }
        if (err.response.status === 500) {
          throw Error(err.message);
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

// !  User  Password Changed
export const userPasswordChange = createAsyncThunk(
  "userPasswordChange",
  async ({ password, repassword, id }) => {
    return await axios
      .put(`${url}/api/v1/password-change`, {
        password,
        repassword,
        id,
      })
      .then((res) => res.data.message)
      .catch((err) => {
        console.log("err", err);
        if (err.response.status === 404) {
          throw Error(err.message);
        }
        if (err.response.status === 500) {
          throw Error(err.message);
        }
        if (err.response.status !== 404) {
          throw Error(err.response.data.message);
        }
      });
  }
);

const userSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    clearUpdatedInfoAndError: (state, action) => {
      state.userProfileChangeMessage = "";
      state.userProfileChangeMessageError = "";
    },
    clearForgotPasswordInfoAndError: (state, action) => {
      state.forgotPasswordInfo = "";
      state.forgotPasswordInfoError = "";
    },
    clearAuthError: (state, action) => {
      state.error = "";
    },
    clearAccountCreated: (state, action) => {
      state.accountCreated = false;
    },
  },
  extraReducers: (builder) => {
    // ! Account create
    builder.addCase(createAccount.pending, (state) => {
      state.accountCreated = false;
      state.error = "";
      state.accountCreatedButton = true;
    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.accountCreated = true;
      state.error = "";
      state.accountCreatedButton = false;
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      state.accountCreated = false;
      state.error = action.error.message;
      state.accountCreatedButton = false;
    });

    // ! Login
    builder.addCase(loginAccount.pending, (state) => {
      state.profileLoading = true;
      state.userProfile = {};
      state.error = "";
      state.loginButtonBasedOnProfile = true;
    });
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.userProfile = action.payload;
      state.error = "";
      state.loginButtonBasedOnProfile = false;
    });
    builder.addCase(loginAccount.rejected, (state, action) => {
      state.profileLoading = true;
      state.userProfile = {};
      state.error = action.error.message;
      state.loginButtonBasedOnProfile = false;
    });

    // ! get Profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.profileLoading = true;
      state.userProfile = {};
      state.error = "";
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.userProfile = action.payload;
      state.error = "";
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.profileLoading = true;
      state.userProfile = {};
      state.error = "";
    });

    // ! userLogout
    builder.addCase(userLogout.pending, (state) => {
      state.logout = false;
      state.error = "";
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.logout = true;
      state.error = "";
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.logout = false;
      state.error = action.error.message;
    });

    // ! user Varified
    builder.addCase(userVarified.pending, (state) => {
      state.accountVarified = false;
      state.accountVarifiedError = "";
    });
    builder.addCase(userVarified.fulfilled, (state, action) => {
      state.accountVarified = true;
      state.accountVarifiedError = "";
    });
    builder.addCase(userVarified.rejected, (state, action) => {
      state.accountVarified = false;
      state.accountVarifiedError = action.error.message;
    });

    // ! user Name change
    builder.addCase(userNameUpdate.pending, (state) => {
      state.userProfileChangeMessageError = "";
      state.userProfileChangeMessage = "";
    });
    builder.addCase(userNameUpdate.fulfilled, (state, action) => {
      state.userProfileChangeMessageError = "";
      state.userProfileChangeMessage = action.payload;
    });
    builder.addCase(userNameUpdate.rejected, (state, action) => {
      state.userProfileChangeMessage = "";
      state.userProfileChangeMessageError = action.error.message;
    });

    // ! user Password change
    builder.addCase(userPasswordUpdate.pending, (state) => {
      state.userProfileChangeMessageError = "";
      state.userProfileChangeMessage = "";
    });
    builder.addCase(userPasswordUpdate.fulfilled, (state, action) => {
      state.userProfileChangeMessageError = "";
      state.userProfileChangeMessage = action.payload;
    });
    builder.addCase(userPasswordUpdate.rejected, (state, action) => {
      state.userProfileChangeMessage = "";
      state.userProfileChangeMessageError = action.error.message;
    });

    // ! user Name & Password change
    builder.addCase(userNamePasswordUpdate.pending, (state) => {
      state.userProfileChangeMessageError = "";
      state.userProfileChangeMessage = "";
    });
    builder.addCase(userNamePasswordUpdate.fulfilled, (state, action) => {
      state.userProfileChangeMessageError = "";
      state.userProfileChangeMessage = action.payload;
    });
    builder.addCase(userNamePasswordUpdate.rejected, (state, action) => {
      state.userProfileChangeMessage = "";
      state.userProfileChangeMessageError = action.error.message;
    });

    // ! Forgot password
    builder.addCase(userForgotPassword.pending, (state) => {
      state.forgotPasswordInfoError = "";
      state.forgotPasswordInfo = "";
    });
    builder.addCase(userForgotPassword.fulfilled, (state, action) => {
      state.forgotPasswordInfoError = "";
      state.forgotPasswordInfo = action.payload;
    });
    builder.addCase(userForgotPassword.rejected, (state, action) => {
      state.forgotPasswordInfoError = action.error.message;
      state.forgotPasswordInfo = "";
    });

    // ! password Change
    builder.addCase(userPasswordChange.pending, (state) => {
      state.PasswordChangeInfoError = "";
      state.PasswordChangeInfo = "";
    });
    builder.addCase(userPasswordChange.fulfilled, (state, action) => {
      state.PasswordChangeInfoError = "";
      state.PasswordChangeInfo = action.payload;
    });
    builder.addCase(userPasswordChange.rejected, (state, action) => {
      state.PasswordChangeInfoError = action.error.message;
      state.PasswordChangeInfo = "";
    });
  },
});

export default userSlice.reducer;
export const {
  clearUpdatedInfoAndError,
  clearForgotPasswordInfoAndError,
  clearAuthError,
  clearAccountCreated
} = userSlice.actions;
