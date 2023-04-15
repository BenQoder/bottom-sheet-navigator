import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useRef,
    useMemo,
    useEffect,
} from "react";
import { SheetContextProps } from "./types";

export const NavigatorContext = createContext<SheetContextProps>({
    currentSheet: { name: "" },
    push: (sheetName: string, params?: { [key: string]: any }) => { },
    close: () => { },
    reset: () => { },
});

export function useSheet() {
    return useContext(NavigatorContext);
}