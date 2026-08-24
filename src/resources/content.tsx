import type { About, Gallery, Home, Person, Social, Work } from "@/types";

export const person: Person = {
  firstName: "Nathaniel",
  lastName: "Chan",
  name: "Nathaniel Chan",
  role: "Software Engineer, Sports Photographer",
  image: "/images/brand/avatar.jpg",
  email: process.env.EMAIL_ADDRESS ?? "",
  location: "Australia/Brisbane",
  locale: "en-AU",
};

export const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/radiusxt",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/nathaniel-chan-/",
  },
];

export const home: Home = {
  path: "/",
  label: "Home",
  title: "Hyperdrive Media",
  description: `A portfolio showcasing my work and experience as a ${person.role.toLowerCase}`,
  headline: "Building software that scales. Capturing images that inspire.",
  subline: "👋 I'm Nathaniel and I'm a",
  roles: [
    "Software Engineer.",
    "Sports Photographer.",
    "Machine Learning Engineer.",
    "Hardware Enthusiast."
  ],
  github: "radiusxt",
  activity: [
    {
      type: "",
      title: "Portfolio Exposure Tool",
      message: "",
      progress: 10
    },
  ],
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
        company: "Freelance",
        timeframe: "Jan '26 - Present",
        role: "Software Engineer",
        location: "Remote",
        achievements: [
          "Built & deployed custom full-stack applications for private clients from initial concept to production, managing the full SDLC.",
          "Styled modern and responsive user interfaces with accessibility features using Next.js and React.",
          "Integrated authentication, databases & cloud infrastructure to deliver scalable solutions with Auth0, Supabase & AWS.",
          "Defined functional and non-functional requirements and iterated rapidly based on user feedback."
        ],
      },
      {
        company: "University of Queensland",
        timeframe: "Feb '25 - Nov '25",
        role: "Academic Tutor",
        location: "Brisbane, Australia",
        achievements: [
          "Tutored core statistical concepts including probability theory, distribution sampling and hypothesis testing \
            with a focus on data analysis, regression modelling and engineering applications in STAT2203.",
          "Tutored microcontroller-based system design, covering embedded C programming, RTOS concepts, hardware interfacing and \
            the integration of sensors, actuators and communication protocols in real-world embedded applications on ARM Cortex processors in CSSE3010."
        ],
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
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "University of Queensland",
        degree: "Bachelor of Software Engineering (Honours), Machine Learning",
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
        description: "Deploying efficient production software for modern, scalable applications.",
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
            name: "Claude",
            icon: "claude",
          },
          {
            name: "Cursor",
            icon: "cursor",
          },
          {
            name: "Git",
            icon: "git",
          },
          {
            name: "Vercel",
            icon: "vercel",
          },
        ],
      },
      {
        title: "Frameworks",
        description: "Accelerating development to build responsive backends and creative interfaces.",
        tags: [
          {
            name: "PyTorch",
            icon: "pytorch",
          },
          {
            name: "Hugging Face",
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
  kicker: "Driving growth & efficiency through thoughtful engineering.",
  link: "GitHub Repository",
};

export const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: "Highlights",
  description: `Images by ${person.name}`,
  kicker: "Greatest hits from the track.",
  images: [
    // 0 - 7
    { src: "/images/gallery/DSC09431.jpg" },
    { src: "/images/gallery/DSC00175.jpg" },
    { src: "/images/gallery/DSC09819.jpg" },
    { src: "/images/gallery/DSC02751.jpg" },
    { src: "/images/gallery/DSC01001.jpg" },
    { src: "/images/gallery/DSC09506.jpg" },
    { src: "/images/gallery/DSC00830.jpg" },
    { src: "/images/gallery/DSC08489.jpg" },
    // 8 - 15
    { src: "/images/gallery/DSC09060.jpg" },
    { src: "/images/gallery/DSC00295.jpg" },
    { src: "/images/gallery/DSC09646.jpg" },
    { src: "/images/gallery/DSC01558.jpg" },
    { src: "/images/gallery/DSC09319.jpg" },
    { src: "/images/gallery/DSC08624.jpg" },
    { src: "/images/gallery/DSC00088.jpg" },
    { src: "/images/gallery/DSC00183.jpg" },
    // 16 - 23
    { src: "/images/gallery/DSC09747.jpg" },
    { src: "/images/gallery/DSC08308.jpg" },
    { src: "/images/gallery/DSC00017.jpg" },
    { src: "/images/gallery/DSC09916.jpg" },
    { src: "/images/gallery/DSC09550.jpg" },
    { src: "/images/gallery/DSC01055.jpg" },
    { src: "/images/gallery/DSC00806.jpg" },
    { src: "/images/gallery/DSC00330.jpg" },
  ],
  subtitle: "Testimonials",
  subkicker: "Real feedback from people I've partnered with.",
  testimonials: [
    {
      person: "Pastor Lai",
      organisation: "Brisbane Cantonese Christian Church",
      testimonial: "Nathaniel beautifully captured the joy and happiness of our congregation, while preserving the solemn, dignified atmosphere of this special occasion. His photographs have given our church precious memories we will treasure for years to come. We express our sincere appreciation to Nathaniel for using his photography talents to preserve these meaningful moments for us.",
    },
  ],
  galleries: [
    // Sport
    {
      type: "sport",
      link: "https://gallery.hyperdrivemedia.co/0EorhjdVk3h6JMrU",
    },
    {
      type: "sport",
      link: "https://gallery.hyperdrivemedia.co/KqjDnqmeokytp2Ae",
    },
    // Travel
    {
      type: "travel",
      link: "https://gallery.hyperdrivemedia.co/Bfu0SHUlYiw6c23O",
    },
    {
      type: "travel",
      link: "https://gallery.hyperdrivemedia.co/kSJBbRPqj890BFHz",
    },
  ],
};
