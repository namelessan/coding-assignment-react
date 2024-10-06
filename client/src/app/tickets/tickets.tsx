import { Ticket } from '@acme/shared-models';
import styles from './tickets.module.css';
import { Link, Outlet } from 'react-router-dom';
import Divider from '@mui/material/Divider';

export interface TicketsProps {
  tickets: Ticket[];
}

export function Tickets(props: TicketsProps) {
  return (
    <div>
      <div className={styles['tickets']}>
        {/* <h2>Tickets</h2> */}
        <Divider></Divider>
        {props.tickets.length ? (
          <div className={styles['ticketList']}>
            {props.tickets.map((t) => (
              <Link key={t.id} to={t.id.toString()}>
                <div className={styles['ticketItem']}>
                  Ticket {t.id}: {t.description}
                </div>
              </Link>
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
