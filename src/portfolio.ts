const header = {
  homepage: 'https://jingxiangmo.com',
  title: 'JXM',
};

const about = {
  name: 'Muhammad Sohail',
  role: 'Software Developer and Student',
  description:
    "I'm a second-year Computer Science student at McGill University specifically interested in human-machine collaboration frameworks. During my free time, you can always find me playing chess, learning guitar, working out, or reading novels.",
  resume: '/assets/resume.pdf',
  social: {
    linkedin: 'https://www.linkedin.com/in/jingxiangmo?originalSubdomain=ca',
    github: 'https://github.com/jingxiangmo',
  },
};

const projects = [
  {
    name: 'Streamline - Quick Response Paymentrail',
    description:
      'Innovative QR point of sale and payment rail system for cafes, restaurants, and bars. Bringing a simple, effective, and free solution to 5 restaurants in Montreal.',
    stack: ['ReactJS', 'Stripe', 'Firebase'],
    livePreview: 'https://customer-ofour.web.app/',
  },
  {
    name: 'Better Me - AI Mental Health Recommendations',
    description:
      'An AI-powered personal journal that uses NLP analytics and machine learning algorithms to provide appropriate mental health resources and suicide prevention.',
    stack: ['Python', 'Google Cloud', 'NLP', 'Machine Learning', 'JavaScript'],
    livePreview: 'https://share.streamlit.io/better-me-team/better.me/main/app.py',
    sourceCode: 'https://github.com/better-me-team/better.me/tree/de2385cd98051e9b26c3e315a299a20b1a7ed239',
  },
  {
    name: 'Financial Statements Analyzer (In Progress)',
    description:
      'A professional application that analyzes financial statements and market data evaluate company standing.',
    stack: ['Python', 'Django', 'Alpha Vantage API', 'yfinance'],
    sourceCode: 'https://github.com',
  },
  {
    name: 'Mask Effectiveness Physics Particles Simulator',
    description:
      'Led a project to simulate the effectiveness of masks in a physics-based way by simulating particle collisions.',
    stack: ['Python, vpython'],
    sourceCode: 'https://github.com',
    livePreview: 'https://devpost.com/software/mcla',
  },
  {
    name: 'McGill Management Undergraduate Society Website',
    description:
      'A website for the McGill Management Student Society used to communicate with 2500 undergraduate students.',
    stack: ['Website Builder', 'HTML', 'CSS'],
    livePreview: 'https://www.musmcgill.com',
  },
  {
    name: 'Personal Website',
    description:
      'Created my personal website serving as a home page for my presence online. This website was created using React framework with JavaScript and HTML/CSS.',
    stack: ['JavaScript', 'HTML/CSS', 'ReactJS', 'Node.js'],
    livePreview: 'https://jingxiangmo.com',
    sourceCode: 'https://github.com/jingxiangmo/personal-website',
  },
  {
    name: 'zhangqing.ca',
    description: 'A portfolio website for an Vancouver artist.',
    stack: ['ReactJS', 'TailwindCSS'],
    livePreview: 'https://zhangqing.ca',
  },
];

const skills = [
  'Python',
  'Java',
  'C',
  'HTML/CSS',
  'JavaScript',
  'Solidity',
  'Bash',
  'Blockchain',
  'Linux',
  'Financial Modeling',
];

const contact = {
  email: 'jingxiangmo@gmail.com',
};

export { header, about, projects, skills, contact };
