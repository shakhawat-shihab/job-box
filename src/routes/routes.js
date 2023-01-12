import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import Main from "../layout/main/Main";
import AccountCreator from "../pages/register/AccountCreator";
import Home from "../pages/home/Home";
import JobDetails from "../pages/JobDetails";
import Jobs from "../pages/Jobs";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "../utils/PrivateRoute";
import AddJob from "../pages/employeeDashboard/AddJob";
import EmployerDashboard from "../pages/employeeDashboard/EmployerDashboard";
import CandidateDashboard from "../pages/candidateDashboard/CandidateDashboard";
import AppliedJobs from "../pages/candidateDashboard/AppliedJobs";
import MyJobs from "../pages/employeeDashboard/MyJobs";
import CandidateList from "../pages/employeeDashboard/CandidateList";
import CandidateProfile from "../pages/employeeDashboard/CandidateProfile";
import DirectMessage from "../pages/DirectMessage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/candidate-profile/:email",
        element: (
          <PrivateRoute>
            <CandidateProfile />
          </PrivateRoute>
        )
      },
      {
        path: "/direct-message/:user1/:user2",
        element: (
          <PrivateRoute>
            <DirectMessage />
          </PrivateRoute>
        )
      },
      {
        path: "/job-details/candidates/:id",
        element: (
          <PrivateRoute>
            <CandidateList />
          </PrivateRoute>
        )
      },
      {
        path: "/job-details/:id",
        element: <JobDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/register",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
      {
        path: "/register/:type",
        element: (
          <PrivateRoute>
            <AccountCreator />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-job",
        element: <AddJob />,
      },
      {
        path: "my-jobs",
        element: <MyJobs />,
      },
      {
        path: "applied-jobs",
        element: <AppliedJobs />,
      },
      {
        path: "employer",
        element: <EmployerDashboard />,
      },
      {
        path: "candidate",
        element: <CandidateDashboard />,
      },
    ],
  },
]);

export default routes;
