import { Status } from './status.type';

export interface Goal {
  id: string;
  name: string;
  description?: string;
  tasks: string[];
  status: Status;
}
