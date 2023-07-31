import ClearIcon from "@mui/icons-material/Clear";
import { Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function Rule({ ruleData, setRuleData }) {
  const ruleHandleChange = (e, index) => {
    let values = [...ruleData];
    let updatedValue = e.target.name;
    values[index][updatedValue] = e.target.value;
    setRuleData(values);
  };

  const dynamicParameterHandleChange = (e, ruleIdx, paraIdx) => {
    const { value } = e.target;
    setRuleData((prevRuleData) =>
      prevRuleData.map((rule, idx) =>
        idx === ruleIdx
          ? {
              ...rule,
              RuleParameter: rule.RuleParameter.map((p, i) =>
                i === paraIdx ? value : p
              ),
            }
          : rule
      )
    );
  };

  const deleteDynamicParameter = (ruleIdx, paraIdx) => {
    setRuleData((prevRuleData) =>
      prevRuleData.map((rule, idx) =>
        idx === ruleIdx
          ? {
              ...rule,
              RuleParameter: rule.RuleParameter.filter((_, i) => i !== paraIdx),
            }
          : rule
      )
    );
  };

  const addDynamicParameter = (ruleIdx) => {
    setRuleData((prevRuleData) =>
      prevRuleData.map((rule, idx) =>
        // set maximum dynamic parameter = 3
        idx === ruleIdx && rule.RuleParameter.length < 3
          ? { ...rule, RuleParameter: [...rule.RuleParameter, ""] }
          : rule
      )
    );
  };

  const deleteRuleComponent = (ruleIdx) => {
    let updatedRuleData = ruleData.filter((data, idx) => idx !== ruleIdx);
    setRuleData(updatedRuleData);
  };

  return (
    <>
      {ruleData.length > 0 && (
        <>
          {ruleData.map((data, ruleIdx) => (
            <Row className="ruleTable" key={data.uuid}>
              <div>
                <div className="mb-2">Rule {ruleIdx + 1}</div>
                <ClearIcon
                  sx={{
                    ":hover": {
                      color: "black",
                    },
                    cursor: "pointer",
                    transition: ".3s ease",
                    position: "absolute",
                    right: "15px",
                    top: "10px",
                  }}
                  fontSize="small"
                  onClick={(e) => deleteRuleComponent(ruleIdx)}
                />
              </div>
              <div className="ruleSubTable">
                <div style={{ paddingTop: "6px" }}>If</div>
                <div>
                  <Form.Select
                    onChange={(e) => ruleHandleChange(e, ruleIdx)}
                    name="RuleField"
                    value={data.RuleField}
                  >
                    <option>Select field</option>
                    <option>afff_sub_1</option>
                    <option>afff_sub_2</option>
                    <option>afff_sub_3</option>
                    <option>afff_sub_4</option>
                  </Form.Select>
                </div>
                <div>
                  <Form.Select
                    onChange={(e) => ruleHandleChange(e, ruleIdx)}
                    name="RuleOperator"
                    value={data.RuleOperator}
                  >
                    <option>Select operator</option>
                    <option>is not</option>
                    <option>is</option>
                    <option>starts with</option>
                    <option>ends with</option>
                    <option>contains</option>
                    <option>doesn't contains</option>
                  </Form.Select>
                </div>
                <div>
                  {data.RuleParameter.map((dataParameter, ParameterIdx) => (
                    <div className="parameterCol" key={ParameterIdx}>
                      <Form.Control
                        onChange={(e) =>
                          dynamicParameterHandleChange(e, ruleIdx, ParameterIdx)
                        }
                        type="text"
                        className="parameterField"
                        name="RuleParameter"
                        value={dataParameter}
                        placeholder="Enter parameter"
                      />
                      {ParameterIdx === 0 ? (
                        <svg
                          onClick={() => addDynamicParameter(ruleIdx)}
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.75 5.25H8.25V8.25H5.25V9.75H8.25V12.75H9.75V9.75H12.75V8.25H9.75V5.25ZM9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
                            fill="#323232"
                          />
                        </svg>
                      ) : (
                        <svg
                          onClick={() =>
                            deleteDynamicParameter(ruleIdx, ParameterIdx)
                          }
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.25 8.25V9.75H12.75V8.25H5.25ZM9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
                            fill="#323232"
                          />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="revenueFlex">
                <span>then revenue is</span>
                <Form.Control
                  onChange={(e) => ruleHandleChange(e, ruleIdx)}
                  type="number"
                  name="RuleRevenue"
                  className="revenueField"
                  value={data.RuleRevenue}
                  placeholder="% Enter amount"
                />
              </div>
            </Row>
          ))}
        </>
      )}
    </>
  );
}
