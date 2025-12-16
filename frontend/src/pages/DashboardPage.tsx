import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/auth.store';

export function DashboardPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('menu.daily')} - {t('app.title')}
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Ready to start your teaching session?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <span className="font-medium text-blue-900">Start FLN Power Hour</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <span className="font-medium text-green-900">Conduct Assessment</span>
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <span className="font-medium text-purple-900">Log Period Activity</span>
            </button>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <p className="text-gray-500">No sessions scheduled for today.</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <p className="text-gray-500">No recent activity.</p>
        </div>
      </div>
    </div>
  );
}

