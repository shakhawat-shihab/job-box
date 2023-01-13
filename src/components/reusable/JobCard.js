import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const JobCard = ({ jobData }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { _id, position, companyName, location, employmentType, applicationCount, employerEmail } =
    jobData || {};

  return (
    <div
      key={_id}
      className='border border-gray-300 shadow-xl p-5 rounded-2xl text-primary'
    >
      <div className='flex justify-between  text-primary'>
        <div>
          <p className='text-xl'>{position}</p>
          <div className="">
            <small className='text-primary/70 '>
              by{" "}
              <span className='font-semibold hover:text-primary cursor-pointer hover:underline transition-all'>
                {companyName}
              </span>
            </small>
          </div>
        </div>
        <div>
          <p>{location}</p>
          {
            user?.email === employerEmail &&
            <small className="pr-4 ">
              {applicationCount} Applications
            </small>
          }
        </div>
      </div>

      <div className='flex justify-between items-center mt-5'>
        <p>{employmentType}</p>

        <button className='btn' onClick={() => navigate(`/job-details/${_id}`)}>
          Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
