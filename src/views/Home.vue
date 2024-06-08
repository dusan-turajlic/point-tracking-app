<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li v-for="[key, game] in Object.entries(games)" :key="key" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <RouterLink :to="'/game/' + key">
                <div class="flex flex-1 flex-col p-8">
                    <div class="flex flex-1 flex-col p-8">
                        <h3 class="mt-6 text-sm font-medium text-gray-900">{{ game.name}}</h3>
                        <dl class="mt-1 flex flex-grow flex-col justify-between">
                            <dd class="text-sm text-gray-500">{{ game?.currentLeader }}</dd>
                        </dl>
                    </div>
                </div>
            </RouterLink>
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ScoreCard from './components/ScoreCard.vue'
import { computed } from 'vue'
import { getGames } from '../storage'

const games = computed(() => getGames());

</script>