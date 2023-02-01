import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/Constant";

const initialState = {
  address: [],
  addressLoading: true,
  orderAddress: {},
  error: "",
  updateAddress: false,
  addressCreated: false,
  updateAddressDB: false,
  updateAddressDBError:"",
  updateAddressId: "",
  deleteAddressStatus: false,
};

// ! Get Address
export const fetchAddress = createAsyncThunk("fetchAddress", async () => {
  return await axios
    .get(`${url}/api/v1/address`)
    .then((res) => res.data.address)
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

// ! Delete Address
export const deleteUserAddress = createAsyncThunk(
  "deleteUserAddress",
  async ({ id }) => {
    return await axios
      .delete(`${url}/api/v1/address/${id}`)
      .then((res) => res.data.satus)
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

// ! Add Address
export const addUserAddress = createAsyncThunk(
  "addUserAddress",
  async ({ name, email, phone, state, city, landmark, pincode }) => {
    return await axios
      .post(`${url}/api/v1/address`, {
        name,
        email,
        phone,
        state,
        city,
        landmark,
        pincode,
      })
      .then((res) => res.data.status)
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

// ! Update Address
export const updateUserAddressId = createAsyncThunk(
  "updateUserAddressId",
  async ({ name, email, phone, state, city, landmark, pincode, addressId }) => {
    return await axios
      .put(`${url}/api/v1/address`, {
        name,
        email,
        phone,
        state,
        city,
        landmark,
        pincode,
        addressId,
      })
      .then((res) => res.data.status)
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

const addressSlice = createSlice({
  name: "addressSlice",
  initialState,
  reducers: {
    orderAddressReducer: (state, action) => {
      state.orderAddress = action.payload;
    },
    updateAddressIdReducer: (state, action) => {
      state.updateAddressId = action.payload;
      state.updateAddress = true;
    },
    updateRemoveAddressIdReducer: (state, action) => {
      state.updateAddressId = "";
      state.updateAddress = false;
    },
  },
  extraReducers: (builder) => {
    // ! Fetch Address
    builder.addCase(fetchAddress.pending, (state) => {
      state.addressLoading = true;
      state.address = [];
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.addressLoading = false;
      state.address = action.payload;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.addressLoading = true;
      state.address = [];
    });

    // ! Add Adress
    builder.addCase(addUserAddress.pending, (state) => {
      state.addressCreated = false;
      state.updateAddressDBError = "";
    });
    builder.addCase(addUserAddress.fulfilled, (state, action) => {
      state.addressCreated = true;
      state.updateAddressDBError = "";
    });
    builder.addCase(addUserAddress.rejected, (state, action) => {
      state.addressCreated = false;
      state.updateAddressDBError = "Validation Error";
    });

    // ! update Adress
    builder.addCase(updateUserAddressId.pending, (state) => {
      state.updateAddressDB = false;
      state.error = "";
    });
    builder.addCase(updateUserAddressId.fulfilled, (state, action) => {
      state.updateAddressDB = true;
      state.error = "";
    });
    builder.addCase(updateUserAddressId.rejected, (state, action) => {
      state.updateAddressDB = false;
      state.error = action.payload;
    });

    // ! Delete Adress
    builder.addCase(deleteUserAddress.pending, (state) => {
      state.deleteAddressStatus = false;
      state.error = "";
    });
    builder.addCase(deleteUserAddress.fulfilled, (state, action) => {
      state.deleteAddressStatus = true;
      state.error = "";
    });
    builder.addCase(deleteUserAddress.rejected, (state, action) => {
      state.deleteAddressStatus = false;
      state.error = action.payload;
    });
  },
});

export default addressSlice.reducer;
export const {
  orderAddressReducer,
  updateAddressIdReducer,
  updateRemoveAddressIdReducer,
} = addressSlice.actions;
