import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { assessmentsService, CreateReadingAssessmentDto, CreateMathAssessmentDto } from '../../services/assessments.service';
import { studentsService } from '../../services/students.service';
import { classesService } from '../../services/classes.service';
import { useSchoolStore } from '../../store/school.store';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Student, Class, Assessment } from '../../types';

const assessmentSchema = z.object({
  resultBand: z.string().min(1, 'Band is required'),
  wpmOrScore: z.number().optional(),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

const READING_BANDS = ['BEGINNER', 'LETTER', 'WORD', 'PARAGRAPH', 'STORY'] as const;
const MATH_BANDS = ['BEGINNER', 'NUMBER_RECOGNITION', 'ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION'] as const;

export function AssessmentsPage() {
  const { currentSchool } = useSchoolStore();
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [assessmentType, setAssessmentType] = useState<'READING' | 'ARITHMETIC'>('READING');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
  });

  useEffect(() => {
    if (currentSchool) {
      loadClasses();
    }
  }, [currentSchool]);

  useEffect(() => {
    if (selectedClassId) {
      loadStudents();
      loadAssessments();
    }
  }, [selectedClassId]);

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

  const loadStudents = async () => {
    if (!selectedClassId) return;
    try {
      const data = await studentsService.getAll(selectedClassId);
      setStudents(data);
    } catch (error) {
      console.error('Failed to load students:', error);
    }
  };

  const loadAssessments = async () => {
    if (!selectedClassId) return;
    try {
      const data = await assessmentsService.getAll(selectedClassId);
      setAssessments(data);
    } catch (error) {
      console.error('Failed to load assessments:', error);
    }
  };

  const onSubmit = async (data: AssessmentFormData) => {
    if (!selectedStudentId) {
      alert('Please select a student');
      return;
    }
    setIsSubmitting(true);
    try {
      const assessmentData = {
        studentId: selectedStudentId,
        date: new Date().toISOString(),
        resultBand: data.resultBand as any,
        ...(assessmentType === 'READING'
          ? { wpm: data.wpmOrScore }
          : { score: data.wpmOrScore }),
      };

      if (assessmentType === 'READING') {
        await assessmentsService.createReading(assessmentData as CreateReadingAssessmentDto);
      } else {
        await assessmentsService.createMath(assessmentData as CreateMathAssessmentDto);
      }
      await loadAssessments();
      setIsModalOpen(false);
      reset();
      setSelectedStudentId('');
    } catch (error) {
      console.error('Failed to create assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
        <Button onClick={() => setIsModalOpen(true)}>New Assessment</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                Class {cls.grade} - {cls.section}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={assessmentType}
            onChange={(e) => setAssessmentType(e.target.value as 'READING' | 'ARITHMETIC')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="READING">Reading</option>
            <option value="ARITHMETIC">Arithmetic</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Band
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assessments.map((assessment) => (
              <tr key={assessment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assessment.studentId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {assessment.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {assessment.resultBand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(assessment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        title={`New ${assessmentType} Assessment`}
        footer={
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
              Save Assessment
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.roll} - {student.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Band</label>
            <select
              {...register('resultBand')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select band</option>
              {(assessmentType === 'READING' ? READING_BANDS : MATH_BANDS).map((band) => (
                <option key={band} value={band}>
                  {band.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
            {errors.resultBand && (
              <p className="mt-1 text-sm text-red-600">{errors.resultBand.message}</p>
            )}
          </div>
          <Input
            label={assessmentType === 'READING' ? 'Words Per Minute (Optional)' : 'Score (Optional)'}
            type="number"
            {...register('wpmOrScore', { valueAsNumber: true })}
            error={errors.wpmOrScore?.message}
          />
        </form>
      </Modal>
    </div>
  );
}

