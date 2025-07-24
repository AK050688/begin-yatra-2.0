import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leads: [],
  wallet: 800,
  error: null,
  leadsLoaded: false,
};

const leadSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
      state.leadsLoaded = true;
    },
    buyLead: (state, action) => {
      const { id, price } = action.payload;
      const lead = state.leads.find((l) => l.id === id);

      if (!lead) {
        state.error = 'Lead not found';
        return;
      }

      if (lead.status === 'soldout' || lead.status === 'Sold') {
        state.error = 'Lead already sold';
        return;
      }

      if (state.wallet < price) {
        state.error = 'Insufficient wallet balance';
        return;
      }

      state.leads = state.leads.map((l) =>
        l.id === id ? { ...l, status: 'Sold' } : l
      );
      state.wallet -= price;
      state.error = null;
    },
  },
});

export const { setLeads, buyLead } = leadSlice.actions;
export default leadSlice.reducer;
