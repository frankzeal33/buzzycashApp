const transactionType = [
  {title: 'Game'},
  {title: 'Ticket'},
  {title: 'Cashout'},
  {title: 'Deposit'}
];

const transactionRemark = [
  { title: 'Successful' },
  { title: 'Failed' },    
  { title: 'Reversed' },
  { title: 'Pending' }
];

const GameTime = [
  { title: 'Ongoing' },
  { title: 'Expired' }
];

export default { transactionType, transactionRemark, GameTime }