import { statusState } from '../constants';

export const handlePending = state => {
  state.contactById = null;
  state.status = statusState.pending;
  state.error = null;
};

export const handleRejected = (state, { payload }) => {
  state.status = statusState.error;
  state.error = payload;
};

export const handleFulfilledGet = (state, { payload }) => {
  state.status = statusState.success;
  state.error = null;
  state.contacts = payload;
};

export const handleFulfilledGetById = (state, { payload }) => {
  state.status = statusState.success;
  state.error = null;
  state.contactById = payload;
};

export const handleFulfilledAdd = (state, { payload }) => {
  state.status = statusState.success;
  state.error = null;
  state.contacts.push(payload);
};

export const handleFulfilledDelete = (state, { payload }) => {
  state.status = statusState.success;
  state.error = null;
  state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
};
