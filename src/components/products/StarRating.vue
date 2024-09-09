<script setup lang="ts">
import { computed } from 'vue';


const props = withDefaults(defineProps<{
  rating?: number;
  maxRating?: number;
  count?: number
}>(), {
  rating: 0,
  maxRating: 5
});

const maxRating = props.maxRating || 5;

const fullStars = computed(() => Math.floor(props.rating));
const hasHalfStar = computed(() => props.rating % 1 >= 0.5);
const emptyStars = computed(() => maxRating - fullStars.value - (hasHalfStar.value ? 1 : 0));
</script>

<template>
  <div class="star-rating">
    <span v-for="n in fullStars" :key="`full-${n}`" class="star full">★</span>
    <span v-if="hasHalfStar" class="star half">★</span>
    <span v-for="n in emptyStars" :key="`empty-${n}`" class="star empty">☆</span>
    <span v-if="count" class="rating-count">({{ count }} review)</span>
  </div>
</template>

<style scoped>
.star-rating {
  display: block;
  width: 100%;
}

.star {
  font-size: 1.2em;
  color: #ffd700;
}

.full, .half {
  position: relative;
}

.half::after {
  content: '☆';
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  overflow: hidden;
  color: #ffd700;
}

.empty {
  color: #ccc;
}

.rating-count {
  font-size: 0.8em;
  color: #666;
  margin-left: 5px;
}
</style>