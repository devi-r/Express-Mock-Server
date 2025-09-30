// Mock data for assignments
const learningAssignments = [
  {
    id: 1,
    type: "PDF",
    title: "Trignometry PDF",
    subject: "Mathematics",
    dueDate: "2024-02-15",
    status: "pending",
    description: "Basic mathematical concepts and problem sets",
    points: 100,
    instructions: "Complete all problems and show your work",
  },
  {
    id: 2,
    type: "DOC",
    title: "CBSE-9-Physics-Motion-Fast track",
    subject: "Physics",
    dueDate: "2024-02-20",
    status: "pending",
    description: "Comprehensive assignment on motion and kinematics",
    points: 150,
    instructions: "Solve all numerical problems and explain concepts",
  },
  {
    id: 3,
    type: "DOC",
    title: "Crash course: CBSE-9-Biology-Tissues",
    subject: "Biology",
    dueDate: "2024-02-25",
    status: "pending",
    description: "",
    points: 120,
    instructions: "Complete theoretical questions",
  },
];

// Product type data structure
const productData = {
  learning: {
    getData: () => learningAssignments,
  },
  // Future product types can be added here
  // ecommerce: {
  //   getData: () => ecommerceAssignments
  // },
  // healthcare: {
  //   getData: () => healthcareAssignments
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
module.exports = learningAssignments;
module.exports.getDataByProductType = getDataByProductType;
