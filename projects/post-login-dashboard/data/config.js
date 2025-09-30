const config_learning = {
  brand: "D-Learning",
  nav: [
    {
      title: "Explore",
    },
    {
      title: "Subscriptions",
    },
    {
      title: "Classes",
    },
    {
      title: "Content",
    },
  ],
  nav_button: [
    {
      label: "2,450 Points",
    },
  ],
  page_title: "Hi Devi",
  section_a_title: "Live & Upcoming Classes",
  section_a_cta_text: "View All",
  section_a_action_btn_1_text: "Replays & Notes",
  section_a_action_btn_2_text: "View Full Schedule",
  section_b_title: "Assignments",
  section_b_cta_text: "View All",
  section_c_title: "Tests",
  section_c_cta_text: "View All",
  section_d_title: "Courses",
  section_d_cta_text: "View All",
  section_e_title: "Earn Points",
  section_e_cta_text: "Start Daily Task",
  section_e_description:
    "Complete daily tasks to earn rewards and track your progress",
  floating_button_text: "Ask D-Learning",
  primary_color: "#a12850", // Default learning brand color
  product_types: [
    {
      label: "Learning",
      value: "learning",
      description: "Educational courses and classes",
    },
  ],
};

const config_gamified = {
  brand: "LevelUp Academy",
  nav: [
    { title: "My Journey" },
    { title: "Challenges" },
    { title: "Live Events" },
    { title: "Rewards" },
  ],
  nav_button: [{ label: "2,450 XP" }],
  page_title: "Ready to play, Devi?",
  section_a_title: "Live Missions & Events",
  section_a_cta_text: "View All",
  section_a_action_btn_1_text: "Mission Replays & Strategy",
  section_a_action_btn_2_text: "View Event Calendar",
  section_b_title: "Active Quests",
  section_b_cta_text: "View Quest Log",
  section_c_title: "Skill Challenges",
  section_c_cta_text: "Face All Challenges",
  section_d_title: "New Worlds to Explore",
  section_d_cta_text: "Explore Map",
  section_e_title: "Daily XP Boost",
  section_e_cta_text: "Start Daily Quest",
  section_e_description:
    "Conquer your daily quests to level up faster and unlock epic rewards.",
  floating_button_text: "Get a Hint",
};

// Product type data structure
const productData = {
  learning: {
    getData: () => config_learning,
  },
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
module.exports = config_learning;
module.exports.getDataByProductType = getDataByProductType;
