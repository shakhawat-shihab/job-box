import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BsArrowRightShort } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetUserByEmailQuery } from '../features/auth/authApi';
import { useGetMessagesQuery, usePostMessageMutation } from '../features/chat/chatApi';

const DirectMessage = () => {
    let { userEmail } = useParams();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const { data } = useGetUserByEmailQuery(userEmail);
    const [postMessage] = usePostMessageMutation();
    const { register, handleSubmit, reset } = useForm();

    const { data: messageData } = useGetMessagesQuery({ user1: user.email, user2: userEmail }, {
        pollingInterval: 2000
    });
    // console.log(messageData?.data)



    const sendReplyOfMessage = (data) => {
        // console.log(data);
        const date = new Date();
        const message = {
            message: data.message,
            sendAt: date,
            sendFrom: user?.email,
            sendTo: userEmail
        }
        // console.log(message);
        postMessage(message);
        reset();
    }



    window.setInterval(function () {
        var elem = document.getElementById('test');
        // console.log(elem)
        elem.scrollTop = elem.scrollHeight + 10000;
    }, 1000);

    return (
        <div className='pt-14'>
            <div class='flex flex-col justify-center items-center h-full w-full mt-10'>
                <div class='w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200'>
                    <div
                    //  style={{ height: '600px', overflow: 'scroll' }}
                    >
                        <header class='px-5 py-4 border-b border-gray-100'>
                            <div class='font-semibold text-gray-800'>
                                Chat with {" "}
                                <span className='text-sky-700 text-xl pl-6' >
                                    {data?.data?.firstName}  {data?.data?.lastName}
                                </span>
                            </div>
                        </header>

                        <div class='p-3  '
                            style={{ height: '500px' }}
                        >
                            <div className='' id="test" style={{ overflowY: 'scroll', height: '75%' }}>
                                {
                                    // ml-auto
                                    messageData?.data?.map(x =>
                                        <div className={`my-4 `} key={x.sendAt}>
                                            <p className={`w-3/4 bg-sky-200 rounded-3xl p-4  ${x?.sendFrom === user.email ? "ml-auto" : null} `}>
                                                {/* Ante in nibh mauris cursus mattis molestie a iaculis.
                                        Neque egestas congue quisque egestas.
                                        Sed vulputate mi sit amet mauris commodo quis imperdiet massa. */}
                                                {
                                                    x?.text
                                                }
                                            </p>
                                            <p className={`px-4   ${x?.sendFrom === user.email ? "text-right" : null} `}>
                                                {x?.sendAt}
                                            </p>
                                        </div>
                                    )
                                }
                            </div>

                            <div >
                                <form className='flex gap-3 my-8' onSubmit={handleSubmit(sendReplyOfMessage)}>
                                    <input placeholder='Reply'
                                        type='text' className='w-full hover:border-sky-800 focus:border-sky-800'
                                        {...register("message")}
                                    />
                                    <button
                                        className='shrink-0 h-14 w-14 bg-sky/10 border border-sky hover:bg-sky-800 rounded-full transition-all  grid place-items-center text-sky-800 hover:text-white'
                                        type='submit'
                                    >
                                        <BsArrowRightShort size={30} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </div>
    );
};

export default DirectMessage;