import React, { useCallback, useRef, useMemo, useEffect } from "react";
import BottomSheet, {
  useBottomSheetDynamicSnapPoints,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { SheetProps } from "./types";
import { useSheet } from "./useSheet";

export function Sheet({ name, component: Component }: SheetProps) {
  const { currentSheet, close } = useSheet();
  const ref = useRef<BottomSheet>(null);

  const initialSnapPoints = useMemo(
    () => ["CONTENT_HEIGHT", "CONTENT_HEIGHT"],
    []
  );

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const renderBackdrop = useCallback(
    (props) => (
      <>
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={0}
          appearsOnIndex={1}
          pressBehavior={"close"}
          onPress={handleSheetChanges}
        />
      </>
    ),
    []
  );

  useEffect(() => {
    if (currentSheet?.name === name) {
      ref.current?.snapToIndex(0);
    } else {
      ref.current?.forceClose();
    }
  }, [currentSheet?.name]);

  const handleSheetChanges = (index) => {
    if (index == -1 && currentSheet.name === name) {
      close();
    }
  };

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={false}
      enableOverDrag={false}
      keyboardBehavior={"interactive"}
      keyboardBlurBehavior={"restore"}
      onChange={handleSheetChanges}
    >
      <BottomSheetScrollView onLayout={handleContentLayout}>
        <Component
          {...currentSheet?.params}
          focused={currentSheet?.name === name}
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
}
