const transactionType = [
  {title: 'Top Up', value: 'topup'},
  {title: 'Bonus', value: 'bonus'},
  {title: 'Profit', value: 'profit'},
  {title: 'Payout', value: 'payout'}
];

const transactionRemark = [
  { title: 'Pending', value: 'pending' },
  { title: 'Successful', value: 'successful' },
  { title: 'Failed', value: 'failed' },    
  { title: 'Reversed', value: 'reversed' },
  { title: 'Rejected', value: 'rejected' }
];

const GameTime = [
  { title: 'Ongoing', value: 'ongoing' },
  { title: 'Elapsed', value: 'elapsed' },
  { title: 'Won', value: 'won' },
  { title: 'Lost', value: 'lost' },
];

const Theme = [
  { title: 'Light Mode', value: 'light' },
  { title: 'Dark Mode', value: 'dark' },
  { title: 'System Default', value: 'system' },
];

const gender = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Others', value: 'others' }
];

const IDType = [
  { label: 'National ID', value: 'National_ID' },
  { label: 'Drivers Lincense', value: 'Drivers_Lincense' },
  { label: 'International Passport', value: 'International_Passport' },
]

const countries = [
  {
    name: { en: "Nigeria" },
    dial_code: "+234",
    code: "NG",
    flag: "🇳🇬"
  },
  {
    name: { en: "Ghana" },
    dial_code: "+233",
    code: "GH",
    flag: "🇬🇭"
  }
];

export default { transactionType, transactionRemark, GameTime, Theme, gender, IDType, countries }