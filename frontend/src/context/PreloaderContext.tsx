import React, { createContext, useContext, useState, ReactNode } from "react";

interface PreloaderContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export const PreloaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <PreloaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </PreloaderContext.Provider>
  );
};

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
