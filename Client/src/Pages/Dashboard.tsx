import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AudioUploadDemo, ImageUploadDemo } from "@/components/ui/ImageUpload";
import { useState } from "react";

export const Dashboard = () => {
  const [fileType, setFileType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileTypeChange = (value: string) => {
    setFileType(value);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Reset file type when dialog closes
    setFileType("");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 w-full p-4">Satya</div>
      <div className="flex justify-end items-end pb-7 p-1">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Fab size="large" aria-label="add">
              <AddIcon />
            </Fab>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Resource</DialogTitle>
              <DialogDescription>
                Select the type of file you want to add
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="file" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">File Upload</TabsTrigger>
                <TabsTrigger value="url">URL</TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>File Upload</CardTitle>
                    <CardDescription>
                      Select file type and upload your file
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="file-type">Type of File</Label>
                      <Select
                        onValueChange={handleFileTypeChange}
                        value={fileType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select file type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>File Type</SelectLabel>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conditionally render upload component only when a file type is selected */}
                    {fileType && (
                      <div className="transition-all duration-300 ease-in-out">
                        {fileType === "image" ? (
                          <div className="max-h-80 overflow-y-auto">
                            <ImageUploadDemo />
                          </div>
                        ) : (
                          <div className="max-h-80 overflow-y-auto">
                            <AudioUploadDemo />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid gap-2">
                      <Label htmlFor="file-name">File Name</Label>
                      <Input
                        id="file-name"
                        placeholder="Enter a name for your file"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="file-description">
                        Description (Optional)
                      </Label>
                      <Input
                        id="file-description"
                        placeholder="Add a description"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Upload File</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="url" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Add from URL</CardTitle>
                    <CardDescription>
                      Enter a URL to add content from the web
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        placeholder="https://example.com"
                        type="url"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="url-type">Content Type</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="audio">Audio</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="document">Article</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="url-name">Name</Label>
                      <Input
                        id="url-name"
                        placeholder="Enter a name for this resource"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Add from URL</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <DialogFooter className="sm:justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
