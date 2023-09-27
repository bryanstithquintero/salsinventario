import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import providerService from "./providerService";
import { toast } from "react-toastify";

const initialState = {
    provider: null,
    providers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Crear un nuevo proveedor
export const createProvider = createAsyncThunk(
    "providers/create",
    async (formData, thunkAPI) => {
        try {
            return await providerService.createProvider(formData);
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

// Obtener todos los proveedores
export const getProviders = createAsyncThunk("providers/getAll", async (_, thunkAPI) => {
    try {
        return await providerService.getProviders();
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
});

// Eliminar un proveedor
export const deleteProvider = createAsyncThunk("providers/delete", async (id, thunkAPI) => {
    try {
        return await providerService.deleteProvider(id);
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
});

// Obtener un proveedor por ID
export const findProvider = createAsyncThunk("providers/findProvider", async (id, thunkAPI) => {
    try {
        return await providerService.findProvider(id);
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
});

// Actualizar un proveedor
export const updateProvider = createAsyncThunk(
    "providers/updateProvider",
    async ({ id, formData }, thunkAPI) => {
        try {
            return await providerService.updateProvider(id, formData);
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

// Agregar una compra a un proveedor por ID
export const addPurchaseToProvider = createAsyncThunk(
    "providers/addPurchaseToProvider",
    async ({ id, purchaseData }, thunkAPI) => {
        try {
            return await providerService.addPurchaseToProvider(id, purchaseData);
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

const providerSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createProvider.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProvider.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.providers.push(action.payload);
                toast.success("Provider added successfully");
            })
            .addCase(createProvider.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getProviders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProviders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                console.log(action.payload);
                state.providers = action.payload;
            })
            .addCase(getProviders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(deleteProvider.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProvider.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.provider = action.payload;
                toast.success("Provider deleted successfully");
            })
            .addCase(deleteProvider.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(findProvider.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findProvider.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.provider = action.payload;
            })
            .addCase(findProvider.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(updateProvider.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProvider.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.provider = action.payload;
                toast.success("Provider updated successfully");
            })
            .addCase(updateProvider.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(addPurchaseToProvider.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addPurchaseToProvider.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.provider = action.payload;
                toast.success("Purchase added to provider successfully");
            })
            .addCase(addPurchaseToProvider.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            });
    },
});

export const selectIsLoading = (state) => state.provider.isLoading;
export const selectProvider = (state) => state.provider.provider;
export const selectProviders = (state) => state.provider.providers;

export default providerSlice.reducer;
