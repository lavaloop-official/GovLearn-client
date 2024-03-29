import {Button} from "antd";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function SubHeader() {

    const location = useLocation();

    const [selected, setSelected] = useState<string>("")

    useEffect(() => {
        setSelected(location.pathname)
    }, [location.pathname])

    function styleSelected(path: string) {
        if (selected.includes(path))
            return {fontWeight: "bold"}
    }

    return (
        <div className="subHeader">
            <Button
                type="text"
                href="/groups"
                style={{
                    margin: "0",
                    borderRadius: "0px",
                    maxWidth: "250px",
                    width: "100%",
                    ...styleSelected("groups")
                }}>
                Gruppen
            </Button>
            <Button
                type="text"
                href="/discover"
                style={{
                    ...styleSelected("discover")
                }}>
                Entdecken
            </Button>
            <Button
                type="text"
                href="/profile"
                style={{
                    ...styleSelected("profile")
                }}>
                Profil
            </Button>
        </div>
    );
}

export default SubHeader;