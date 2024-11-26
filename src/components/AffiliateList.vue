<script setup lang="ts">
import { Affiliate, AffiliateArray } from '../types';

const props = defineProps<{
  affiliates: AffiliateArray,
  modelValue: Affiliate | null,
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: Affiliate | null): void;
}>();

</script>

<template>
  <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
    <li
      class="py-2 px-1 sm:pb-4 cursor-pointer"
      :class="props.modelValue?.affiliate_id === affiliate.affiliate_id ? 'bg-gray-300' : ''"
      @click="emit('update:model-value', props.modelValue?.affiliate_id === affiliate.affiliate_id ? null : affiliate)"
      v-for="affiliate in props.affiliates"
      :key="affiliate.affiliate_id"
    >
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
            {{ affiliate.name }}
          </p>
          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
            Affiliate ID: {{ affiliate.affiliate_id }}
          </p>
        </div>
        <div
          class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
          v-if="affiliate.distance"
        >
          Distance from Office: {{ Math.round(affiliate.distance) }}km
        </div>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>

</style>