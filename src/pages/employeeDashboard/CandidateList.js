import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useGetCandidatesQuery } from '../../features/job/jobApi';

const CandidateList = () => {
    const { id } = useParams();
    const { user } = useSelector(state => state.auth);
    const { data } = useGetCandidatesQuery(id, { pollingInterval: 5000 });
    const navigate = useNavigate();
    // console.log(data);
    return (
        <div className='pt-14'>
            {/* <h1>Candidate List</h1> */}
            <div class='flex flex-col justify-center items-center h-full w-full '>
                <div class='w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>
                    <header class='px-5 py-4 border-b border-gray-100'>
                        <div class='font-semibold text-gray-800'>Candidate List</div>
                    </header>

                    <div class='overflow-x-auto p-3'>
                        <table class='table-auto w-full'>
                            <thead class='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                                <tr>

                                    <th class='p-2'>
                                        <div class='font-semibold text-left'>Email</div>
                                    </th>
                                    <th class='p-2'>
                                        <div class='font-semibold text-center'>Profile</div>
                                    </th>

                                    <th class='p-2'>
                                        <div class='font-semibold text-center'>Contact</div>
                                    </th>

                                </tr>
                            </thead>

                            <tbody class='text-sm divide-y divide-gray-100'>
                                {
                                    data?.data?.applicants?.map(({ email, id, firstName, lastName }) => (
                                        <tr>
                                            <td class='p-2'>
                                                <div class='font-medium text-gray-800'>{email}</div>
                                            </td>

                                            <td class=' text-left'>
                                                <div class='flex justify-center'>
                                                    <button
                                                        className='underline hover:text-primary'
                                                        onClick={() => navigate(`/candidate-profile/${email}`)}
                                                        title="Click to see full profile"
                                                    >
                                                        {`${firstName} ${lastName}`}
                                                    </button>
                                                </div>
                                            </td>
                                            <td class='p-2 text-left'>
                                                <div class='flex justify-center'>
                                                    <button
                                                        className='underline hover:text-primary'
                                                        onClick={() => { navigate(`/direct-message/${user?.email}/${email}`) }}
                                                    >
                                                        <small>Message</small>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default CandidateList;