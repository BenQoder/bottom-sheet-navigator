import React, { useState, useCallback } from "react";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { BottomSheetNavigatorProviderProps, SheetStateProps } from "./types";
import { Sheet } from "./Sheet";
import { NavigatorContext } from "./useSheet";

export function BottomSheetNavigatorProvider({
  children,
  sheets = {},
}: BottomSheetNavigatorProviderProps) {
  const [sheetHistory, setSheetHistory] = useState<SheetStateProps[]>([]);
  const [currentSheet, setCurrentSheet] = useState<SheetStateProps>(null);

  const push = useCallback(
    (sheetName, params = null) => {
      if (sheetName === currentSheet?.name) {
        return null;
      }

      if (!Object.keys(sheets).includes(sheetName)) {
        return null;
      }

      const newSheet = { name: sheetName, params };

      setCurrentSheet(newSheet);
      setSheetHistory([...sheetHistory, newSheet]);
    },
    [currentSheet, sheetHistory]
  );

  const close = useCallback(() => {
    const previousSheet = sheetHistory[sheetHistory.length - 2];

    if (!previousSheet || previousSheet?.name === currentSheet?.name) {
      setCurrentSheet(null);
      setSheetHistory([]);
      return null;
    }

    setSheetHistory([
      ...sheetHistory.filter((sheet) => sheet.name !== currentSheet?.name),
    ]);
    setCurrentSheet(previousSheet);
  }, [sheetHistory]);

  const reset = useCallback(() => {
    setCurrentSheet(null);
    setSheetHistory([]);
  }, []);

  const contextValue = { currentSheet, push, close, reset };

  return (
    <BottomSheetModalProvider>
      <NavigatorContext.Provider value={contextValue}>
        {children}
        {sheetHistory.map((sheet) => {
          const Component = sheets[sheet.name];
          return (
            <Sheet key={sheet.name} name={sheet.name} component={Component} />
          );
        })}
      </NavigatorContext.Provider>
    </BottomSheetModalProvider>
  );
}

export default BottomSheetNavigatorProvider;
