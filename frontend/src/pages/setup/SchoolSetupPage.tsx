import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSchoolStore } from '../../store/school.store';
import { schoolsService, CreateSchoolDto } from '../../services/schools.service';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

const schoolSchema = z.object({
  name: z.string().min(1, 'School name is required'),
  code: z.string().optional(),
  mediums: z.array(z.string()).min(1, 'At least one medium is required'),
  grades: z.array(z.number()).min(1, 'At least one grade is required'),
});

type SchoolFormData = z.infer<typeof schoolSchema>;

export function SchoolSetupPage() {
  const { setCurrentSchool } = useSchoolStore();
  const [facilities, setFacilities] = useState({
    toilets: false,
    handwash: false,
    mhm: false,
    kitchen: false,
    library: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      mediums: [],
      grades: [],
    },
  });

  const mediums = ['or', 'hi', 'en'];
  const grades = [1, 2, 3, 4, 5];

  const selectedMediums = watch('mediums');
  const selectedGrades = watch('grades');

  const toggleMedium = (medium: string) => {
    const current = selectedMediums || [];
    if (current.includes(medium)) {
      setValue('mediums', current.filter((m) => m !== medium));
    } else {
      setValue('mediums', [...current, medium]);
    }
  };

  const toggleGrade = (grade: number) => {
    const current = selectedGrades || [];
    if (current.includes(grade)) {
      setValue('grades', current.filter((g) => g !== grade));
    } else {
      setValue('grades', [...current, grade]);
    }
  };

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const schoolData: CreateSchoolDto = {
        ...data,
        facilitiesFlags: facilities,
      };
      const school = await schoolsService.create(schoolData);
      setCurrentSchool(school);
      alert('School created successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create school');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">School Setup</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
        <Input
          label="School Name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Village Primary School"
        />

        <Input
          label="UDISE Code (Optional)"
          {...register('code')}
          error={errors.code?.message}
          placeholder="21123456789"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mediums of Instruction <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            {mediums.map((medium) => (
              <label key={medium} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedMediums?.includes(medium) || false}
                  onChange={() => toggleMedium(medium)}
                  className="mr-2"
                />
                <span className="capitalize">{medium}</span>
              </label>
            ))}
          </div>
          {errors.mediums && (
            <p className="mt-1 text-sm text-red-600">{errors.mediums.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grades <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            {grades.map((grade) => (
              <label key={grade} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedGrades?.includes(grade) || false}
                  onChange={() => toggleGrade(grade)}
                  className="mr-2"
                />
                <span>Class {grade}</span>
              </label>
            ))}
          </div>
          {errors.grades && (
            <p className="mt-1 text-sm text-red-600">{errors.grades.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(facilities).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) =>
                    setFacilities((prev) => ({ ...prev, [key]: e.target.checked }))
                  }
                  className="mr-2"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save School
          </Button>
        </div>
      </form>
    </div>
  );
}

