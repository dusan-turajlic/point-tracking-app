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
            <DialogPanel class="absolute w-full inset-x-0 inset-y-0 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="mt-3 sm:mt-5">
                  <DialogTitle as="h3" class="text-base text-center font-semibold leading-6 text-gray-900 pb-2">New Game</DialogTitle>
                  <div class="mt-2">
                    <form class="space-y-6" @submit="submitHandler">
                      <div>
                        <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                        <div class="mt-2">
                          <input id="name" name="name" type="text" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>

                      <div>
                        <div class="flex items-center justify-between">
                          <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        </div>
                        <div class="mt-2">
                          <input id="description" name="description" type="text" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <div class="flex items-center justify-between">
                          <label for="game-limit" class="block text-sm font-medium leading-6 text-gray-900">Game Limit</label>
                        </div>
                        <div class="mt-2">
                          <input id="game-limit" name="game-limit" type="number" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <DialogTitle as="h4" class="text-base text-center font-semibold leading-6 text-gray-900 pb-2">Participants</DialogTitle>
                      <div>
                        <div class="flex items-center justify-between">
                          <label for="player-one" class="block text-sm font-medium leading-6 text-gray-900">Player 1</label>
                        </div>
                        <div class="mt-2">
                          <input id="player-one" name="player-one" type="text" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <div class="flex items-center justify-between">
                          <label for="player-two" class="block text-sm font-medium leading-6 text-gray-900">Player 2</label>
                        </div>
                        <div class="mt-2">
                          <input id="player-two" name="player-two" type="text" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" @click="open = false">Create new</button>
                        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="open = false" ref="cancelButtonRef">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useRoute } from 'vue-router'

const router = useRoute()

const open = ref(false)

const submitHandler = (event: Event) => {
  event.preventDefault()

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const gameLimit = formData.get('game-limit') as unknown as number;
  const playerOne = formData.get('player-one') as string;
  const playerTwo = formData.get('player-two') as string;

  createGame({
    name,
    description,
    limit: gameLimit,
    scores: {
      [playerOne]: 0,
      [playerTwo]: 0
    }
  })
}
</script>