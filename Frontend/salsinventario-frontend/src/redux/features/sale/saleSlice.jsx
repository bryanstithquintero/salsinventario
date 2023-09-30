import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import saleService from "./saleService";
import { toast } from "react-toastify";

const initialState = {
    sale: null,
    sales: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    totalSellValue: 0,
};

// Create New Sale
export const createSale = createAsyncThunk(
    "sales/create",
    async (formData, thunkAPI) => {
        try {
            return await saleService.createSale(formData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get all sales
export const getSales = createAsyncThunk(
    "sales/getAll",
    async (_, thunkAPI) => {
        try {
            return await saleService.getSales();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete a Sale
export const deleteSale = createAsyncThunk(
    "sales/delete",
    async (id, thunkAPI) => {
        try {
            return await saleService.deleteSale(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// update a Sale
export const updateSale = createAsyncThunk(
    "sales/update",
    async (formData, thunkAPI) => {
        try {
            return await saleService.updateSale(formData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get a sale
export const findSale = createAsyncThunk(
    "sales/findSale",
    async (id, thunkAPI) => {
        try {
            return await saleService.findSale(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const saleSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        CAL_TOTAL_SELL_VALUE: (state, action) => {
            const sales = action.payload;
            const totalSellValue = sales.reduce(
                (total, sale) => total + sale.total,
                0
            );
            state.totalSellValue = totalSellValue;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createSale.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.sale.push(action.payload);
                toast.success("Venta creada con éxito");
            })
            .addCase(createSale.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getSales.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.sales = action.payload;
            })
            .addCase(getSales.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(deleteSale.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.sale = action.payload;
                toast.success("Venta eliminada con éxito");
            })
            .addCase(deleteSale.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(findSale.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.sale = action.payload;
            })
            .addCase(findSale.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateSale.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.sale = action.payload;
                toast.success("Venta actualizada con éxito");
            })
            .addCase(updateSale.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    }
});

export const { CAL_TOTAL_SELL_VALUE } = saleSlice.actions;

export const selectTotalSellValue = (state) => state.sales.totalSellValue;
export const selectSale = (state) => state.sale.sale;
export const selectSales = (state) => state.sale.sales;
export const selectIsLoading = (state) => state.sale.isLoading;

export default saleSlice.reducer;


