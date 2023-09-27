import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import providerReducer from "../redux/features/provider/providerSlice";
import filterProReducer from "../redux/features/provider/filterSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        filter: filterReducer,
        provider: providerReducer,
        filter2: filterProReducer,
    },
});
