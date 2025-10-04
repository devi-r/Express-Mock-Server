// Mock data for assignments
const learningAssignments = [
  {
    id: 1,
    type: "PDF",
    title: "Trignometry PDF",
    subject: "Mathematics",
    color_tag: "color_3",
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
    color_tag: "color_6",
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
    color_tag: "color_4",
    dueDate: "2024-02-25",
    status: "pending",
    description: "",
    points: 120,
    instructions: "Complete theoretical questions",
  },
];

const designData = [
  {
    id: 1,
    title: "Redesign the Everyday",
    color_tag: "color_5",
    points: 100,
  },
  {
    id: 2,
    title: "60-Minute Brand Sprint",
    color_tag: "color_3",
    points: 200,
  },
  {
    id: 3,
    title: "Microinteraction Magic",
    color_tag: "color_6",
    points: 150,
  },
];

// Product type data structure
const productData = {
  learning: {
    getData: () => learningAssignments,
  },
  design: {
    getData: () => designData,
  },
};

// Function to get data by product type
const getDataByProductType = (productType = "design") => {
  // if (productData[productType] && productData[productType].getData) {
  //   return productData[productType].getData();
  // }
  // Default to design if product type not found
  return productData.design.getData();
};

module.exports.getDataByProductType = getDataByProductType;
