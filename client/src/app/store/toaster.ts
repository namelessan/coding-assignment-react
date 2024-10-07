import { create } from 'zustand';
import { Severity } from '../type';

interface ToasterState {
  open: boolean;
  message: string;
  severity: Severity;
  showToaster: (payload: { message: string; severity?: Severity }) => void;
  hideToaster: () => void;
}

export const useToasterStore = create<ToasterState>((set) => ({
  open: false,
  message: '',
  severity: 'success',
  showToaster: (payload: { message: string; severity?: Severity }) =>
    set((state) => ({ ...state, open: true, ...payload })),
  hideToaster: () =>
    set((state) => ({
      ...state,
      open: false,
      message: '',
      severity: 'success',
    })),
}));
