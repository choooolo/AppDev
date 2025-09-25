import { RootState } from "@/store";
import { darkTheme, lightTheme } from "@/theme";
import { useEffect } from "react";
import { interpolateColor, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { useSelector } from "react-redux";

export function useAnimatedTheme() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  // progress animates from 0 (light) → 1 (dark)
  const progress = useSharedValue(darkMode ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(darkMode ? 1 : 0, { duration: 400 }); // ✅ smooth transition
  }, [darkMode]);

  // animated background & text colors
  const background = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 1], [lightTheme.background, darkTheme.background])
  );

  const text = useDerivedValue(() =>
    interpolateColor(progress.value, [0, 1], [lightTheme.text, darkTheme.text])
  );

  return { background, text };
}
