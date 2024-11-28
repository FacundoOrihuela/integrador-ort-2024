import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice';
import dashboardReducer from '../features/dashboardSlice';
import productReducer from '../features/productSlice';
import categoryReducer from '../features/categorySlice'; // Importa el slice de categorías

export const store = configureStore({
    reducer: {
        login: loginReducer,
        dashboard: dashboardReducer,
        product: productReducer,
        category: categoryReducer,
    },
});