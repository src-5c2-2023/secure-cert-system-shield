
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Download, RefreshCw, Trash2 } from "lucide-react";
import { Certificate } from "@/lib/types";

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "valid":
        return "certificate-status-valid";
      case "expiring":
        return "certificate-status-warning";
      case "expired":
        return "certificate-status-expired";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return "Valid";
      case "expiring":
        return "Expiring Soon";
      case "expired":
        return "Expired";
      default:
        return status;
    }
  };

  return (
    <Card className="security-card overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium truncate" title={certificate.domain}>
            {certificate.domain}
          </CardTitle>
          <div className={getStatusClass(certificate.status)}>
            {getStatusText(certificate.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">Issued By</div>
            <div className="font-medium">{certificate.issuedBy}</div>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">Valid From</div>
            <div className="font-medium">{certificate.validFrom}</div>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">Valid To</div>
            <div className="font-medium">{certificate.validTo}</div>
          </div>
          <div className="grid grid-cols-2 text-sm">
            <div className="text-muted-foreground">Type</div>
            <div className="font-medium">{certificate.type}</div>
          </div>
          
          {certificate.status !== "expired" && (
            <div className="flex items-center mt-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
              <span>
                {certificate.daysRemaining} day{certificate.daysRemaining !== 1 ? 's' : ''} remaining
              </span>
            </div>
          )}
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            {certificate.status === "expired" || certificate.status === "expiring" ? (
              <Button variant="default" size="sm" className="ml-2">
                <RefreshCw className="h-4 w-4 mr-1" />
                Renew
              </Button>
            ) : (
              <Button variant="destructive" size="sm" className="ml-2">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
