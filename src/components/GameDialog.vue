<template>
    <DialogPanel class="absolute w-full inset-x-0 inset-y-0 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        <div>
            <div class="mt-3 sm:mt-5">
                <DialogTitle as="h3" class="text-base text-center font-semibold leading-6 text-gray-900 pb-2">{{ mainTitle }}</DialogTitle>
                <div class="mt-2">
                <form class="space-y-6" @submit="submitHandler">
                    <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-2">
                        <input :value="name" id="name" name="name" type="text" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    </div>

                    <div>
                    <div class="flex items-center justify-between">
                        <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                    </div>
                    <div class="mt-2">
                        <input :value="description" id="description" name="description" type="text" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    </div>
                    <div>
                    <div class="flex items-center justify-between">
                        <label for="game-limit" class="block text-sm font-medium leading-6 text-gray-900">Game Limit</label>
                    </div>
                    <div class="mt-2">
                        <input :value="gameLimit" id="game-limit" name="game-limit" type="number" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    </div>
                    <DialogTitle as="h4" class="text-base text-center font-semibold leading-6 text-gray-900 pb-2">Participants</DialogTitle>
                    <div>
                    <div class="flex items-center justify-between">
                        <label for="player-one" class="block text-sm font-medium leading-6 text-gray-900">Player 1</label>
                    </div>
                    <div class="mt-2">
                        <input :value="playerOne" id="player-one" name="player-one" type="text" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    </div>
                    <div>
                    <div class="flex items-center justify-between">
                        <label for="player-two" class="block text-sm font-medium leading-6 text-gray-900">Player 2</label>
                    </div>
                    <div class="mt-2">
                        <input :value="playerTwo" id="player-two" name="player-two" type="text" required class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    </div>
                    <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button type="submit" class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2" @click="emit('success')">{{ sucessButton }}</button>
                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" @click="emit('cancel')" ref="cancelButtonRef">Cancel</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </DialogPanel>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { DialogPanel, DialogTitle } from '@headlessui/vue'

const { 
    name, 
    description, 
    gameLimit, 
    playerOne, 
    playerTwo, 
    mainTitle, 
    sucessButton
} = defineProps<{
    name?: string,
    description?: string,
    gameLimit?: number,
    playerOne?: string,
    playerTwo?: string,
    mainTitle?: string,
    sucessButton?: string
}>()

const emit = defineEmits(['submit', 'cancel', 'success']);

const submitHandler = (event: Event) => {
    emit('submit', event);
}


</script>