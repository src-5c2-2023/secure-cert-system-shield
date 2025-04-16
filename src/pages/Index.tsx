
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CertificateCard from "@/components/CertificateCard";
import SecurityMonitor from "@/components/SecurityMonitor";
import NginxStatus from "@/components/NginxStatus";
import CertificateRequestForm from "@/components/CertificateRequestForm";
import LoginForm from "@/components/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCertificates, mockSecurityAlerts, mockNginxStatus } from "@/lib/mockData";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <LoginForm onLogin={() => setIsAuthenticated(true)} />
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <SecurityMonitor alerts={mockSecurityAlerts.filter(alert => !alert.resolved)} />
        </div>
        <div>
          <NginxStatus status={mockNginxStatus} />
        </div>
      </div>

      <Tabs defaultValue="certificates" className="mb-6">
        <TabsList>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="request">Request Certificate</TabsTrigger>
        </TabsList>
        <TabsContent value="certificates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCertificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="request" className="mt-6">
          <CertificateRequestForm />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
