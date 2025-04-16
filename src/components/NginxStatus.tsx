
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, RefreshCw, Server } from "lucide-react";
import { NginxStatus as NginxStatusType } from "@/lib/types";

interface NginxStatusProps {
  status: NginxStatusType;
}

const NginxStatus: React.FC<NginxStatusProps> = ({ status }) => {
  return (
    <Card className="security-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Server className="h-5 w-5 mr-2 text-security-teal" />
          Nginx Server Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <div className={`pulse-dot ${status.running ? 'pulse-dot-active' : 'pulse-dot-inactive'}`} />
          <Badge className={status.running ? 'bg-security-teal' : 'bg-security-red'}>
            {status.running ? 'Running' : 'Stopped'}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">Version</div>
            <div className="font-medium">{status.version}</div>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">Uptime</div>
            <div className="font-medium">{status.uptime}</div>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">Active Connections</div>
            <div className="font-medium">{status.connections}</div>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">Last Restart</div>
            <div className="font-medium">
              {new Date(status.lastRestart).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Card className="bg-muted w-full p-2">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              <span>CGI Interface:</span>
              <span className="text-security-teal font-medium">Active</span>
              <span className="mx-1">•</span>
              <span>WebSockets:</span>
              <span className="text-security-teal font-medium">Connected</span>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default NginxStatus;
