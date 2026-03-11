export const personal = {
  name: 'Jithnuka Athurugiriya',
  firstName: 'Jithnuka',
  lastName: 'Athurugiriya',
  title: 'Operations Engineer',
  subtitle: 'DevOps · Linux · Telecom Systems',
  email: 'jithnukanimandith2002@gmail.com',
  phone: '+94 70 250 1010',
  location: 'No.01, Maliyadeva Mawatha, Uyandana, Kurunegala',
  linkedin: 'https://www.linkedin.com/in/jithnuka-athurugiriya',
  github: 'https://github.com/jithnukaofficial',
  instagram: 'https://instagram.com/_jithnuka_',
  facebook: 'https://facebook.com/jithnuka-athurugiriya',
  bio: [
    'Motivated DevOps Engineer with hands-on experience in telecom-grade systems supporting **10+ international operators**. Proven background in Linux server administration, Nagios monitoring, MySQL database management, automation, and production support.',
    'Experienced in **PHP and ExtJS** development, with a **100% successful** end-to-end server migration for large-scale systems. Strong communicator with the ability to collaborate across development, QA, and network teams in high-availability environments.',
    'Currently pursuing a **BSc in Computer Science** at the University of Westminster (via IIT, Sri Lanka), graduating in September 2027.',
  ],
}

export const stats = [
  { num: '10+', label: 'Telecom Operators' },
  { num: '100%', label: 'Migration Success' },
  { num: '15+', label: 'Sites Managed' },
  { num: '2+', label: 'Years Experience' },
]

export const experience = [
  {
    id: 1,
    company: 'Omobio (Pvt) Ltd',
    role: 'Associate DevOps Engineer',
    period: 'OCT 2025 – PRESENT',
    isCurrent: true,
    color: '#00d4ff',
    points: [
      'Promoted to Associate DevOps Engineer in recognition of performance and ownership.',
      'Developed and enhanced features using PHP and ExtJS, including a PCAP file download feature for traffic analysis and troubleshooting.',
      'Played a key role in 100% successful server migration of the SMSHub project, ensuring zero data loss and minimal downtime.',
    ],
  },
  {
    id: 2,
    company: 'Omobio (Pvt) Ltd',
    role: 'Trainee DevOps Engineer',
    period: 'APR 2025 – OCT 2025',
    isCurrent: false,
    color: '#00ff9d',
    points: [
      'Worked on a Telecom Firewall project supporting 10+ international telecom operators.',
      'Managed and monitored Linux servers, including log analysis, service management, and troubleshooting.',
      'Used Nagios for system and service monitoring to ensure high availability.',
      'Assisted with MySQL database management, including backups, monitoring, and basic performance checks.',
      'Implemented automation scripts to streamline deployments and routine operational tasks.',
      'Collaborated with cross-functional teams during issue resolution and deployments.',
    ],
  },
  {
    id: 3,
    company: 'CodeOne-X, JFS Holdings Ltd.',
    role: 'Intern – Software Engineering',
    period: 'JUN 2024 – NOV 2024',
    isCurrent: false,
    color: '#ff6b35',
    points: [
      'Served as Project Manager for the Human Resource Management System (HRMS) project.',
      'Managed and updated ~15 WordPress websites across e-commerce, SED, and hotel management verticals.',
      'Hands-on experience in database management.',
    ],
  },
]

export const education = [
  {
    institution: 'University of Westminster',
    degree: 'BSc Computer Science',
    period: 'SEP 2023 – SEP 2027',
    note: 'Delivered via IIT, Sri Lanka',
    badge: 'Expected 2027',
  },
  {
    institution: 'Informatics Institute of Technology (IIT)',
    degree: 'Foundation Certificate for Higher Education (IT)',
    period: 'JAN 2023 – SEP 2023',
    note: '',
    badge: 'Merit',
  },
  {
    institution: 'Maliyadeva College, Kurunegala',
    degree: 'Primary & Secondary Education',
    period: 'FEB 2008 – DEC 2021',
    note: "GCE O/Levels: 9 A's | A/Levels: Bio Science Stream | Scholarship 2012: 171 marks",
    badge: "9 A's",
  },
]

