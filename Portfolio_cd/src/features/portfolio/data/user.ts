import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Tavish",
  lastName: "",
  displayName: "Tavish",
  username: "tavishnew",
  gender: "male",
  pronouns: "he/him",
  bio: "I build, yes i really do",
  flipSentences: [
    "I build, yes i really do",
    "Software Engineer",
    "From Concept to Deployment",
  ],
  address: "Uttar Pradesh, India",
  age: 21,
  college: "MAIT'27",
  phoneNumber: "KzkxIDk0MTYyOTM3NTc=", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "dGF2aXNoMDU1NEBnbWFpbC5jb20=", // base64 encoded
  website: "https://69ftw.site",
  resumeUrl:
    "https://drive.google.com/file/d/1o9TbDL1hQBCibAGo7C6onqJ4R2hXeN73/view?usp=sharing",
  jobTitle: "Software Engineer",
  jobs: [
    {
      title: "Software Engineer",
      company: "Zineps",
      website: "https://zineps.com",
      experienceId: "zineps",
    },
    {
      title: "Founding Engineer",
      company: "Actory AI",
      website: "https://actory.ai",
      experienceId: "actory",
    },
  ],
  about: `
I'm Tavish, a 21 year old software engineer from India who likes building efficient, scalable, and intuitive products. I'm currently a Software Engineer at Zineps and a Founding Engineer at Actory AI, working across full-stack product engineering, backend systems, infrastructure, and early stage startup execution.
`,
  avatar: "/images/light-img.jpg",
  avatarVariants: {
    lightOff: "/images/light-img.jpg",
    darkOff: "/images/dark-img.jpg",
  },
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-dark.png?t=1778602757",
  namePronunciationUrl: "https://assets.chanhdai.com/audio/chanhdai.mp3",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "India",
  keywords: [
    "ncdai",
    "nguyenchanhdai",
    "nguyen chanh dai",
    "chanhdai",
    "chanh dai",
    "iamncdai",
    "quaric",
    "zadark",
    "nguyễn chánh đại",
    "chánh đại",
  ],
  dateCreated: "2023-10-20", // YYYY-MM-DD
}