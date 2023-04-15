import React from "react";

export interface SheetStateProps {
    name: string;
    params?: {
        [key: string]: any;
    };
}
export interface SheetContextProps {
    currentSheet: SheetStateProps;
    push: (SheetStateProps) => void;
    close: () => void;
    reset: () => void;
}
export interface BottomSheetNavigatorProviderProps {
    children: React.ReactNode;
    sheets: { [key: string]: React.ComponentType<any> };
}

export interface SheetProps {
    name: string;
    component: React.ComponentType<any>;
}
