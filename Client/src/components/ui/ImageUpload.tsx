import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, X, Upload, Trash2, Music } from "lucide-react";
import { useCallback, useState, useRef, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  title: string;
  supportedFormats: string;
  accept: string;
  icon?: React.ReactNode;
  onUpload: (url: string) => void;
}

interface UseImageUploadProps {
  onUpload: (url: string) => void;
}

const useImageUpload = ({ onUpload }: UseImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleThumbnailClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Call the upload callback
    onUpload(objectUrl);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  };
};

export function FileUpload({
  title,
  supportedFormats,
  accept,
  icon = <ImagePlus className="h-6 w-6 text-muted-foreground" />,
  onUpload,
}: ImageUploadProps) {
  const {
    previewUrl,
    fileName,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload({ onUpload });

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];

        // Check if file type matches accepted types
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const isAccepted = acceptedTypes.some((type) => {
          if (type.endsWith("/*")) {
            const category = type.split("/")[0];
            return file.type.startsWith(`${category}/`);
          }
          return file.type === type;
        });

        if (isAccepted) {
          // Create a fake change event
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);

          if (fileInputRef.current) {
            fileInputRef.current.files = dataTransfer.files;

            // Trigger the change event manually
            const event = new Event("change", { bubbles: true });
            fileInputRef.current.dispatchEvent(event);
          }
        }
      }
    },
    [accept, fileInputRef]
  );

  // Determine if it's an audio file based on accept prop
  const isAudioUpload = accept.includes("audio");

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{supportedFormats}</p>
      </div>

      <Input
        type="file"
        accept={accept}
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {!previewUrl ? (
        <div
          onClick={handleThumbnailClick}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-64 cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted",
            isDragging && "border-primary/50 bg-primary/5"
          )}
        >
          <div className="rounded-full bg-background p-3 shadow-sm">{icon}</div>
          <div className="text-center">
            <p className="text-sm font-medium">Click to select</p>
            <p className="text-xs text-muted-foreground">
              or drag and drop file here
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="group relative h-64 overflow-hidden rounded-lg border">
            {isAudioUpload ? (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Music className="h-16 w-16 text-muted-foreground" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-medium truncate">{fileName}</p>
                </div>
              </div>
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleThumbnailClick}
                className="h-9 w-9 p-0"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleRemove}
                className="h-9 w-9 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {fileName && (
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{fileName}</span>
              <button
                onClick={handleRemove}
                className="ml-auto rounded-full p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Example usage for images:
export function ImageUploadDemo() {
  return (
    <FileUpload
      title="Image Upload"
      supportedFormats="Supported formats: JPG, PNG, GIF, WEBP"
      accept="image/*"
      onUpload={(url) => console.log("Uploaded image URL:", url)}
    />
  );
}

// Example usage for audio:
export function AudioUploadDemo() {
  return (
    <FileUpload
      title="Audio Upload"
      supportedFormats="Supported formats: MP3, WAV, OGG"
      accept="audio/*"
      icon={<Music className="h-6 w-6 text-muted-foreground" />}
      onUpload={(url) => console.log("Uploaded audio URL:", url)}
    />
  );
}
