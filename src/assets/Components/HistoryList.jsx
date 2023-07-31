import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";

export default function HistoryList({ historyData, setHistoryData }) {
  const deleteRuleData = (uuid) => {
    const updatedHistoryData = historyData.map((data) => ({
      ...data,
      RuleList: data.RuleList.filter((edata) => edata.uuid != uuid),
    }));

    setHistoryData(updatedHistoryData);
  };

  const deleteRevenueGroup = (uuid) => {
    const updatedHistoryData = historyData.filter(
      (edata) => edata.uuid != uuid
    );
    setHistoryData(updatedHistoryData);
  };
  return (
    <>
      {historyData.map((data, index) => (
        <div className="historyListingItem" key={index}>
          <div className="historyHeader">
            <div className="groupName">
              <h4>{data.GroupName}</h4>
              {data.isSpecialGroup && <span>Special Group</span>}
            </div>
            <div className="grouDescription">{data.GroupDescription}</div>
            <div className="deleteIcon">
              <DeleteIcon
                sx={{
                  ":hover": {
                    color: "black",
                  },
                  cursor: "pointer",
                  transition: ".3s ease",
                }}
                fontSize="small"
                onClick={() => deleteRevenueGroup(data.uuid)}
              />
            </div>
          </div>
          {/* table here */}
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Rule</th>
                <th>Field</th>
                <th>Operator</th>
                <th>Parameter 1</th>
                <th>Parameter 2</th>
                <th>Parameter 3</th>
                <th>Revenue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.RuleList.map((ruleData, index) => (
                <tr key={ruleData.uuid}>
                  <td>{index + 1}</td>
                  <td>{ruleData.RuleField}</td>
                  <td>{ruleData.RuleOperator}</td>
                  <td>{ruleData.RuleParameter[0]}</td>
                  <td>{ruleData.RuleParameter[1]}</td>
                  <td>{ruleData.RuleParameter[2]}</td>
                  <td>{ruleData.RuleRevenue}%</td>
                  <td>
                    <DeleteIcon
                      fontSize="small"
                      color="disabled"
                      sx={{
                        ":hover": {
                          color: "black",
                        },
                        cursor: "pointer",
                        transition: ".3s ease",
                      }}
                      onClick={() => deleteRuleData(ruleData.uuid)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </>
  );
}
