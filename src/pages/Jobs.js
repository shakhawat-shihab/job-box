import React from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";

const Jobs = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetJobsQuery();
  // const { position, companyName } = data.data || {};


  return (
    <div className='pt-14'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>

        {
          data?.data?.map(x =>
            <JobCard jobData={x} />
            // <div>
            //   <h1>{x?.position}</h1>
            //   <p>{x?.companyName}</p>
            //   <button onClick={() => navigate(`/job-details/${x?._id}`)}>Details</button>
            // </div>
          )
        }
      </div>
    </div >
  );
};

export default Jobs;
