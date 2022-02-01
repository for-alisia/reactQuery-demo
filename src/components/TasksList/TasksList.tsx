import React from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { DataService } from '../../services/data.service';
import { mapToList } from '../../utils/helpers';
import { Task } from '../../types/task.type';
import { Status } from '../../types/status.type';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './TasksList.css';

interface TasksListProps {
  goalId: string;
}

interface TaskToUpdate {
  taskId: string;
  status: Status;
}

const TasksList: React.FC<TasksListProps> = ({ goalId }) => {
  const { data, isLoading, isError } = useQuery(['tasks', goalId], () =>
    DataService.getTasksForGoal(goalId)
  );

  const queryClient = useQueryClient();

  const updateTask = useMutation(
    ({ taskId, status }: TaskToUpdate) => {
      return DataService.updateTaskStatus(taskId, status);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['goals', goalId]);
        queryClient.invalidateQueries(['tasks', goalId]);
      },
    }
  );

  const changeStatusHandler = (taskId: string, status: Status) => {
    updateTask.mutate({ taskId, status });
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error occured on fetching data</p>;

  const tasks = mapToList(data) as Task[];

  return (
    <div>
      <h3>Tasks</h3>
      <ul className="TasksList-list">
        {tasks.map((task) => (
          <li className="TasksList-item" key={task.id}>
            <div className="TasksList-info">
              <header>{task.name}</header>
              <p>{task.description}</p>
            </div>
            <Stack direction="row" spacing={1}>
              <Chip label={task.status} color="primary" />
              <Button
                variant="contained"
                onClick={() => changeStatusHandler(task.id, Status.IN_PROGRESS)}
                color="success"
              >
                In progress
              </Button>
              <Button
                variant="contained"
                onClick={() => changeStatusHandler(task.id, Status.COMPLETED)}
                color="warning"
              >
                Completed
              </Button>
              <Button
                variant="contained"
                onClick={() => changeStatusHandler(task.id, Status.CANCELLED)}
                color="error"
              >
                Cancel
              </Button>
            </Stack>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
