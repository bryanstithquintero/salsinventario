import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/features/product/productSlice";
import filterReducer from "../redux/features/product/filterSlice";
import providerReducer from "../redux/features/provider/providerSlice";
import filterProReducer from "../redux/features/provider/filterSlice";
import clientReducer from "../redux/features/client/clientSlice";
import filterCliReducer from "../redux/features/client/filterSlice";
import saleReducer from "../redux/features/sale/saleSlice";

export const store = configureStore({
    reducer: {
        product: productReducer,
        filter: filterReducer,
        provider: providerReducer,
        filter2: filterProReducer,
        client: clientReducer,
        filter3: filterCliReducer,
        sale: saleReducer,
    },
});
