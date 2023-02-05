import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../utils/Constant";
const initialState = {
  product: [],
  productList: [],
  productLoading: true,
  error: "",
  singleProduct: {},
  singleProductErrorStatus: false,
  updated: false,
  deleted: false,
};

// ! Get All Product
export const fetchProduct = createAsyncThunk("fetchProduct", async (search) => {
  return await axios
    .get(`${url}/api/v1/product/?product=${search}`)
    .then((res) => res.data.result)
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

// ! Get ProductList
export const fetchProductList = createAsyncThunk(
  "fetchProductList",
  async (search) => {
    return await axios
      .get(`${url}/api/v1/product/type/${search}`)
      .then((res) => res.data.result)
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

// ! fetchProductById
export const fetchProductById = createAsyncThunk(
  "fetchProductById",
  async (id) => {
    return await axios
      .get(`${url}/api/v1/product/${id}`)
      .then((res) => res.data.product)
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

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    closeUpdateToggle: (state, action) => {
      state.updated = false;
    },
    clearSingleProductErrorStatus: (state, action) => {
      state.singleProductErrorStatus = false;
    },
  },
  extraReducers: (builder) => {
    // ! Get searched Product
    builder.addCase(fetchProduct.pending, (state) => {
      state.productLoading = true;
      state.product = [];
      state.error = "";
    });

    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.productLoading = false;
      state.error = "";
      console.log("action.payload:", action.payload);
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.productLoading = true;
      state.error = action.error.message;
      state.product = [];
    });

    // ! Get All Product
    builder.addCase(fetchProductList.pending, (state) => {
      state.productLoading = true;
      state.productList = [];
      state.error = "";
    });

    builder.addCase(fetchProductList.fulfilled, (state, action) => {
      state.productLoading = false;
      state.error = "";
      state.productList = action.payload;
    });
    builder.addCase(fetchProductList.rejected, (state, action) => {
      state.productLoading = true;
      state.error = action.error.message;
      state.productList = [];
    });

    // ! Single Product
    builder.addCase(fetchProductById.pending, (state) => {
      state.productLoading = true;
      state.singleProduct = {};
      state.singleProductErrorStatus = false;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productLoading = false;
      state.singleProductErrorStatus = false;
      state.singleProduct = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.productLoading = true;
      state.singleProductErrorStatus = true;
      state.singleProduct = {};
    });
  },
});

export default productSlice.reducer;
export const { clearSingleProductErrorStatus } = productSlice.actions;
