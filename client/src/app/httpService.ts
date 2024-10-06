import axios from 'axios';
import { Ticket, User } from './type';

const service = axios.create({ baseURL: 'http://localhost:4200/api' });

class TicketService {
  async getTickets(): Promise<Ticket[]> {
    const res = await service.get('/tickets');
    return res.data;
  }

  async getTicketDetail(id: number): Promise<Ticket> {
    const res = await service.get(`/tickets/${id}`);
    return res.data;
  }

  async create(payload: { description: string }): Promise<Ticket> {
    const res = await service.post('/tickets', payload);
    return res.data;
  }

  async assign(ticketId: number, userId: number) {
    const res = await service.put(`/tickets/${ticketId}/assign/${userId}`);
    return res.data;
  }

  async unassign(ticketId: number) {
    const res = await service.put(`/tickets/${ticketId}/unassign`);
    return res.data;
  }

  async complete(id: number) {
    const res = await service.put(`/tickets/${id}/complete`);
    return res.data;
  }

  async incomplete(id: number) {
    const res = await service.delete(`/tickets/${id}/complete`);
    return res.data;
  }
}

class UserService {
  async getUsers(): Promise<User[]> {
    const res = await service.get('/users');
    return res.data;
  }

  async getUserDetail(id: number): Promise<User> {
    const res = await service.get(`/users/${id}`);
    return res.data;
  }
}

export const services = {
  user: new UserService(),
  ticket: new TicketService(),
};
