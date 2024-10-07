import { Alert, Snackbar } from '@mui/material';
import styles from './toaster.module.css';
import { useToasterStore } from '../store/toaster';

/* eslint-disable-next-line */
export interface ToasterProps {}

export function Toaster(props: ToasterProps) {
  const { open, message, severity, hideToaster } = useToasterStore();
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={6000}
      onClose={hideToaster}
    >
      <Alert
        data-testid="toaster-test-id"
        onClose={hideToaster}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default Toaster;
