
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Terminal } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Certificate Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
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
    </div>
  );
};

export default DashboardLayout;
