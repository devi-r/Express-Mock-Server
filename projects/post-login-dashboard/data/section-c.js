// Mock data for tests
const learningTests = [
  {
    id: 1,
    subject: "CHM",
    color_tag: "color_7",
    title: "Thermodynamics And Thermochemistry - Neet",
    duration: "30 mins",
    totalQuestions: 25,
    maxMarks: 100,
    difficulty: "Medium",
    description:
      "Comprehensive test on thermodynamics and thermochemistry concepts",
    instructions: "Answer all questions within the time limit",
  },
  {
    id: 2,
    subject: "BIO",
    color_tag: "color_5",
    title: "ICSE 10 Biology Full Test 2",
    duration: "3 hours",
    totalQuestions: 50,
    maxMarks: 200,
    difficulty: "Hard",
    description: "Complete biology assessment covering all major topics",
    instructions: "Read all questions carefully before answering",
  },
  {
    id: 3,
    subject: "MTH",
    color_tag: "color_3",
    title: "JEE Advanced Coordinate Geometry",
    duration: "2 mins",
    totalQuestions: 5,
    maxMarks: 20,
    difficulty: "Easy",
    description: "Quick mathematics assessment for JEE Advanced preparation",
    instructions: "Solve problems step by step",
  },
];

const designData = [
  {
    id: 3,
    title: "Visual Hierarchy Playbook",
    color_tag: "color_4",
  },
  {
    id: 7,
    title: "Color Palette Toolkit",
    color_tag: "color_5",
  },
  {
    id: 6,
    title: "Inclusive Design Guide",
    color_tag: "color_1",
  },
];

// Product type data structure
const productData = {
  learning: {
    getData: () => learningTests,
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
