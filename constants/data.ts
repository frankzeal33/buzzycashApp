const transactionType = [
  {title: 'Top Up', value: 'TOPUP'},
  {title: 'Cashout', value: 'CASHOUT'},
  {title: 'Game', value: 'GAME'},
  {title: 'Ticket', value: 'TICKET'}
];

const transactionRemark = [
  { title: 'Successful', value: 'SUCCESSFUL' },
  { title: 'Failed', value: 'FAILED' },    
  { title: 'Reversed', value: 'REVERSED' },
  { title: 'Pending', value: 'PENDING' }
];

const GameTime = [
  { title: 'Ongoing', value: 'ONGOING' },
  { title: 'Elapsed', value: 'ELAPSED' }
];

const Theme = [
  { title: 'Light Mode', value: 'light' },
  { title: 'Dark Mode', value: 'dark' },
  { title: 'System Default', value: 'system' },
];

const gender = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Others', value: 'OTHERS' }
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