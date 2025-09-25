import { Href } from "expo-router";

// we make sure, that only valid Links are accepted Here
export const LINKS: { [key: string]: Href } = {
  index: "/",
  profile: "/profile",
  cars: "/cars",
  testPage : "/testPage"
};
