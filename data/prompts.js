/**
 * Sample prompt data for PromptHub
 */

export const categories = [
  "All",
  "Writing",
  "Coding",
  "Marketing",
  "Design",
  "Research",
  "Business",
  "Education",
];

export const prompts = [
  {
    id: 1,
    title: "Expert Code Reviewer",
    description:
      "A thorough code review prompt that checks for bugs, performance issues, security vulnerabilities, and best practices.",
    category: "Coding",
    tags: ["code", "review", "debugging"],
    author: "devmaster",
    likes: 342,
    uses: 1820,
    featured: true,
    content:
      "Review the following code and provide detailed feedback on: 1) Bugs and logical errors, 2) Performance optimizations, 3) Security vulnerabilities, 4) Code style and best practices, 5) Suggested refactoring. Be specific and provide examples where possible.",
  },
  {
    id: 2,
    title: "Blog Post Generator",
    description:
      "Generate engaging, SEO-optimized blog posts with a clear structure, compelling intro, and strong CTA.",
    category: "Writing",
    tags: ["blog", "SEO", "content"],
    author: "contentpro",
    likes: 289,
    uses: 2140,
    featured: true,
    content:
      "Write a comprehensive blog post about [TOPIC]. Include: an attention-grabbing headline, engaging introduction with a hook, 5-7 main sections with subheadings, practical examples and data points, and a compelling conclusion with a call-to-action. Optimize for SEO with natural keyword usage.",
  },
  {
    id: 3,
    title: "Marketing Copy Wizard",
    description:
      "Craft persuasive marketing copy for ads, landing pages, and email campaigns using proven copywriting frameworks.",
    category: "Marketing",
    tags: ["copywriting", "ads", "conversion"],
    author: "adguru",
    likes: 415,
    uses: 3200,
    featured: true,
    content:
      "Create compelling marketing copy for [PRODUCT/SERVICE] targeting [AUDIENCE]. Use the AIDA framework (Attention, Interest, Desire, Action). Include: a powerful headline, benefit-focused body copy, social proof elements, and a clear call-to-action. Tone: [TONE].",
  },
  {
    id: 4,
    title: "Research Summarizer",
    description:
      "Distill complex research papers and articles into clear, actionable summaries with key takeaways.",
    category: "Research",
    tags: ["summary", "analysis", "academic"],
    author: "scholarpro",
    likes: 198,
    uses: 980,
    featured: false,
    content:
      "Summarize the following research/article in a structured format: 1) Main thesis or argument, 2) Key findings (bullet points), 3) Methodology overview, 4) Limitations, 5) Practical implications, 6) Your critical assessment. Keep it concise but comprehensive.",
  },
  {
    id: 5,
    title: "UI/UX Design Critic",
    description:
      "Get expert design feedback on your UI mockups, identifying usability issues and improvement opportunities.",
    category: "Design",
    tags: ["UI", "UX", "feedback"],
    author: "designlead",
    likes: 267,
    uses: 1450,
    featured: false,
    content:
      "Analyze this UI/UX design and provide feedback on: 1) Visual hierarchy and layout, 2) Color scheme and typography, 3) User flow and navigation, 4) Accessibility considerations, 5) Mobile responsiveness, 6) Specific improvement suggestions with rationale.",
  },
  {
    id: 6,
    title: "Business Plan Builder",
    description:
      "Create a comprehensive business plan outline with market analysis, financial projections, and go-to-market strategy.",
    category: "Business",
    tags: ["startup", "planning", "strategy"],
    author: "bizstrategist",
    likes: 321,
    uses: 1670,
    featured: false,
    content:
      "Create a detailed business plan for [BUSINESS IDEA] including: Executive Summary, Market Analysis, Competitive Landscape, Product/Service Description, Marketing Strategy, Operations Plan, Financial Projections (3-year), and Risk Assessment. Target market: [TARGET MARKET].",
  },
  {
    id: 7,
    title: "Lesson Plan Creator",
    description:
      "Design engaging, curriculum-aligned lesson plans with learning objectives, activities, and assessments.",
    category: "Education",
    tags: ["teaching", "curriculum", "learning"],
    author: "educoach",
    likes: 156,
    uses: 890,
    featured: false,
    content:
      "Create a detailed lesson plan for teaching [TOPIC] to [GRADE/LEVEL] students. Include: Learning objectives (SMART goals), Required materials, Warm-up activity (5 min), Main instruction (20 min), Guided practice (10 min), Independent activity (10 min), Assessment method, and Differentiation strategies.",
  },
  {
    id: 8,
    title: "SQL Query Optimizer",
    description:
      "Analyze and optimize SQL queries for better performance, readability, and efficiency.",
    category: "Coding",
    tags: ["SQL", "database", "optimization"],
    author: "dbwizard",
    likes: 234,
    uses: 1230,
    featured: false,
    content:
      "Analyze the following SQL query and provide: 1) Explanation of what it does, 2) Performance issues identified, 3) Optimized version with explanations, 4) Index recommendations, 5) Alternative approaches if applicable. Consider query execution plans and scalability.",
  },
];

export const stats = [
  { label: "Prompts", value: "10,000+" },
  { label: "Users", value: "50,000+" },
  { label: "Categories", value: "20+" },
  { label: "Daily Uses", value: "100K+" },
];

export const features = [
  {
    icon: "🔍",
    title: "Discover Prompts",
    description:
      "Browse thousands of community-crafted prompts across every category imaginable.",
  },
  {
    icon: "⚡",
    title: "Instant Use",
    description:
      "Copy any prompt with one click and start getting better AI results immediately.",
  },
  {
    icon: "🌟",
    title: "Community Rated",
    description:
      "Every prompt is rated and reviewed by real users so you always get the best.",
  },
  {
    icon: "🛠️",
    title: "Submit Your Own",
    description:
      "Share your best prompts with the community and build your reputation.",
  },
  {
    icon: "🏷️",
    title: "Smart Tagging",
    description:
      "Find exactly what you need with our intelligent tagging and search system.",
  },
  {
    icon: "🔒",
    title: "Free Forever",
    description:
      "Core features are always free. No paywalls on the prompts that matter.",
  },
];
