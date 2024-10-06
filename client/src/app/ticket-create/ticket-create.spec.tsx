import { render } from '@testing-library/react';

import TicketCreate from './ticket-create';

describe('TicketCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketCreate />);
    expect(baseElement).toBeTruthy();
  });
});
