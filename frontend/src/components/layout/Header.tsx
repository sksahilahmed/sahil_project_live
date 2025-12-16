import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/auth.store';
import { useI18nStore } from '../../store/i18n.store';
import { Button } from '../common/Button';

export function Header() {
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const { language, setLanguage } = useI18nStore();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'or', label: 'ଓଡ଼ିଆ' },
  ] as const;

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">{t('app.title')}</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    language === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-label={`Switch to ${lang.label}`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* User Info & Logout */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-700">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-gray-500 ml-2">({user.role})</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  {t('auth.logout', 'Logout')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

