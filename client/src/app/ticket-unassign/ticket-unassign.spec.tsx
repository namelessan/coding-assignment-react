import { render } from '@testing-library/react';

import TicketUnassign from './ticket-unassign';

describe('TicketUnassign', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketUnassign />);
    expect(baseElement).toBeTruthy();
  });
});
