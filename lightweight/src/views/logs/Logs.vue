<template>
  <div class="flex flex-col flex-1 w-full mx-auto bg-bg-600">
    <div class="flex flex-row">
      <div
        class="ml-8 mr-4 my-8 bg-bg rounded-lg shadow w-min p-3"
        @click="$router.go(-1)"
      >
        <ChevronLeftIcon class="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
      </div>

      <h2
        class="my-8 self-center text-3xl font-light text-primary truncate"
        v-if="exercise"
      >
        {{ exercise.exerciseName }}
      </h2>
    </div>
    <!-- <div class="flex flex-row">
      <div
        class="ml-8 mr-8 bg-bg rounded-lg shadow w-full p-2"
      >
      <div>
          <ChevronDownIcon class="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
          <label>Date created</label>
      </div>
      
      </div>
    </div> -->

    <TransitionGroup
      name="list"
      tag="ul"
      class="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-8"
    >
      <li
        v-for="(log, index) in filteredAndSorted"
        :key="log.id"
        class="bg-bg rounded-lg cursor-pointer hover:border-2 hover:border-buttonPrimary flex flex-1 flex-col justify-between"
        :style="{ transitionDelay: 0.02 * index + 's' }"
      >
        <div class="flex">
          <span
            class="relative flex-1 text-left text-xl font-bold text-secondary-button pl-4 pt-2"
          >
            {{ log.sets.length }} sets
          </span>
        </div>
        <div class="flex flex-1 flex-col justify-between">
          <div class="flex flex-col mt-4 mb-4 mr-6 ml-6">
            <div
              class="grid grid-cols-2 gap-4"
              v-for="(set, index) in log.sets"
              :key="index"
            >
              <div class="col-span-1 self-center text-left">
                <span class="truncate">{{ set.reps }}</span>
                <span class="truncate text-xs font-light"> reps</span>
              </div>
              <div class="col-span-1 self-center text-right" v-if="exercise.isBodyWeight">
                <span class="truncate"  v-if="set.weight > 0">+ {{ set.weight }}</span>
                <span class="truncate text-xs font-light" v-if="set.weight > 0"> KG</span>
                 <span class="truncate text-xs font-light" v-else> BW</span>
              </div>
               <div class="col-span-1 self-center text-right" v-else>
                <span class="truncate">{{ set.weight }}</span>
                <span class="truncate text-xs font-light" > KG</span>
              </div>
            </div>
          </div>
        </div>
        <label
          class="text-right text-sm font-light text-primary-textTitle pr-4 pb-2"
        >
          {{ log.createdDate }}
        </label>
      </li>
    </TransitionGroup>

    <div class="fixed bottom-10 right-10">
      <button
        v-on:click="openCreateLogModal()"
        type="button"
        class="p-6 border border-transparent rounded-full shadow-sm text-secondary-textBody bg-buttonPrimary hover:bg-buttonPrimary-hover"
      >
        <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <CreateLog
      :createLogModalOpen="isCreateLogModalOpen"
      :exerciseID="route.params.exerciseID"
      :exercise="exercise"
      @closeCreateLogModal="closeCreateLogModal()"
    />
  </div>
</template>

<script setup lang="ts">
import {
  MailIcon,
  PhoneIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
} from "@heroicons/vue/solid";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/vue/solid";
import { PlusSmIcon as PlusSmIconOutline } from "@heroicons/vue/outline";
import { TransitionRoot } from "@headlessui/vue";
import CreateLog from "@/components/Log/CreateLog.vue";
import { getAuth, signOut } from "firebase/auth";
import { onUnmounted, ref, computed } from "vue";
import { db } from "@/firebase/firebase.js";
import { useRouter, useRoute } from "vue-router";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import Grid from "gridjs-vue";
import { useUiStateComposable } from "@/composables/uistate-composable";

const { globalState } = useUiStateComposable();

const filteredAndSorted = computed(() =>
  Array.isArray(logs.value)
    ? logs.value
        .filter((log) => {
          return log.createdDate
            .toLowerCase()
            .includes(globalState.searchTerm.toLowerCase());
        })
        .sort(compare)
    : []
);

function compare(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

const isCreateLogModalOpen = ref(false);
const user = ref();
const router = useRouter();
const route = useRoute();
var logs = ref([]);
let exercise = getReactiveExercise();

getAuth().onAuthStateChanged((u) => {
  user.value = u;
  getReactiveLogs();
});

function getReactiveExercise() {
  let exercise = ref({});
  const unsubscribe = onSnapshot(
    doc(db, "exercises", route.params.exerciseID),
    (doc) => {
      exercise.value = {
        id: doc.id,
        ...doc.data(),
      };
    }
  );
  onUnmounted(unsubscribe);
  return exercise;
}

function getReactiveLogs() {
  const exercisesCollection = collection(
    db,
    "exercises",
    route.params.exerciseID,
    "logs"
  );
  const q = query(exercisesCollection, orderBy("timeStampCreated", "desc"));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    logs.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(unsubscribe);
}

function removeTraining(index) {
  console.log(index);
  //people.value.splice(index, 1);
}

function openCreateLogModal() {
  isCreateLogModalOpen.value = true;
}

function closeCreateLogModal() {
  isCreateLogModalOpen.value = false;
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
