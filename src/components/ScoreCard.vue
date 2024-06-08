<script setup lang="ts">
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { updateGame } from '../storage'
import { useRoute } from 'vue-router'

const route = useRoute()

const gameName = route.params.gamekey as string;

const { score, name, max } = defineProps<{ name: string, score: number, max: number }>()

const count = ref(score ?? 0)

const update = (num: number) => {
    if (num <= max) {
        count.value = num
        updateGame(gameName, num, name)
    }
}
</script>

<template>
    <li class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
        <div class="flex flex-1 flex-col p-8">
          <h3 class="mt-6 text-sm font-medium text-gray-900">{{name}}</h3>
          <dl class="mt-1 flex flex-grow flex-col justify-between"></dl>
        </div>
        <div>
          <div class="-mt-px flex divide-x divide-gray-200">
            <div class="-ml-px flex w-0 flex-1">
              <a 
                @click="update(count - 1)"
                class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                <MinusIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </a>
            </div>

            <div class="-ml-px flex w-0 flex-1">
              <a
                class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                {{ count }}
              </a>
            </div>

            <div class="flex w-0 flex-1">
              <a 
                @click="update(count + 1)"
                class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                  <PlusIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </li>
</template>