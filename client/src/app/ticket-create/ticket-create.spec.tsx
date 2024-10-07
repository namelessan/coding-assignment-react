import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import TicketCreate from './ticket-create';
import Toaster from '../toaster/toaster';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

const server = setupServer(
  http.post('http://localhost:4200/api/tickets', () => {
    return HttpResponse.json({
      id: 1,
      description: 'This is a test ticket',
      assigneeId: null,
      completed: false,
    });
  })
);

beforeAll(async () => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('TicketCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketCreate onCreate={() => {}} />);
    expect(baseElement).toBeTruthy();
  });

  it('should create ticket successfully', async () => {
    const { baseElement } = render(<TicketCreate onCreate={() => {}} />);
    expect(baseElement).toBeTruthy();
    const createButton = screen.getByTestId('create-button');
    fireEvent.click(createButton);
    const createModal = screen.getByTestId('create-modal');
    expect(createModal).toBeTruthy();
    const description = createModal.querySelector('#description')!;
    fireEvent.change(description, {
      target: { value: 'This is a test ticket' },
    });
    fireEvent.click(screen.getByTestId('confirm-button'));
    waitForElementToBeRemoved(screen.getByTestId('create-modal'));
  });
});
