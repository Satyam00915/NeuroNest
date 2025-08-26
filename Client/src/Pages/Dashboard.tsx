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
import { useEffect, useState } from "react";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { useResourceStore } from "@/store/resourceStore";
import axios from "axios";

export interface Tag {
  _id: string;
  title: string;
}

export const Dashboard = () => {
  const [fileType, setFileType] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");

  const { Resource, updateResource, reset } = useResourceStore();

  const handleFileTypeChange = (value: string) => {
    setFileType(value);
    updateResource({ type: value });
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFileType("");
    reset();
  };

  function AddTag() {
    setTags((prev) => [
      ...prev,
      {
        _id: "",
        title: newTag,
      },
    ]);
    setIsTagOpen(false);
  }

  useEffect(() => {
    if (isDialogOpen) {
      api
        .get("https://neuronest-oevp.onrender.com/api/content/tags", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => {
          const response = res.data;
          if (response.success) {
            setTags(response.tags);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    }
  }, [isDialogOpen]);

  async function AddResource() {
    if (Resource.type === "article" && Resource.url) {
      const response = await axios.post(
        "https://neuronest-oevp.onrender.com/preview",
        {
          q: Resource.url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const articleResp = await api.post(
        "https://neuronest-oevp.onrender.com/api/content/article",
        {
          title: Resource.title,
          type: Resource.type,
          tags: Resource.tags,
          externalUrl: Resource.url,
          thumbnailImg: response.data.image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(articleResp);
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Toaster />
      {/* Main Content Area */}
      <div className="flex-1 w-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Placeholder content for dashboard */}
            <div className="bg-card rounded-lg border p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-2">Welcome</h2>
              <p className="text-muted-foreground">
                Your content will appear here
              </p>
            </div>
            <div className="bg-card rounded-lg border p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
              <p className="text-muted-foreground">No recent activity</p>
            </div>
            <div className="bg-card rounded-lg border p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-2">Statistics</h2>
              <p className="text-muted-foreground">Data will be shown here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Fab
              size="medium"
              aria-label="add"
              className="!w-14 !h-14 md:!w-16 md:!h-16"
            >
              <AddIcon className="!w-6 !h-6 md:!w-8 md:!h-8" />
            </Fab>
          </DialogTrigger>
          <DialogContent className="[&::-webkit-scrollbar]:hidden sm:max-w-lg max-h-[90vh] overflow-y-auto w-[95vw] max-w-[95vw] md:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">
                Add Resource
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base">
                Select the type of file you want to add
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="file" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-10 md:h-11">
                <TabsTrigger value="file" className="text-xs md:text-sm">
                  File Upload
                </TabsTrigger>
                <TabsTrigger value="url" className="text-xs md:text-sm">
                  URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="mt-4">
                <Card>
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">
                      File Upload
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Select file type and upload your file
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 p-4 md:p-6 pt-0">
                    <div className="grid gap-2">
                      <Label
                        htmlFor="file-type"
                        className="text-sm md:text-base"
                      >
                        Type of File
                      </Label>
                      <Select
                        onValueChange={handleFileTypeChange}
                        value={fileType}
                      >
                        <SelectTrigger className="w-full h-10 md:h-11 text-sm md:text-base">
                          <SelectValue placeholder="Select file type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel className="text-sm md:text-base">
                              File Type
                            </SelectLabel>
                            <SelectItem
                              value="image"
                              className="text-sm md:text-base"
                            >
                              Image
                            </SelectItem>
                            <SelectItem
                              value="audio"
                              className="text-sm md:text-base"
                            >
                              Audio
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Conditionally render upload component only when a file type is selected */}
                    {fileType && (
                      <div className="transition-all duration-300 ease-in-out">
                        {fileType === "image" ? (
                          <div className="max-h-60 md:max-h-80 overflow-y-auto">
                            <ImageUploadDemo />
                          </div>
                        ) : (
                          <div className="max-h-60 md:max-h-80 overflow-y-auto">
                            <AudioUploadDemo />
                          </div>
                        )}
                      </div>
                    )}

                    <div className="grid gap-2">
                      <Label
                        htmlFor="file-name"
                        className="text-sm md:text-base"
                      >
                        File Name
                      </Label>
                      <Input
                        onChange={(e) => {
                          updateResource({ title: e.currentTarget.value });
                        }}
                        id="file-name"
                        placeholder="Enter a name for your file"
                        className="h-10 md:h-11 text-sm md:text-base"
                      />
                    </div>

                    <div className="grid gap-2">
                      <div>Tags</div>
                      <div className="flex gap-2 flex-wrap">
                        <Dialog open={isTagOpen} onOpenChange={setIsTagOpen}>
                          <DialogTrigger asChild>
                            <button
                              title="Add New"
                              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                height="30px"
                                viewBox="0 0 24 24"
                                className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                              >
                                <path
                                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                  strokeWidth="1.5"
                                />
                                <path d="M8 12H16" strokeWidth="1.5" />
                                <path d="M12 16V8" strokeWidth="1.5" />
                              </svg>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Create a new Tag</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <Label htmlFor="name-1">Tag Name</Label>
                                <Input
                                  id="name-1"
                                  name="name"
                                  onChange={(e) => {
                                    setNewTag(e.currentTarget.value);
                                  }}
                                />
                                <Button
                                  onClick={AddTag}
                                  className="cursor-pointer"
                                >
                                  Add Tag
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {tags.map((tag) => (
                          <button
                            key={tag._id}
                            onClick={() =>
                              updateResource({
                                tags: [tag._id ? tag._id : tag.title],
                              })
                            }
                            className={`px-3 py-1 rounded-full cursor-pointer border transition
                              ${
                                Resource.tags.includes(tag.title)
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                          >
                            {tag.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 md:p-6 pt-0">
                    <Button
                      onClick={AddResource}
                      className="w-full h-10 md:h-11 text-sm md:text-base"
                    >
                      Upload File
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="url" className="mt-4">
                <Card>
                  <CardHeader className="p-4 md:p-6">
                    <CardTitle className="text-lg md:text-xl">
                      Add from URL
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      Enter a URL to add content from the web
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 p-4 md:p-6 pt-0">
                    <div className="grid gap-2">
                      <Label htmlFor="url" className="text-sm md:text-base">
                        URL
                      </Label>
                      <Input
                        onChange={(e) => {
                          updateResource({ url: e.currentTarget.value });
                        }}
                        id="url"
                        placeholder="https://example.com"
                        type="url"
                        className="h-10 md:h-11 text-sm md:text-base"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label
                        htmlFor="url-type"
                        className="text-sm md:text-base"
                      >
                        Content Type
                      </Label>
                      <Select
                        onValueChange={handleFileTypeChange}
                        value={fileType}
                      >
                        <SelectTrigger className="w-full h-10 md:h-11 text-sm md:text-base">
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="image"
                            className="text-sm md:text-base"
                          >
                            Image
                          </SelectItem>
                          <SelectItem
                            value="audio"
                            className="text-sm md:text-base"
                          >
                            Audio
                          </SelectItem>
                          <SelectItem
                            value="video"
                            className="text-sm md:text-base"
                          >
                            Video
                          </SelectItem>
                          <SelectItem
                            value="article"
                            className="text-sm md:text-base"
                          >
                            Article
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label
                        htmlFor="url-name"
                        className="text-sm md:text-base"
                      >
                        Title
                      </Label>
                      <Input
                        onChange={(e) => {
                          updateResource({ title: e.currentTarget.value });
                        }}
                        id="url-name"
                        placeholder="Enter a name for this resource"
                        className="h-10 md:h-11 text-sm md:text-base"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div>Tags</div>
                      <div className="flex gap-2 flex-wrap">
                        <Dialog open={isTagOpen} onOpenChange={setIsTagOpen}>
                          <DialogTrigger asChild>
                            <button
                              title="Add New"
                              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30px"
                                height="30px"
                                viewBox="0 0 24 24"
                                className="stroke-zinc-400 fill-none group-hover:fill-zinc-800 group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                              >
                                <path
                                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                  strokeWidth="1.5"
                                />
                                <path d="M8 12H16" strokeWidth="1.5" />
                                <path d="M12 16V8" strokeWidth="1.5" />
                              </svg>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Create a new Tag</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <Label htmlFor="name-1">Tag Name</Label>
                                <Input
                                  id="name-1"
                                  name="name"
                                  onChange={(e) => {
                                    setNewTag(e.currentTarget.value);
                                  }}
                                />
                                <Button
                                  onClick={AddTag}
                                  className="cursor-pointer"
                                >
                                  Add Tag
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {tags.map((tag) => (
                          <button
                            key={tag._id}
                            onClick={() => {
                              updateResource({
                                tags: [tag._id ? tag._id : tag.title],
                              });
                            }}
                            className={`px-3 py-1 rounded-full cursor-pointer border transition
                              ${
                                Resource.tags.includes(
                                  tag._id ? tag._id : tag.title
                                )
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                          >
                            {tag.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 md:p-6 pt-0">
                    <Button
                      onClick={AddResource}
                      className="w-full h-10 md:h-11 text-sm md:text-base"
                    >
                      Add from URL
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            <DialogFooter className="sm:justify-end gap-2 mt-4 flex flex-col sm:flex-row">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  className="w-full sm:w-auto h-10 md:h-11 text-sm md:text-base"
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
