import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      name: 'Lakshita Sharma',
      role: 'Lead Developer',
      college: 'Bhagwan Parshuram Institute of Technology',
      description: 'Specializing in AI and machine learning, Sarah leads the development of our threat detection algorithms.',
      image: '',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:sarah@example.com'
    },
    {
      name: 'Anugya Sharma',
      role: 'Backend Engineer',
      college: 'Bhagwan Parshuram Institute of Technology',
      description: 'Expert in distributed systems and API design, she architected our scalable backend infrastructure.',
      image: '',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:marcus@example.com'
    },
    {
      name: 'Raghav Bhardwaj',
      role: 'UI/UX Designer',
      college: 'Bhagwan Parshuram Institute of Technology',
      description: 'With a background in digital design, raghav crafts intuitive and beautiful user experiences.',
      image: '',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:emily@example.com'
    },
    {
      name: 'Vaishnavi Sachan',
      role: 'Security Specialist',
      college: 'Bhagwan Parshuram Institute of Technology',
      description: 'Focused on cybersecurity, Vaishnavi ensures robust threat detection and data protection.',
      image: '',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:david@example.com'
    },
    {
      name: 'Yash Mishra',
      role: 'ML Engineer',
      college: 'University School of Information and Technology, Dwarka',
      description: 'Specializing in deep learning, Yash develops our advanced content analysis models.',
      image: '',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'mailto:alex@example.com'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="py-8"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-3">Meet Our Team</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The brilliant minds behind ThreatShield, combining expertise in AI, security, and software engineering
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-background-light rounded-xl overflow-hidden border border-gray-800 hover:border-primary/30 transition-all duration-300"
          >
            <div className="aspect-w-16 aspect-h-10 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-1">{member.role}</p>
              <p className="text-sm text-gray-400 mb-3">{member.college}</p>
              <p className="text-sm text-gray-300 mb-4">{member.description}</p>
              
              <div className="flex items-center gap-3">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={member.email}
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamPage;