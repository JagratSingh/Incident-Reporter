export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'reporter';
}

export interface currentUser {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'reporter';
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  comment?: string[] | null;
  commentedBy?: string[] | null;
  timestamp?: string;
}

export interface NewIncident {
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  comment?: string[] | null;
  commentedBy?: string[] | null;
  timestamp?: string;
}
