import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { updateStock } from "./productSlice";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  isError: false,
  isSuccess: false,
  message: null,
  total_price: 0,
  totalItemsQuantity: 0,
};

class OutOfStockError extends Error {
  constructor(message) {
    super(message);
    this.name = "OutOfStockError";
  }
}

export const addToCart = createAsyncThunk(
  "cart/AddToCart",
  async (lineItem, thunkAPI) => {
    try {
      const existingStockProduct = await thunkAPI
        .getState()
        .product.products.filter((prod) => prod.id === lineItem.productId);
      if (existingStockProduct && existingStockProduct[0].quantity > 0) {
        thunkAPI.dispatch(updateStock(lineItem));
        return lineItem;
      } else {
        throw new OutOfStockError("Item out of Stock");
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const increaseCartQuantity = createAsyncThunk(
  "cart/increaseCartQuantity",
  async (lineItem, thunkAPI) => {
    try {
      const existingStockProduct = await thunkAPI
        .getState()
        .product.products.filter((prod) => prod.id === lineItem.productId);
      if (existingStockProduct && existingStockProduct[0].quantity > 0) {
        thunkAPI.dispatch(updateStock(lineItem));
        return lineItem;
      } else {
        throw new OutOfStockError("Item out of stock");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const decreaseCartQuantiy = createAsyncThunk(
  "cart/decreaseCartQuantiy",
  async (lineItem, thunkAPI) => {
    try {
      const { productId, quantity } = lineItem;
      const existingLineItem = await thunkAPI
        .getState()
        .cart.items.filter((item) => item.productId === productId);
      if (existingLineItem && existingLineItem[0].quantity > 0) {
        thunkAPI.dispatch(updateStock({ productId, quantity: -quantity }));
        return lineItem;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: () => {
      initialState;
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
      state.total_price = calculateTotalPrice(state.items);
      state.totalItemsQuantity = calculateTotalQuantity(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        updateItemsState(state, action);
        state.isError = false;
        state.isSuccess = true;
        state.total_price = calculateTotalPrice(state.items);
        state.totalItemsQuantity = calculateTotalQuantity(state.items);
      })
      .addCase(increaseCartQuantity.fulfilled, (state, action) => {
        updateItemsState(state, action);
        state.isError = false;
        state.isSuccess = true;
        state.total_price = calculateTotalPrice(state.items);
        state.totalItemsQuantity = calculateTotalQuantity(state.items);
      })
      .addCase(increaseCartQuantity.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(decreaseCartQuantiy.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.productId === action.payload.productId
            ? {
                ...item,
                quantity: item.quantity - 1,
                total: calculateIndividualTotal({
                  ...item,
                  quantity: item.quantity - 1,
                }),
              }
            : item
        );
      });
  },
});

const updateItemsState = (state, action) => {
  const existingItem = state.items.find(
    (item) => item.productId === action.payload.productId
  );
  if (existingItem) {
    existingItem.quantity++;
    existingItem.total = calculateIndividualTotal(existingItem);
  } else {
    state.items.push({
      ...action.payload,
      total: calculateIndividualTotal(action.payload),
    });
  }
};

const calculateIndividualTotal = (item) => {
  const total_price = item.price * item.quantity;
  return total_price;
};

const calculateTotalPrice = (items) => {
  const total_price = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return total_price;
};

const calculateTotalQuantity = (items) => {
  const total_quantity = items.reduce((sum, item) => sum + item.quantity, 0);
  return total_quantity;
};

export const { resetCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
