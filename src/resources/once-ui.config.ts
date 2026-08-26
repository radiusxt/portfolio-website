import type {
  DataStyleConfig,
  FontsConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  StyleConfig,
} from "@/types";
import { Geist_Mono, Rubik } from "next/font/google";
import { home } from "./index";

export const baseURL: string = "https://hyperdrivemedia.co/";

export const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/gallery": true,
};

export const protectedRoutes: ProtectedRoutesConfig = {};

export const heading = Rubik({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const body = Rubik({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const label = Rubik({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

export const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

export const style: StyleConfig = {
  // dark | light | system
  theme: "dark",
  // sand | gray | slate | custom
  neutral: "gray",
  // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  brand: "cyan",
  // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "blue",
  // color | contrast
  solid: "contrast",
  // flat | plastic
  solidStyle: "flat",
  // rounded | playful | conservative
  border: "playful",
  // filled | translucent
  surface: "translucent",
  // all | micro | macro
  transition: "all",
  // 90 | 95 | 100 | 105 | 110
  scaling: "100",
};

export const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

export const schema: SchemaConfig = {
  logo: "",
  type: "Organization",
  name: "Hyperdrive Media",
  description: home.description,
  email: process.env.EMAIL_ADDRESS ?? "",
};

export const sameAs: SameAsConfig = {
  github: "https://github.com/radiusxt",
  linkedin: "https://www.linkedin.com/in/nathaniel-chan-/",
};
