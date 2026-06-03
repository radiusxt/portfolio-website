import type { About, Gallery, Home, Person, Social, Work } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Nathaniel",
  lastName: "Chan",
  name: "Nathaniel Chan",
  role: "Software Engineer, Photographer",
  avatar: "/images/brand/avatar.jpg",
  email: "nathaniel@outlook.com.au",
  location: "Australia/Brisbane",
  languages: ["English", "Cantonese"],
};

const social: Social = [
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
  label: "Home",
  title: "Hyperdrive Media",
  description: `A portfolio showcasing my work and experience as a ${person.role.toLowerCase}.`,
  headline:
    <>
      Building software that scales.
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
  },
  subline:
    <>
      I'm Nathaniel and I consider myself a
    </>
};

const about: About = {
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
    description: [
      "Hi, I'm Nathaniel, a recent software engineering graduate from the University of Queensland, working across software development and sports photography.\n",
      "I'm currently seeking a new challenge as a full-stack engineer with a focus on AI/ML development. ",
      "I enjoy tackling technical challenges to push myself and explore what's possible.\n\n",
      "When I'm on the move, I'm experimenting with a range of photography genres: sports, travel, wildlife and anything else catches my eye. ",
      "After more than a decade of following F1 and the WEC, I've ignited my passion to document motorsport through my own lens."
    ].join("")
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
          "Tutored in probability, statistics, modelling and hypothesis testing in STAT2203.",
          "Tutored in embedded systems design using C with ARM microcontrollers, RTOS and hardware interfacing in CSSE3010."
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
          "Reduced overall system latency by 15% and maintained >95% uptime.",
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
          "Provided support on industrial grade sensors for several industries.",
          "Collaborated with clients to engineer solutions for their applications.",
          "Improved lead conversion rates by 3.5% through timely communication.",
          "Reduced average customer waiting times by >15%."
        ],
        images: [],
      },
      {
        company: "PTC Phone Tech & Comm",
        timeframe: "Jan '22 - Nov '22",
        role: "Sales & Technician Specialist",
        location: "Brisbane, Australia",
        achievements: [
          "Provided excellent customer service and applied knowledge to consumer electronics while increasing store sales by >10% via strategic upselling.",
          "Repaired phones and tablets for customers in a timely manner.",
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
        description: (
          <>Building full-stack applications with AI/ML integrations.</>
        ),
        tags: [
          {
            name: "Python",
            description: "Built AI/ML applications for computer vision and RAG solutions.",
            icon: "python",
          },
          {
            name: "JavaScript",
            description: "Integrated RESTful APIs for React-based websites and apps.",
            icon: "javascript",
          },
          {
            name: "TypeScript",
            description: "Deployed a website to showcase my work and experience with Vercel.",
            icon: "typescript",
          },
          {
            name: "C",
            description: "Tutored in embedded systems with mictrocontrollers, RTOS and hardware interfacing.",
            icon: "c",
          },
          {
            name: "HTML",
            description: "Created semantic, accessible pages with optimised loading times.",
            icon: "html",
          },
          {
            name: "CSS",
            description: "Styled responsive layouts with modern CSS/SCSS to enhance user experience.",
            icon: "css",
          },
          {
            name: "SQL",
            description: "Optimised SQL queries for data analysis, reporting & backend data management.",
            icon: "database",
          },
          {
            name: "Bash",
            description: "Streamlined workflows and environments through automated scripts.",
            icon: "bash",
          },
        ],
      },
      {
        title: "Development Tools",
        description: (
          <>Deploying production software efficiently for modern, scalable applications.</>
        ),
        tags: [
          {
            name: "AWS",
            description: "Architected containerized microservices with ECS, EC2, RDS and SQS.",
            icon: "aws",
          },
          {
            name: "Docker",
            description: "Containerised a scalable application with a microservices architecture.",
            icon: "docker",
          },
          {
            name: "Terraform",
            description: "Managed IaC to provision & scale resources for several microservices.",
            icon: "terraform",
          },
          {
            name: "Git",
            description: "Managed multi-branch codebases, handled code reviews and PRs.",
            icon: "git",
          },
          {
            name: "Anaconda",
            description: "Isolated production environments for Jupyter-based workflows.",
            icon: "conda",
          },
          {
            name: "Vercel",
            description: "Deployed a website with fast loading times and dynamic content.",
            icon: "vercel",
          },
          {
            name: "Claude Code",
            description: "Applied Claude Code for AI-assisted coding and agent orchestration.",
            icon: "claude",
          },
          {
            name: "Gemini",
            description: "Utilised Gemini for AI reasoning, workflow assistance and smaller tasks.",
            icon: "gemini",
          },
          {
            name: "Jupyter",
            description: "Preprocessed data and executed experiments to produce visualisations.",
            icon: "jupyter",
          },
          {
            name: "VS Code",
            description: "My IDE of choice for most programming tasks.",
            icon: "vscode",
          },
        ],
      },
      {
        title: "Frameworks",
        description: (
          <>Developing ML applications, scalable backends and modern web interfaces.</>
        ),
        tags: [
          {
            name: "PyTorch",
            description: "Trained and tuned models for computer vision and speech recognition.",
            icon: "pytorch",
          },
          {
            name: "Next.js",
            description: "Implemented optimised, SEO-friendly websites with modern routing.",
            icon: "nextjs",
          },
          {
            name: "React",
            description: "Designed modular, interactive and responsive client-side components.",
            icon: "react",
          },
          {
            name: "React Native",
            description: "Designed modular and reusable cross-platform mobile components.",
            icon: "react",
          },
          {
            name: "PostgreSQL",
            description: "Engineered database schemas and efficient relational queries.",
            icon: "postgresql",
          },
          {
            name: "Flask",
            description: "Developed a lightweight API for a backend microservice.",
            icon: "flask",
          },
          {
            name: "Jest",
            description: "Wrote unit & integration tests ensuring reliability across components.",
            icon: "jest",
          },
        ],
      },
    ],
  },
};

const work: Work = {
  path: "/work",
  label: "Software",
  title: "Projects",
  description: `Software projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Photography",
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

export { person, social, home, about, work, gallery };
