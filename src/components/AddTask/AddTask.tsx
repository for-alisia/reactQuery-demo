import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DataService } from '../../services/data.service';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Status } from '../../types/status.type';
import { Task } from '../../types/task.type';

interface AddTaskProps {
  goalId: string | null;
}

const AddTask: React.FC<AddTaskProps> = ({ goalId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data: goal } = useQuery(['goals', goalId], () =>
    DataService.getDataById('goals', goalId)
  );

  const queryClient = useQueryClient();

  const createTask = useMutation(() => {
    const newTask: Task = {
      name,
      description,
      status: Status.NOT_STARTED,
      goalId,
      id: new Date().toString(),
      subtasks: [],
    };
    return DataService.createData('tasks', newTask);
  });

  const updateGoal = useMutation(
    (taskId: string) => {
      const tasks = goal.tasks ? [...goal.tasks, taskId] : [taskId];

      return DataService.updateGoalTasks(tasks, goalId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['goals', goalId]);
        queryClient.invalidateQueries('goals');
        queryClient.invalidateQueries(['tasks', goalId]);
      },
    }
  );

  const onNameChanged = (e: any) => {
    setName(e.target.value);
  };

  const onDescriptionChanged = (e: any) => {
    setDescription(e.target.value);
  };

  const onAddTaskHandler = async () => {
    try {
      const { name } = await createTask.mutateAsync();

      if (name) {
        updateGoal.mutate(name);
      }

      setName('');
      setDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={name}
        onChange={onNameChanged}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        value={description}
        onChange={onDescriptionChanged}
      />
      <Button variant="contained" onClick={onAddTaskHandler}>
        Add task
      </Button>
    </Box>
  );
};

export default AddTask;
