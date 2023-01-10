import React from "react";
import { useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAppliedJobsQuery(email);

  console.log(data)
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className='text-xl my-5 font-semibold text-primary'>Applied jobs</h1>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {data?.data?.map((job) => (
          <JobCard jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
