<template>
  <div>
    <h3 class="font-bold mb-5 text-2xl text-green-600">{{ title }}</h3>
    <!-- Interest Rate -->
    <div>
      <label class="text-gray-600 inline-block mb-1" for="interestRate">Interest Rate (%)</label>
      <input v-model="mortgage.interestRate" id="interestRate" type="number" class="block mb-5 p-2 rounded-lg border" />
    </div>
    <!-- Additional Fees -->
    <div>
      <label class="text-gray-600 inline-block mb-1" for="additionalFees">Additional Fees (£)</label>
      <input v-model="mortgage.additionalFees" id="additionalFees" type="number" class="block mb-5 p-2 rounded-lg border" />
    </div>
    <!-- Mortgage Length -->
    <div>
      <label class="text-gray-600 inline-block mb-1" for="mortgageLength">Mortgage Length (Years)</label>
      <input v-model="mortgage.mortgageLength" id="mortgageLength" type="number" class="block mb-5 p-2 rounded-lg border" />
    </div>
    <!-- Monthly Payments -->
    <div>
      <label class="text-gray-600 inline-block mb-1" for="monthlyPayments">Monthly Payments (£)</label>
      <input v-model="mortgage.monthlyPayments" id="monthlyPayments" type="number" class="block mb-5 p-2 rounded-lg border" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Mortgage } from '~/types/types';


const { id, title } = defineProps<{
  id: number, title: string
}>()

const emit = defineEmits<{
  (e: 'update', mortgage: Mortgage): void
}>()

const mortgage = ref<Mortgage>({
  id: id,
  interestRate: 0,
  additionalFees: 0,
  mortgageLength: 0,
  monthlyPayments: 0
})

const onMortgageUpdate = () => {
  emit('update', mortgage.value)
}

watch(mortgage, onMortgageUpdate, { deep: true })

</script>

<style>

</style>