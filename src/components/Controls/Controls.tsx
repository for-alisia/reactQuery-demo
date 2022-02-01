import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddTask from '../AddTask/AddTask';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  minHeight: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ControlsProps {
  goalId: string | null;
}

const Controls: React.FC<ControlsProps> = ({ goalId }) => {
  const [open, setIsOpen] = useState(false);

  const onOpenHandler = () => {
    setIsOpen(true);
  };

  const onCloseHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={onOpenHandler} disabled={!goalId}>
            Add tasks
          </Button>
        </Stack>
      </div>
      <Modal open={open} onClose={onCloseHandler}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Task
          </Typography>
          <AddTask goalId={goalId} />
        </Box>
      </Modal>
    </>
  );
};

export default Controls;
