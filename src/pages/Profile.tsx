function Profile() {
    /*
    const [email, setEmail] = useState('not logged in')

    const token = useSelector((state) => state.auth.token as string)

    useEffect(() => {

        let response =  fetch('http://localhost:8080/api/v1/users', {
            method: 'GET',
            headers: new Headers({Authorization: `Bearer ${token}`})
        }).then(response => response.json()).then(data => {
            setEmail(data.payload.email)
        })

    })
    */

    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default Profile;