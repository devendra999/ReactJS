"use client";
import "./globals.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { globalFilterReducer } from "../redux/reducers";
import { GlobalFilterState, SET_GLOBAL_FILTER_STATE, UPDATE_GLOBAL_FILTER_KEY, UpdateGlobalFilterKeyAction } from "@root/redux/globalFilter";
import 'animate.css/animate.min.css';

// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistor, store } from "../redux/store";

const rootReducer = combineReducers({
  globalFilter: globalFilterReducer,
});
 
export const _globalFilter = configureStore({
  reducer: rootReducer,
});

export const dispatch = _globalFilter.dispatch;

export const updateGlobalFilter = (newState: Partial<GlobalFilterState>) => {
  dispatch({ type: SET_GLOBAL_FILTER_STATE, payload: newState });
};

// export const _globalFilter = store.getState();

// Function to create an action to update a specific key in the global filter state
export const updateGlobalFilterKey = (keyPath: string, value: any) =>  {
  dispatch({
    type: UPDATE_GLOBAL_FILTER_KEY,
    payload: {
      keyPath,
      value,
    },
  })
}
    


const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});
const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  // useEffect(() => {
  //   const handleBeforeUnload = async () => {
  //     const isRemembered = JSON.parse(
  //       getFromLocalStorage("@rememberMe") || "{}"
  //     );
  //     if (!isRemembered) {
  //       localStorage.clear();
  //     }
  //   };
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     }
  //   };
  // }, []);

  return (
    <Provider store={_globalFilter}>
    {/* <PersistGate persistor={persistor}> */}
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
              <html lang="en">
                <head>
                  <link
                    rel="icon"
                    href="/favicon.png"
                    type="image/png"
                    sizes="32x32"
                  />
                </head>
                <body>{children}</body>
              </html>
            </QueryClientProvider>
          </ThemeProvider>
        </StyledEngineProvider>
       {/* </PersistGate> */}
    </Provider>
  );
}
