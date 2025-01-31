export type User = {
  id: number;
  name: string;
};

export type Ticket = {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
};

export type Severity = 'success' | 'info' | 'warning' | 'error';
