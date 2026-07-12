import { useAuth } from './useAuth';
import { hasPermission, isAuthorized } from '../utils/permissions';

export const usePermissions = () => {
  const { user } = useAuth();
  const role = user?.role || null;

  const checkPermission = (permission) => {
    return hasPermission(role, permission);
  };

  const checkRole = (allowedRoles) => {
    return isAuthorized(role, allowedRoles);
  };

  return {
    role,
    checkPermission,
    checkRole,
    isSuperAdmin: role === 'super_admin',
    isAdmin: role === 'admin' || role === 'super_admin',
    isOperator: role === 'operator',
  };
};
export default usePermissions;
