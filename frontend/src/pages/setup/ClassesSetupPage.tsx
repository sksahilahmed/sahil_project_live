import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { classesService, CreateClassDto } from '../../services/classes.service';
import { useSchoolStore } from '../../store/school.store';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Class } from '../../types';

const classSchema = z.object({
  grade: z.number().min(1).max(10),
  section: z.string().min(1, 'Section is required'),
});

type ClassFormData = z.infer<typeof classSchema>;

export function ClassesSetupPage() {
  const { currentSchool } = useSchoolStore();
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClassFormData>({
    resolver: zodResolver(classSchema),
  });

  useEffect(() => {
    if (currentSchool) {
      loadClasses();
    }
  }, [currentSchool]);

  const loadClasses = async () => {
    if (!currentSchool) return;
    setIsLoading(true);
    try {
      const data = await classesService.getAll(currentSchool.id);
      setClasses(data);
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ClassFormData) => {
    if (!currentSchool) return;
    setIsSubmitting(true);
    try {
      const classData: CreateClassDto = {
        schoolId: currentSchool.id,
        ...data,
      };
      await classesService.create(classData);
      await loadClasses();
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to create class:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentSchool) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please set up a school first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Classes Setup</h1>
        <Button onClick={() => setIsModalOpen(true)}>Add Class</Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Section
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classes.map((cls) => (
                <tr key={cls.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Class {cls.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cls.section}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button className="text-red-600 hover:text-red-800 ml-4">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        title="Add New Class"
        footer={
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
              Create Class
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            label="Grade"
            type="number"
            {...register('grade', { valueAsNumber: true })}
            error={errors.grade?.message}
          />
          <Input
            label="Section"
            {...register('section')}
            error={errors.section?.message}
            placeholder="A"
          />
        </form>
      </Modal>
    </div>
  );
}

