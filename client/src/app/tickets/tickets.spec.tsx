import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tickets from './tickets';

const sampleTickets = [
  {
    id: 1,
    description: 'Install a monitor arm',
    assigneeId: 1,
    completed: false,
  },
  {
    id: 2,
    description: 'Move the desk to the new location',
    assigneeId: 1,
    completed: false,
  },
];

describe('Tickets', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Tickets tickets={sampleTickets} updateTicket={() => {}} />
            }
          ></Route>
        </Routes>
      </Router>
    );
    expect(baseElement).toBeTruthy();
    const ticketItems = screen.getAllByTestId('ticket-item');
    expect(ticketItems.length).toEqual(2);
  });
});
