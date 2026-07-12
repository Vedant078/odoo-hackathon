export const APP_NAME = "TransitOps";

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  OPERATOR: "operator",
  VIEWER: "viewer",
};

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const ASSET_STATUS = {
  AVAILABLE: "available",
  IN_USE: "in_use",
  MAINTENANCE: "maintenance",
  RETIRED: "retired",
};

export const MAINTENANCE_STATUS = {
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  OVERDUE: "overdue",
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: "ag_auth_token",
  USER_DATA: "ag_user_data",
  THEME: "ag_theme",
};
