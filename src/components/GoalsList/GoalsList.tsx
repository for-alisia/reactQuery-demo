// Libraries
import React from 'react';
import { useQuery } from 'react-query';
// Logic
import { DataService } from '../../services/data.service';
import { mapToList } from '../../utils/helpers';
// Types
import { Goal } from '../../types/goal.type';
// UI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './GoalsList.css';

interface GoalsItemProps {
  goal: Goal;
}

const GoalsItem: React.FC<GoalsItemProps> = ({ goal }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Your goal is:
        </Typography>
        <Typography variant="h5" component="div">
          {goal.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {goal.tasks?.length || 0} tasks in this goal
        </Typography>
        <Typography variant="body2">{goal.description}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Choose goal</Button>
      </CardActions>
    </Card>
  );
};

interface GoalsListProps {
  onGoalSelected: (id: string | null) => void;
}

const GoalsList: React.FC<GoalsListProps> = ({ onGoalSelected }) => {
  const { data, isLoading, isError } = useQuery('goals', () => DataService.getData('goals'));

  if (isLoading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );

  if (isError) return <p>Error occured while fetching goals</p>;

  const goalsList = mapToList(data) as Goal[];

  return (
    <ul className="GoalsList-list">
      {goalsList &&
        goalsList.map((goal) => (
          <li key={goal.id} onClick={() => onGoalSelected(goal.id)}>
            <GoalsItem goal={goal} />
          </li>
        ))}
    </ul>
  );
};

export default GoalsList;
