import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../state/reduxStore.ts";
import {Skeleton} from "antd";

function Profile() {

    const [email, setEmail] = useState('')

    const token = useSelector((state: RootState) => state.auth.authtoken as string)

    useEffect(() => {

        fetch('http://localhost:8080/api/v1/users', {
            method: 'GET',
            headers: new Headers({Authorization: `Bearer ${token}`})
        }).then(response => response.json()).then(data => {
            setEmail(data.payload.email)
        })

    })

    return (
        <div>
            <h1>Profile</h1>
            {email ? <p>{email}</p> : <Skeleton active />}
        </div>
    );
}

export default Profile;