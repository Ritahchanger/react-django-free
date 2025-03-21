import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { format } from "date-fns";
import API_BASE_URL from "../../../configurations/apiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import { usePreloader } from "../../../context/PreloaderContext";

// Define Types for Job and Employer
interface Employer {
  id: number;
  username: string;
  email: string;
}

interface Job {
  id: number;
  employer: Employer;
  title: string;
  description: string;
  created_at: string;
  assigned_to: number | null;
}

interface ApiResponse {
  success: boolean;
  data: Job[];
}

const UsersJobs: React.FC = () => {
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const { loading, setLoading } = usePreloader(); // Using Preloader Context

  useEffect(() => {
    const getUserJobs = async () => {
      setLoading(true);
      try {
        
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          toast.error("User not found. Please log in.");
          return;
        }

        const userId : number = JSON.parse(storedUser).id;

        const response = await axios.get<ApiResponse>(
          `${API_BASE_URL}/jobs/worker/${userId}`
        );
        if (response.data.success) {
          setUserJobs(response.data.data);
        } else {
          toast.error("Failed to fetch jobs.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    getUserJobs();
  }, [setLoading]);

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Your Assigned Jobs
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : userJobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs assigned yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userJobs.map((job) => (
              <div
                key={job.id}
                className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600 mb-2">{job.description}</p>
                <p className="text-sm text-gray-500">
                  Posted by:{" "}
                  <span className="font-medium">{job.employer.username}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Posted on: {format(new Date(job.created_at), "PPP p")}
                </p>
                <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersJobs;
