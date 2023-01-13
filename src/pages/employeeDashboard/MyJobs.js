import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import JobCard from '../../components/reusable/JobCard';
import { useGetJobsQuery, useGetMyJobsQuery } from '../../features/job/jobApi';

const MyJobs = () => {
    const navigate = useNavigate();
    const { user: { email, _id } } = useSelector(state => state.auth)
    const { data, isLoading, isError } = useGetMyJobsQuery(email, { pollingInterval: 4000 });
    console.log('my job ', data)
    return (
        <div className='pt-14'>
            <div className='bg-primary/10 p-5 rounded-2xl'>
                <h1 className='font-semibold text-xl'>Jobs Created By Me</h1>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-5'>
                {
                    data?.data?.map(x =>
                        <JobCard key={x._id} jobData={x} />
                    )
                }
            </div>
        </div >
    );
};

export default MyJobs;