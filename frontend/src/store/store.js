import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/loginSlice';
import dashboardReducer from '../features/dashboardSlice';
import productReducer from '../features/productSlice';
import categoryReducer from '../features/categorySlice';

export const store = configureStore({
    reducer: {
        login: loginReducer,
        dashboard: dashboardReducer,
        product: productReducer,
        category: categoryReducer,
    },
});