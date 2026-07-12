import { ROLES } from "./constants";

// Permission mapping per role
export const PERMISSIONS = {
  VIEW_DASHBOARD: "view:dashboard",
  VIEW_ASSETS: "view:assets",
  CREATE_ASSETS: "create:assets",
  EDIT_ASSETS: "edit:assets",
  DELETE_ASSETS: "delete:assets",
  
  CREATE_BOOKING: "create:booking",
  EDIT_BOOKING: "edit:booking",
  APPROVE_BOOKING: "approve:booking",
  
  MANAGE_MAINTENANCE: "manage:maintenance",
  RUN_AUDIT: "run:audit",
  VIEW_REPORTS: "view:reports",
  
  MANAGE_USERS: "manage:users",
  MANAGE_ORGANIZATION: "manage:organization",
};

const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ASSETS,
    PERMISSIONS.CREATE_ASSETS,
    PERMISSIONS.EDIT_ASSETS,
    PERMISSIONS.CREATE_BOOKING,
    PERMISSIONS.EDIT_BOOKING,
    PERMISSIONS.APPROVE_BOOKING,
    PERMISSIONS.MANAGE_MAINTENANCE,
    PERMISSIONS.RUN_AUDIT,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.MANAGE_USERS,
  ],
  [ROLES.OPERATOR]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ASSETS,
    PERMISSIONS.CREATE_ASSETS,
    PERMISSIONS.EDIT_ASSETS,
    PERMISSIONS.CREATE_BOOKING,
    PERMISSIONS.EDIT_BOOKING,
    PERMISSIONS.MANAGE_MAINTENANCE,
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ASSETS,
  ],
};

/**
 * Check if a user role has a specific permission
 * @param {string} role 
 * @param {string} permission 
 * @returns {boolean}
 */
export const hasPermission = (role, permission) => {
  if (!role) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
};

/**
 * Check if role is authorized
 * @param {string} userRole 
 * @param {string[]} allowedRoles 
 * @returns {boolean}
 */
export const isAuthorized = (userRole, allowedRoles) => {
  if (!userRole) return false;
  if (!allowedRoles || allowedRoles.length === 0) return true;
  return allowedRoles.includes(userRole);
};
