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