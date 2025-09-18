import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { type ComponentProps } from "react";

// derives component Name
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

// we get the icons checked at dev time 🎉
const ICONS = {
  HOME: "home" as IconName,
  PROFIILE: "carrot" as IconName,
  CARS: "car" as IconName,
} as const;

export { IconName, ICONS };

// some typescript profi here?
// find that as IconName quite annoying, but otherwise the auto-completion doesn't work :(
