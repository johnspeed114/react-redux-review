import Section from '../UI/Section';
import TaskForm from './TaskForm';

import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const { loading, error, sendTasks: sendTaskRequest } = useHttp();

  const transformNewTask = (taskText, data) => {
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-http-2458e-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: { text: taskText },
      },
      //bind method preconfig function before calling, js method default
      //first arg sets the 'this' of the obj, but we don't need it here
      //[fyi]all data already defined in the parameter will be appended afterwards
      transformNewTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={loading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
