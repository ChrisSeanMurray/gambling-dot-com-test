<script setup lang="ts">
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LCircle, LCircleMarker } from "@vue-leaflet/vue-leaflet"
import { Affiliate, AffiliateArray, LatitudeLongitude } from "../types";

const props = defineProps<{
  affiliates: AffiliateArray,
  origin: LatitudeLongitude,
  radius: number,
  modelValue: Affiliate | null
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: Affiliate | null): void;
}>();


</script>

<template>
  <l-map
    ref="map"
    :zoom="7"
    :center="[props.origin.latitude, props.origin.longitude]"
    :use-global-leaflet="false"
    style="height: 600px; width: 100%; display:block; min-height: fit-content;"
  >
    <l-tile-layer
      url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      layer-type="base"
      name="Stadia Maps Basemap"
    />
    <l-circle 
      :lat-lng="[props.origin.latitude, props.origin.longitude]"
      :radius="props.radius * 1000"
      :color="'red'"
    />
    <l-circle-marker
      :lat-lng="[props.origin.latitude, props.origin.longitude]"
      :color="'yellow'"
      :name="'Gambling.com HQ'"
    />
    <l-marker
      v-if="props.modelValue"
      :lat-lng="[props.modelValue.latitude, props.modelValue.longitude]"
      @click="emit('update:model-value', null)"
    />
    <l-marker
      v-else
      v-for="(affiliate, index) in props.affiliates"
      :lat-lng="[affiliate.latitude, affiliate.longitude]"
      :key="index"
      :name="affiliate.name"
      @click="emit('update:model-value', affiliate)"
    />
  </l-map>
</template>

<style lang="scss" scoped>

</style>