import { useEffect, useState } from 'react';
import styles from './ticket-details.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
/* eslint-disable-next-line */
export interface TicketDetailsProps {}

export function TicketDetails(props: TicketDetailsProps) {
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const onClose = () => {
    setVisible(false);
    navigate('/');
  };

  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <div className="container">
      <Drawer anchor="right" open={visible} onClose={onClose}>
        <h1>Welcome to TicketDetails!</h1>
        <h2>{id}</h2>
      </Drawer>
    </div>
  );
}

export default TicketDetails;
