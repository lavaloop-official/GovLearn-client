import { Card, Flex } from "antd";
import "./Imprint.css";

function Imprint() {
    return (
        <Flex vertical justify="center" align="center">
            <Flex vertical className="imprint-body" align="center">
                <Card>
                <h2>Impressum</h2>
                <hr />
                <p>Govlearn ist ein Projekt der <a target="_blank" href="https://www.uni-muenster.de/de/">Uni Münster</a>. </p>
                <p>Das Projekt wird im Wintersemester 2023/24 durchgeführt.</p>
                <p>
                    <b>Angaben gemäß § 5 TMG:</b><br />
                    <b>Verantwortlich für den Inhalt:</b><br />
                    Institut für Wirtschaftsinformatik<br />
                    Leonardo-Campus 3<br />
                    48149 Münster
                </p>
                <p>
                    <b>Kontakt:</b><br />
                    E-Mail: kontakt@govlearn.de
                </p>
                <p>
                    <b>Haftungsausschluss:</b><br />
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. <br />
                    Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. <br />
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                </p>
                <p>
                    <b>Urheberrecht:</b><br />
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.
                </p>
                </Card>
            </Flex>
        </Flex>
    );
}

export default Imprint;