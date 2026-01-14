import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Nathaniel",
  lastName: "Chan",
  name: `Nathaniel Chan`,
  role: "Software Engineer & Photographer",
  avatar: "/images/avatar.jpg",
  email: "nathaniel@outlook.com.au",
  location: "Australia/Brisbane", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Cantonese"], // optional: Leave the array empty if you don't want to display languages
};

/*const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};*/

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
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
  title: `${person.firstName}'s Portfolio`,
  description: `Portfolio website showcasing my work and experience as a ${person.role}.`,
  headline:
    <>
      Building software that scales.
      <br />
      Capturing photos that inspire.
    </>,
  /*featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured Work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },*/
  subline:
    <>
      Hi, I'm Nathaniel, a software engineer & photographer with a passion for building projects like this website you're viewing!
    </>,
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About Me`,
  description: `${person.name}, ${person.role} based in ${person.location}.`,
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
        I'm a software engineer and photographer with a passion for building clean, innovative solutions and capturing inspirational images. Through a seamless blend of technical background with creative perspective, I focus on clarity, precision and impact.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
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
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "University of Queensland",
        timeframe: "Feb '21 - Nov '25",
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
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>Building next gen apps with Next.js + Once UI + Supabase.</>
        ),
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

/*const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};*/

const work: Work = {
  path: "/work",
  label: "Software",
  title: `Projects`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Photography",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // These are placeholder images, replace with your own
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
