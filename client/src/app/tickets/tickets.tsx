import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import { Link, Outlet } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { services } from '../httpService';
export interface TicketsProps {
  tickets: Ticket[];
  updateTicket: (ticket: Ticket) => void;
}
const label = { inputProps: { 'aria-label': 'Checkbox' } };

export function Tickets(props: TicketsProps) {
  async function onCheckTicket(
    event: React.ChangeEvent<HTMLInputElement>,
    ticket: Ticket
  ) {
    const value = event.target.checked;
    if (value) {
      await services.ticket.complete(ticket.id);
    } else {
      await services.ticket.incomplete(ticket.id);
    }
    props.updateTicket({ ...ticket, completed: Boolean(value) });
  }

  return (
    <div>
      <div className={styles['tickets']}>
        {/* <h2>Tickets</h2> */}
        <Divider></Divider>
        {props.tickets.length ? (
          <div className={styles['ticketList']}>
            {props.tickets.map((t) => (
              <div key={t.id} className={styles['ticketItem']}>
                <Checkbox
                  {...label}
                  checked={t.completed}
                  onChange={(e) => onCheckTicket(e, t)}
                ></Checkbox>
                <Link key={t.id} to={t.id.toString()}>
                  <Typography>
                    Ticket {t.id}: {t.description}
                  </Typography>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles['noData']}>No ticket</div>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default Tickets;
