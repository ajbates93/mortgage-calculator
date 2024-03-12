export const useCalculations = () => {
  const calculateMonthlyRate = (monthlyRate: number) => {
    return monthlyRate / 12;
  }
  const calculateMonthlyPayments = (
    principal: number,
    interestRate: number,
    mortgageLength: number
  ) => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = mortgageLength * 12;
    const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthlyPayments = (principal * x * monthlyInterestRate) / (x - 1);
    return monthlyPayments;
  };

  return {
    calculateMonthlyRate,
    calculateMonthlyPayments,
  };
}
