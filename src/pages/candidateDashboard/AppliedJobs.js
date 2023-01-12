import React from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/reusable/JobCard";
import Loading from "../../components/reusable/Loading";
import { changeStatus, toggleRecent } from "../../features/filter/filterSlice";
import { useGetAppliedJobsQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const dispatch = useDispatch();

  const { showRecent, status } = useSelector(state => state.filter);

  const {
    user: { email },
  } = useSelector((state) => state.auth);

  const { data, isLoading } = useGetAppliedJobsQuery(email);

  console.log('data  ==> ', data);

  if (isLoading) {
    return <Loading />;
  }


  let content;
  if (data?.data?.length) {
    let newArr = []
    newArr = [...data.data]
    content = newArr
      .sort((a, b) => {
        if (showRecent) {
          return new Date(a.createdAt) - new Date(b.createdAt)
        }
        else {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }
      })
      .filter(x => {
        if (status?.length) {
          return status.includes(x?.status)
        }
        return x;
      })
      .map((job) => (
        <JobCard key={job._id} jobData={job} />
      ))
  }
  console.log(content);


  const activeClass = "text-white  bg-primary/80 ";
  const normalClass = "text-primary  bg-primary/40";

  return (
    <div>
      <h1 className='text-xl my-5 font-semibold text-primary'>Applied jobs</h1>
      <div className="my-4">
        <div className='flex justify-end'>
          <button
            className={`rounded-3xl hover:text-white hover:bg-primary/75    px-5 py-3 mx-3   ${showRecent ? activeClass : normalClass}  `}
            onClick={() => dispatch(toggleRecent())}
          >
            Sort by Recent
          </button>
          <button
            className={`rounded-3xl hover:text-white hover:bg-primary/75    px-5 py-3 mx-3  ${status?.includes("accepted") ? activeClass : normalClass} `}
            onClick={() => dispatch(changeStatus("accepted"))}
          >
            Accepted
          </button>
          <button
            className={`rounded-3xl hover:text-white hover:bg-primary/75    px-5 py-3 mx-3  ${status?.includes("pending") ? activeClass : normalClass} `}
            onClick={() => dispatch(changeStatus("pending"))}
          >
            Pending
          </button>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-5 pb-5'>
        {/* {data?.data?.map((job) => (
          <JobCard jobData={job} />
        ))} */}

        {
          content
        }
      </div>
    </div>
  );
};

export default AppliedJobs;
