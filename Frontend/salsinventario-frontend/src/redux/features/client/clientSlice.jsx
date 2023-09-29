import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clientService from "./clientService";
import { toast } from "react-toastify";

const initialState = {
    client: null,
    clients: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create New Client
export const createClient = createAsyncThunk(
    "clients/create",
    async (formData, thunkAPI) => {
        try {
            return await clientService.createClient(formData);
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

// Get all clients
export const getClients = createAsyncThunk(
    "clients/getAll",
    async (_, thunkAPI) => {
        try {
            return await clientService.getClients();
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

// Delete a Client
export const deleteClient = createAsyncThunk(
    "clients/delete",
    async (id, thunkAPI) => {
        try {
            return await clientService.deleteClient(id);
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

// get a Client
export const findClient = createAsyncThunk(
    "clients/find",
    async (id, thunkAPI) => {
        try {
            return await clientService.findClient(id);
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

// Update Client
export const updateClient = createAsyncThunk(
    "clients/update",
    async (formData, thunkAPI) => {
        try {
            return await clientService.updateClient(formData.id, formData);
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

// get sales by client
export const getSalesFromClient = createAsyncThunk(
    "clients/getSalesByClient",
    async (id, thunkAPI) => {
        try {
            return await clientService.getSalesFromClient(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            toast.error(message);
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const clientSlice = createSlice({
    name: "clients",
    initialState,
    reducers: {
        clearMessage(state) {
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Create New Client
            .addCase(createClient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createClient.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.client = payload;
                toast.success("Cliente creado exitosamente");
            })
            .addCase(createClient.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload;
                toast.error(payload);
            })
            // Get all clients
            .addCase(getClients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getClients.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.clients = payload;
            })
            .addCase(getClients.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload;
                toast.error(payload);
            })
            // Delete a Client
            .addCase(deleteClient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteClient.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.client = payload;
                toast.success("Cliente eliminado exitosamente");
            })
            .addCase(deleteClient.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload;
                toast.error(payload);
            })
            // Get a Client
            .addCase(findClient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(findClient.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.client = payload;
            })
            .addCase(findClient.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload;
                toast.error(payload);
            })
            // Update Client
            .addCase(updateClient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateClient.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.client = payload;
                toast.success("Cliente actualizado exitosamente");
            })
            .addCase(updateClient.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload;
                toast.error(payload);
            })
            // Get sales by client
            .addCase(getSalesFromClient.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSalesFromClient.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.client = payload;
                state.sales = payload.sales;
            })
            .addCase(getSalesFromClient.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = true;
                state.message = payload;
                toast.error(payload);
            });
    },
});

export const selectIsLoading = (state) => state.client.isLoading;
export const selectIsError = (state) => state.client.isError;
export const selectMessage = (state) => state.client.message;
export const selectClient = (state) => state.client.client;

export default clientSlice.reducer;