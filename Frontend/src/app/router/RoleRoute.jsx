import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/routes';

export const RoleRoute = ({ allowedRoles = [] }) => {
  const { user } = useAuth();

  const isAuthorized = allowedRoles.length === 0 || allowedRoles.includes(user?.role);

  return isAuthorized ? <Outlet /> : <Navigate to={ROUTES.DASHBOARD} replace />;
};

export default RoleRoute;
