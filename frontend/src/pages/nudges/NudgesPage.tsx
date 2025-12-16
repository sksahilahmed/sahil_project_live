import { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

interface WhatsAppTemplate {
  id: string;
  title: string;
  message: string;
  category: 'CELEBRATION' | 'REMINDER' | 'PROGRESS' | 'GENERAL';
}

const templates: WhatsAppTemplate[] = [
  {
    id: '1',
    title: 'Reading Progress Celebration',
    message: '🎉 Great news! {{studentName}} has improved their reading level to {{band}}. Keep up the excellent work!',
    category: 'CELEBRATION',
  },
  {
    id: '2',
    title: 'Math Achievement',
    message: '🌟 {{studentName}} has mastered {{skill}}! Congratulations on this achievement!',
    category: 'CELEBRATION',
  },
  {
    id: '3',
    title: 'Daily Reminder',
    message: '📚 Reminder: Today is FLN Power Hour. Please ensure {{studentName}} attends school on time.',
    category: 'REMINDER',
  },
  {
    id: '4',
    title: 'Progress Update',
    message: '📊 Progress Update: {{studentName}} is currently at {{band}} level. Let\'s work together to help them improve!',
    category: 'PROGRESS',
  },
];

export function NudgesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<WhatsAppTemplate | null>(null);
  const [studentName, setStudentName] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  const replacePlaceholders = (message: string) => {
    return message
      .replace(/{{studentName}}/g, studentName || 'Student')
      .replace(/{{band}}/g, 'WORD')
      .replace(/{{skill}}/g, 'Addition');
  };

  const handleSend = () => {
    const message = selectedTemplate
      ? replacePlaceholders(selectedTemplate.message)
      : customMessage;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Parent Nudges</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">WhatsApp Templates</h2>
          <div className="space-y-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate?.id === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedTemplate(template);
                  setCustomMessage(template.message);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{template.title}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{template.message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compose Message</h2>
          <div className="space-y-4">
            <Input
              label="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={8}
                placeholder="Type your message or select a template..."
              />
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setCustomMessage('')}>
                Clear
              </Button>
              <Button variant="primary" onClick={handleSend} className="flex-1">
                Send via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

