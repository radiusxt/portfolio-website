import type { About, Gallery, Home, Person, Social, Work } from "@/types";

export const person: Person = {
  firstName: "Nathaniel",
  lastName: "Chan",
  name: "Nathaniel Chan",
  role: "Software Engineer, Photographer",
  avatar: "/images/brand/avatar.jpg",
  email: process.env.EMAIL_ADDRESS ?? "",
  location: "Australia/Brisbane",
  languages: ["English", "Cantonese"],
};

export const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/radiusxt",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/nathaniel-chan-/",
    essential: true,
  },
  {
    name: "Pic-Time",
    icon: "gallery",
    link: "https://hyperdrivemedia.pic-time.com/portfolio",
    essential: true,
  },
];

export const home: Home = {
  path: "/",
  label: "Home",
  title: "Hyperdrive Media",
  description: `A portfolio showcasing my work and experience as a ${person.role.toLowerCase}.`,
  headline: "Building software that scales. Capturing photos that inspire.",
  subline: "👋 I'm Nathaniel and I'm a",
};

export const about: About = {
  path: "/about",
  label: "About",
  title: "About Me",
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
    description: `\
      Hi, I'm a software engineer working across full-stack software development and sports photography. \
      I enjoy tackling complex, technical challenges to grow my skillset and explore what's possible.
    `
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "University of Queensland",
        timeframe: "Feb '25 - Nov '25",
        role: "Academic Tutor",
        location: "Brisbane, Australia",
        achievements: [
          "Tutored core statistical concepts including probability theory, distributions, sampling, estimation and hypothesis testing \
            with a focus on data analysis, regression modelling and engineering applications in STAT2203.",
          "Tutored microcontroller-based system design, covering embedded C programming, RTOS concepts, hardware interfacing and \
            the integration of sensors, actuators and communication protocols in real-world embedded applications on ARM Cortex processors in CSSE3010."
        ],
        images: [],
      },
      {
        company: "Enable Startup",
        timeframe: "Nov '24 - Dec '24",
        role: "Software Engineer Intern",
        location: "Da Nang, Vietnam",
        achievements: [
          "Implemented facial recognition for an attendance system running on a Raspberry Pi 4 while using 20% less resources than reference solution.",
          "Reduced overall system latency by 15% and maintained 95%+ uptime.",
          "Interacted 40+ times by employees for daily attendance & recording lunch breaks."
        ],
        images: [],
      },
      {
        company: "ifm efector",
        timeframe: "Dec '22 - Jun '23",
        role: "Sales Support Engineer",
        location: "Gold Coast, Australia",
        achievements: [
          "Resolved 98% of customer inquiries within 1 day and reduced average response delay by 10%.",
          "Partnered with 20+ clients to develop solutions, reducing deployment time by 15%.",
          "Reduced customer waiting times by 15% resulting in a 10% increase in service throughput.",
          "Improved lead conversion rates by 3.5% through timely communication.",
        ],
        images: [],
      },
      {
        company: "PTC Phone Tech & Comm",
        timeframe: "Jan '22 - Nov '22",
        role: "Sales & Technician Specialist",
        location: "Brisbane, Australia",
        achievements: [
          "Provided excellent customer service and applied knowledge to consumer electronics while increasing store sales by 10% via strategic upselling.",
          "Repaired phones and tablets in a timely manner, achieving 80% same-day completion.",
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
        degree: "Bachelor of Engineering (Honours)",
        description: [
          "Software Engineering",
          "Machine Learning"
        ],
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Languages",
        description: "Building full-stack applications with AI/ML integrations.",
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Bash",
            icon: "bash",
          },
          {
            name: "C",
            icon: "c",
          },
          {
            name: "SQL",
            icon: "database",
          },
        ],
      },
      {
        title: "Development Tools",
        description: "Deploying production software efficiently for modern, scalable applications.",
        tags: [
          {
            name: "AWS",
            icon: "aws",
          },
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "Terraform",
            icon: "terraform",
          },
          {
            name: "Jupyter",
            icon: "jupyter",
          },
          {
            name: "Git",
            icon: "git",
          },
          {
            name: "Vercel",
            icon: "vercel",
          },
          {
            name: "Claude",
            icon: "claude",
          },
        ],
      },
      {
        title: "Frameworks",
        description: "Accelerating development to build low-latency databases and creative interfaces.",
        tags: [
          {
            name: "PyTorch",
            icon: "pytorch",
          },
          {
            name: "Huggingface",
            icon: "huggingface",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "React",
            icon: "react",
          },
          {
            name: "React Native",
            icon: "react",
          },
          {
            name: "PostgreSQL",
            icon: "postgresql",
          },
          {
            name: "Flask",
            icon: "flask",
          },
        ],
      },
    ],
  },
};

