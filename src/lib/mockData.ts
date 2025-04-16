
import { Certificate, SecurityAlert, NginxStatus, User } from "./types";

// Mock certificates
export const mockCertificates: Certificate[] = [
  {
    id: "cert-1",
    domain: "tucertificado.ejemplo.com",
    issuedBy: "Let's Encrypt",
    validFrom: "2025-01-15",
    validTo: "2025-04-15",
    status: "valid",
    daysRemaining: 89,
    type: "ECC/ECDSA",
  },
  {
    id: "cert-2",
    domain: "api.ejemplo.com",
    issuedBy: "Let's Encrypt",
    validFrom: "2025-01-10",
    validTo: "2025-01-25",
    status: "expiring",
    daysRemaining: 9,
    type: "RSA",
  },
  {
    id: "cert-3",
    domain: "old.ejemplo.com",
    issuedBy: "DigiCert",
    validFrom: "2024-10-01",
    validTo: "2025-01-01",
    status: "expired",
    daysRemaining: 0,
    type: "RSA",
  },
  {
    id: "cert-4",
    domain: "secure.ejemplo.com",
    issuedBy: "Let's Encrypt",
    validFrom: "2025-02-01",
    validTo: "2025-05-01",
    status: "valid",
    daysRemaining: 105,
    type: "ECC/ECDSA",
  },
];

// Mock security alerts
export const mockSecurityAlerts: SecurityAlert[] = [
  {
    id: "alert-1",
    message: "Multiple failed login attempts detected from IP 192.168.1.10",
    timestamp: "2025-04-16T08:30:00",
    level: "warning",
    resolved: false,
  },
  {
    id: "alert-2",
    message: "Nginx configuration reloaded successfully",
    timestamp: "2025-04-16T07:15:00",
    level: "info",
    resolved: true,
  },
  {
    id: "alert-3",
    message: "CSR format validation failed - potential injection attempt",
    timestamp: "2025-04-15T22:45:00",
    level: "danger",
    resolved: true,
  },
  {
    id: "alert-4",
    message: "Certificate for api.ejemplo.com will expire in 9 days",
    timestamp: "2025-04-16T00:00:00",
    level: "warning",
    resolved: false,
  },
];

// Mock Nginx status
export const mockNginxStatus: NginxStatus = {
  running: true,
  version: "nginx/1.22.1",
  uptime: "15 days, 7 hours",
  connections: 42,
  lastRestart: "2025-04-01T00:00:00",
};

// Mock users
export const mockUsers: User[] = [
  {
    id: "user-1",
    username: "admin",
    role: "admin",
    lastLogin: "2025-04-16T08:00:00",
  },
  {
    id: "user-2",
    username: "operator",
    role: "user",
    lastLogin: "2025-04-15T14:30:00",
  },
  {
    id: "user-3",
    username: "guest",
    role: "viewer",
    lastLogin: "2025-04-10T09:15:00",
  },
];
