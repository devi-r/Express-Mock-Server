// Mock data for courses
const learningCourses = [
  {
    id: 1,
    title: "Maths course March",
    description: "Short Term • Completed • 01 Mar - 10 Dec",
    status: "completed",
    progress: 100,
    instructor: "Dr. Smith",
    subject: "Mathematics",
    color_tag: "color_1",
    startDate: "2024-03-01",
    endDate: "2024-12-10",
    totalLessons: 50,
    completedLessons: 50,
    rating: 4.5,
    enrolledStudents: 150,
  },
  {
    id: 2,
    title: "Physics 101 - JEE",
    description: "Long Term • Completed • 11 Apr - 12 Dec",
    status: "completed",
    progress: 100,
    instructor: "Prof. Johnson",
    subject: "Physics",
    color_tag: "color_3",
    startDate: "2024-04-11",
    endDate: "2024-12-12",
    totalLessons: 45,
    completedLessons: 45,
    rating: 4.3,
    enrolledStudents: 120,
  },
  {
    id: 3,
    title: "Alkyl Halides - JEE Chemistry",
    description: "Advanced • In Progress • 15 Jan - 30 Jun",
    status: "in_progress",
    progress: 65,
    instructor: "Dr. Wilson",
    subject: "Chemistry",
    color_tag: "color_7",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    totalLessons: 30,
    completedLessons: 20,
    rating: 4.7,
    enrolledStudents: 200,
  },
  {
    id: 4,
    title: "Biology Class 9",
    description: "Full Stack • In Progress • 20 Feb - 15 Aug",
    status: "in_progress",
    progress: 40,
    instructor: "By Pooja",
    subject: "Biology",
    color_tag: "color_4",
    startDate: "2024-02-20",
    endDate: "2024-08-15",
    totalLessons: 25,
    completedLessons: 10,
    rating: 4.6,
    enrolledStudents: 180,
  },
];

const designData = [
  {
    id: 9,
    title: "The Future of Design: AR, VR & Immersive Experiences",
    color_tag: "color_7",
    subject: "AR/VR Design",
  },
  {
    id: 2,
    title: "Prototyping Like a Pro: Figma, XD & Beyond",
    color_tag: "color_3",
    subject: "Prototyping",
  },
  {
    id: 8,
    title: "Color Psychology for Designers",
    color_tag: "color_8",
    subject: "Color Theory",
  },
  {
    id: 5,
    title: "Logos, Colors & Storytelling",
    color_tag: "color_5",
    subject: "Branding",
  },
];

// Product type data structure
const productData = {
  learning: {
    getData: () => learningCourses,
  },
  design: {
    getData: () => designData,
  },
};

// Function to get data by product type
const getDataByProductType = (productType = "design") => {
  if (productData[productType] && productData[productType].getData) {
    return productData[productType].getData();
  }
  // Default to design if product type not found
  return productData.design.getData();
};

module.exports.getDataByProductType = getDataByProductType;
