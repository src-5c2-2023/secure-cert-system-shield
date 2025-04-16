
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  RefreshCcw, 
  Shield, 
  XCircle, 
  Terminal, 
  Lock, 
  Eye, 
  Clock 
} from "lucide-react";
import { SecurityAlert } from "@/lib/types";

interface SecurityMonitorProps {
  alerts: SecurityAlert[];
}

const SecurityMonitor: React.FC<SecurityMonitorProps> = ({ alerts }) => {
  const [showAll, setShowAll] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const getAlertIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info className="h-4 w-4 text-primary" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-security-amber" />;
      case "danger":
        return <XCircle className="h-4 w-4 text-security-red" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertBadge = (level: string) => {
    switch (level) {
      case "info":
        return (
          <Badge variant="outline" className="text-primary border-primary">
            Info
          </Badge>
        );
      case "warning":
        return (
          <Badge variant="outline" className="text-security-amber border-security-amber">
            Warning
          </Badge>
        );
      case "danger":
        return (
          <Badge variant="outline" className="text-security-red border-security-red">
            Critical
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const runSecurityScan = () => {
    setIsScanning(true);
    // Simulate security scan
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const displayedAlerts = showAll ? activeAlerts : activeAlerts.slice(0, 3);
  const hasMoreAlerts = activeAlerts.length > 3 && !showAll;

  // Security indicators and protections
  const securityChecks = [
    { name: "CGI Shell Protection", status: "active", icon: <Terminal className="h-3 w-3" /> },
    { name: "ModSecurity WAF", status: "active", icon: <Shield className="h-3 w-3" /> },
    { name: "Shellshock Protection", status: "active", icon: <Lock className="h-3 w-3" /> },
    { name: "Request Monitoring", status: "active", icon: <Eye className="h-3 w-3" /> },
    { name: "Security Audit Log", status: "active", icon: <Clock className="h-3 w-3" /> }
  ];

  return (
    <Card className="security-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-security-teal" />
            Security Monitor
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={runSecurityScan}
            disabled={isScanning}
          >
            <RefreshCcw className={`h-4 w-4 mr-1 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? "Scanning..." : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-1 mb-4">
          {securityChecks.map((check, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-2 bg-muted rounded-md">
              <div className="text-security-teal mb-1">{check.icon}</div>
              <div className="text-[10px] text-center font-medium">{check.name}</div>
              <Badge variant="outline" className="mt-1 text-[8px] py-0 h-4 text-security-teal border-security-teal">
                {check.status}
              </Badge>
            </div>
          ))}
        </div>

        {activeAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle className="h-8 w-8 text-security-teal mb-2" />
            <h3 className="text-lg font-medium">All Systems Secure</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No active security alerts detected
            </p>
            <div className="text-xs text-muted-foreground mt-3 p-2 bg-muted rounded">
              <p className="font-medium">Shell Protection Active:</p>
              <p>• CGI Request Validation</p>
              <p>• Pattern Matching for Shellshock</p>
              <p>• IP-based Access Control</p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {displayedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border rounded-md p-3 flex items-start space-x-3"
                >
                  <div className="mt-0.5">{getAlertIcon(alert.level)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{alert.message}</p>
                      {getAlertBadge(alert.level)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(alert.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {hasMoreAlerts && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-3" 
                onClick={() => setShowAll(true)}
              >
                Show {activeAlerts.length - 3} more alerts
              </Button>
            )}
            
            {showAll && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full mt-3" 
                onClick={() => setShowAll(false)}
              >
                Show fewer alerts
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityMonitor;
