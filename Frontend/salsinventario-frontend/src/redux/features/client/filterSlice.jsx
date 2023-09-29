import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredClients: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_CLIENTS(state, action) {
            const { clients, search } = action.payload;
            const tempClients = clients.filter(
                (client) =>
                    client.name.toLowerCase().includes(search.toLowerCase())
            );

            state.filteredClients = tempClients;
        },
    },
});

export const { FILTER_CLIENTS } = filterSlice.actions;

export const selectFilteredClients = (state) => state.filter.filteredClients;

export default filterSlice.reducer;