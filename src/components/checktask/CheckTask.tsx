import { FunctionComponent, useState, useEffect } from "react";
import { Card, Row, Col, ToggleButton } from "react-bootstrap";
import { ICheckTask } from "../types";

const CheckTask: FunctionComponent<ICheckTask> = ({
  description,
  initialValue,
}) => {
  const [checked, setChecked] = useState(initialValue);
  const [bgColour, setBgColour] = useState(
    initialValue ? "#A7F1A8" : "#F5F5F5"
  );

  useEffect(() => {
    setBgColour(checked ? "#A7F1A8" : "#F5F5F5");
  }, [checked]);

  return (
    <Card style={{ backgroundColor: bgColour }}>
      <Card.Body>
        <Row>
          <Col
            className="col-xs-3 col-sm-5 col-md-7 col-lg-9"
            style={{ fontSize: "x-large", textOverflow: "ellipses" }}
          >
            {description}
          </Col>
          <Col xs="auto">
            <ToggleButton
              className="mb-2"
              id="toggle-check"
              type="checkbox"
              variant="outline-success"
              value={checked ? "1" : "0"}
              checked={checked}
              onChange={(e) => {
                setChecked(!checked);
                console.log(checked);
              }}
              style={{ margin: "!0px" }}
            >
              Completed
            </ToggleButton>
          </Col>
        </Row>
      </Card.Body>{" "}
    </Card>
  );
};

export { CheckTask };
