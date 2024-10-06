import { useEffect, useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';
import { useUserStore } from './store/users';
import styles from './app.module.css';
import Tickets from './tickets/tickets';
import { services } from './httpService';
import TicketDetails from './ticket-details/ticket-details';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TicketCreate from './ticket-create/ticket-create';

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);
  const { setUsers: setStoreUsers } = useUserStore();
  const [filter, setFilter] = useState({ complete: false, incomplete: false });
  const filteredTickets = useMemo(() => {
    const { complete, incomplete } = filter;
    if ((complete && incomplete) || (!complete && !incomplete)) {
      return [...tickets];
    } else if (complete) {
      return tickets.filter((t) => t.completed);
    } else {
      return tickets.filter((t) => !t.completed);
    }
  }, [filter.complete, filter.incomplete, tickets]);

  const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.checked,
    });
  };
  async function fetchTickets() {
    const data = await services.ticket.getTickets();
    setTickets(data);
  }
  async function fetchUsers() {
    const data = await services.user.getUsers();
    setUsers(data);
    setStoreUsers(data);
  }
  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  return (
    <div className={styles['app']}>
      <div className="container">
        <h1>Ticket list</h1>
        <div>
          {/* <div>Search Box</div> */}
          <FormControl
            component="fieldset"
            variant="standard"
            className={styles['filterGroup']}
          >
            <FormLabel component="legend">Filter</FormLabel>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.complete}
                    onChange={handleChangeFilter}
                    name="complete"
                  />
                }
                label="Complete"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.incomplete}
                    onChange={handleChangeFilter}
                    name="incomplete"
                  />
                }
                label="Incomplete"
              />
            </FormGroup>
          </FormControl>
          <TicketCreate onCreate={fetchTickets}></TicketCreate>
        </div>
        <Routes>
          <Route path="/" element={<Tickets tickets={filteredTickets} />}>
            <Route path="/:id" element={<TicketDetails />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
