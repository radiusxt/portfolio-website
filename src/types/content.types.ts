import type { Entry, GitHubEntry } from "@/components/Dashboard";
import type { IconName } from "@/resources/icons";
import type { zones } from "tzdata";

/** IANA time zone string */
type IANATimeZone = Extract<keyof typeof zones, string>;

/** Represents the featured person in the portfolio */
export interface Person {
  /** First name */
  firstName: string;
  /** Last name  */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  image: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
};

/** Social link configuration */
export interface Social extends Array<{
  /** Name of the social platform */
  name: string;
  /** Social platform icon */
  icon: IconName;
  /** Profile link */
  link: string;
}> {}

/** Base interface for page configuration with common properties */
export interface BasePageConfig {
  /** The path should be relative to the public directory */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image */
  image?: `/images/${string}` | string;
}

/** Home page configuration */
export interface Home extends BasePageConfig {
  /** The headline of the home page */
  headline: React.ReactNode;
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
  /** The text inside TypeFx to complete subline */
  roles: Array<string>;
  /** GitHub username */
  github: string;
  /** Current things I'm working on */
  activity: Array<Entry | GitHubEntry>;
}

/** About page configuration */
export interface About extends BasePageConfig {
  /** Multi-language greeting */
  greetings: Array<string>;
  /** Summary */
  kicker: string;
  /** Introduction section */
  intro: string;
  /** Work experience section */
  work: {
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experience: Array<{
      /** Role or job title */
      role: string;
      /** Company name */
      company: string;
      /** Location of employment */
      location?: string;
      /** Timeframe of employment */
      timeframe: string;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Title for the technical skills section */
    title: string;
    /** List skill categories */
    category: Array<{
      /** Category title*/
      title: string;
      /** Category description */
      description: React.ReactNode;
      /** List of individual skills */
      skills: Array<{
        /** Skill name */
        name: string;
        /** Skill icon */
        icon: string;
      }>;
    }>;
  };
}

/** Projects page configuration */
export interface Work extends BasePageConfig {
  /** Page summary */
  kicker: string;
  /** GitHub tag for repository link */
  link: string;
}

/** Gallery page configuration */
export interface Gallery extends BasePageConfig {
  /** Page summary */
  kicker: string;
  /** Array of highlight images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
  }>;
  /** Subtitle for testimonial section */
  subtitle: string;
  /** */
  subkicker: string;
  /** Array of testimonials from past clients */
  testimonials: Array<{
    /** Name of person */
    person: string;
    /** Organisation they represent */
    organisation: string;
    /** Their experience in writing */
    testimonial: string;
  }>;
  /** Photo galleries */
  galleries: Array<{
    /** Gallery type */
    type: string;
    /** Gallery URL */
    link: string;
  }>;
}
