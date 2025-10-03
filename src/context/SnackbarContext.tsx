import { createContext, ReactNode, useContext, useState } from "react";

interface SnackbarState {
  message: string;
  isVisible: boolean;
}

interface SnackbarContextType {
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
  state: SnackbarState;
}

//our initial Snackbar can be undefined as it is not shown
const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

/**
 * Creation of a SnackbarProvider wrapping the whole Application.
 * @see useSnackbar() documentation
 */
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    message: "",
    isVisible: false,
  });

  const showSnackbar = (message: string) => {
    setSnackbarState({ message, isVisible: true });
  };

  const hideSnackbar = () => {
    setSnackbarState((prevState) => ({ ...prevState, isVisible: false }));
  };

  const value = { showSnackbar, hideSnackbar, state: snackbarState };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

/**
 * Hook for accessing the Snackbar Context
 * @returns {showSnackbar, hideSnackbar, state} : SnackbarContextType
 * Use showSnackbar to create a Snackbar
 * @example
 * ```
 * const {showSnackbar} = useSnackbar()
 * showSnackbar("Error loading Cars")
 * ```
 */
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar has be used within a <SnackbarProvider>");
  }
  return context;
};
