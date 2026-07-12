import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject token if stored in local storage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ag_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Auth API Calls
export const loginUser = async (email, password) => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);
  const response = await api.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Vehicles API Calls
export const getVehicles = async () => {
  const response = await api.get('/vehicles');
  return response.data;
};

export const createVehicle = async (vehicleData) => {
  const response = await api.post('/vehicles', vehicleData);
  return response.data;
};

export const deleteVehicle = async (id) => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

// Trips API Calls
export const getTrips = async () => {
  const response = await api.get('/trips');
  return response.data;
};

export const updateTrip = async (id, data) => {
  const response = await api.patch(`/trips/${id}`, data);
  return response.data;
};

export const dispatchTrip = async (id) => {
  const response = await api.post(`/trips/${id}/dispatch`);
  return response.data;
};

// Maintenance API Calls
export const getMaintenanceLogs = async () => {
  const response = await api.get('/maintenance');
  return response.data;
};

export const createMaintenanceLog = async (logData) => {
  const response = await api.post('/maintenance', logData);
  return response.data;
};

export const updateMaintenanceLog = async (id, data) => {
  const response = await api.patch(`/maintenance/${id}`, data);
  return response.data;
};

// Dashboard KPI Call
export const getDashboardKPIs = async () => {
  const response = await api.get('/analytics/dashboard-kpis');
  return response.data;
};

export default api;
