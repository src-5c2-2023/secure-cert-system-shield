
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info, RefreshCcw, Shield, XCircle } from "lucide-react";
import { SecurityAlert } from "@/lib/types";

interface SecurityMonitorProps {
  alerts: SecurityAlert[];
}

const SecurityMonitor: React.FC<SecurityMonitorProps> = ({ alerts }) => {
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

  const activeAlerts = alerts.filter(alert => !alert.resolved);

  return (
    <Card className="security-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-security-teal" />
            Security Monitor
          </CardTitle>
          <Button variant="ghost" size="sm">
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activeAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <CheckCircle className="h-8 w-8 text-security-teal mb-2" />
            <h3 className="text-lg font-medium">All Systems Secure</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No active security alerts detected
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
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
        )}
      </CardContent>
    </Card>
  );
};

export default SecurityMonitor;
