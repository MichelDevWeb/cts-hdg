import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Building2, Calendar, CheckCircle, Clock } from "lucide-react";
import { Database } from "@/lib/supabase/types";

type Inquiry = Database["public"]["Tables"]["inquiries"]["Row"];

export const metadata: Metadata = {
  title: "Inquiries | HDG Admin",
};

export default async function AdminInquiriesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  const inquiries = data as Inquiry[] | null;

  if (error) {
    console.error("Error fetching inquiries:", error);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-accent/10 text-accent";
      case "contacted":
        return "bg-secondary/10 text-secondary";
      case "resolved":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Inquiries</h1>
        <p className="text-muted-foreground">
          Manage contact form submissions
        </p>
      </div>

      <div className="grid gap-4">
        {inquiries && inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {inquiry.email}
                      </span>
                      {inquiry.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3.5 w-3.5" />
                          {inquiry.phone}
                        </span>
                      )}
                      {inquiry.company && (
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5" />
                          {inquiry.company}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusColor(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status === "new" && <Clock className="mr-1 inline h-3 w-3" />}
                      {inquiry.status === "resolved" && (
                        <CheckCircle className="mr-1 inline h-3 w-3" />
                      )}
                      {inquiry.status}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">{inquiry.message}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Mark as Contacted
                  </Button>
                  <Button size="sm" variant="outline">
                    Mark as Resolved
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <a href={`mailto:${inquiry.email}`}>Reply via Email</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <p>No inquiries yet.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
