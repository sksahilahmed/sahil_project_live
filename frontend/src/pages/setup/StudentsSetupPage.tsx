import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { studentsService, CreateStudentDto } from '../../services/students.service';
import { classesService } from '../../services/classes.service';
import { useSchoolStore } from '../../store/school.store';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Student, Class } from '../../types';

const studentSchema = z.object({
  roll: z.number().min(1),
  name: z.string().min(1, 'Name is required'),
});

type StudentFormData = z.infer<typeof studentSchema>;

export function StudentsSetupPage() {
  const { currentSchool } = useSchoolStore();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
  });

  useEffect(() => {
    if (currentSchool) {
      loadClasses();
    }
  }, [currentSchool]);

  useEffect(() => {
    if (selectedClassId) {
      loadStudents();
    }
  }, [selectedClassId]);

  const loadClasses = async () => {
    if (!currentSchool) return;
    setIsLoading(true);
    try {
      const data = await classesService.getAll(currentSchool.id);
      setClasses(data);
      if (data.length > 0 && !selectedClassId) {
        setSelectedClassId(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load classes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadStudents = async () => {
    if (!selectedClassId) return;
    setIsLoading(true);
    try {
      const data = await studentsService.getAll(selectedClassId);
      setStudents(data);
    } catch (error) {
      console.error('Failed to load students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: StudentFormData) => {
    if (!currentSchool || !selectedClassId) return;
    setIsSubmitting(true);
    try {
      const studentData: CreateStudentDto = {
        schoolId: currentSchool.id,
        classId: selectedClassId,
        ...data,
      };
      await studentsService.create(studentData);
      await loadStudents();
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to create student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCsvImport = async () => {
    if (!csvFile || !selectedClassId || !currentSchool) return;
    setIsSubmitting(true);
    try {
      await studentsService.importFromCSV(selectedClassId, csvFile);
      await loadStudents();
      setCsvFile(null);
      alert('Students imported successfully!');
    } catch (error) {
      console.error('Failed to import students:', error);
      alert('Failed to import students. Please check the CSV format.');
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
        <h1 className="text-3xl font-bold text-gray-900">Students Setup</h1>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleCsvImport}>
            Import CSV
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>Add Student</Button>
        </div>
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

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Roll
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Reading Band
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Math Band
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.roll}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.readingBand || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.mathBand || '-'}
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
        title="Add New Student"
        footer={
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
              Create Student
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <Input
            label="Roll Number"
            type="number"
            {...register('roll', { valueAsNumber: true })}
            error={errors.roll?.message}
          />
          <Input
            label="Student Name"
            {...register('name')}
            error={errors.name?.message}
            placeholder="Enter student name"
          />
        </form>
      </Modal>
    </div>
  );
}

