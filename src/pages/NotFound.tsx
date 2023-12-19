import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

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