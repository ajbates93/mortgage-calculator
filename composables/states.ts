import type { Mortgage } from "~/types/types";

export const useOutstandingBalance = () => useState<number>('outstandingLoanBalance', () => 0);
export const useMortgages = () => useState<Mortgage[]>('mortgages', () => []);
