import { useProfileStore } from "@/store/ProfileStore";

const currencySymbols: Record<string, string> = {
  NGN: '₦',
  GHS: '₵',
};

const countryToCurrency: Record<string, keyof typeof currencySymbols> = {
  Nigeria: 'NGN',
  Ghana: 'GHS',
};

const displayCurrency = (num: number) => {

  const country = useProfileStore.getState().userProfile.countryOfResidence;
  const currency = countryToCurrency[country] || 'NGN'; // fallback to NGN

  // Strictly ensure num is a number
  if (typeof num !== 'number' || isNaN(num) || num === undefined || num === null) {
    return `${currencySymbols[currency]}0.00`; // fallback
  }

  let formatted = '';

  // Force 2 decimal places
  formatted = num.toFixed(2);

  // Add commas for thousands manually
  formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Prepend the ₦ symbol manually (override any previous formatting)
  formatted = currencySymbols[currency] + formatted;

  return formatted;  // Return the formatted currency
};

export default displayCurrency;
