export default class CurrencyService {
  static async concertCurrency(moneyAmount) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${initialCurrency}/${finalCurrency}`);
      if(!response.ok) {
        throw Error(response.result);
      }
      return await response.json();
    } catch (error) {
      return error;
    }
  }
}