/**
 * DECISION: Centralized mock data
 * WHY: Keeping mock data in a separate file promotes separation of concerns,
 * makes it easy to swap with real API data later, and improves testability
 */

export const navigationTabs = [
  { id: 1, label: 'Home', active: true },
  { id: 2, label: 'Products', active: false },
  { id: 3, label: 'Services', active: false },
  { id: 4, label: 'About', active: false },
  { id: 5, label: 'Contact', active: false },
];

export const userMenuItems = [
  { id: 1, label: 'Profile', icon: 'user' },
  { id: 2, label: 'Settings', icon: 'settings' },
  { id: 3, label: 'Logout', icon: 'logout' },
];

/**
 * DECISION: Rich card data with multiple properties
 * WHY: Demonstrates handling complex data structures and provides
 * flexibility for different card types and categories
 */
export const cardsData = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Build modern, scalable web applications with cutting-edge technologies and best practices.',
    category: 'development',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488590028505-98d2b5aba04b?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 2,
    title: 'Mobile Design',
    description: 'Create intuitive mobile experiences that users love with responsive design principles.',
    category: 'design',
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 3,
    title: 'Cloud Solutions',
    description: 'Deploy and manage applications on cloud infrastructure with high availability and security.',
    category: 'cloud',
    images: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 4,
    title: 'Data Analytics',
    description: 'Transform raw data into actionable insights with advanced analytics and visualization.',
    category: 'analytics',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 5,
    title: 'AI & Machine Learning',
    description: 'Leverage artificial intelligence to automate processes and unlock new possibilities.',
    category: 'ai',
    images: [
      'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 6,
    title: 'Cybersecurity',
    description: 'Protect your digital assets with robust security measures and threat prevention strategies.',
    category: 'security',
    images: [
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 7,
    title: 'DevOps Engineering',
    description: 'Streamline development workflows with continuous integration and deployment practices.',
    category: 'development',
    images: [
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556711905-b3f402e1ff80?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 8,
    title: 'UI/UX Design',
    description: 'Craft beautiful and functional user interfaces that enhance user satisfaction and engagement.',
    category: 'design',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&h=600&fit=crop',
    ],
  },
  {
    id: 9,
    title: 'Blockchain Technology',
    description: 'Build decentralized applications and smart contracts on blockchain platforms.',
    category: 'blockchain',
    images: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1644143379190-08a5f055de1d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800&h=600&fit=crop',
    ],
  },
];
