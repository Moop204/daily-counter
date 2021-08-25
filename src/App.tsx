import { FunctionComponent, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  ToggleButton,
} from "react-bootstrap";

interface ITask {
  description: string;
  initialValue: any;
}

interface ICheckTask extends ITask {
  initialValue: boolean;
}

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

interface IMultiTask extends ITask {
  initialValue: number;
  totalValue: number;
}

const MultiTask: FunctionComponent<IMultiTask> = ({
  description,
  initialValue,
  totalValue,
}) => {
  const [count, setCount] = useState(initialValue);
  const [bgColour, setBgColour] = useState(
    initialValue ? "#A7F1A8" : "#F5F5F5"
  );

  useEffect(() => {
    setBgColour(count >= totalValue ? "#A7F1A8" : "#F5F5F5");
  }, [count, totalValue]);

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
            <Button
              className={
                count === totalValue
                  ? "mb-2 active .btn-outline-success"
                  : "mb-2"
              }
              id="multi-button"
              variant="outline-success"
              onClick={() => {
                const newCount = count + 1;
                setCount(newCount > totalValue ? totalValue : newCount);
                console.log(count);
              }}
            >
              Complete{" "}
              <Badge style={{ backgroundColor: "#A7F1A8" }}>
                {count}/{totalValue}
              </Badge>
            </Button>
          </Col>
        </Row>
      </Card.Body>{" "}
    </Card>
  );
};

function App() {
  const [checked, setChecked] = useState(false);
  const [bgColour, setBgColour] = useState("light");

  useEffect(() => {
    setBgColour(checked ? "#A7F1A8" : "#F5F5F5");
  }, [checked]);

  return (
    <div style={{ padding: "12px", backgroundColor: "#effaae" }}>
      <h1>Daily Counters</h1>
      <Row>
        <Col>
          <MultiTask description="Eat food " initialValue={0} totalValue={3} />
        </Col>
        <Col>
          <CheckTask description="Make your bed" initialValue={false} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
