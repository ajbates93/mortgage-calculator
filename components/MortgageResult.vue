<template>
  <div>
    <div class="font-bold text-2xl mb-5 text-green-600 flex justify-between items-center pb-5 border-b">
      <span>
        Mortgage Option {{ mortgage.id }}
      </span>
      <span class="text-lg">
        <span class="mr-1 text-gray-500">Cost per month:</span> 
        <span>{{ formatter.format(mortgage.monthlyPayments) }}</span>
      </span>
    </div>
    <div class="flex items-center md:justify-between mb-5">
      <div class="text-left">
        <div class="mb-3">
          <div class="font-bold mb-1 text-gray-500">Monthly Rate: <span class="text-green-600">{{ percentageFormatter.format(monthlyRate) }}</span></div>
          <div class="text-gray-400">This is your interest rate split over 12 months</div>
        </div>
        <div class="">
          <div class="font-bold mb-1 text-gray-500">Total loan amount: <span class="text-green-600">{{ formatter.format(trueLoanAmount) }}</span></div>
          <div class="text-gray-400">Your outstanding balance (inc. any additional fees)</div>
        </div>
      </div>
      <div class="text-right">
        <div class="mb-3">
          <div class="font-bold mb-1 text-gray-500">Average Annual Cost: <span class="text-green-600">{{ formatter.format(cumulativeInterest / (numberOfPeriods / 12)) }}</span></div>
          <div class="text-gray-400">The amount of interest paid over the mortgage term.</div>
        </div>
        <div class="">
          <div class="font-bold mb-1 text-gray-500">Average Annual Repayment: <span class="text-green-600">{{ formatter.format(cumulativeRepayment / (numberOfPeriods / 12)) }}</span></div>
          <div class="text-gray-400">The amount of capital paid off over the mortgage term.</div>
        </div>
      </div>
    </div>
    <div @click="showMonthByMonthBreakdown = !showMonthByMonthBreakdown" class="bg-gray-100 border border-green-600 border-opacity-30 text-green-600 font-semibold flex items-center justify-between px-5 py-3 rounded-lg cursor-pointer text-lg">
      <span class="flex items-center gap-3">
        View Monthly Breakdown
      </span>
      <span>
        <UIcon dynamic :name="`i-heroicons-chevron-${showMonthByMonthBreakdown ? 'down' : 'right'}`"></UIcon>
      </span>
    </div>
    <UTable v-if="showMonthByMonthBreakdown" :columns="columns" :rows="monthByMonthGrid" class="text-base mt-5">
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

const showMonthByMonthBreakdown = ref(false)
const cumulativeInterest = ref<number>(0)
const cumulativeRepayment = ref<number>(0)

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
    const interest = trueLoanAmount.value * monthlyRate.value
    const amountRepaid = props.mortgage.monthlyPayments - interest
    const balanceAtPeriodEnd = trueLoanAmount.value - amountRepaid
    monthByMonthGrid.value.push({
      month: 1,
      interestOnLoan: interest, 
      amountRepaid: amountRepaid,
      balanceAtPeriodEnd: balanceAtPeriodEnd
    })
    cumulativeInterest.value += interest
    cumulativeRepayment.value += amountRepaid
  } else {
    const interest = monthByMonthGrid.value[month - 2].balanceAtPeriodEnd * monthlyRate.value
    const amountRepaid = props.mortgage.monthlyPayments - interest
    const balanceAtPeriodEnd = monthByMonthGrid.value[month - 2].balanceAtPeriodEnd - amountRepaid
    monthByMonthGrid.value.push({
      month: month,
      interestOnLoan: interest,
      amountRepaid: amountRepaid,
      balanceAtPeriodEnd: balanceAtPeriodEnd 
    })
    cumulativeInterest.value += interest
    cumulativeRepayment.value += amountRepaid
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