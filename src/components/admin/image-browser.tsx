"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, Search, ImageIcon } from "lucide-react";

interface ImageFile {
  name: string;
  path: string;
  url: string;
  size: number;
  created_at: string;
}

interface ImageBrowserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
  folder?: string;
}

export function ImageBrowser({
  open,
  onOpenChange,
  onSelect,
  folder = "projects",
}: ImageBrowserProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (open) {
      fetchImages();
    }
  }, [open, folder]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/storage/list?folder=${folder}`);
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const data = await response.json();
      setImages(data.files || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = images.filter((img) =>
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Image from Storage</DialogTitle>
          <DialogDescription>
            Browse and select an existing image from your storage
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 flex flex-col min-h-0">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Image Grid */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "No images found matching your search"
                    : "No images found in storage"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredImages.map((image) => (
                  <button
                    key={image.path}
                    onClick={() => {
                      onSelect(image.url);
                      onOpenChange(false);
                    }}
                    className="group relative aspect-square overflow-hidden rounded-lg border-2 border-muted hover:border-primary transition-colors"
                  >
                    <Image
                      src={image.url}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

