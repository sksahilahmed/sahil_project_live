import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateSessionDto } from '../../services/sessions.service';
import { classesService } from '../../services/classes.service';
import { useSchoolStore } from '../../store/school.store';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Class } from '../../types';
import { useSessionStore } from '../../store/session.store';

const sessionSchema = z.object({
  activeMinutes: z.number().min(1).max(60),
  notes: z.string().optional(),
});

type SessionFormData = z.infer<typeof sessionSchema>;

export function SessionsPage() {
  const { currentSchool } = useSchoolStore();
  const { sessions, fetchSessions, createSession } = useSessionStore();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activityIds, setActivityIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SessionFormData>({
    resolver: zodResolver(sessionSchema),
  });

  useEffect(() => {
    if (currentSchool) {
      loadClasses();
    }
  }, [currentSchool]);

  useEffect(() => {
    if (selectedClassId) {
      fetchSessions(selectedClassId);
    }
  }, [selectedClassId, fetchSessions]);

  const loadClasses = async () => {
    if (!currentSchool) return;
    try {
      const data = await classesService.getAll(currentSchool.id);
      setClasses(data);
      if (data.length > 0 && !selectedClassId) {
        setSelectedClassId(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load classes:', error);
    }
  };

  const onSubmit = async (data: SessionFormData) => {
    if (!selectedClassId) return;
    setIsSubmitting(true);
    try {
      const sessionData: CreateSessionDto = {
        classId: selectedClassId,
        date: new Date().toISOString(),
        activityIds,
        activeMinutes: data.activeMinutes,
        notes: data.notes,
      };
      await createSession(sessionData);
      setIsModalOpen(false);
      reset();
      setActivityIds([]);
    } catch (error) {
      console.error('Failed to create session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">FLN Power Hour Sessions</h1>
        <Button onClick={() => setIsModalOpen(true)}>Start New Session</Button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
        <select
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a class</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              Class {cls.grade} - Section {cls.section}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">
                {new Date(session.date).toLocaleDateString()}
              </h3>
              <span className="text-sm text-gray-500">{session.activeMinutes} min</span>
            </div>
            {session.notes && (
              <p className="text-sm text-gray-600 mb-2">{session.notes}</p>
            )}
            <div className="text-xs text-gray-500">
              {session.activityIds.length} activities
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        title="Start New Session"
        footer={
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
              Save Session
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            label="Active Minutes"
            type="number"
            {...register('activeMinutes', { valueAsNumber: true })}
            error={errors.activeMinutes?.message}
            placeholder="35"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              {...register('notes')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Session notes..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

