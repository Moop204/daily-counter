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
import * as Yup from "yup";
import { string } from "yup/lib/locale";

interface IAddTaskModal {
  show: boolean;
  handleClose: any;
  addTask: (task: ValidTask) => void;
  taskDescriptor: VarState;
}

const validationCheckSchema = Yup.object().shape({
  description: Yup.string().required(),
  // initialValue: Yup.boolean().required(),
});

const validationMultiSchema = Yup.object().shape({
  description: Yup.string().required(),
  initialValue: Yup.string().required(),
  totalValue: Yup.number().required().positive(),
});

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
            <Button
              type="button"
              value="check"
              onClick={() => setFormType("check")}
            >
              One-time
            </Button>
          </Col>

          <Col>
            <Button
              type="button"
              value="multi"
              onClick={() => setFormType("multi")}
            >
              Multi-action
            </Button>
          </Col>
        </Row>

        {formType === "check" && (
          <Formik
            initialValues={{
              description: "",
              initialValue: false,
            }}
            onSubmit={(values) => {
              console.log(values);
              const task: ICheckTask | IMultiTask = {
                description: values.description,
                initialValue: false,
              };
              addTask(task);
              handleClose();
            }}
            validationSchema={validationCheckSchema}
            render={({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => {
              return (
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter description."
                    value={values.description}
                    isValid={touched.description && !errors.description}
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
                        if (!errors.description) handleSubmit();
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form.Group>
              );
            }}
          />
        )}
        {formType === "multi" && (
          <Formik
            initialValues={{
              description: "",
              initialValue: 0,
              totalValue: 1,
            }}
            validationSchema={validationMultiSchema}
            onSubmit={(values, e) => {
              console.log(e);
              console.log(values);
              const task: ValidTask = {
                description: values.description,
                initialValue: 0,
                totalValue: values.totalValue,
              };
              addTask(task);
              handleClose();
            }}
            render={({
              handleChange,
              handleSubmit,
              handleBlur,
              values,
              errors,
              touched,
            }) => {
              return (
                <>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      type="text"
                      placeholder="Enter description."
                      value={values.description}
                      isValid={touched.description && !errors.description}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid city.
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      Short text describing task.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="totalValue">
                    <Form.Label>Total Actions</Form.Label>
                    <Form.Control
                      onChange={(e) => {
                        if (e.target.value.match(/^[0-9]*$/)) handleChange(e);
                      }}
                      type="text"
                      placeholder="Enter total actions."
                      value={values.totalValue}
                      isValid={!errors.totalValue}
                      required
                    />
                    <Form.Text className="text-muted">
                      Number of actions required to complete task.
                    </Form.Text>
                  </Form.Group>

                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        if (
                          !errors.description ||
                          !errors.initialValue ||
                          !errors.totalValue
                        ) {
                          handleSubmit();
                        } else {
                          console.log(!errors.description);
                        }
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </>
              );
            }}
          />
        )}
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
  const [tasks, setTasks] = useState<ValidTask[] | null>(
  //   [
  //   { description: "Test1", initialValue: 2, totalValue: 10 },
  //   { description: "Test2", initialValue: false },
  // ]
  null);

  const addTask = (task: ValidTask) => {
    if(tasks) {
      setTasks((tasks) => [...tasks as ValidTask[], task]);
    } else {
      setTasks([task]);
    }
  };

  // const updateCount 

  useEffect(() => {
    // TODO: Disable join input
    if(tasks) {
      const store = tasks.map((task) => JSON.stringify(task)).join("|");
      console.log("STORED");
      console.log(store);
      localStorage.setItem('tasks', store);  
    }
  }, [tasks]);

  const taskDescriptor: VarState = {
    var: tasks,
    updateVar: setTasks,
  };

  useEffect(() => {
    const stored = localStorage.getItem('tasks') as string;
    const storedTasks = stored?.split('|').map((stringTask) => { 
      const parsed = JSON.parse(stringTask); 
      console.log(stringTask); 
      return parsed;
    } ) as ValidTask[];
    console.log("SET");
    console.log(storedTasks);
    setTasks(storedTasks);
  }, []);


  // Move to context?
  const updateTaskCounter = (index: number, value: number) => {
    if(tasks && tasks[index]) {
      (tasks[index] as IMultiTask).initialValue = value;
      setTasks((tasks) => [...tasks as ValidTask[]]);
    }
  }

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
        {tasks && tasks.map((task: ValidTask, index: number) => {
          if ((task as IMultiTask).totalValue) {
            task = task as IMultiTask;
            return (
              <div style={{ margin: "4px" }}>
                <MultiTask
                  index={index}
                  description={task.description}
                  initialValue={task.initialValue}
                  totalValue={task.totalValue}
                  updateCounter={updateTaskCounter}
                />
              </div>
            );
          } else {
            task = task as ICheckTask;
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
