
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, RefreshCw, Server, Shield, Terminal } from "lucide-react";
import { NginxStatus as NginxStatusType } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface NginxStatusProps {
  status: NginxStatusType;
}

const NginxStatus: React.FC<NginxStatusProps> = ({ status }) => {
  const [expandedView, setExpandedView] = useState(false);

  return (
    <Card className="security-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Server className="h-5 w-5 mr-2 text-security-teal" />
            Nginx Server Status
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setExpandedView(!expandedView)}>
            {expandedView ? "Basic View" : "Advanced View"}
          </Button>
        </div>
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

          {expandedView && (
            <>
              <div className="grid grid-cols-2 text-sm">
                <div className="text-muted-foreground">CGI Interface</div>
                <div className="font-medium text-security-teal">Active (Secure Mode)</div>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="text-muted-foreground">ModSecurity</div>
                <div className="font-medium text-security-teal">Enabled</div>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="text-muted-foreground">Worker Processes</div>
                <div className="font-medium">4</div>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="text-muted-foreground">Shell Access</div>
                <div className="font-medium text-security-teal">Restricted (Auth Required)</div>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="text-muted-foreground">Security Headers</div>
                <div className="font-medium text-security-teal">All Enabled</div>
              </div>
            </>
          )}
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
              {expandedView && (
                <>
                  <span className="mx-1">•</span>
                  <Terminal className="h-3 w-3 ml-1" />
                  <span>Shell:</span>
                  <span className="text-security-teal font-medium">Protected</span>
                  <span className="mx-1">•</span>
                  <Shield className="h-3 w-3 ml-1" />
                  <span>Shellshock:</span>
                  <span className="text-security-teal font-medium">Patched</span>
                </>
              )}
            </div>
          </Card>
        </div>

        {expandedView && (
          <div className="mt-4 text-xs p-2 bg-gray-100 dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-800">
            <div className="font-bold mb-1">Security Configuration:</div>
            <pre className="whitespace-pre-wrap text-[10px] overflow-auto max-h-[100px]">
{`# Security headers enabled
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options SAMEORIGIN;
add_header X-XSS-Protection "1; mode=block";
add_header Content-Security-Policy "default-src 'self';";

# CGI Security
location /cgi-bin/ {
  # Input validation active
  # Shellshock protection enabled
  # Request sanitization active
}`}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NginxStatus;
