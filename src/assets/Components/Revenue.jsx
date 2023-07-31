import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { v4 as uuid } from "uuid";

import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Rule from "./Rule";
import History from "./History";

export default function Revenue() {
  const [formData, setFormData] = useState({
    GroupName: "",
    GroupDescription: "",
    isSpecialGroup: false,
  });

  const [historyData, setHistoryData] = useState([]);

  const [ruleData, setRuleData] = useState([
    {
      uuid: uuid(),
      RuleField: "",
      RuleOperator: "",
      RuleParameter: [""],
      RuleRevenue: "",
    },
  ]);
  const handleChange = (e) => {
    setFormData((currData) => {
      return {
        ...currData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const checkListHandleChange = (e) => {
    setFormData((currData) => {
      return {
        ...currData,
        isSpecialGroup: e.target.checked,
      };
    });
  };

  const submitRevenue = () => {
    // create a deep copy and generate uuid into ruleData
    const newRuleData = ruleData.map((rule) => ({
      ...rule,
    }));

    // combined the rule with the form data
    const newHistory = {
      uuid: uuid(),
      GroupName: formData.GroupName,
      GroupDescription: formData.GroupDescription,
      isSpecialGroup: formData.isSpecialGroup,
      RuleList: newRuleData,
    };

    // save combined data to history state
    setHistoryData((prevHistory) => [...prevHistory, newHistory]);
    resetFormData();
  };

  const addRules = () => {
    const newRules = {
      uuid: uuid(),
      RuleField: "",
      RuleOperator: "",
      RuleParameter: [""],
      RuleRevenue: "",
    };
    setRuleData((prevRules) => [...prevRules, newRules]);
  };

  const resetFormData = () => {
    setFormData({
      GroupName: "",
      GroupDescription: "",
      isSpecialGroup: false,
    });

    setRuleData([
      {
        uuid: uuid(),
        RuleField: "",
        RuleOperator: "",
        RuleParameter: [""],
        RuleRevenue: "",
      },
    ]);
  };

  return (
    <>
      <Container className="wrapper">
        <h4 className="mb-4">Create Revenue Group</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="text"
              name="GroupName"
              value={formData.GroupName}
              placeholder="Name"
              required
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 text-field-custom"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Group Description</Form.Label>
            <Form.Control
              as="textarea"
              name="GroupDescription"
              value={formData.GroupDescription}
              onChange={handleChange}
              rows={3}
              maxLength={200}
              placeholder="Add description"
            />
            <small className="text-muted">
              {formData.GroupDescription.length} / {200}
            </small>
          </Form.Group>
          {["checkbox"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={`Special group`}
                name="isSpecialGroup"
                className="specialGroupLabel"
                checked={formData.isSpecialGroup}
                onChange={checkListHandleChange}
              />
            </div>
          ))}

          <div className="rulesWithAddBtn">
            <div className="label">Rules</div>
            <div>
              <Fab
                variant="extended"
                className="custom-PlusBtn"
                onClick={addRules}
                color="primary"
              >
                <AddIcon sx={{ mr: 1 }} />
                add
              </Fab>
            </div>
          </div>

          {/* Rules rendering */}
          <Rule ruleData={ruleData} setRuleData={setRuleData} />

          {/* Sumit Button Group */}
          <Stack
            className="custom-SubmitBtn-Group"
            spacing={1}
            direction="row"
            justifyContent="right"
          >
            <Button
              className="custom-BtnGroup reset"
              variant="outlined"
              onClick={resetFormData}
            >
              Reset
            </Button>
            <Button
              className="custom-BtnGroup"
              variant="contained"
              onClick={submitRevenue}
            >
              Submit
            </Button>
          </Stack>
        </Form>
      </Container>

      {historyData.length > 0 && (
        <History historyData={historyData} setHistoryData={setHistoryData} />
      )}
    </>
  );
}
