import {Button, Result} from "antd";

function ResetSuccess({finished}: { finished: any }) {
    return (
        <Result
            status="success"
            title="Die E-Mail wurde erfolgreich versendet!"
            subTitle="Sie erhalten in Kürze eine E-Mail mit einem Link zum Zurücksetzen des Passworts."
            extra={[
                <Button type="primary" key="console" onClick={finished}>
                    OK
                </Button>
            ]}
        />
    );
}

export default ResetSuccess;