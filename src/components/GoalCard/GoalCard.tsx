import React from 'react';
import { useQuery } from 'react-query';
import { DataService } from '../../services/data.service';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './GoalCard.css';
import TasksList from '../TasksList/TasksList';

interface GoalCardProps {
  goalId: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ goalId }) => {
  const {
    data: goal,
    isLoading,
    isError,
  } = useQuery(['goals', goalId], () => DataService.getDataById('goals', goalId));

  if (isLoading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );

  if (isError) return <p>Error occured on fetching data</p>;

  return (
    <article>
      <header className="GoalCard-header">
        <h2>Goal - {goal.name}</h2>
        <p>{goal.tasks?.length || 0} tasks in this goal</p>
      </header>
      <p>{goal.description}</p>
      <TasksList goalId={goalId} />
    </article>
  );
};

export default GoalCard;
