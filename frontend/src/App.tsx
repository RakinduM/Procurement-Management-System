import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import { RoleGuard, UnauthorizedPage } from './components/RoleGuard';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

import UsersPage from './pages/UsersPage';
import SuppliersPage from './pages/SuppliersPage';
import PRListPage from './pages/PRListPage';
import PRCreatePage from './pages/PRCreatePage';
import PRDetailPage from './pages/PRDetailPage';
import POListPage from './pages/POListPage';
import POCreatePage from './pages/POCreatePage';
import PODetailPage from './pages/PODetailPage';
import ApprovalsPage from './pages/ApprovalsPage';
import ApprovalDetailPage from './pages/ApprovalDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes — must be authenticated */}
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>

            {/* Dashboard — accessible to all authenticated users */}
            <Route path="/" element={<Dashboard />} />

            {/* Unauthorized page */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* ── Purchase Requests ── */}
            <Route element={<RoleGuard path="/pr" />}>
              <Route path="/pr" element={<PRListPage />} />
              <Route path="/pr/:id" element={<PRDetailPage />} />
            </Route>
            <Route element={<RoleGuard path="/pr/new" />}>
              <Route path="/pr/new" element={<PRCreatePage />} />
            </Route>

            {/* ── Purchase Orders ── */}
            <Route element={<RoleGuard path="/po" />}>
              <Route path="/po" element={<POListPage />} />
              <Route path="/po/:id" element={<PODetailPage />} />
            </Route>
            <Route element={<RoleGuard path="/po/new" />}>
              <Route path="/po/new" element={<POCreatePage />} />
            </Route>

            {/* ── Approvals ── */}
            <Route element={<RoleGuard path="/approvals" />}>
              <Route path="/approvals" element={<ApprovalsPage />} />
              <Route path="/approvals/:id" element={<ApprovalDetailPage />} />
            </Route>

            {/* ── Suppliers ── */}
            <Route element={<RoleGuard path="/suppliers" />}>
              <Route path="/suppliers" element={<SuppliersPage />} />
            </Route>

            {/* ── User Management ── */}
            <Route element={<RoleGuard path="/users" />}>
              <Route path="/users" element={<UsersPage />} />
            </Route>

          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
