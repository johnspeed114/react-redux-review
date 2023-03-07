import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);
  //just need usecallback here since this function obj is outside of sendTasks function(dependencies)

  //in destructuring you can change the name with a colon after the key
  const { loading, error, sendTasks: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTask = [];
      for (const taskKey in taskObj) {
        loadedTask.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTask);
    };
    fetchTasks(
      {
        url: 'https://react-http-2458e-default-rtdb.firebaseio.com/tasks.json',
      },
      transformTasks
    );
    //we want to check the fetchtasks is updated in the dependency but to do that we need usecallback, otherwisee, we get infinite loop
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={loading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
