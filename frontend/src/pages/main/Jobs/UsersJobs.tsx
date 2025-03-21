import Navbar from "../../../components/Navbar/Navbar";
import { format } from "date-fns";

const UsersJobs = () => {
  // Static Data (Simulating API Response)
  const userJobs = [
    {
      id: 1,
      employer: {
        id: 3,
        username: "ritahchanger",
        email: "ritahchanger@gmail.com",
      },
      title: "Software Developer",
      description: "Looking for a Python developer with Django experience.",
      created_at: "2025-03-21T19:00:34.176629Z",
      assigned_to: 2,
    },
    {
      id: 2,
      employer: {
        id: 4,
        username: "john_doe",
        email: "johndoe@example.com",
      },
      title: "Frontend Developer",
      description: "React developer needed for a startup project.",
      created_at: "2025-03-22T14:15:10.100000Z",
      assigned_to: 2,
    },
    {
      id: 3,
      employer: {
        id: 5,
        username: "jane_smith",
        email: "janesmith@example.com",
      },
      title: "Backend Engineer",
      description: "Node.js and Express expert required.",
      created_at: "2025-03-23T08:30:45.500000Z",
      assigned_to: 2,
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Your Assigned Jobs
        </h2>

        {userJobs.length === 0 ? (
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
                  Assigned on: {format(new Date(job.created_at), "PPP p")}
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
