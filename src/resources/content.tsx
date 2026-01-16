import { About, Gallery, Home, Person, Social, Work } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Nathaniel",
  lastName: "Chan",
  name: `Nathaniel Chan`,
  role: "Software Engineer & Photographer",
  avatar: "/images/avatar.jpg",
  email: "nathaniel@outlook.com.au",
  location: "Australia/Brisbane",
  languages: ["English", "Cantonese"],
};

const social: Social = [
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/radiusxt",
    essential: true,
  },
  {
    name: "Pic-Time",
    icon: "gallery",
    link: "https://hyperdrivemedia.pic-time.com/portfolio",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/nathaniel-chan-/",
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `Hyperdrive Media`,
  description: `A portfolio showcasing my work and experience as a ${person.role.toLowerCase}.`,
  headline:
    <>
      Building software that scales.
      <br />
      Capturing photos that inspire.
    </>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <Text onBackground="brand-medium" variant="body-default-xl">
          Featured Work
        </Text>
      </Row>
    ),
    href: "",
  },
  subline:
    <>
      Hi, I'm Nathaniel, a software engineer & photographer with a passion for building projects like this website you're viewing!
    </>,
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About Me`,
  description: `${person.name}, a ${person.role.toLowerCase} based in ${person.location}.`,
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a software engineer and photographer with a passion for building clean, innovative solutions & capturing inspirational images. Through a seamless blend of technical background with creative perspective, I focus on clarity, precision & impact.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "Enable Startup",
        timeframe: "Nov '24 - Dec '24",
        role: "Software Engineer Intern",
        achievements: [
          <>
            Implemented facial recognition for an attendance system running on a Raspberry Pi 4 while using 20% less resources than reference solution.
          </>,
          <>
            Reduced overall system latency by 15% and maintained {">"}95% uptime.
          </>,
          <>
            Interacted 40+ times by employees for daily attendance & recording lunch breaks.
          </>,
        ],
        images: [],
      },
      {
        company: "ifm efector",
        timeframe: "Dec '22 - May '23",
        role: "L2 Sales Support Engineer",
        achievements: [
          <>
            Provided support on a variety of industrial grade sensors for several industries.
          </>,
          <>
            Discussed with clients to engineer innovative solutions for their applications.
          </>,
          <>
            Improved lead conversion rates by 3.5% through timely communication.
          </>,
          <>
            Reduced average customer waiting times by {">"}15%.
          </>,
        ],
        images: [],
      },
      {
        company: "PTC Phone Tech & Comm",
        timeframe: "Feb '22 - Nov '22",
        role: "Sales & Technician Specialist",
        achievements: [
          <>
            Provided excellent customer service & applied knowledge to consumer electronics while increasing store sales by {">"}10% via strategic upselling.
          </>,
          <>
            Repaired phones & tablets for customers in a timely manner.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "University of Queensland",
        timeframe: "Feb '21 - Nov '25",
        degree: "Bachelor of Engineering (Honours)",
        description: [
          <>
            Software Engineering
          </>,
          <>
            Machine Learning
          </>,
        ],
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Front-End Development",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        tags: [
          {
            name: "HTML",
            icon: "html",
          },
          {
            name: "CSS",
            icon: "css",
          },
        ],
      },
      {
        title: "Back-End Development",
        description: (
          <>Building modern websites and apps.</>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Java",
            icon: "java",
          },
        ],
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Software",
  title: `Projects`,
  description: `Design and development projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // Top project will appear in /home
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Photography",
  title: `Portfolio`,
  description: `Photo galleries by ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, home, about, work, gallery };
