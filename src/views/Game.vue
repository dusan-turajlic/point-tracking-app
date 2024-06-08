
import ScoreCardVue from '../components/ScoreCard.vue';
<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
          <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{{ game.name }}</p>
        </div>
        <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">{{ game.description }}</p>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <ScoreCard v-for="[name, score] in Object.entries(game.scores)" :key="name" :name="name" :score="score" :max="game.limit" />
            </ul>
        </div>
    </div>
</template>
  
<script setup lang="ts">
  import ScoreCard from '../components/ScoreCard.vue'
  import { computed } from 'vue'
  import { getGame } from '../storage'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  
  const game = computed(() => getGame(route.params.gamekey as string));
  
</script>