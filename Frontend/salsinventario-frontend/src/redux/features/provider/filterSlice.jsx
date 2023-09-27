import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProviders: [], // Cambia el nombre de la propiedad para reflejar que estás trabajando con proveedores
};

const filterSlice = createSlice({
    name: "filter", // Cambia el nombre del slice si es necesario
    initialState,
    reducers: {
        FILTER_PROVIDERS(state, action) { // Cambia el nombre del reducer para reflejar que estás filtrando proveedores
            const { providers, search } = action.payload; // Asegúrate de ajustar la destructuración según tus necesidades
            if (providers && search) {
                const tempProviders = providers.filter(
                    (provider) =>
                        provider.nombre.toLowerCase().includes(search.toLowerCase()) ||
                        provider.direccion.toLowerCase().includes(search.toLowerCase()) ||
                        provider.telefono.toLowerCase().includes(search.toLowerCase())
                );

                state.filteredProviders = tempProviders;
            } else {
                // Maneja el caso en que providers o search sean undefined o falsy
                state.filteredProviders = [];
            }
        },
    },
});

export const { FILTER_PROVIDERS } = filterSlice.actions; // Cambia el nombre de la acción si es necesario

export const selectFilteredProviders = (state) => state.filter.filteredProviders; // Cambia el nombre de la propiedad si es necesario

export default filterSlice.reducer;
