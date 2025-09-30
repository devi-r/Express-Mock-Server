// Mock data for events/upcoming events
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

const getUpcomingClasses = (isProduction = false) => {
  const baseUrl = getBaseUrl(isProduction);

  return [
    {
      id: 1,
      title: "Natural Resources",
      time: formatTime(firstEventStart),
      startTime: firstEventStart.toISOString(),
      endTime: firstEventEnd.toISOString(),
      instructor: "By Akash",
      instructorId: "akash",
      teacherProfilePic: `${baseUrl}/assets/people/akash.png`,
      status: "upcoming",
      duration: "60 mins",
      subject: "Biology",
      description: "Core foundations and basic concepts",
    },
    {
      id: 2,
      title: "Advanced Physics Concepts",
      time: formatTime(new Date(now.getTime() + 2 * 60 * 60 * 1000)),
      startTime: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      endTime: new Date(now.getTime() + 3.5 * 60 * 60 * 1000).toISOString(), // 3.5 hours from now
      instructor: "By Rupali",
      instructorId: "rupali",
      teacherProfilePic: `${baseUrl}/assets/people/rupali.png`,
      status: "upcoming",
      duration: "90 mins",
      subject: "Physics",
      description:
        "Deep dive into advanced physics principles and applications",
    },
    {
      id: 3,
      title: "Introduction to Geometry",
      time: formatTime(new Date(now.getTime() + 24 * 60 * 60 * 1000)),
      startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      endTime: new Date(now.getTime() + 25.25 * 60 * 60 * 1000).toISOString(), // 25.25 hours from now
      instructor: "By Archana",
      instructorId: "archana",
      teacherProfilePic: `${baseUrl}/assets/people/archana.png`,
      status: "upcoming",
      duration: "75 mins",
      subject: "Mathematics",
      description:
        "Advanced mathematical concepts and problem-solving techniques",
    },
    {
      id: 4,
      title: "Chemistry Lab Session",
      time: formatTime(new Date(now.getTime() + 48 * 60 * 60 * 1000)),
      startTime: new Date(now.getTime() + 48 * 60 * 60 * 1000).toISOString(), // 48 hours from now
      endTime: new Date(now.getTime() + 50 * 60 * 60 * 1000).toISOString(), // 50 hours from now
      instructor: "By Prof. Johnson",
      instructorId: "prof-johnson",
      teacherProfilePic: `${baseUrl}/assets/people/prof-johnson.png`,
      status: "upcoming",
      duration: "120 mins",
      subject: "Chemistry",
      description: "Hands-on chemistry experiments and lab techniques",
    },
  ];
};

// Product type data structure
const productData = {
  learning: {
    getData: getUpcomingClasses,
  },
  // Future product types can be added here
  // ecommerce: {
  //   getData: getEcommerceEvents
  // },
  // healthcare: {
  //   getData: getHealthcareEvents
  // }
};

// Function to get data by product type
const getDataByProductType = (
  productType = "learning",
  isProduction = false
) => {
  if (productData[productType] && productData[productType].getData) {
    return productData[productType].getData(isProduction);
  }
  // Default to learning if product type not found
  return productData.learning.getData(isProduction);
};

// For backward compatibility, export the default data (development)
const upcomingEvents = getUpcomingClasses(false);

module.exports = upcomingEvents;
module.exports.getUpcomingClasses = getUpcomingClasses;
module.exports.getDataByProductType = getDataByProductType;
