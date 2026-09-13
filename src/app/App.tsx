import React from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '12px',
          },
        }} 
      />
      <RouterProvider router={router} />
    </>
  );
}