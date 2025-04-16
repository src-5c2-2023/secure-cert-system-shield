
export interface Certificate {
  id: string;
  domain: string;
  issuedBy: string;
  validFrom: string;
  validTo: string;
  status: "valid" | "expiring" | "expired";
  daysRemaining: number;
  type: string;
}

export interface SecurityAlert {
  id: string;
  message: string;
  timestamp: string;
  level: "info" | "warning" | "danger";
  resolved: boolean;
}

export interface NginxStatus {
  running: boolean;
  version: string;
  uptime: string;
  connections: number;
  lastRestart: string;
}

export interface User {
  id: string;
  username: string;
  role: "admin" | "user" | "viewer";
  lastLogin: string;
}