export const work: Work = {
  path: "/work",
  label: "Software",
  title: "Case Studies",
  description: `Case studies by ${person.name}`,
};

export const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Highlights",
  description: `Images by ${person.name}`,
  images: [
    /* Sport */
    {
      src: "/images/gallery/DSC01001.jpg",
      alt: "2025, GT World Challenge Australia, Queensland Raceway, \#888 Kelso Electrical Team MPC, Audi R8 LMS GT3 EVO II",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC00878.jpg",
      alt: "2025, GT World Challenge Australia, Queensland Raceway, \#268 Team BRM/ACM Finance, Audi R8 LMS GT3 EVO II",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC08736.jpg",
      alt: "2025, GT World Challenge Australia, Queensland Raceway, #1 Volante Rosso Motorsport, Aston Martin AMR GT3",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC07600.jpg",
      alt: "2025, Monochrome GT4 Australia, Queensland Raceway, #20 AR Nineteen Motorsport, Mercedes AMG GT4, #17 Love Motorsport TSM, Mercedes AMG GT4",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC07690.jpg",
      alt: "2025, Monochrome GT4 Australia, Queensland Raceway, #62 Wallis Motorsport, Ford Mustang GT4",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC09786.jpg",
      alt: "2025, Monochrome GT4 Australia, Queensland Raceway, #19 AR Nineteen Motorsport, Mercedes AMG GT4",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC04971.jpg",
      alt: "2025, Porsche Michelin Sprint Challenge Australia, Queensland Raceway, #24 McElrea Racing, Porsche 911 GT3 Cup",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC00456.jpg",
      alt: "2025, Radical Cup Australia, Queensland Raceway, #28 Arise Racing, Radical SR3 XXR",
      orientation: "horizontal",
    },
    /* Wildlife */
    {
      src: "/images/gallery/DSC02719.jpg",
      alt: "Taronga Zoo, Meerkat",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/DSC03415.jpg",
      alt: "Taronga Zoo, Red Panda",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/DSC03567.jpg",
      alt: "Taronga Zoo",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/DSC03741.jpg",
      alt: "Taronga Zoo",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/DSC06996.jpg",
      alt: "Chimelong Ocean Kingdom, Dolphin",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/DSC07218.jpg",
      alt: "Chimelong Ocean Kingdom, Dolphin",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC06403.jpg",
      alt: "Chimelong Ocean Kingdom, Dolphin",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC06587.jpg",
      alt: "Chimelong Ocean Kingdom, Sea Lion",
      orientation: "horizontal",
    },
    /* Travel */
    {
      src: "/images/gallery/DSC03850.jpg",
      alt: "West Lake, Wuzhen",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/DSC04421.jpg",
      alt: "West Lake, Hangzhou",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC05095.jpg",
      alt: "Eyes of the GBA Bookstore, Shenzhen",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/DSC05126.jpg",
      alt: "Gangxia North Metro Station, Shenzhen",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC05128.jpg",
      alt: "Gangxia North Metro Station, Shenzhen",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC03395.jpg",
      alt: "Shanghai City at Night, Shanghai",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC07429.jpg",
      alt: "Hong Kong City at Night, Hong Kong SAR",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/DSC07433.jpg",
      alt: "Hong Kong City at Night, Hong Kong SAR",
      orientation: "horizontal",
    },
  ],
};
