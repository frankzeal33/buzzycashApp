export type ticketGameType = {
  amount: string; 
  created_at: string;
  draw_interval: number;
  draw_time: string;
  id: string; 
  max_winners: number;
  name: string;
  status: "active" | 'inactive', 
  weighted_distribution: boolean;
  winning_percentage: number;
}

export type transactionsType = {
  amount: number; 
  category: string;
  currency: string; 
  customer_email: string; 
  id: string;
  paid_at: string;
  payment_method: string;
  payment_status: string; 
  payment_type: string;
  reference: string;
  transaction_reference: string;
  transaction_type: string;
}