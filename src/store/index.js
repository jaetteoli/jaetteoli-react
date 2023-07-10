import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'
import menuRegisteringReducer from "./menuRegisteringSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        menuRegistering: menuRegisteringReducer
    },
})
