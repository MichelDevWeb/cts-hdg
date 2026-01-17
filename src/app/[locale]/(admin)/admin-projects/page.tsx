import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { Database } from "@/lib/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export const metadata: Metadata = {
  title: "Projects | HDG Admin",
};

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const projects = data as Project[] | null;

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your project portfolio
          </p>
        </div>
        <Link href="/admin-projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects && projects.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">Title</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Year</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{project.title_en}</p>
                          <p className="text-sm text-muted-foreground">
                            {project.title_vi}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium capitalize text-primary">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-4 text-sm">{project.location}</td>
                      <td className="py-4 text-sm">{project.year}</td>
                      <td className="py-4">
                        {project.published ? (
                          <span className="flex items-center gap-1 text-sm text-accent">
                            <Eye className="h-4 w-4" />
                            Published
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <EyeOff className="h-4 w-4" />
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin-projects/${project.id}`}>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <p>No projects yet. Create your first project!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
