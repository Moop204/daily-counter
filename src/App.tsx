import { Formik } from "formik";
import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { CheckTask } from "./components/checktask/CheckTask";
import { MultiTask } from "./components/multitask/MultiTask";
import { ICheckTask, IMultiTask, ValidTask } from "./components/types";

interface IAddTaskModal {
  show: boolean;
  handleClose: any;
  addTask: (task: ValidTask) => void;
  taskDescriptor: VarState;
}

const AddTaskModal: FunctionComponent<IAddTaskModal> = ({
  show,
  handleClose,
  addTask,
  taskDescriptor,
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

        <Formik
          initialValues={{
            description: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            const task: ICheckTask | IMultiTask = {
              description: values.description,
              initialValue: false,
            };
            addTask(task);
          }}
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
          }) => {
            return (
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter description."
                  value={values.description}
                />
                <Form.Text className="text-muted">
                  Short text describing task.
                </Form.Text>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleSubmit();
                      handleClose();
                    }}
                  >
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form.Group>
            );
          }}
        />
      </Modal.Body>
    </Modal>
  );
};

interface VarState {
  var: any;
  updateVar: Dispatch<any>;
}

function App() {
  const [addTaskShow, setAddTaskShow] = useState(false);
  const handleClose = () => setAddTaskShow(false);
  const handleOpen = () => setAddTaskShow(true);
  const [tasks, setTasks] = useState([
    { description: "Test1", initialValue: 2, totalValue: 10 },
    { description: "Test2", initialValue: false },
  ] as ValidTask[]);

  const addTask = (task: ValidTask) => {
    setTasks((tasks) => [...tasks, task]);
  };

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  const taskDescriptor: VarState = {
    var: tasks,
    updateVar: setTasks,
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
        taskDescriptor={taskDescriptor}
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
