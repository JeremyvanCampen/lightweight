<template>
  <div
    class="flex flex-col flex-1 w-full mx-auto max-w-screen-2xl bg-primary-darker"
  >
    <TransitionGroup
      name="list"
      tag="ul"
      class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 m-6"
    >
      <li
        v-for="(person, index) of people"
        :key="person.id"
        class="col-span-1 bg-primary-dark rounded-lg shadow"
        :style="{ transitionDelay: 0.02 * index + 's' }"
      >
        <div class="-mt-px flex">
          <div class="w-0 flex-1 flex">
            <p
              class="relative -mr-px w-0 flex-1 inline-flex items-center justify-left pt-6 text-base text-primary-textBody font-light border border-transparent rounded-bl-lg"
            >
              <span class="ml-3">Deadlift</span>
            </p>
          </div>
        </div>
        <div>
          <div class="-mt-px flex">
            <div class="w-0 flex-1 flex">
              <p
                class="relative -mr-px w-0 flex-1 inline-flex items-center justify-left pb-1 text-4xl text-primary-textBody font-regular border border-transparent rounded-bl-lg"
              >
                <span class="ml-3">1 RM 120 KG</span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </TransitionGroup>

    <div class="fixed bottom-10 right-10">
      <button
        v-on:click="addTraining()"
        type="button"
        class="p-6 border border-transparent rounded-full shadow-sm text-secondary-textBody bg-buttonPrimary hover:bg-buttonPrimary-hover"
      >
        <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MailIcon, PhoneIcon } from "@heroicons/vue/solid";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/vue/solid";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/vue/outline";
import { ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";


let people: object[] = ref([
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      id:'effafea'
  },
]);

function addTraining() {
  people.value.unshift({
       name: "Test person",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
      id: Math.random()
  });

 
}

 function removeTraining(index)
  {
    console.log(index)
    people.value.splice(index, 1);
  }
</script>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.list-enter-from,
.list-leave-to {
   opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */

</style>
