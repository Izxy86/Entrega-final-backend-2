import TicketDAO from '../dao/ticket.dao.js';
import { v4 as uuidv4 } from 'uuid';

const ticketDAO = new TicketDAO();

export default class TicketRepository {
  async createTicket({ amount, purchaser }) {
    const code = uuidv4();
    return await ticketDAO.createTicket({
      code,
      amount,
      purchaser
    });
  }
}
