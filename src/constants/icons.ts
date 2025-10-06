import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { type ComponentProps } from "react";

// derives component Name
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

// we get the icons checked at dev time 🎉
const ICONS = {
  HOME: "home" as IconName,
  PROFIILE: "face-man-profile" as IconName,
  CARROT: "carrot",
  CARS: "car" as IconName,
  SEAT: "account" as IconName,
  BAGS: "bag-personal" as IconName,
  TRANSMISSION: "car-shift-pattern" as IconName,
  PRICE_TAG: "currency-eur" as IconName,
  ENGINE: "engine" as IconName,
  DOOR: "car-door" as IconName,
  CAR_NOT_AVAILABLE: "car-info" as IconName,
} as const;

export { IconName, ICONS };

// some typescript profi here?
// find that as IconName quite annoying, but otherwise the auto-completion doesn't work :(
