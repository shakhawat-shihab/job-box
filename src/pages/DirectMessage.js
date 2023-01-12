import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const DirectMessage = () => {
    let { user1, user2 } = useParams();
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(user1, user?.email)
        if (user1 !== user.email && user1 && user.email) {
            toast.error("You are not authorized to view these messages.");
            navigate('/');

            //for  not showing toast second time
            user1 = "";
        }
    }, [user, user1])
    return (
        <div className='pt-14'>
            <h1>Direct Message</h1>
            <p>{user?.email} {user1}</p>
        </div>
    );
};

export default DirectMessage;