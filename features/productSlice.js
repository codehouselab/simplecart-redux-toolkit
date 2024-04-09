import { createSlice } from "@reduxjs/toolkit";
import product_data from "../store/product-data";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    get_products: (state, action) => {
      state.products = product_data.map((p) => p);
    },
    updateStock: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.products.find((prod) => prod.id === productId);
      if (product && product.quantity !== -1) {
        product.quantity -= quantity;
      }
    },
  },
});

export const { get_products, updateStock } = productSlice.actions;

export default productSlice.reducer;
