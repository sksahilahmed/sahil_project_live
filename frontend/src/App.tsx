import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.store';
import { useI18nStore } from './store/i18n.store';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SchoolSetupPage } from './pages/setup/SchoolSetupPage';
import { ClassesSetupPage } from './pages/setup/ClassesSetupPage';
import { StudentsSetupPage } from './pages/setup/StudentsSetupPage';
import { SessionsPage } from './pages/teaching/SessionsPage';
import { AssessmentsPage } from './pages/assessments/AssessmentsPage';
import { ProgressHeatmapPage } from './pages/progress/ProgressHeatmapPage';
import { CompliancePage } from './pages/compliance/CompliancePage';
import { NudgesPage } from './pages/nudges/NudgesPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { AdminPage } from './pages/admin/AdminPage';
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
          path="/setup"
          element={
            <ProtectedRoute>
              <Layout>
                <SchoolSetupPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup/classes"
          element={
            <ProtectedRoute>
              <Layout>
                <ClassesSetupPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup/students"
          element={
            <ProtectedRoute>
              <Layout>
                <StudentsSetupPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/teaching"
          element={
            <ProtectedRoute>
              <Layout>
                <SessionsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessments"
          element={
            <ProtectedRoute>
              <Layout>
                <AssessmentsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Layout>
                <ProgressHeatmapPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/compliance"
          element={
            <ProtectedRoute>
              <Layout>
                <CompliancePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/nudges"
          element={
            <ProtectedRoute>
              <Layout>
                <NudgesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Layout>
                <ReportsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
