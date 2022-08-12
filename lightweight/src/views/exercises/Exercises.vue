<template>
  <div class="flex flex-col flex-1 w-full mx-auto bg-bg-600">
    <h2 class="m-8 text-3xl font-light text-primary">Exercises</h2>
    <TransitionGroup
        class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 m-8"
        name="list"
        tag="ul"
    >
      <li
          v-for="(exercise, index) of filteredAndSorted"
          :key="exercise.id"
          :style="{ transitionDelay: 0.02 * index + 's' }"
          class="relative bg-bg rounded-lg cursor-pointer hover:border-2 hover:border-buttonPrimary flex flex-1 flex-col justify-between"
          @click="viewLogs(exercise.id)"
      >
        <div class="flex mr-8">
          <span
              class="relative -mr-px flex-1 inline-flex items-center justify-left pt-3 text-base text-primary-textTitle font-regular border border-transparent rounded-bl-lg "
          >
            <span class="ml-3">{{ exercise.exerciseName }}</span>
          </span>
        </div>
        <label v-if="exercise.isWeight" class="ml-4 text-2xl text-primary-textBody font-medium pb-2 pt-2">
              <span v-if="exercise.exerciseEstimatedMax">
                <span class="text-base text-primary"> 1RM </span> {{ exercise.exerciseEstimatedMax[exercise.exerciseEstimatedMax.length -1] }} <span
                  class="text-sm text-primary-textTitle">KG</span>
              </span>
        </label>
        <div class="w-full" v-if="exercise.isWeight">
          <LineChart :chartData="{
  labels: exercise.exerciseEstimatedMaxDate,
  datasets: [{
    data: exercise.exerciseEstimatedMax,
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    borderWidth: 3,
    tension: 0.1,
    pointStyle: 'line'
  }]
}" :options="testData.options" class="ml-1 mr-1"/>
        </div>
        <label v-if="exercise.isBodyWeight" class="ml-4 text-2xl text-primary-textBody font-medium pb-2 pt-2">
              <span v-if="exercise.exerciseHighestReps">
                <span class="text-base text-primary"> HR </span> {{ exercise.exerciseHighestReps }} <span
                  class="text-sm text-primary-textTitle">reps</span>
              </span>

        </label>
        <label v-if="exercise.isTime" class="ml-4 text-2xl text-primary-textBody font-medium pb-2 pt-2">
              <span v-if="exercise.exerciseHighestTime">
                <span class="text-base text-primary"> HT </span> {{ exercise.exerciseHighestTime }} <span
                  class="text-sm text-primary-textTitle">sec</span>
              </span>
        </label>
        <div class="text-right pr-2 pb-2">
          <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-buttonPrimary text-secondary-textBody"
          >
            <span v-if="exercise.isWeight">
             <svg class="h-5 w-5" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                 d="M104 96h-48C42.75 96 32 106.8 32 120V224C14.33 224 0 238.3 0 256c0 17.67 14.33 32 31.1 32L32 392C32 405.3 42.75 416 56 416h48C117.3 416 128 405.3 128 392v-272C128 106.8 117.3 96 104 96zM456 32h-48C394.8 32 384 42.75 384 56V224H256V56C256 42.75 245.3 32 232 32h-48C170.8 32 160 42.75 160 56v400C160 469.3 170.8 480 184 480h48C245.3 480 256 469.3 256 456V288h128v168c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24V56C480 42.75 469.3 32 456 32zM608 224V120C608 106.8 597.3 96 584 96h-48C522.8 96 512 106.8 512 120v272c0 13.25 10.75 24 24 24h48c13.25 0 24-10.75 24-24V288c17.67 0 32-14.33 32-32C640 238.3 625.7 224 608 224z"/></svg>
            </span>
           <span v-if="exercise.isBodyWeight">
              BW
            </span>
           <span v-if="exercise.isTime">
              <ClockIcon aria-hidden="true" class="h-5 w-5"/>
            </span>
          </span>
        </div>


      </li>
    </TransitionGroup>

    <div class="fixed bottom-10 right-10">
      <button
          class="p-6 border border-transparent rounded-full shadow-sm text-secondary-textBody bg-buttonPrimary hover:bg-buttonPrimary-hover"
          type="button"
          v-on:click="openCreateExerciseModal()"
      >
        <PlusSmIconOutline aria-hidden="true" class="h-6 w-6"/>
      </button>
    </div>
    <CreateExercise
        :createExerciseModalOpen="isExerciseModalOpen"
        @closeCreateExerciseModal="closeCreateExerciseModal()"
    />


  </div>
</template>

<script lang="ts" setup>
import {ClockIcon, PlusSmIcon as PlusSmIconOutline} from "@heroicons/vue/outline";
import CreateExercise from "@/components/Exercise/CreateExercise.vue";
import {getAuth} from "firebase/auth";
import {computed, onUnmounted, ref} from "vue";
import {db} from "@/firebase/firebase.js";
import {useRouter} from "vue-router";
import {collection, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {useUiStateComposable} from '@/composables/uistate-composable';
import {LineChart} from 'vue-chart-3';
import {Chart, registerables} from "chart.js";

Chart.register(...registerables);

const {globalState} = useUiStateComposable();
const isExerciseModalOpen = ref(false);
const user = ref();
const router = useRouter();
const exercises = ref([]);

const testData = {
  labels: ['60', '95', '120', '125', '150'],
  datasets: [{
    data: [60, 95, 120, 125, 150],
    fill: true,
    borderColor: 'rgb(75, 192, 192)',
    borderWidth: 3,
    tension: 0.1,
    pointStyle: 'line'
  }],
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        display: false // Hide Y axis labels
      },
      x: {
        display: true // Hide X axis labels
      }
    }
  }
};


const filteredAndSorted = computed(() => {
      if (globalState.searchTerm.toLowerCase() === 'bodyweight' || globalState.searchTerm.toLowerCase() === 'bw') {
        return exercises.value
            .filter((exercise) => {
              return exercise.isBodyWeight
            })
            .sort(compare)
      } else if (globalState.searchTerm.toLowerCase() === 'weight') {
        return exercises.value
            .filter((exercise) => {
              return exercise.isWeight
            })
            .sort(compare)
      } else if (globalState.searchTerm.toLowerCase() === 'time') {
        return exercises.value
            .filter((exercise) => {
              return exercise.isTime
            })
            .sort(compare)
      } else {
        return exercises.value
            .filter((exercise) => {
              return exercise.exerciseName
                      .toLowerCase()
                      .includes(globalState.searchTerm.toLowerCase()) ||
                  exercise.exerciseEstimatedMax
                      .toLowerCase()
                      .includes(globalState.searchTerm.toLowerCase())
            })
            .sort(compare)
      }
    }
);

function compare(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

getAuth().onAuthStateChanged((u) => {
  user.value = u;
  getReactiveExercises();
});

function getReactiveExercises() {
  const exercisesCollection = collection(db, "exercises");
  const q = query(
      exercisesCollection,
      where("createdByUid", "==", user.value.uid),
      orderBy("timeStampCreated", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    exercises.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  });
  onUnmounted(unsubscribe);
}

function openCreateExerciseModal() {
  isExerciseModalOpen.value = true;
}

function closeCreateExerciseModal() {
  isExerciseModalOpen.value = false;
}

function viewLogs(id) {
  router.push({
    name: "logs",
    params: {
      exerciseID: id,
    },
  });
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
