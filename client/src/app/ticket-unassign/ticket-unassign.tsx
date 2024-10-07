import { Button, Popover, Typography } from '@mui/material';
import styles from './ticket-unassign.module.css';
import { useState } from 'react';
import { services } from '../httpService';
import { useToasterStore } from '../store/toaster';

/* eslint-disable-next-line */
export interface TicketUnassignProps {
  ticketId: string;
  userId: string;
  unassigned: () => void;
}

export function TicketUnassign(props: TicketUnassignProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { showToaster } = useToasterStore();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onUnassign = async () => {
    try {
      await services.ticket.unassign(parseInt(props.ticketId));
      props.unassigned();
      showToaster({ message: 'Unassigned ticket', severity: 'info' });
    } catch (error) {
      showToaster({
        message: 'Error occurred when unassigning ticket',
        severity: 'info',
      });
    }
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className={styles['ticketUnassign']}>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Unassign
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          Are you sure to unassign this ticket?
        </Typography>
        <div className={styles['unassignFooter']}>
          <Button
            variant="contained"
            onClick={onUnassign}
            style={{ marginRight: '10px' }}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
        </div>
      </Popover>
    </div>
  );
}

export default TicketUnassign;
