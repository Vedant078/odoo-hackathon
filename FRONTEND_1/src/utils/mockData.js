import { ASSET_STATUS, BOOKING_STATUS, MAINTENANCE_STATUS } from "./constants";

export const MOCK_ASSETS = [
  { id: "ast-101", name: "High-Resolution Laser Scanner", category: "Hardware", status: ASSET_STATUS.AVAILABLE, serial: "SN-98234-A", location: "Lab A", health: 98 },
  { id: "ast-102", name: "Heavy Duty Thermal Chamber", category: "Lab Equipment", status: ASSET_STATUS.IN_USE, serial: "SN-10928-B", location: "Lab B", health: 85 },
  { id: "ast-103", name: "Supercomputing Node 42", category: "IT Infrastructure", status: ASSET_STATUS.MAINTENANCE, serial: "SN-42424-X", location: "Server Room", health: 62 },
  { id: "ast-104", name: "Autonomous Delivery Drone", category: "Robotics", status: ASSET_STATUS.AVAILABLE, serial: "SN-11002-D", location: "Hangar 1", health: 92 },
  { id: "ast-105", name: "Precision Spectrum Analyzer", category: "Hardware", status: ASSET_STATUS.IN_USE, serial: "SN-77823-C", location: "Lab C", health: 74 },
];

export const MOCK_BOOKINGS = [
  { id: "bkg-001", assetId: "ast-102", assetName: "Heavy Duty Thermal Chamber", user: "Sarah Connor", startDate: "2026-07-10", endDate: "2026-07-14", status: BOOKING_STATUS.ACTIVE },
  { id: "bkg-002", assetId: "ast-101", assetName: "High-Resolution Laser Scanner", user: "John Doe", startDate: "2026-07-15", endDate: "2026-07-16", status: BOOKING_STATUS.CONFIRMED },
  { id: "bkg-003", assetId: "ast-104", assetName: "Autonomous Delivery Drone", user: "Alice Vance", startDate: "2026-07-08", endDate: "2026-07-09", status: BOOKING_STATUS.COMPLETED },
  { id: "bkg-004", assetId: "ast-105", assetName: "Precision Spectrum Analyzer", user: "Bob Smith", startDate: "2026-07-11", endDate: "2026-07-13", status: BOOKING_STATUS.PENDING },
];

export const MOCK_MAINTENANCE = [
  { id: "maint-501", assetId: "ast-103", assetName: "Supercomputing Node 42", type: "Hardware Upgrade", date: "2026-07-12", cost: 1200, status: MAINTENANCE_STATUS.IN_PROGRESS },
  { id: "maint-502", assetId: "ast-105", assetName: "Precision Spectrum Analyzer", type: "Calibration", date: "2026-07-18", cost: 350, status: MAINTENANCE_STATUS.SCHEDULED },
  { id: "maint-503", assetId: "ast-102", assetName: "Heavy Duty Thermal Chamber", type: "Cooling Repair", date: "2026-07-05", cost: 2200, status: MAINTENANCE_STATUS.COMPLETED },
];

export const MOCK_UTILIZATION_DATA = [
  { month: "Jan", Hardware: 65, LabEquipment: 40, IT: 85 },
  { month: "Feb", Hardware: 70, LabEquipment: 45, IT: 88 },
  { month: "Mar", Hardware: 72, LabEquipment: 55, IT: 90 },
  { month: "Apr", Hardware: 80, LabEquipment: 60, IT: 92 },
  { month: "May", Hardware: 85, LabEquipment: 75, IT: 95 },
  { month: "Jun", Hardware: 90, LabEquipment: 80, IT: 98 },
];

export const MOCK_HEATMAP_DATA = [
  { day: "Mon", "08:00": 10, "12:00": 30, "16:00": 45, "20:00": 15 },
  { day: "Tue", "08:00": 15, "12:00": 45, "16:00": 60, "20:00": 20 },
  { day: "Wed", "08:00": 20, "12:00": 55, "16:00": 70, "20:00": 25 },
  { day: "Thu", "08:00": 18, "12:00": 50, "16:00": 65, "20:00": 30 },
  { day: "Fri", "08:00": 12, "12:00": 40, "16:00": 50, "20:00": 18 },
];

export const MOCK_KPIS = [
  { title: "Total Assets", value: "148", change: "+12%", subtitle: "From last month", trend: "up" },
  { title: "Active Bookings", value: "32", change: "+5%", subtitle: "Currently active", trend: "up" },
  { title: "Equipment Utilization", value: "78.4%", change: "+2.3%", subtitle: "Average load", trend: "up" },
  { title: "Pending Maintenance", value: "4", change: "-2", subtitle: "Scheduled tasks", trend: "down" },
];