export const skills = [
  {
    category: 'DevOps & Systems',
    icon: '⚙️',
    tags: ['Linux Administration', 'Nagios Monitoring', 'Server Migration', 'Bash Scripting', 'Log Analysis', 'Service Management', 'High Availability', 'PCAP Analysis'],
  },
  {
    category: 'Databases',
    icon: '💾',
    tags: ['MySQL', 'MongoDB', 'DB Backup & Recovery', 'Performance Monitoring'],
  },
  {
    category: 'Backend Development',
    icon: '🖥️',
    tags: ['PHP', 'ExtJS', 'Node.js', 'Express.js', 'Python', 'Java', 'REST APIs'],
  },
  {
    category: 'Frontend & Mobile',
    icon: '🎨',
    tags: ['React.js', 'React Native', 'Expo', 'JavaScript', 'HTML5', 'CSS3', 'Figma'],
  },
  {
    category: 'Dev Tools',
    icon: '🛠️',
    tags: ['Git & GitHub', 'VS Code', 'IntelliJ IDEA', 'Postman', 'GitKraken', 'Google Colab'],
  },
  {
    category: 'Soft Skills',
    icon: '🤝',
    tags: ['Project Management', 'Leadership', 'Critical Thinking', 'Public Relations', 'Teamwork', 'Communication'],
  },
]

export const projects = [
  {
    title: 'Trail Guard',
    subtitle: 'Survival App for Adventurers',
    status: 'In Progress',
    type: 'Academic · Group Project',
    description: 'A mobile application designed for outdoor adventurers with real-time group tracking, safe zone alerts, and intelligent team management features. Built for reliability in remote and off-grid conditions.',
    points: [
      'Designed and implemented the Group Tracking System UI for real-time location tracking and safe zone alerts.',
      'Developed leader appointment popups and member warnings for better group management.',
      'Built the React Native interface with socket integration for real-time updates.',
      'Created a custom navigation bar for seamless app navigation using React Navigation.',
      'Ensured a responsive, user-friendly UI optimized for outdoor use.',
    ],
    stack: ['React Native', 'Expo', 'Socket.io', 'React Navigation', 'GPS API'],
    color: '#ff6b35',
  },
]

export const leadership = [
  { icon: '🎓', title: 'Deputy Head Prefect', org: 'Maliyadeva College' },
  { icon: '🏃', title: 'Sports Captain (Athletics)', org: 'Maliyadeva College' },
  { icon: '📷', title: 'Secretary, Media Unit', org: 'Maliyadeva College' },
  { icon: '🗂️', title: 'Project Manager — HRMS', org: 'CodeOne-X' },
  { icon: '🦁', title: 'Active Member', org: 'Leo Club · IEEE · Rotaract · Esports @ IIT' },
  { icon: '🎭', title: 'Team Manager (Event Crew)', org: "Stage Craft '24" },
]

export const achievements = [
  {
    icon: '🏆',
    title: 'All-Island Schools Athletics Winner',
    desc: 'Provincial and All-Island level champion in athletics representing Maliyadeva College.',
  },
  {
    icon: '🏐',
    title: 'IIT Sports Meet Champion',
    desc: 'Excelled in Volleyball, Tag Rugby, and Cricket at IIT Sports Meet 2023 & 2024.',
  },
  {
    icon: '🚀',
    title: 'Rapid Promotion at Omobio',
    desc: 'Promoted from Trainee to Associate DevOps Engineer within 6 months for outstanding performance.',
  },
]

export const references = [
  {
    name: 'Madhushan Raigamage',
    role: 'Chief Executive Officer',
    company: 'JFS Holdings Ltd.',
    phone: '+94 70 325 6356',
    email: 'madhushanr@jfsholdings.com',
  },
  {
    name: 'Torin Wirasingha',
    role: 'Lecturer / Level Coordinator, Faculty of Computing',
    company: 'Informatics Institute of Technology (IIT)',
    phone: '+94 76 820 9747',
    email: 'torin.w@iit.ac.lk',
  },
  {
    name: 'Shehan Alawatta',
    role: 'Senior Software Architect / Director',
    company: 'Omobio (Pvt) Ltd.',
    phone: '+94 77 279 6816',
    email: 'shehan@omobio.net',
  },
  {
    name: 'Udara Ranasinghe',
    role: 'Senior Operations Engineer',
    company: 'Sysco LABS Sri Lanka',
    phone: '+94 77 712 2539',
    email: 'rtharindu006@gmail.com',
  },
]
