import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { complianceService, CreateComplianceDto, Compliance } from '../../services/compliance.service';
import { useSchoolStore } from '../../store/school.store';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';

const complianceSchema = z.object({
  type: z.enum(['POSHAN', 'SANITATION', 'MHM', 'INSPECTION']),
  date: z.string().min(1, 'Date is required'),
  status: z.enum(['COMPLETED', 'PENDING', 'ISSUE']),
  remarks: z.string().optional(),
});

type ComplianceFormData = z.infer<typeof complianceSchema>;

export function CompliancePage() {
  const { currentSchool } = useSchoolStore();
  const [records, setRecords] = useState<Compliance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ComplianceFormData>({
    resolver: zodResolver(complianceSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (currentSchool) {
      loadRecords();
    }
  }, [currentSchool]);

  const loadRecords = async () => {
    if (!currentSchool) return;
    setIsLoading(true);
    try {
      const data = await complianceService.getAll(currentSchool.id);
      setRecords(data);
    } catch (error) {
      console.error('Failed to load compliance records:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ComplianceFormData) => {
    if (!currentSchool) return;
    setIsSubmitting(true);
    try {
      const complianceData: CreateComplianceDto = {
        schoolId: currentSchool.id,
        ...data,
        date: new Date(data.date).toISOString(),
      };
      await complianceService.create(complianceData);
      await loadRecords();
      setIsModalOpen(false);
      reset();
    } catch (error) {
      console.error('Failed to create compliance record:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'ISSUE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Compliance Records</h1>
        <Button onClick={() => setIsModalOpen(true)}>New Record</Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Remarks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {record.remarks || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-800">Edit</button>
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
        title="New Compliance Record"
        footer={
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit(onSubmit)} isLoading={isSubmitting}>
              Save Record
            </Button>
          </div>
        }
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              {...register('type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select type</option>
              <option value="POSHAN">PM POSHAN</option>
              <option value="SANITATION">Sanitation</option>
              <option value="MHM">MHM</option>
              <option value="INSPECTION">Inspection</option>
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
          </div>
          <Input
            label="Date"
            type="date"
            {...register('date')}
            error={errors.date?.message}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select status</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="ISSUE">Issue</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
            <textarea
              {...register('remarks')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              rows={3}
              placeholder="Additional notes..."
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

