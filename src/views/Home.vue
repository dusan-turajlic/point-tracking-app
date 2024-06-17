<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <li v-for="[key, game] in Object.entries(games)" :key="key" class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <div class="flex border-gray-900/5 bg-gray-50">
                <RouterLink :to="'/game/' + key">
                    <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <div class="text-sm font-medium leading-6 text-gray-900">{{ game.name }}</div>
                    </div>
                </RouterLink>
                <Menu as="div" class="relative ml-auto p-6 text-left">
                  <MenuButton class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Open options</span>
                    <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
                  </MenuButton>
                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <MenuItem @click="open = true; currentGame=game; currentGameKey=key" v-slot="{ active }">
                        <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                          >Edit<span class="sr-only">, {{ game.name }}</span></a
                        >
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
            </div>
            <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                <div class="flex justify-between gap-x-4 py-3">
                <dt class="text-gray-500">Status</dt>
                <dd class="flex items-start gap-x-2">
                    <div class="font-medium text-gray-900">{{ game.currentLeader ? game.scores[game?.currentLeader] : 0 }}</div>
                    <div class="rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset">{{ game.currentLeader }}</div>
                </dd>
                </div>
            </dl>
        </li>
    </ul>

    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <GameDialog 
                        @submit="(event) => submitHandler(event, currentGameKey, currentGame!.scores)"
                        @cancel="open=false"
                        @success="open=false"
                        :game-limit="currentGame!.limit" 
                        :name="currentGame!.name" 
                        :description="currentGame!.description" 
                        :playerOne="Object.keys(currentGame!.scores)[0]" 
                        :playerTwo="Object.keys(currentGame!.scores)[1]"
                        main-title="Edit Game"
                        sucess-button="Save"
                    />
                </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot> 
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getGames, updateGameDetails, NewGame } from '../storage'
import GameDialog from '../components/GameDialog.vue'
import { Menu, MenuButton, MenuItem, MenuItems,  Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'

const open = ref(false);

const currentGame = ref<NewGame>();
const currentGameKey = ref('');

const submitHandler = (event: Event, key: string, scores: NewGame['scores']) => {
    event.preventDefault()
    
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const gameLimit = formData.get('game-limit') as unknown as number;
  const playerOne = formData.get('player-one') as string;
  const playerTwo = formData.get('player-two') as string;

  updateGameDetails(key, {
    name,
    description,
    limit: gameLimit,
    scores: {
      [playerOne]: Object.values(scores)[0],
      [playerTwo]: Object.values(scores)[1]
    }
  })

  location.reload();
}

const games = computed(() => getGames());

</script>