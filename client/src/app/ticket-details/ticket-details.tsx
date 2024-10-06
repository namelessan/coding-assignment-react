import { useEffect, useState } from 'react';
import styles from './ticket-details.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import { services } from '../httpService';
import { Ticket } from '../type';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useUserStore } from '../store/users';
import { FormControl, MenuItem } from '@mui/material';
import TicketUnassign from '../ticket-unassign/ticket-unassign';

/* eslint-disable-next-line */
export interface TicketDetailsProps {}

export function TicketDetails(props: TicketDetailsProps) {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [ticket, setTicket] = useState({} as Ticket);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const { users } = useUserStore();

  const onClose = () => {
    setVisible(false);
    navigate('/');
  };

  async function onSelectUser(event: SelectChangeEvent) {
    const userId = event.target.value;
    setUserId(userId);
    await services.ticket.assign(ticket.id, parseInt(userId));
  }

  async function fetchTicket() {
    if (id) {
      const data = await services.ticket.getTicketDetail(parseInt(id));
      setTicket(data);
      if (data.assigneeId) {
        setUserId(data.assigneeId.toString());
      }
    }
  }

  function unassignedUser() {
    setUserId('');
  }

  useEffect(() => {
    setVisible(true);
    fetchTicket();
  }, []);
  return (
    <div className="container">
      <Drawer anchor="right" open={visible} onClose={onClose}>
        <div className={styles['ticketDetail']}>
          <div className={styles['description']}>
            <label className={styles['label']}>Description</label>
            <div className={styles['descriptionText']}>
              {ticket.description}
            </div>
          </div>
          <div className={styles['assignee']}>
            <label className={styles['assigneeLabel']}>Assignee:</label>
            <FormControl sx={{ m: 1, minWidth: 140 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userId.toString()}
                onChange={onSelectUser}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Unassigned</em>
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {userId && (
              <TicketUnassign
                ticketId={ticket.id.toString()}
                userId={userId}
                unassigned={unassignedUser}
              ></TicketUnassign>
            )}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default TicketDetails;
