<template>
  <div class="bg-gray-50 dark:bg-[#3b3b3b] min-h-dvh md:py-20 p-10">
    <div class="container mx-auto">
      <div class="title flex mb-10">
        <UIcon name="i-heroicons-home" class="hidden md:block text-green-600 text-5xl md:text-8xl mr-5" />
        <div>
          <h1 class="font-bold mb-5 text-5xl text-green-600">Mortgage Calculator</h1>
          <p class="text-xl">A small, helpful tool to help you compare multiple mortgage offer options.</p>
        </div>
        <span @click="isDark = !isDark" class="md:static absolute top-2 right-2 cursor-pointer">
          <UIcon 
          dynamic :name="`i-heroicons-${isDark ? 'sun' : 'moon'}`" 
          fallback="i-heroicons-sun" 
          class="text-4xl ml-auto cursor-pointer" 
          :class="isDark ? 'text-yellow-300' : 'text-gray-600'"
          />
        </span>
      </div>
      <div class="requirements mb-10 rounded-lg border border-green-600 border-opacity-30 p-10 bg-white dark:bg-[#2b2b2b]">
        <h2 class="font-bold mb-5 text-3xl text-green-600">Your options</h2>
        <p class="mb-10">Compare your different mortgage options. Let's start by getting some general information.</p>
        <h3 class="font-bold mb-5 text-2xl text-green-600">General Information</h3>
        <div class="mb-10">
          <label class=" inline-block mb-1" for="loanAmount">Loan Amount (£)</label>
          <input v-model="balance" id="loanAmount" type="number" class="block mb-5 p-2 rounded-lg border border-green-600 border-opacity-30" />
        </div>
        <h3 class="font-bold mb-5 text-2xl text-green-600">Mortgage Offers</h3>
        <p class="mb-10">Now let's get the details around your different mortgage offers. You can add up to three options.</p>
        <div class="grid md:grid-cols-3 grid-cols-1 gap-10">
          <MortgageOption :id="1" title="Option 1" />
          <MortgageOption :id="2" title="Option 2" />
          <MortgageOption :id="3" title="Option 3" />
        </div>
        <div class="my-5">
          <button @click="handleCompareMortgagesClick" class="px-5 py-3 bg-green-600 text-white rounded-lg text-xl">Compare Offers</button>
        </div>
      </div>
      <template v-if="showResults && mortgages.length > 0">
        <h2 class="font-bold mb-5 text-3xl text-green-600">Your results</h2>
        <template v-for="mortgage in mortgages">
          <div class="results mb-10 rounded-lg border border-green-600 border-opacity-30 p-10 bg-white dark:bg-[#2b2b2b]">
            <MortgageResult :mortgage="mortgage" />
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useOutstandingBalance, useMortgages } from './composables/states';

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

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
