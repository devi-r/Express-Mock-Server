// Mock data for tests
const learningTests = [
  {
    id: 1,
    subject: "CHM",
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
    title: "JEE Advanced Coordinate Geometry",
    duration: "2 mins",
    totalQuestions: 5,
    maxMarks: 20,
    difficulty: "Easy",
    description: "Quick mathematics assessment for JEE Advanced preparation",
    instructions: "Solve problems step by step",
  },
];

// Product type data structure
const productData = {
  learning: {
    getData: () => learningTests,
  },
  // Future product types can be added here
  // ecommerce: {
  //   getData: () => ecommerceTests
  // },
  // healthcare: {
  //   getData: () => healthcareTests
  // }
};

// Function to get data by product type
const getDataByProductType = (productType = "learning") => {
  if (productData[productType] && productData[productType].getData) {
    return productData[productType].getData();
  }
  // Default to learning if product type not found
  return productData.learning.getData();
};

// For backward compatibility
module.exports = learningTests;
module.exports.getDataByProductType = getDataByProductType;
