import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Phone, Mail, MessageSquare } from 'lucide-react';

interface EmergencySupportProps {
  onClose: () => void;
}

const EmergencySupport: React.FC<EmergencySupportProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3 text-red-400">
          <AlertTriangle size={28} />
          <h2 className="text-2xl font-bold">Emergency Support</h2>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          Return to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background-light p-6 rounded-xl border border-red-500/20">
          <h3 className="text-xl font-semibold mb-4">Immediate Assistance</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <Phone size={20} />
              <div>
                <p className="font-medium">Emergency Hotline</p>
                <p className="text-sm">+1 (888) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-red-400">
              <Mail size={20} />
              <div>
                <p className="font-medium">Urgent Email Support</p>
                <p className="text-sm">emergency@threatshield.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-red-400">
              <MessageSquare size={20} />
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-sm">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-background-light p-6 rounded-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-4">Report an Incident</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Incident Type</label>
              <select className="input-control">
                <option>Security Breach</option>
                <option>Data Leak</option>
                <option>System Compromise</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea 
                className="input-control min-h-[120px]"
                placeholder="Describe the emergency situation..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Submit Emergency Report
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 p-6 bg-background-light rounded-xl border border-gray-800">
        <h3 className="text-xl font-semibold mb-4">Emergency Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-medium mb-2">Security Guidelines</h4>
            <p className="text-sm text-gray-400">
              Step-by-step procedures for handling security incidents
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-medium mb-2">Recovery Protocols</h4>
            <p className="text-sm text-gray-400">
              Data and system recovery procedures and best practices
            </p>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-medium mb-2">Contact Directory</h4>
            <p className="text-sm text-gray-400">
              List of emergency contacts and response team members
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencySupport;