import React, { useState } from 'react';
import Controls from './components/Controls/Controls';
import GoalsList from './components/GoalsList/GoalsList';
import GoalCard from './components/GoalCard/GoalCard';
import './App.css';

function App() {
  const [goalId, setGoalId] = useState<string | null>(null);

  const goalSelectedHandler = (id: string | null) => {
    setGoalId(id);
  };

  return (
    <div className="App">
      <section className="App-goals-selection-section">
        <h3>Choose goal to work with</h3>
        <GoalsList onGoalSelected={goalSelectedHandler} />
      </section>
      <section className="App-goal-section">
        {goalId ? <GoalCard goalId={goalId} /> : <p>Choose goal from the list</p>}
      </section>
      <section className="App-controls-section">
        <Controls goalId={goalId} />
      </section>
    </div>
  );
}

export default App;
