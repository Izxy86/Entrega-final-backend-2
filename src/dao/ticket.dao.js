import { TicketModel } from '../models/ticket.model.js';

export default class TicketDAO {
  async createTicket(data) {
    return await TicketModel.create(data);
  }
}
