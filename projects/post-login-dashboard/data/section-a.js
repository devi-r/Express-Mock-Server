// Mock data for events/upcoming events
const {
  instructors,
  classTimes,
  schoolMetaData,
  designMetaData,
} = require("./class-data");

const now = new Date();
const firstEventStart = new Date(now.getTime() + 1 * 60 * 1000); // 1 minutes from now
const firstEventEnd = new Date(firstEventStart.getTime() + 60 * 60 * 1000); // 60 minutes later

// Get base URL based on environment
const getBaseUrl = (isProduction = false) => {
  return isProduction
    ? "https://express-mock-server-rose.vercel.app"
    : "http://localhost:4000";
};

const formatTime = (date) => {
  return (
    date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
};

const getUpcomingClasses = (isProduction = false, productType = "learning") => {
  const baseUrl = getBaseUrl(isProduction);

  // Select class data based on product type
  let classesData;

  if (productType === "design") {
    classesData = designMetaData;
  } else {
    // Default to learning/school classes
    classesData = schoolMetaData;
  }

  // Generate dynamic classes based on the selected class data
  return classesData.map((classData, index) => {
    const instructor = instructors[index] || instructors[0];
    const startTime = classTimes[index].startTime; // Stagger classes by hours
    const endTime = classTimes[index].endTime;

    return {
      id: classData.id || index + 1,
      title: classData.title,
      time: formatTime(startTime),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      instructor: instructor.name,
      instructorId: instructor.id,
      teacherProfilePic: `${baseUrl}/assets/people/${instructor.profilePic}`,
      status: "upcoming",
      duration: classTimes[index].duration,
      subject_tag: classData.subject,
      color_tag: `color_${index + 1}`,
      description: classData.description,
    };
  });
};

// Product type data structure
const productData = {
  learning: {
    getData: (isProduction = false) =>
      getUpcomingClasses(isProduction, "learning"),
  },
  design: {
    getData: (isProduction = false) =>
      getUpcomingClasses(isProduction, "design"),
  },
};

// Function to get data by product type
const getDataByProductType = (productType = "design", isProduction = false) => {
  if (productData[productType] && productData[productType].getData) {
    return productData[productType].getData(isProduction);
  }
  // Default to design if product type not found
  return productData.design.getData(isProduction);
};

module.exports = {
  getDataByProductType,
};
