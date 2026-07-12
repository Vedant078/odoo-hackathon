import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';

import ProtectedRoute from './ProtectedRoute';
import RoleRoute from './RoleRoute';

import LoginPage from '../../features/auth/pages/LoginPage';
import SignupPage from '../../features/auth/pages/SignupPage';
import ForgotPasswordPage from '../../features/auth/pages/ForgotPasswordPage';

import DashboardPage from '../../features/dashboard/pages/DashboardPage';
import AssetsPage from '../../features/assets/AssetsPage';
import AllocationPage from '../../features/allocation/AllocationPage';
import BookingsPage from '../../features/booking/BookingsPage';
import MaintenancePage from '../../features/maintenance/MaintenancePage';
import AuditsPage from '../../features/audit/AuditsPage';
import ReportsPage from '../../features/reports/ReportsPage';
import NotificationsPage from '../../features/notifications/NotificationsPage';

import OrganizationPage from '../../features/organization/pages/OrganizationPage';
import SettingsPage from '../../features/organization/pages/SettingsPage';

import { ROUTES } from '../../utils/routes';
import { ROLES } from '../../utils/constants';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication routes */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Operational workspace routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
            <Route path={ROUTES.ASSETS} element={<AssetsPage />} />
            <Route path={ROUTES.ALLOCATION} element={<AllocationPage />} />
            <Route path={ROUTES.BOOKINGS} element={<BookingsPage />} />
            <Route path={ROUTES.MAINTENANCE} element={<MaintenancePage />} />
            <Route path={ROUTES.AUDITS} element={<AuditsPage />} />
            <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
            <Route path={ROUTES.NOTIFICATIONS} element={<NotificationsPage />} />

            {/* Admin-only sub-layouts */}
            <Route element={<RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]} />}>
              <Route element={<AdminLayout />}>
                <Route path={ROUTES.ADMIN} element={<OrganizationPage />} />
                <Route path={ROUTES.ADMIN_SETTINGS} element={<SettingsPage />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Fallback Catch-all Route */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
