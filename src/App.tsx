import { FunctionComponent, useEffect, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  Col,
  Container,
  Form,
  Modal,
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

interface IAddTaskModal {
  show: boolean;
  handleClose: any;
  addTask: (task: ITask) => void;
}

const AddTaskModal: FunctionComponent<IAddTaskModal> = ({
  show,
  handleClose,
  addTask,
}) => {
  const [formType, setFormType] = useState("check");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Button type="button" value="check">
              One-time
            </Button>
          </Col>

          <Col>
            <Button type="button" value="multi">
              Multi-action
            </Button>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            Short text describing task.
          </Form.Text>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* <Button variant="primary" onClick={() => { 
          let newTask: ITask; 
          if(formType === "check") {
            newTask = { description: }
          }
          addTask()
          handleClose(); } }>
          Save Changes
        </Button> */}
      </Modal.Footer>
    </Modal>
  );
};

function App() {
  const [addTaskShow, setAddTaskShow] = useState(false);
  const handleClose = () => setAddTaskShow(false);
  const handleOpen = () => setAddTaskShow(true);
  const [tasks, setTasks] = useState([
    { description: "Test1", initialValue: 2, totalValue: 10 },
    { description: "Test2", initialValue: false },
  ] as (ICheckTask | IMultiTask)[]);

  const addTask = (task: ITask) => {
    tasks.push(task);
  };

  return (
    <div style={{ padding: "12px", backgroundColor: "#effaae" }}>
      <Row>
        <Col xl={10}>
          <h1>Daily Counters</h1>
        </Col>
        <Col>
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
              <Button onClick={handleOpen}>+</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Row>

      <AddTaskModal
        show={addTaskShow}
        handleClose={handleClose}
        addTask={addTask}
      />

      <Row>
        {tasks.map((task: any) => {
          if (task.totalValue) {
            return (
              <div style={{ margin: "4px" }}>
                <MultiTask
                  description={task.description}
                  initialValue={task.initialValue}
                  totalValue={task.totalValue}
                />
              </div>
            );
          } else {
            return (
              <div style={{ margin: "4px" }}>
                <CheckTask
                  description={task.description}
                  initialValue={task.initialValue}
                />
              </div>
            );
          }
        })}
      </Row>
    </div>
  );
}

export default App;
