"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageWithDimensionsProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  [key: string]: any;
}

export function ImageWithDimensions({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  ...props
}: ImageWithDimensionsProps) {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.src = src;
  }, [src]);

  const imageElement = (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      className={className}
      priority={priority}
      {...props}
    />
  );

  // Calculate preview image size based on image dimensions and window size
  const getPreviewSize = () => {
    if (!imageDimensions || windowSize.width === 0) {
      return {
        width: "min(90vw, 1200px)",
        height: "auto",
        aspectRatio: imageDimensions && imageDimensions.height > 0
          ? imageDimensions.width / imageDimensions.height
          : 16 / 9,
      };
    }

    const maxWidth = windowSize.width * 0.95;
    const maxHeight = windowSize.height * 0.95;
    
    // Calculate scale to fit within viewport while maintaining aspect ratio
    const widthRatio = maxWidth / imageDimensions.width;
    const heightRatio = maxHeight / imageDimensions.height;
    const scale = Math.min(widthRatio, heightRatio, 1);

    const scaledWidth = imageDimensions.width * scale;
    const scaledHeight = imageDimensions.height * scale;

    return {
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
      maxWidth: "95vw",
      maxHeight: "95vh",
    };
  };

  const previewSize = getPreviewSize();
  const aspectRatio =
    imageDimensions && imageDimensions.height > 0
      ? imageDimensions.width / imageDimensions.height
      : 16 / 9;

  const previewImage = imageDimensions && windowSize.width > 0 ? (
    <div
      className="relative overflow-hidden"
      style={{
        width: previewSize.width,
        height: previewSize.height,
        maxWidth: previewSize.maxWidth,
        maxHeight: previewSize.maxHeight,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, 1200px"
      />
    </div>
  ) : (
    <div className="relative w-full h-full min-h-[200px] flex items-center justify-center">
      <div className="animate-pulse bg-muted rounded-lg w-full h-64" />
    </div>
  );

  // Use Dialog for both mobile and desktop
  if (fill) {
    return (
      <>
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          {imageElement}
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent 
            className="p-1 w-fit h-fit max-w-[95vw] max-h-[95vh] !grid !grid-cols-1 overflow-hidden"
            style={{
              width: imageDimensions && windowSize.width > 0 ? previewSize.width : undefined,
              height: imageDimensions && windowSize.width > 0 ? previewSize.height : undefined,
            }}
          >
            <DialogTitle className="sr-only">{alt}</DialogTitle>
            {previewImage}
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <span
        className="inline-block cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        {imageElement}
      </span>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent 
          className="p-1 w-fit h-fit max-w-[95vw] max-h-[95vh] !grid !grid-cols-1 overflow-hidden"
          style={{
            width: imageDimensions && windowSize.width > 0 ? previewSize.width : undefined,
            height: imageDimensions && windowSize.width > 0 ? previewSize.height : undefined,
          }}
        >
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          {previewImage}
        </DialogContent>
      </Dialog>
    </>
  );
}
