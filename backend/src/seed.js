const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Project = require('./models/Project');

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB for seeding...');

  // Create admin user
  const existing = await User.findOne({ email: 'admin@thilakganji.com' });
  if (!existing) {
    await User.create({
      name: 'Thilak Ganji',
      email: 'admin@thilakganji.com',
      password: 'ThilakAdmin@123',
      role: 'admin'
    });
    console.log('Admin user created: admin@thilakganji.com / ThilakAdmin@123');
  }

  // Seed sample projects
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany([
      {
        title: 'Sales Analytics Dashboard',
        category: 'Business Intelligence',
        description: 'Interactive Power BI dashboard tracking $2M+ in sales across 12 regions with real-time KPI monitoring.',
        technologies: ['Power BI', 'DAX', 'SQL Server', 'Excel'],
        metrics: { label1: 'Revenue Tracked', value1: '$2M+', label2: 'Regions', value2: '12' },
        featured: true,
        order: 1
      },
      {
        title: 'E-Commerce Full-Stack App',
        category: 'Web Development',
        description: 'Full-stack web application with React frontend and Node.js backend, featuring user auth and product CRUD.',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
        metrics: { label1: 'Uptime', value1: '99.9%', label2: 'Users', value2: '500+' },
        featured: true,
        order: 2
      },
      {
        title: 'Financial Forecast Model',
        category: 'Financial Modelling',
        description: 'DCF valuation and 3-year revenue forecast model for an Australian startup, used to secure seed funding.',
        technologies: ['Excel', 'VBA', 'Python', 'Matplotlib'],
        metrics: { label1: 'Funding Secured', value1: '$150K', label2: 'Accuracy', value2: '94%' },
        featured: true,
        order: 3
      }
    ]);
    console.log('Sample projects seeded');
  }

  await mongoose.disconnect();
  console.log('Seeding complete');
};

seedData().catch(console.error);
