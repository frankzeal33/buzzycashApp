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
  { title: 'Elapsed' }
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