import styles from './ticket-create.module.css';
import AddIcon from '@mui/icons-material/Add';
import { Drawer } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { services } from '../httpService';
import LoadingButton from '@mui/lab/LoadingButton';
import { useToasterStore } from '../store/toaster';
/* eslint-disable-next-line */
export interface TicketCreateProps {
  onCreate: () => void;
}

export function TicketCreate(props: TicketCreateProps) {
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToaster } = useToasterStore();

  const onClose = () => {
    setVisible(false);
  };

  const onClickCreate = () => {
    setVisible(true);
  };

  const onCreateTicket = async () => {
    const payload = {
      description,
    };

    setLoading(true);
    try {
      const data = await services.ticket.create(payload);
      setVisible(false);
      props.onCreate();
      showToaster({ message: 'Create new Ticket successfully' });
    } catch (error) {
      console.log('Error occurred when creating ticket');
      showToaster({
        message: 'Fail when creating new ticket',
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const onChangeDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
    // console.log(event);
  };

  return (
    <div className={styles['ticketCreate']}>
      <Button variant="contained" onClick={onClickCreate}>
        <AddIcon></AddIcon>
      </Button>
      <Drawer anchor="right" open={visible} onClose={onClose}>
        <div className={styles['descriptionContainer']}>
          <div className={styles['header']}>Create new ticket</div>
          <TextField
            id="description"
            label="description"
            multiline
            rows={4}
            placeholder="Please input your description"
            className={styles['descriptionInput']}
            onChange={onChangeDescription}
          />
          <div className={styles['footer']}>
            <LoadingButton
              variant="contained"
              disabled={!description}
              loading={loading}
              onClick={onCreateTicket}
            >
              Create
            </LoadingButton>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default TicketCreate;
