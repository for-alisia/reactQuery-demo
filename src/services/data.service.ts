import { baseAPIUrl } from '../utils/urls.const';

type dataType = 'goals' | 'tasks' | 'subtasks';

export class DataService {
  static headers = {
    'Content-Type': 'application/json',
  };

  static async getData(type: dataType) {
    try {
      const response = await fetch(`${baseAPIUrl}${type}.json`);

      if (!response.ok) {
        throw new Error('Error occured');
      }
      const data = await response.json();

      return data || [];
    } catch (err) {
      throw err;
    }
  }

  static async getDataById(type: dataType, id: string | null) {
    try {
      const response = await fetch(`${baseAPIUrl}${type}/${id}.json`);

      if (!response.ok) {
        throw new Error('Error occured');
      }
      const data = await response.json();

      return data || [];
    } catch (err) {
      throw err;
    }
  }

  static async createData(type: dataType, data: any) {
    try {
      const response = await fetch(`${baseAPIUrl}${type}.json`, {
        method: 'POST',
        headers: DataService.headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error occured');
      }
      const resData = await response.json();

      return resData;
    } catch (err) {
      throw err;
    }
  }

  static async getTasksForGoal(goalId: string) {
    try {
      const response = await fetch(`${baseAPIUrl}tasks.json?orderBy="goalId"&equalTo="${goalId}"`);

      if (!response.ok) {
        throw new Error('Error occured');
      }
      const data = await response.json();

      return data || [];
    } catch (err) {
      throw err;
    }
  }

  static async updateGoalTasks(tasks: string[], goalId: string | null) {
    try {
      const response = await fetch(`${baseAPIUrl}goals/${goalId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ tasks }),
      });

      if (!response.ok) {
        throw new Error('Error occured');
      }
      const data = await response.json();

      return data || [];
    } catch (err) {
      throw err;
    }
  }

  static async updateTaskStatus(taskId: string, status: string) {
    try {
      const response = await fetch(`${baseAPIUrl}tasks/${taskId}.json`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Error occured');
      }
      const data = await response.json();

      return data || [];
    } catch (err) {
      throw err;
    }
  }
}
