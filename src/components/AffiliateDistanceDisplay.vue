<script setup lang="ts">
import Data from '../assets/affiliates.txt?raw'
import { computed, onMounted, reactive } from 'vue';
import { Affiliate, AffiliateArray, LatitudeLongitude } from '../types';
import AffiliateList from './AffiliateList.vue';
import AffiliateMap from './AffiliateMap.vue';
import { calculateDistanceBetweenCoordinates, filterAffiliatesByMaxDistance, sortArrayByAttrAsc } from '../helpers/affiliates';

const state = reactive<{
    dataArray: AffiliateArray,
    origin: LatitudeLongitude,
    distance: number,
    selectedAffiliate: Affiliate | null
}>({
    dataArray: [],
    origin: {
        latitude: 53.3340285,
        longitude: -6.2535495,
    },
    distance: 100,
    selectedAffiliate: null
});

onMounted(() => {
    processData()
})

function processData() {    
    state.dataArray = Data.split('\n').map((dataItem: string) => {
        let affiliate: Affiliate = JSON.parse(dataItem) as Affiliate
        affiliate.distance = calculateDistanceBetweenCoordinates(state.origin.latitude, state.origin.longitude, affiliate.latitude, affiliate.longitude);
        return affiliate
    })    
}
const filteredAffiliates = computed(() => {
    const affiliates = filterAffiliatesByMaxDistance(state.dataArray, state.distance);
    return sortArrayByAttrAsc(affiliates as [], 'affiliate_id')
})

</script>

<template>
  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label
          for="distance"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Radius from Origin in Kilometers</label>
        <input
          v-model="state.distance"
          type="number"
          id="distance"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
      </div>
    </div>
  </form>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="order-2 sm:order-1">
      <AffiliateMap
        :affiliates="filteredAffiliates"
        :origin="state.origin"
        :radius="state.distance"
        v-model="state.selectedAffiliate"
      />
    </div>
    <div class="order-1 sm:order-2">
      <AffiliateList
        v-if="filteredAffiliates.length > 0"
        :affiliates="filteredAffiliates"
        v-model="state.selectedAffiliate"
      />
    </div>
  </div>
</template>



<style scoped>

</style>