import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByEmailQuery } from '../../features/auth/authApi';

const CandidateProfile = () => {
    const { email } = useParams();
    const { data } = useGetUserByEmailQuery(email)

    console.log('profile  ', data)

    const {
        firstName,
        lastName,
        gender,
        email: mail,
        country,
        address,
        city,
        postcode,
        _id
    } = data?.data || {};


    return (
        <div className='pt-14' >
            <div className='flex justify-center items-center overflow-auto p-10'>

                <div
                    className='bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between'
                >
                    <h1 className='w-full text-2xl text-primary mb-5'>Candidate Profile</h1>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='firstName'>
                            First Name
                        </label>
                        <input type='text' id='firstName' defaultValue={firstName} readOnly />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='lastName'>
                            Last Name
                        </label>
                        <input type='text' id='lastName' defaultValue={lastName} />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input
                            className="cursor-not-allowed"
                            type='email' id='email'
                            defaultValue={mail} readOnly
                        />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='email'>
                            Gender
                        </label>
                        <input
                            className="cursor-not-allowed"
                            type='text' id='gender'
                            defaultValue={gender} readOnly
                        />
                    </div>
                    <hr className='w-full mt-2 bg-black' />
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-3' for='country'>
                            Country
                        </label>
                        <input type='text' defaultValue={country} readOnly id='country' />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='address'>
                            Street Address
                        </label>
                        <input type='text' defaultValue={address} readOnly id='address' />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='city'>
                            City
                        </label>
                        <input type='text' defaultValue={city} readOnly id='city' />
                    </div>
                    <div className='flex flex-col w-full max-w-xs'>
                        <label className='mb-2' htmlFor='postcode'>
                            Postal Code
                        </label>
                        <input type='text' defaultValue={postcode} readOnly id='postcode' />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default CandidateProfile;