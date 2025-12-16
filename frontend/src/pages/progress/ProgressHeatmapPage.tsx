import { useState, useEffect } from 'react';
import { assessmentsService, HeatmapData } from '../../services/assessments.service';
import { classesService } from '../../services/classes.service';
import { useSchoolStore } from '../../store/school.store';
import { Class } from '../../types';

const BAND_COLORS: Record<string, string> = {
  BEGINNER: 'bg-red-200',
  LETTER: 'bg-orange-200',
  WORD: 'bg-yellow-200',
  PARAGRAPH: 'bg-green-200',
  STORY: 'bg-blue-200',
  NUMBER_RECOGNITION: 'bg-purple-200',
  ADDITION: 'bg-pink-200',
  SUBTRACTION: 'bg-indigo-200',
  MULTIPLICATION: 'bg-teal-200',
  DIVISION: 'bg-cyan-200',
};

export function ProgressHeatmapPage() {
  const { currentSchool } = useSchoolStore();
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [viewType, setViewType] = useState<'READING' | 'ARITHMETIC'>('READING');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentSchool) {
      loadClasses();
    }
  }, [currentSchool]);

  useEffect(() => {
    if (selectedClassId) {
      loadHeatmap();
    }
  }, [selectedClassId, viewType]);

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

  const loadHeatmap = async () => {
    if (!selectedClassId) return;
    setIsLoading(true);
    try {
      const data = await assessmentsService.getHeatmap(selectedClassId);
      setHeatmapData(data);
    } catch (error) {
      console.error('Failed to load heatmap:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getBandColor = (band: string) => {
    return BAND_COLORS[band] || 'bg-gray-200';
  };

  const getLatestBand = (student: HeatmapData) => {
    const bands = viewType === 'READING' ? student.readingBands : student.mathBands;
    if (bands.length === 0) return null;
    return bands[bands.length - 1];
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Progress Heatmap</h1>
        <div className="flex space-x-4">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                Class {cls.grade} - {cls.section}
              </option>
            ))}
          </select>
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value as 'READING' | 'ARITHMETIC')}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="READING">Reading</option>
            <option value="ARITHMETIC">Arithmetic</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading heatmap...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Roll
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Latest Band
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {heatmapData.map((student) => {
                  const latest = getLatestBand(student);
                  const bands = viewType === 'READING' ? student.readingBands : student.mathBands;
                  return (
                    <tr key={student.studentId}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.roll}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.studentName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {latest ? (
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${getBandColor(
                              latest.band
                            )}`}
                          >
                            {latest.band.replace(/_/g, ' ')}
                          </span>
                        ) : (
                          <span className="text-gray-400">No assessment</span>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex space-x-1">
                          {bands.slice(-5).map((band, idx) => (
                            <div
                              key={idx}
                              className={`w-8 h-8 rounded ${getBandColor(band.band)}`}
                              title={`${band.band} - ${new Date(band.date).toLocaleDateString()}`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

