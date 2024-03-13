<template>
  <div>
    <h3 class="font-bold mb-5 text-2xl text-green-600">{{ title }}</h3>
    <!-- Interest Rate -->
    <div>
      <label class="text-gray-600 dark:text-gray-300 inline-block mb-1" for="interestRate">Interest Rate (%)</label>
      <input v-model="mortgage.interestRate" id="interestRate" type="number" class="block mb-5 p-2 rounded-lg border border-green-600 border-opacity-30" />
    </div>
    <!-- Additional Fees -->
    <div>
      <label class="text-gray-600 dark:text-gray-300 inline-block mb-1" for="additionalFees">Additional Fees (£)</label>
      <input v-model="mortgage.additionalFees" id="additionalFees" type="number" class="block mb-5 p-2 rounded-lg border border-green-600 border-opacity-30" />
    </div>
    <!-- Mortgage Length -->
    <div>
      <label class="text-gray-600 dark:text-gray-300 inline-block mb-1" for="mortgageLength">Mortgage Length (Years)</label>
      <input v-model="mortgage.mortgageLength" id="mortgageLength" type="number" class="block mb-5 p-2 rounded-lg border border-green-600 border-opacity-30" />
    </div>
    <!-- Monthly Payments -->
    <div>
      <label class="text-gray-600 dark:text-gray-300 inline-block mb-1" for="monthlyPayments">Monthly Payments (£)</label>
      <input v-model="mortgage.monthlyPayments" id="monthlyPayments" type="number" class="block mb-5 p-2 rounded-lg border border-green-600 border-opacity-30" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Mortgage } from '~/types/types';


const { id, title } = defineProps<{
  id: number, title: string
}>()

const mortgages = useMortgages()
const mortgage = ref<Mortgage>({
  id: id,
  interestRate: 0,
  additionalFees: 0,
  mortgageLength: 0,
  monthlyPayments: 0
})

const handleUpdateMortgage = (mortgage: Mortgage) => {
  const index = mortgages.value.findIndex(m => m.id === mortgage.id)
  if (index === -1) {
    mortgages.value.push(mortgage)
  } else {
    mortgages.value[index] = mortgage
  }
}

const handleClearMortgage = () => {
  console.log('ehhl')
  mortgage.value = {
    id: id,
    interestRate: 0,
    additionalFees: 0,
    mortgageLength: 0,
    monthlyPayments: 0
  }
}

watch(mortgage, handleUpdateMortgage, { deep: true })

onMounted(() => {
  window.addEventListener('clear-all', handleClearMortgage)
})

onUnmounted(() => {
  window.removeEventListener('clear-all', handleClearMortgage)
})

</script>

<style>

</style>