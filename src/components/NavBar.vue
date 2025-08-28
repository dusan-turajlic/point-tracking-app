<template>
  <Disclosure as="nav" class="bg-white shadow sticky top-0">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <a v-if="router.path !== '/'" href="/">
              <ArrowLeftIcon class="relative inline-flex items-center gap-x-1.5 w-10 h-10 rounded-md text-sm" />
            </a>
          </div>
        </div>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <button type="button" @click="open = true" class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <PlusIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
              New game
            </button>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>

  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <GameDialog :gameLimit="100" main-title="New Game" sucess-button="Create Game"  @submit="submitHandler" @cancel="open=false" @success="open=false" />
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { createGame } from '../storage'
import { Disclosure } from '@headlessui/vue'
import { PlusIcon, ArrowLeftIcon } from '@heroicons/vue/20/solid'

import { ref } from 'vue'
import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useRoute } from 'vue-router'
import GameDialog from './GameDialog.vue'

const router = useRoute()

const open = ref(false)

const submitHandler = async (event: Event) => {
  event.preventDefault()

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const gameLimit = formData.get('game-limit') as unknown as number;
  const playerOne = formData.get('player-one') as string;
  const playerTwo = formData.get('player-two') as string;

  await createGame({
    name,
    description,
    limit: gameLimit,
    scores: {
      [playerOne]: {score: 0},
      [playerTwo]: {score: 0}
    }
  })

  location.reload();
}
</script>