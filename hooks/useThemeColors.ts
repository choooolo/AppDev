import { RootState } from "@/store";
import { useSelector } from "react-redux";

export function useThemeColors() {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return darkMode
    ? {
        background: "black",
        text: "white",
        subtext: "#aaa",
        border: "#222",
      }
    : {
        background: "white",
        text: "black",
        subtext: "#555",
        border: "#ddd",
      };
}
