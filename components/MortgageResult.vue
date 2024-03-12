<template>
  <div>
    <div class="flex items-center justify-between mb-5">
      <div class="mr-5">
        <div class="font-bold mb-1">Monthly Rate</div>
        <div>{{ percentageFormatter.format(monthlyRate) }}</div>
      </div>
      <div>
        <div class="font-bold mb-1 text-right">True Loan Amount (your remaining balance plus additional fees)</div>
        <div class="text-right">{{ formatter.format(trueLoanAmount) }}</div>
      </div>
    </div>
    <div class="mb-5">
      <div>
        <div class="grid grid-cols-[100px_1fr_1fr_1fr] text-left divide-y-0">
          <div class="py-2 font-bold divide-y-0">Month</div>
          <div class="py-2 font-bold divide-y-0">Interest on Loan</div>
          <div class="py-2 font-bold divide-y-0">Amount Repaid</div>
          <div class="py-2 font-bold text-right divide-y-0">Balance at Period End</div>
        </div>
        <div class="grid grid-cols-[100px_1fr_1fr_1fr] divide-y text-left">
          <div></div>
          <div></div>
          <div></div>
          <div class="py-2 text-right">{{ formatter.format(trueLoanAmount) }}</div>
          <template v-for="month, idx in numberOfPeriods">
            <div class="py-2">{{ monthByMonthGrid[idx].month }}</div>
            <div class="py-2">{{ formatter.format(monthByMonthGrid[idx].interestOnLoan) }}</div>
            <div class="py-2">{{ formatter.format(monthByMonthGrid[idx].amountRepaid) }}</div>
            <div class="py-2 text-right">{{ formatter.format(monthByMonthGrid[idx].balanceAtPeriodEnd) }}</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Mortgage } from '~/types/types';
type monthByMonthGrid = {
  month: number
  interestOnLoan: number
  amountRepaid: number
  balanceAtPeriodEnd: number
}
const props = defineProps<{
  mortgage: Mortgage
}>()

const formatter = new Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP'
})
const percentageFormatter = new Intl.NumberFormat('en-UK', {
  style: 'percent',
  minimumFractionDigits: 2
})

const { monthlyRate, trueLoanAmount, numberOfPeriods } = useCalculations(props.mortgage)

const monthByMonthGrid = ref<monthByMonthGrid[]>([])

const handleCalculationsForMonth = (month: number) => {
  if (month === 1) {
    monthByMonthGrid.value.push({
      month: 1,
      interestOnLoan: trueLoanAmount.value * monthlyRate.value,
      amountRepaid: props.mortgage.monthlyPayments - (trueLoanAmount.value * monthlyRate.value),
      balanceAtPeriodEnd: trueLoanAmount.value - (props.mortgage.monthlyPayments - (trueLoanAmount.value * monthlyRate.value))
    })
  } else {
    monthByMonthGrid.value.push({
      month: month,
      interestOnLoan: monthByMonthGrid.value[month - 2].balanceAtPeriodEnd * monthlyRate.value,
      amountRepaid: props.mortgage.monthlyPayments - (monthByMonthGrid.value[month - 2].balanceAtPeriodEnd * monthlyRate.value),
      balanceAtPeriodEnd: monthByMonthGrid.value[month - 2].balanceAtPeriodEnd - (props.mortgage.monthlyPayments - (monthByMonthGrid.value[month - 2].balanceAtPeriodEnd * monthlyRate.value))
    })
  }
}

for (let i = 1; i <= numberOfPeriods.value; i++) {
  handleCalculationsForMonth(i)
}

</script>

<style>

</style>