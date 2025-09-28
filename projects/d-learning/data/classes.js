// Mock data for classes/upcoming classes
const now = new Date();
const firstClassStart = new Date(now.getTime() + 2 * 60 * 1000); // 2 minutes from now
const firstClassEnd = new Date(firstClassStart.getTime() + 60 * 60 * 1000); // 60 minutes later

// Get base URL based on environment
const getBaseUrl = (isProduction = false) => {
  return isProduction
    ? "https://express-mock-server-rose.vercel.app"
    : "http://localhost:3001";
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
      time: formatTime(firstClassStart),
      startTime: firstClassStart.toISOString(),
      endTime: firstClassEnd.toISOString(),
      instructor: "By Akash",
      instructorId: "akash",
      teacherProfilePic: `${baseUrl}/assets/teacher-profiles/akash.png`,
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
      teacherProfilePic: `${baseUrl}/assets/teacher-profiles/rupali.png`,
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
      teacherProfilePic: `${baseUrl}/assets/teacher-profiles/archana.png`,
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
      teacherProfilePic: `${baseUrl}/assets/teacher-profiles/prof-johnson.png`,
      status: "upcoming",
      duration: "120 mins",
      subject: "Chemistry",
      description: "Hands-on chemistry experiments and lab techniques",
    },
  ];
};

// For backward compatibility, export the default data (development)
const upcomingClasses = getUpcomingClasses(false);

module.exports = upcomingClasses;
module.exports.getUpcomingClasses = getUpcomingClasses;
