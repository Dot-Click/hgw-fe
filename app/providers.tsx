"use client";

import { Toast } from "@heroui/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Toast.Provider placement="top end" />
      {children}
    </Provider>
  );
}
