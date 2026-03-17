import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes inside Layout */}
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pr" element={<div className="text-xl font-bold">Purchase Requests Coming Soon</div>} />
            <Route path="/po" element={<div className="text-xl font-bold">Purchase Orders Coming Soon</div>} />
            <Route path="/approvals" element={<div className="text-xl font-bold">Approvals Coming Soon</div>} />
            <Route path="/suppliers" element={<div className="text-xl font-bold">Suppliers Coming Soon</div>} />
            <Route path="/users" element={<div className="text-xl font-bold">Users Coming Soon</div>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
