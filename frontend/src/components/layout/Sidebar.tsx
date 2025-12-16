import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/auth.store';

interface NavItem {
  path: string;
  labelKey: string;
  icon?: string;
  roles?: string[];
}

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = useAuthStore();

  const navItems: NavItem[] = [
    { path: '/dashboard', labelKey: 'menu.daily', icon: '📚' },
    { path: '/teaching', labelKey: 'menu.daily', icon: '📖' },
    { path: '/assessments', labelKey: 'menu.assessments', icon: '📊' },
    { path: '/progress', labelKey: 'menu.reports', icon: '📈' },
    { path: '/reports', labelKey: 'menu.reports', icon: '📋' },
    { path: '/setup', labelKey: 'menu.setup', icon: '⚙️' },
    { path: '/compliance', labelKey: 'menu.compliance', icon: '✅' },
    { path: '/nudges', labelKey: 'menu.nudges', icon: '💬' },
  ];

  // Add admin menu for admin users
  if (user?.role === 'ADMIN' || user?.role === 'OFFICER') {
    navItems.push({ path: '/admin', labelKey: 'menu.admin', icon: '🔧' });
  }

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && <span className="text-xl">{item.icon}</span>}
                  <span>{t(item.labelKey)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

