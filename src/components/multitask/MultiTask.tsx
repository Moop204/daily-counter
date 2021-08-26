import { FunctionComponent, useState, useEffect } from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import { IMultiTask } from "../types";

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

export { MultiTask };
