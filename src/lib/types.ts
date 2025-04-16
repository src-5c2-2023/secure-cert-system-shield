
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
  source?: string;
  details?: string;
  mitigationSteps?: string[];
}

export interface NginxStatus {
  running: boolean;
  version: string;
  uptime: string;
  connections: number;
  lastRestart: string;
  securityFeatures?: {
    modsecurity: boolean;
    shellshockProtection: boolean;
    requestFiltering: boolean;
    rateLimiting: boolean;
    ipBlocking: boolean;
  };
  shellAccess?: {
    enabled: boolean;
    authRequired: boolean;
    loggedCommands: boolean;
  };
}

export interface User {
  id: string;
  username: string;
  role: "admin" | "user" | "viewer";
  lastLogin: string;
  permissions?: string[];
}

export interface ShellCommand {
  command: string;
  timestamp: string;
  user: string;
  success: boolean;
  output: string;
}

export interface SecurityScan {
  id: string;
  timestamp: string;
  status: "completed" | "in-progress" | "failed";
  findings: SecurityAlert[];
  summary: string;
}
