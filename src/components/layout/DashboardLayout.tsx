
import React, { ReactNode, useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, RefreshCw, Terminal, AlertTriangle, Lock, Shield } from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [shellOpen, setShellOpen] = useState(false);
  const [shellCommand, setShellCommand] = useState("");
  const [shellOutput, setShellOutput] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const openShell = () => {
    setShellOpen(true);
    // Initialize shell connection
    setShellOutput("Shell session initialized.\nSecure CGI connection established.\nServer: nginx/1.18.0 (TLSv1.3)\nConnection: Encrypted\n\nType 'help' for available commands.");
  };

  const executeCommand = () => {
    if (!isAuthorized && shellCommand !== "authorize") {
      setShellOutput("Error: Unauthorized access. Run 'authorize' command first.");
      setShellCommand("");
      return;
    }

    // Simple shell command simulation with security validation
    if (shellCommand.match(/[&|;`\\!]/) || shellCommand.includes("nc") || shellCommand.includes("bash -i") || shellCommand.includes("/dev/tcp")) {
      setShellOutput("Error: Potential security violation detected. Command contains forbidden characters or patterns.");
      toast.error("Security alert: Malicious command pattern detected", {
        description: "This incident has been logged and reported to security team."
      });
      setShellCommand("");
      return;
    }

    let output = "";
    
    switch(shellCommand.trim()) {
      case "help":
        output = "Available commands:\n- authorize: authenticate for privileged operations\n- ssl-status: check SSL certificate status\n- cert-list: list installed certificates\n- cert-info [domain]: show certificate details\n- server-status: show server status\n- security-check: run security diagnostics\n- exit: close shell session";
        break;
      case "authorize":
        setIsAuthorized(true);
        output = "Authorization successful. Access granted to certificate management functions.";
        break;
      case "ssl-status":
        output = "SSL/TLS Status:\n- TLSv1.3 Enabled\n- Perfect Forward Secrecy: YES\n- OCSP Stapling: Active\n- HSTS: Enabled\n- Certificate Validation: Passed";
        break;
      case "cert-list":
        output = "Installed Certificates:\n1. example.com (expires in 89 days)\n2. api.example.com (expires in 45 days)\n3. secure.example.com (expires in 180 days)";
        break;
      case "server-status":
        output = "Server Status:\n- Nginx: Running (PID 1234)\n- Worker Processes: 4\n- Active Connections: 23\n- SSL Handshakes: 156/minute\n- Request Rate: 342/minute";
        break;
      case "security-check":
        output = "Running Security Diagnostics...\n✓ ModSecurity: Active\n✓ Rate Limiting: Configured\n✓ IP Filtering: Enabled\n✓ CGI Security: Hardened\n✓ Request Validation: Strict\n✓ No Shellshock vulnerabilities detected";
        break;
      case "exit":
        setShellOpen(false);
        setShellCommand("");
        setIsAuthorized(false);
        return;
      default:
        if (shellCommand.startsWith("cert-info ")) {
          const domain = shellCommand.split(" ")[1];
          if (domain) {
            output = `Certificate Information for ${domain}:\nIssuer: Let's Encrypt Authority X3\nValid From: 2023-05-15\nValid To: 2023-08-13\nKey Type: RSA 2048\nSignature Algorithm: SHA-256\nSubject Alternative Names: ${domain}, www.${domain}`;
          } else {
            output = "Error: Missing domain name. Usage: cert-info [domain]";
          }
        } else {
          output = `Command not recognized: ${shellCommand}. Type 'help' for available commands.`;
        }
    }
    
    setShellOutput(prevOutput => `${prevOutput}\n\n> ${shellCommand}\n${output}`);
    setShellCommand("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Certificate Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openShell}
            >
              <Terminal className="h-4 w-4 mr-1" />
              Access Shell
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Certificate
            </Button>
          </div>
        </div>
        
        {children}
        
        <footer className="mt-10 text-center text-sm text-muted-foreground py-4">
          <p>Secure Certificate Management System © 2025</p>
          <p className="text-xs mt-1">
            Protected by Enhanced Security Measures • TLSv1.3 Enabled
          </p>
        </footer>
      </main>

      <Dialog open={shellOpen} onOpenChange={setShellOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] bg-gray-950 text-gray-200 border-gray-800">
          <DialogHeader>
            <DialogTitle className="flex items-center text-gray-200">
              <Shield className="h-5 w-5 mr-2 text-security-teal" />
              Secure Shell Interface
              {!isAuthorized && (
                <span className="ml-2 flex items-center text-xs font-normal text-security-amber">
                  <Lock className="h-3 w-3 mr-1" /> Limited Access
                </span>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="font-mono text-sm overflow-auto p-2 bg-gray-900 rounded-md h-[400px] border border-gray-800">
            <pre className="whitespace-pre-wrap">{shellOutput}</pre>
          </div>
          <div className="flex items-center mt-2 relative">
            <span className="text-security-teal mr-2">$</span>
            <input
              type="text"
              value={shellCommand}
              onChange={(e) => setShellCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-gray-900 text-gray-200 border-gray-800 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-security-teal font-mono"
              placeholder="Type command (help for list of commands)"
              spellCheck="false"
              autoComplete="off"
            />
            {!isAuthorized && (
              <div className="absolute right-2 flex items-center text-security-amber text-xs">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Restricted Mode
              </div>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            <p>All commands are logged and monitored. Use 'exit' to close session.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardLayout;
