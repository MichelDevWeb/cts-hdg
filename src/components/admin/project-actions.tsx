"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  ExternalLink,
} from "lucide-react";
import type { Project } from "@/lib/db/schema";

interface ProjectActionsProps {
  project: Project;
  locale: string;
}

export function ProjectActions({ project, locale }: ProjectActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleToggleFeatured = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleFeatured" }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePublished = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "togglePublished" }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling published:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsLoading(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isLoading}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/${locale}/admin-projects/${project.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/${locale}/projects/${project.slug}`}
              target="_blank"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleToggleFeatured}>
            {project.featured ? (
              <>
                <StarOff className="mr-2 h-4 w-4" />
                Remove from Featured
              </>
            ) : (
              <>
                <Star className="mr-2 h-4 w-4" />
                Add to Featured
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleTogglePublished}>
            {project.published ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Unpublish
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Publish
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{project.titleEn}&quot;? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

