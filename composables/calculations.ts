import type { Mortgage } from "~/types/types";
import { useOutstandingBalance } from "./states";

export const useCalculations = (mortgage: Mortgage) => {
  const balance = useOutstandingBalance();

  // Computeds
  const monthlyRate = computed(() => {
    const result = mortgage.interestRate / 100 / 12
    return result
  })
  const trueLoanAmount = computed(() => {
    const result = balance.value + mortgage.additionalFees
    return result;
  })
  const numberOfPeriods = computed(() => {
    const result = mortgage.mortgageLength * 12
    return result;
  })

  return {
    monthlyRate,
    trueLoanAmount,
    numberOfPeriods,
  };
}
