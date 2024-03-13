<template>
  <div class="bg-gray-50 min-h-dvh py-20">
    <div class="container mx-auto">
        <h1 class="font-bold mb-5 text-5xl text-green-600">Mortgage Calculator</h1>
        <p class="mb-10">A small, helpful tool to help you compare multiple mortgage offer options.</p>
      <div class="requirements mb-10 rounded-lg border border-green-600 border-opacity-30 p-10 bg-white">
        <h2 class="font-bold mb-5 text-3xl text-green-600">Your options</h2>
        <p class="mb-10">Compare your different mortgage options. Let's start by getting some general information.</p>
        <h3 class="font-bold mb-5 text-2xl text-green-600">General Information</h3>
        <div class="mb-10">
          <label class="text-gray-600 inline-block mb-1" for="loanAmount">Loan Amount (£)</label>
          <input v-model="balance" id="loanAmount" type="number" class="block mb-5 p-2 rounded-lg border border-green-600 border-opacity-30" />
        </div>
        <h3 class="font-bold mb-5 text-2xl text-green-600">Mortgage Offers</h3>
        <p class="mb-10">Now let's get the details around your different mortgage offers. You can add up to three options.</p>
        <div class="grid grid-cols-3 gap-10">
          <MortgageOption :id="1" title="Option 1" />
          <MortgageOption :id="2" title="Option 2" />
          <MortgageOption :id="3" title="Option 3" />
        </div>
        <div class="my-5">
          <button @click="handleCompareMortgagesClick" class="px-5 py-3 bg-green-600 text-white rounded-lg text-xl">Compare Offers</button>
        </div>
      </div>
      <template v-if="showResults">
        <h2 class="font-bold mb-5 text-3xl text-green-600">Your results</h2>
        <template v-for="mortgage in mortgages">
          <div class="results mb-10 rounded-lg border border-green-600 border-opacity-30 p-10 bg-white">
            <MortgageResult :mortgage="mortgage" />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useOutstandingBalance, useMortgages } from './composables/states';

const balance = useOutstandingBalance()
const mortgages = useMortgages()
const showResults = ref<boolean>(false)

const handleCompareMortgagesClick = () => {
  showResults.value = true
}
const handleClearMortgagesClick = () => {
  mortgages.value = [] 
}

watch(mortgages, () => {
  showResults.value = false
}, { deep: true })

</script>
