import {useEffect, useState} from "react";
import {Skeleton} from "antd";
import {fetchWrapper} from "../api/helper";


function Profile() {

    const [email, setEmail] = useState('')

    useEffect(() => {
        const data = fetchWrapper.get('api/v1/users', null).then(res => setEmail(res.payload.email))
    })

    return (
        <div>
            <h1>Profile</h1>
            {email ? <p>{email}</p> : <Skeleton active />}
        </div>
    );
}

export default Profile;