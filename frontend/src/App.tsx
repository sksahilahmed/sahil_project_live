import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';
import { useI18nStore } from './store/i18n.store';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import './i18n/config';

function App() {
  const { isAuthenticated, fetchProfile } = useAuthStore();
  const { language } = useI18nStore();

  useEffect(() => {
    // Set document language
    document.documentElement.lang = language;

    // Fetch user profile if authenticated
    if (isAuthenticated) {
      fetchProfile().catch(console.error);
    }
  }, [isAuthenticated, language, fetchProfile]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Navigate to="/dashboard" replace />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessments"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Assessments</h1>
                  <p className="text-gray-600 mt-2">Assessment module coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Progress & Reports</h1>
                  <p className="text-gray-600 mt-2">Progress tracking module coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Setup</h1>
                  <p className="text-gray-600 mt-2">Setup module coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/compliance"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Compliance</h1>
                  <p className="text-gray-600 mt-2">Compliance module coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/nudges"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Parent Nudges</h1>
                  <p className="text-gray-600 mt-2">Nudges module coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Admin Console</h1>
                  <p className="text-gray-600 mt-2">Admin module coming soon...</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
