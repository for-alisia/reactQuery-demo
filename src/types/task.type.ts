import { Status } from './status.type';

export interface Task {
  id: string;
  name: string;
  description?: string;
  subtasks: string[];
  status: Status;
  goalId: string | null;
}
