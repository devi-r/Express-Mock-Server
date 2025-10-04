const instructors = [
  { name: "By Akash", id: "akash", profilePic: "akash.png" },
  { name: "By Rupali", id: "rupali", profilePic: "rupali.png" },
  { name: "By Archana", id: "archana", profilePic: "archana.png" },
  {
    name: "By Prof. Johnson",
    id: "prof-johnson",
    profilePic: "prof-johnson.png",
  },
];

const now = new Date();
const classTimes = [
  {
    startTime: new Date(now.getTime() + 1 * 60 * 1000), // 1 minutes from now
    endTime: new Date(now.getTime() + 60 * 60 * 1000), // 60 minutes later
  },
  {
    startTime: new Date(now.getTime() + 2 * 60 * 1000), // 2 hours from now
    endTime: new Date(now.getTime() + 90 * 60 * 1000), // 90 minutes later
  },
  {
    startTime: new Date(now.getTime() + 3 * 60 * 1000), // 3 hours from now
    endTime: new Date(now.getTime() + 75 * 60 * 1000), // 75 minutes later
  },
  {
    startTime: new Date(now.getTime() + 4 * 60 * 1000), // 4 hours from now
    endTime: new Date(now.getTime() + 120 * 60 * 1000), // 120 minutes later
  },
];

const schoolMetaData = [
  {
    title: "Natural Resources",
    subject: "Biology",
    description: "Core foundations and basic concepts",
  },
  {
    title: "Advanced Physics Concepts",
    subject: "Physics",
    description: "Deep dive into advanced physics principles and applications",
  },
  {
    id: 3,
    title: "Introduction to Geometry",
    subject: "Mathematics",
    description:
      "Advanced mathematical concepts and problem-solving techniques",
  },
  {
    id: 4,
    title: "Chemistry Lab Session",
    subject: "Chemistry",
    description: "Hands-on chemistry experiments and lab techniques",
  },
];

const designMetaData = [
  {
    title: "Pixel Perfect UI",
    subject: "UI Design",
    description:
      "Crafting clean, consistent interfaces with design systems and modern patterns.",
  },
  {
    title: "Brand Alchemy",
    subject: "Branding",
    description:
      "Transforming ideas into powerful brand identities that connect with audiences.",
  },
  {
    title: "Type Talks",
    subject: "Typography",
    description:
      "Exploring the voice of type: hierarchy, legibility, and expressive typography.",
  },
  {
    title: "Motion Mastery",
    subject: "Motion Design",
    description:
      "Animating interfaces and stories with principles of motion, timing, and rhythm.",
  },
];

module.exports = {
  instructors,
  classTimes,
  schoolMetaData,
  designMetaData,
};
