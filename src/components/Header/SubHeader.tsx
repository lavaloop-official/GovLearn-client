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
        <div style={{
            width: "100%",
            height: "32px",
            borderTop: "1px solid #D9D9D9",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center"
        }}>
            <Button
                type="text"
                href="/bookmarks"
                style={{
                    margin: "0",
                    borderRadius: "0px",
                    maxWidth: "250px",
                    width: "100%",
                    ...styleSelected("bookmarks")
                }}>
                Markierte Kurse
            </Button>
            <Button
                type="text"
                href="/discover"
                style={{
                    margin: "0",
                    borderRadius: "0px",
                    maxWidth: "250px",
                    width: "100%",
                    ...styleSelected("discover")
                }}>
                Entdecken
            </Button>
            <Button
                type="text"
                href="/profile"
                style={{
                    margin: "0",
                    borderRadius: "0px",
                    maxWidth: "250px",
                    width: "100%",
                    ...styleSelected("profile")
                }}>
                Profil
            </Button>
        </div>
    );
}

export default SubHeader;