import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

/**
 * NotFound component for the application.
 * This component is displayed when the user navigates to a route that does not exist.
 */
function NotFound() {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Die angeforderte Seite konnte nicht gefunden werden."
            extra={<Button type="primary" onClick={() => navigate("/")}>Zur Startseite</Button>}
        />
    );
}

export default NotFound;