import { Container } from "react-bootstrap";
import HistoryList from "./HistoryList";

export default function History({ historyData, setHistoryData }) {
  return (
    <>
      <Container className="historyWrapper">
        <h4 className="mb-4">Browse Revenue Groups</h4>
        <HistoryList
          historyData={historyData}
          setHistoryData={setHistoryData}
        />
      </Container>
    </>
  );
}
