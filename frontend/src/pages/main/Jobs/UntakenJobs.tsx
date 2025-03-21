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

const UntakenJobs: React.FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    toast.error("User not found. Please log in.");
    return;
  }

  const userId: number = JSON.parse(storedUser).id;

  // Fetch Available Jobs
  useEffect(() => {
    const getUntakenJobs = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${API_BASE_URL}/jobs`);
        if (response.data.success) {
          setJobs(response.data.data.filter((job) => job.assigned_to === null)); // Filter untaken jobs
        } else {
          toast.error("Failed to fetch jobs.");
        }
      } catch (error) {
        toast.error("Error fetching jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getUntakenJobs();
  }, []);

  const handleTakeJob = async (id: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}jobs/accept/${id}`, {
        worker_id: userId,
      });
    } catch (error) {
      toast(`There was network issues`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Jobs</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
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
                <button
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  onClick={() => handleTakeJob(job.id)}
                >
                  Take Job
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UntakenJobs;
