
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilePlus2, KeyRound, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CertificateRequestForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Certificate Request Generated",
      description: "The CSR has been successfully generated and is ready for signing.",
      duration: 5000,
    });
  };

  return (
    <Card className="security-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FilePlus2 className="h-5 w-5 mr-2 text-security-teal" />
          Generate Certificate Request
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="common-name">Common Name (Domain)</Label>
              <Input
                id="common-name"
                placeholder="example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                placeholder="Your Company, Inc."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="US"
                maxLength={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                placeholder="California"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="locality">Locality/City</Label>
              <Input
                id="locality"
                placeholder="San Francisco"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="key-type">Key Type</Label>
            <Select defaultValue="ecc">
              <SelectTrigger id="key-type">
                <SelectValue placeholder="Select key type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecc">ECC/ECDSA (Recommended)</SelectItem>
                <SelectItem value="rsa2048">RSA 2048</SelectItem>
                <SelectItem value="rsa4096">RSA 4096</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="san">Subject Alternative Names</Label>
            <Textarea
              id="san"
              placeholder="www.example.com
api.example.com
*.example.com"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Enter one domain per line. Use * for wildcard domains.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button">
            <KeyRound className="h-4 w-4 mr-2" />
            Import Existing
          </Button>
          <Button type="submit">
            <ShieldCheck className="h-4 w-4 mr-2" />
            Generate CSR
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CertificateRequestForm;
