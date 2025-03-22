import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { format } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE_URL from "../../../configurations/apiConfig";
import { IJob } from "../../../types/Job.interface";

interface ApiResponse {
  success: boolean;
  data: IJob[];
}

// Helper function to truncate text to a specified word limit
const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + "...";
};

const UntakenJobs: React.FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // State to control the modal
  const [modalData, setModalData] = useState<{ isOpen: boolean; text: string }>({
    isOpen: false,
    text: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    const getUntakenJobs = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/jobs`);
        if (response.data.success) {
          setJobs(response.data.data.filter((job) => job.assigned_to === null));
        } else {
          toast.error("Failed to fetch jobs.");
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    getUntakenJobs();
  }, []);

  const handleTakeJob = async (id: number) => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        toast.error("User not found. Please log in.");
        return;
      }

      const userId: number = JSON.parse(storedUser).id;

      const response = await axios.post(`${API_BASE_URL}/jobs/accept/${id}`, {
        worker_id: userId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      } else {
        toast.error("Failed to take job.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Network error.");
    }
  };

  const openModal = (fullText: string) => {
    setModalData({ isOpen: true, text: fullText });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, text: "" });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Jobs</h2>

        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => {
              const words = job.description.split(/\s+/);
              const shouldTruncate = words.length > 50;
              return (
                <div
                  key={job.id}
                  className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {shouldTruncate
                      ? truncateText(job.description, 50)
                      : job.description}
                  </p>
                  {shouldTruncate && (
                    <button
                      className="text-blue-600 text-sm underline mb-2"
                      onClick={() => openModal(job.description)}
                    >
                      Show More
                    </button>
                  )}
                  <p className="text-sm text-gray-500">
                    Posted by:{" "}
                    <span className="font-medium">{job.employer.username}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Posted on: {format(new Date(job.created_at), "PPP p")}
                  </p>
                  <button
                    className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    onClick={() => handleTakeJob(job.id)}
                  >
                    Take Job
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for full description */}
      {modalData.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-xl w-full">
            <h3 className="text-xl font-semibold mb-4">Job Description</h3>
            <p className="text-gray-700">{modalData.text}</p>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UntakenJobs;
