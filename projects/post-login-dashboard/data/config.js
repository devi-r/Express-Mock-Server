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

const config_design_studio = {
  // Brand identity
  brand: "Design Studio",

  // Primary navigation links
  nav: [
    {
      title: "Workshops", // Replaces 'Classes'
    },
    {
      title: "Resource Library", // Replaces 'Subscriptions'
    },
    {
      title: "Portfolio Critique", // Focus on actionable design feedback
    },
    {
      title: "Inspiration", // Replaces 'Content'
    },
  ],

  // Navigation button/user status indicator
  nav_button: [
    {
      label: "35 Credits", // Design-focused currency
    },
  ],

  // Main page title/greeting
  page_title: "Welcome, Designer",

  // Section A: Live, high-priority sessions
  section_a_title: "On Air & Next Up",
  section_a_cta_text: "View All",
  section_a_action_btn_1_text: "Recordings & Assets", // Assets are key in design
  section_a_action_btn_2_text: "Studio Calendar",

  // Section B: Projects
  section_b_title: "Challenges", // Replaces 'Assignments'
  section_b_cta_text: "View All",

  // Section C: Knowledge Checks
  section_c_title: "Cheatsheets", // Replaces 'Tests'
  section_c_cta_text: "View All",

  // Section D: Long-form learning
  section_d_title: "Courses",
  section_d_cta_text: "View All",

  // Section E: Gamification/engagement
  section_e_title: "Design Milestones", // Focus on career progression
  section_e_cta_text: "Claim Daily Brief", // 'Brief' is a design term
  section_e_description:
    "Complete daily design briefs to unlock badges and track your creative progress",

  // Floating support button
  floating_button_text: "Ask Mentor AI",

  // Aesthetic configuration
  primary_color: "#a12850", // A professional, calming teal/cyan
  product_types: [
    {
      label: "Design",
      value: "design",
      description: "Specialized UI/UX, branding, and motion design resources",
    },
  ],
};

// Product type data structure
const productData = {
  learning: {
    getData: () => config_learning,
  },
  design: {
    getData: () => config_design_studio,
  },
};

// Function to get data by product type
const getDataByProductType = (productType = "learning") => {
  // if (productData[productType] && productData[productType].getData) {
  //   return productData[productType].getData();
  // }
  // Default to learning if product type not found
  return productData.design.getData();
};

module.exports.getDataByProductType = getDataByProductType;
