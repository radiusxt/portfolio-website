import type { About, Gallery, Home, Person, Social, Work } from "@/types";

export const person: Person = {
  firstName: "Nathaniel",
  lastName: "Chan",
  name: "Nathaniel Chan",
  role: "Software Engineer & Sports Photographer",
  image: "/images/brand/avatar.jpg",
  email: process.env.EMAIL_ADDRESS ?? "",
  location: "Australia/Brisbane",
};

export const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/radiusxt",
  },
  {
    name: "Picflow",
    icon: "gallery",
    link: "https://gallery.hyperdrivemedia.co/",
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
      type: "gh",
      title: "Overlap",
      name: "radiusxt/overlap",
      progress: 10
    },
  ],
  gallery: "https://gallery.hyperdrivemedia.co/KqjDnqmeokytp2Ae",
};

export const about: About = {
  path: "/about",
  label: "About",
  title: "About Me",
  description: `${person.name}, a ${person.role.toLowerCase} based in ${person.location}.`,
  greetings: ["Hi,", "你好,"],
  kicker: "👋 I'm Nathaniel",
  intro: `\
    I'm a full-stack engineer who spends weekdays building and weekends trying to freeze 300km/h in a single frame. Half my brain lives in software development while the other half is somewhere trackside with a camera, chasing shots most people see as a blur.
  
    Same instinct, different channels.

    I'm drawn to solving hard problems worth the effort and dedication it takes to crack. I create my best work with people who care about detail as much as the big picture.
    
    Working on something interesting? Let's talk.
  `,
  work: {
    title: "Experience",
    experience: [
      {
        role: "Software Engineer",
        company: "Freelance",
        timeframe: "Jan '26 - Present",
      },
      {
        role: "Academic Tutor",
        company: "University of Queensland",
        location: "Brisbane, AU",
        timeframe: "Feb '25 - Nov '25",
      },
      {
        role: "Software Engineer Intern",
        company: "Enable Startup",
        location: "Da Nang, VN",
        timeframe: "Nov '24 - Dec '24",
      },
      {
        role: "Sales Support Engineer",
        company: "ifm efector",
        location: "Gold Coast, AU",
        timeframe: "Dec '22 - Jun '23",
      },
      {
        role: "Sales & Technician Specialist",
        company: "PTC Phone Tech & Comm",
        location: "Brisbane, AU",
        timeframe: "Jan '22 - Nov '22",
      },
    ],
  },
  technical: {
    title: "Technical Skills",
    category: [
      {
        title: "Languages",
        description: "Designing and building scalable full-stack applications with AI/ML integrations",
        skills: [
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
        skills: [
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
        skills: [
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
