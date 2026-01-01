import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/Button";
import {
  Search,
  Plus,
  Trash2,
  Calendar,
  Image as ImageIcon,
  Upload,
  X,
  Check,
  Copy,
} from "lucide-react";
import { Tooltip } from "react-tooltip";
import { addMockup, deleteMockup, getMockups } from "../../utils/services";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const dummy = [
  {
    id: "689588f14ac44b28b56e898a",
    title: "Homepage Design v2",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    createdAt: new Date("2024-01-15T10:30:00"),
  },
  {
    id: "689588f14ac44b28b56e898c",
    title:
      "Mobile App Login Mobile App Login Mobile App Login Mobile App Login Mobile App Login",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    createdAt: new Date("2024-01-14T14:20:00"),
  },
  {
    id: "3",
    title: "Dashboard Layout",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    createdAt: new Date("2024-01-13T09:15:00"),
  },
  {
    id: "4",
    title: "E-commerce Product Page",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    createdAt: new Date("2024-01-12T16:45:00"),
  },
  {
    id: "5",
    title: "Portfolio Website",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    createdAt: new Date("2024-01-11T11:30:00"),
  },
  {
    id: "6",
    title: "Blog Template",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
    createdAt: new Date("2024-01-10T13:20:00"),
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newMockupTitle, setNewMockupTitle] = useState("");
  const [newMockupFile, setNewMockupFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mockups, setMockups] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const getAllMockups = async () => {
      try {
        const response = await getMockups();
        setMockups(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getAllMockups();
  }, []);

  // Filter mockups based on search query
  const filteredMockups = mockups?.filter((mockup) =>
    mockup.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this mockup?");
    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await deleteMockup(id);
      const deletedId = response.data?.id || id;
      setMockups((prev) => prev.filter((mockup) => mockup._id !== deletedId));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete mockup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!newMockupTitle.trim()) {
      alert("Please enter a title for your mockup");
      return;
    }

    if (!newMockupFile) {
      alert("Please select a file to upload");
      return;
    }

    setLoading(true);
    setIsUploadModalOpen(false);

    try {
      const response = await addMockup(newMockupFile, newMockupTitle);
      setMockups((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload mockup. Please try again.");
    } finally {
      setNewMockupTitle("");
      setNewMockupFile(null);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (allowedTypes.includes(file.type)) {
        setNewMockupFile(file);
      } else {
        alert("Only PNG, JPG, and WEBP files are allowed.");
        e.target.value = ""; // reset input
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleCopyLink = async (id) => {
    const url = `${window.location.origin}/mockup/${id}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        throw new Error("Failed to copy link");
      }
      setCopiedId(id);
      setTimeout(
        () => setCopiedId((prev) => (prev === id ? null : prev)),
        2000
      );
    } catch (e) {
      alert("Failed to copy link");
    }
  };

  if (loading) {
    return (
      <div className="h-full min-h-[calc(100vh-65px)] bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="h-full min-h-[calc(100vh-65px)] bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">My Mockups</h1>
            <p className="text-gray-600 mt-1">
              Manage and review your design mockups
            </p>
          </div>

          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-gradient-to-r from-brand-600 to-feedback-600 hover:from-brand-700 hover:to-feedback-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Upload New Mockup
          </Button>
        </div>

        {/* Search Bar */}
        {!mockups || mockups.length === 0 ? null : (
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search mockups by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-4 max-w-md"
            />
          </div>
        )}

        {/* Mockups Grid */}
        {filteredMockups?.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "No mockups found" : "No mockups yet"}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? `No mockups match "${searchQuery}". Try a different search term.`
                : "Get started by uploading your first design mockup."}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-gradient-to-r from-brand-600 to-feedback-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload Your First Mockup
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMockups?.map((mockup) => (
              <div
                key={mockup._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                {/* Mockup Image */}
                <Link to={`/mockup/${mockup._id}`}>
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img
                      src={mockup.imageUrl}
                      alt={mockup.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                </Link>

                {/* Mockup Info */}
                <div className="p-4">
                  <Link to={`/mockup/${mockup._id}`}>
                    <h3
                      className="font-semibold text-gray-900 hover:text-brand-600 transition-colors line-clamp-1 mb-2"
                      data-tooltip-id={
                        mockup?.title.length > 25 ? "mockup-title" : ""
                      }
                      data-tooltip-content={mockup.title}
                    >
                      {mockup.title}
                    </h3>
                  </Link>

                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(mockup.createdAt)}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link to={`/mockup/${mockup._id}`}>
                        <Button size="sm" variant="outline">
                          View & Review
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyLink(mockup._id)}
                        className={
                          copiedId === mockup._id
                            ? "border-green-300 bg-green-50 text-green-700"
                            : ""
                        }
                        data-tooltip-id={"mockup-copy-link"}
                        data-tooltip-content={
                          copiedId === mockup._id ? "Copied" : "Copy Link"
                        }
                      >
                        {copiedId === mockup._id ? (
                          <>
                            <Check className="h-4 w-4" />
                            {/* Copied */}
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            {/* Copy Link */}
                          </>
                        )}
                      </Button>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(mockup._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      data-tooltip-id="delete-mockup"
                      // data-tooltip-content={
                      //   "It will remove this mockup and all associated feedback points."
                      // }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Tooltip id="mockup-title" className="text-xs max-w-md" />
      <Tooltip id="mockup-copy-link" className="text-xs max-w-md" />
      <Tooltip id="delete-mockup" className="text-xs">
        It will remove this mockup and <br />
        all associated feedback points!!
      </Tooltip>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-b-border">
              <h2 className="text-xl font-semibold text-gray-900">
                Upload New Mockup
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUploadModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mockup Title
                </label>
                <input
                  type="text"
                  placeholder="Enter mockup title"
                  value={newMockupTitle}
                  onChange={(e) => setNewMockupTitle(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <label className="cursor-pointer">
                    <span className="text-brand-600 hover:text-brand-700 font-medium">
                      Click to upload
                    </span>
                    <span className="text-gray-500"> or drag and drop</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG and WEBP up to 20MB
                  </p>
                  {newMockupFile && (
                    <p className="text-sm text-brand-600 mt-2">
                      Selected: {newMockupFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-t-border bg-gray-50">
              <Button
                variant="outline"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                className="bg-gradient-to-r from-brand-600 to-feedback-600"
              >
                Upload Mockup
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
