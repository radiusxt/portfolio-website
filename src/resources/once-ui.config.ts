import type {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  StyleConfig,
} from "@/types";
import { Rubik, Geist_Mono } from "next/font/google";
import { home } from "./index";

const baseURL: string = "https://hyperdrivemedia.co/";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/gallery": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
};

const protectedRoutes: ProtectedRoutesConfig = {};

const heading = Rubik({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Rubik({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const label = Rubik({
  variable: "--font-label",
  subsets: ["latin"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

const fonts: FontsConfig = {
  heading: heading,
  body: body,
  label: label,
  code: code,
};

const style: StyleConfig = {
  theme: "dark", // dark | light | system
  neutral: "gray", // sand | gray | slate | custom
  brand: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  accent: "blue", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan | custom
  solid: "contrast", // color | contrast
  solidStyle: "flat", // flat | plastic
  border: "conservative", // rounded | playful | conservative
  surface: "translucent", // filled | translucent
  transition: "all", // all | micro | macro
  scaling: "100", // 90 | 95 | 100 | 105 | 110
};

const dataStyle: DataStyleConfig = {
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

const effects: EffectsConfig = {
  mask: {
    cursor: false,
    x: 50,
    y: 75,
    radius: 125,
  },
  gradient: {
    display: true,
    opacity: 50,
    x: 50,
    y: 25,
    width: 100,
    height: 200,
    tilt: 0,
    colorStart: "brand-alpha-medium",
    colorEnd: "brand-alpha-medium",
  },
  dots: {
    display: false,
    opacity: 60,
    size: "1",
    color: "neutral-alpha-weak",
  },
  grid: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    width: "0.25rem",
    height: "0.25rem",
  },
  lines: {
    display: false,
    opacity: 100,
    color: "neutral-alpha-weak",
    size: "16",
    thickness: 1,
    angle: 45,
  },
};

const schema: SchemaConfig = {
  logo: "",
  type: "Organization",
  name: "Hyperdrive Media",
  description: home.description,
  email: "nathaniel@outlook.com.au",
};

const sameAs: SameAsConfig = {
  github: "https://github.com/radiusxt",
  pictime: "https://hyperdrivemedia.pic-time.com/portfolio",
  linkedin: "https://www.linkedin.com/in/nathaniel-chan-/",
};

export {
  display,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  effects,
  dataStyle,
};
