import Navbar from "../../../components/Navbar/Navbar";
import { format } from "date-fns";

const UntakenJobs = () => {
  const jobs = [
    {
      id: 2,
      employer: {
        id: 3,
        username: "ritahchanger",
        email: "ritahchanger@gmail.com",
      },
      title: "Python Development",
      description: "Looking for a Python developer with Django experience.",
      created_at: "2025-03-21T19:03:26.354704Z",
      assigned_to: null,
    },
    {
      id: 3,
      employer: {
        id: 3,
        username: "ritahchanger",
        email: "ritahchanger@gmail.com",
      },
      title: "Node Developer",
      description: "Looking for a Node developer with Django experience.",
      created_at: "2025-03-21T19:03:40.517666Z",
      assigned_to: null,
    },
    {
      id: 4,
      employer: {
        id: 3,
        username: "ritahchanger",
        email: "ritahchanger@gmail.com",
      },
      title: "Graphics Designer",
      description:
        "Looking for a Graphics Designer with experience in branding.",
      created_at: "2025-03-21T19:03:51.724383Z",
      assigned_to: null,
    },
    {
      id: 5,
      employer: {
        id: 3,
        username: "ritahchanger",
        email: "ritahchanger@gmail.com",
      },
      title: "UI UX Engineer",
      description: "Looking for a UI/UX engineer for app design.",
      created_at: "2025-03-21T19:04:00.654975Z",
      assigned_to: null,
    },
  ];

  const handleTakeJob = (id: number) => {
    console.log(`Job ${id} taken!`);
    alert(`You have taken job ID: ${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-[1000px] mx-auto mt-10 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Available Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.description}</p>
              <p className="text-sm text-gray-500">
                Posted by: <span className="font-medium">{job.employer.username}</span>
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
      </div>
    </div>
  );
};

export default UntakenJobs;
