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
    <UTable :columns="columns" :rows="monthByMonthGrid" class="text-base">
      <template #month-data="{ row }">
        <div class="text-base">{{ row.month }}</div>
      </template>
      <template #interestOnLoan-data="{ row }">
        <div class="text-base">{{ formatter.format(row.interestOnLoan) }}</div>
      </template>
      <template #amountRepaid-data="{ row }">
        <div class="text-base">{{ formatter.format(row.amountRepaid) }}</div>
      </template>
      <template #balanceAtPeriodEnd-data="{ row }">
        <div class='text-base text-right'>{{ formatter.format(row.balanceAtPeriodEnd) }}</div>
      </template>
    </UTable>
  </div>
</template>

<script lang="ts" setup>
import type { Mortgage } from '~/types/types';
type MonthByMonthGrid = {
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

const monthByMonthGrid = ref<MonthByMonthGrid[]>([])

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

const columns = [{
  key: 'month',
  label: 'Month'
}, {
  key: 'interestOnLoan',
  label: 'Interest on Loan'
}, {
  key: 'amountRepaid',
  label: 'Amount Repaid'
}, {
  key: 'balanceAtPeriodEnd',
  label: 'Balance at Period End',
  class: 'text-right',
}]


for (let i = 1; i <= numberOfPeriods.value; i++) {
  handleCalculationsForMonth(i)
}

</script>

<style>

</style>