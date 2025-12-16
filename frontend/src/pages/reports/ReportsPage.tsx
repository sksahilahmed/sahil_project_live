import { useState, useEffect } from 'react';
import { veqiService, VEQI } from '../../services/veqi.service';
import { useSchoolStore } from '../../store/school.store';
import { Button } from '../../components/common/Button';

export function ReportsPage() {
  const { currentSchool } = useSchoolStore();
  const [veqiRecords, setVeqiRecords] = useState<VEQI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuarter, setSelectedQuarter] = useState<string>('');

  useEffect(() => {
    if (currentSchool) {
      loadVEQI();
    }
  }, [currentSchool]);

  const loadVEQI = async () => {
    if (!currentSchool) return;
    setIsLoading(true);
    try {
      const data = await veqiService.getAll(currentSchool.id);
      setVeqiRecords(data);
    } catch (error) {
      console.error('Failed to load VEQI records:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateVEQI = async () => {
    if (!currentSchool || !selectedQuarter) {
      alert('Please select a quarter');
      return;
    }
    setIsLoading(true);
    try {
      await veqiService.calculate({
        schoolId: currentSchool.id,
        quarter: selectedQuarter,
      });
      await loadVEQI();
      alert('VEQI calculated successfully!');
    } catch (error) {
      console.error('Failed to calculate VEQI:', error);
      alert('Failed to calculate VEQI');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentQuarter = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    return `${year}-Q${quarter}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reports & VEQI Dashboard</h1>
        <div className="flex space-x-4">
          <input
            type="text"
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            placeholder={getCurrentQuarter()}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <Button onClick={calculateVEQI} isLoading={isLoading}>
            Calculate VEQI
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {veqiRecords.map((veqi) => (
          <div key={veqi.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{veqi.quarter}</h3>
            <div className="mb-4">
              <div className="text-3xl font-bold mb-2">
                <span className={getScoreColor(veqi.totalScore)}>{veqi.totalScore}</span>
                <span className="text-gray-500 text-lg">/100</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Teaching:</span>
                <span className="font-medium">{veqi.componentScores.teaching}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Assessments:</span>
                <span className="font-medium">{veqi.componentScores.assessments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Compliance:</span>
                <span className="font-medium">{veqi.componentScores.compliance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement:</span>
                <span className="font-medium">{veqi.componentScores.engagement}</span>
              </div>
            </div>
            {veqi.planActions.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Action Plan:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {veqi.planActions.slice(0, 3).map((action, idx) => (
                    <li key={idx}>• {action}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {veqiRecords.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600">No VEQI records found. Calculate one to get started.</p>
        </div>
      )}
    </div>
  );
}

