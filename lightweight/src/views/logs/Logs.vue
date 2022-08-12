<template>
  <div class="flex flex-col flex-1 w-full mx-auto bg-bg-600">
    <div class="flex flex-row">
      <div
          class="ml-8 mr-4 my-8 bg-bg rounded-lg shadow w-min p-3"
          @click="$router.go(-1)"
      >
        <ChevronLeftIcon aria-hidden="true" class="w-6 h-6 sm:w-8 sm:h-8"/>
      </div>

      <h2
          v-if="exercise"
          class="my-8 self-center text-3xl font-light text-primary truncate"
      >
        {{ exercise.exerciseName }}
      </h2>
    </div>
     <div class="flex flex-row ">
      <div
        class="grid ml-8 mr-8 place-items-end w-full p-2"
      >
      <div>
        <button
            type="button"
            @click="openEditExerciseModal"
            class="w-6 h-6 sm:w-8 sm:h-8 ml-4"
        >
          <PencilIcon
              class="w-6 h-6 text-buttonPrimary"
              aria-hidden="true"
          />
        </button>
        <button
            type="button"
            @click="deleteExercise(exercise.id)"
            class="w-6 h-6 sm:w-8 sm:h-8 ml-4"
        >
          <TrashIcon
              class="w-6 h-6 text-buttonPrimary"
              aria-hidden="true"
          />
        </button>
      </div>

      </div>
    </div>

    <TransitionGroup
        class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 2xl:grid-cols-6 m-8"
        name="list"
        tag="ul"
    >
      <li
          v-for="(log, index) in filteredAndSorted"
          :key="log.id"
          :style="{ transitionDelay: 0.02 * index + 's' }"
          class="bg-bg rounded-lg cursor-pointer hover:border-2 hover:border-buttonPrimary flex flex-1 flex-col justify-between"
      >
        <div class="flex">
          <span
              class="relative flex-1 text-left text-xl font-bold text-secondary-button pl-4 pt-2"
          >
            {{ log.sets.length }} set(s)
          </span>
        </div>
        <div class="flex flex-1 flex-col justify-between">
          <div class="flex flex-col mt-4 mb-4 mr-4 ml-4">
            <div
                v-for="(set, index) in log.sets"
                :key="index"
                class="grid grid-cols-2 gap-4"
            >
              <div v-if="!exercise.isTime" class="col-span-1 self-center text-left">
                <span class="truncate">{{ set.reps }}</span>
                <span class="truncate text-xs font-light"> reps</span>
              </div>
              <div v-if="exercise.isBodyWeight" class="col-span-1 self-center truncate text-right">
                <span v-if="set.weight > 0" class="truncate">+ {{ set.weight }}</span>
                <span v-if="set.weight > 0" class="truncate text-xs font-light"> KG</span>
                <span v-else class="truncate text-xs font-light"> BW</span>
              </div>
              <div v-if="exercise.isTime" class="col-span-1 self-center text-left truncate">
                <span v-if="set.time > 0" class="truncate">{{ set.time }}</span>
                <span v-if="set.time > 0" class="truncate text-xs font-light"> sec</span>
                <span v-else class="truncate text-xs font-light"> seconds</span>
              </div>
              <div v-if="exercise.isTime" class="col-span-1 self-center text-left">
                <span v-if="set.weight > 0" class="truncate">{{ set.weight }}</span>
                <span v-if="set.weight > 0" class="truncate text-xs font-light"> KG</span>
              </div>
              <div v-if="!exercise.isBodyWeight && !exercise.isTime" class="col-span-1 self-center text-right">
                <span class="truncate">{{ set.weight }}</span>
                <span class="truncate text-xs font-light"> KG</span>
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
          class="p-6 border border-transparent rounded-full shadow-sm text-secondary-textBody bg-buttonPrimary hover:bg-buttonPrimary-hover"
          type="button"
          v-on:click="openCreateLogModal()"
      >
        <PlusSmIconOutline aria-hidden="true" class="h-6 w-6"/>
      </button>
    </div>
    <CreateLog
        :createLogModalOpen="isCreateLogModalOpen"
        :exercise="exercise"
        :exerciseID="route.params.exerciseID"
        @closeCreateLogModal="closeCreateLogModal()"
    />
    <ConfirmationModal
        :open="confirmModalData.open"
        :title="confirmModalData.title"
        :body="confirmModalData.body"
        :loading="confirmModalData.loading"
        :cancelButtonText="confirmModalData.cancelButtonText"
        :confirmButtonText="confirmModalData.confirmButtonText"
        @cancel="onCancelDelete"
        @confirm="onConfirmDelete"
    />

    <EditExercise
        :editExerciseModalOpen="isEditExerciseModalOpen"
        @closeEditExerciseModal="closeEditExerciseModal()"
        :exercise="exercise"
    />

  </div>
</template>

<script lang="ts" setup>
import {ChevronLeftIcon,} from "@heroicons/vue/solid";
import {PlusSmIcon as PlusSmIconOutline, PencilIcon, TrashIcon} from "@heroicons/vue/outline";
import CreateLog from "@/components/Log/CreateLog.vue";
import {getAuth} from "firebase/auth";
import {computed, onUnmounted, ref} from "vue";
import {db} from "@/firebase/firebase.js";
import {useRoute, useRouter} from "vue-router";
import {collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query,} from "firebase/firestore";
import {useUiStateComposable} from "@/composables/uistate-composable";
import ConfirmationModal from '@/components/ConfirmationModal'
import EditExercise from "@/components/Exercise/EditExercise.vue";

const {globalState} = useUiStateComposable();

const confirmModalData = ref({
  open: false,
  title: 'Delete exercise',
  body: 'Are you sure you want to delete this project? All data from this project and the underlying data will be permanently deleted from our servers. This action cannot be undone.',
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Confirm',
  loading: false,
});
const activeDeleteUuid = ref();

const isEditExerciseModalOpen = ref(false);
const logs = ref([]);
const isCreateLogModalOpen = ref(false);
const user = ref();
const router = useRouter();
const route = useRoute();
let exercise = getReactiveExercise();

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

function deleteExercise(id: any) {
  confirmModalData.value.loading = false;
  activeDeleteUuid.value = id;
  confirmModalData.value.open = true;
}

function onCancelDelete() {
  confirmModalData.value.open = false;
}

async function onConfirmDelete() {
  confirmModalData.value.loading = true;
  //First clear out all types nested in the component
  const logsCollection = collection(
      db,
      'exercises',
      activeDeleteUuid.value,
      'logs'
  );

  const logsArray: any[] = [];
  const querySnapshot = await getDocs(logsCollection);
  querySnapshot.forEach((doc: any) => {
    logsArray.push(doc);
  });

  for (const log of logsArray) {
    const typeRef = doc(
        db,
        'exercises',
        activeDeleteUuid.value,
        'logs',
        log.id
    );

    deleteDoc(typeRef)
        .then(() => {
        })
        .catch((error: any) => {
          console.log(error);
        });
  }

  //delete the component
  const exercisesRef = doc(db, 'exercises', activeDeleteUuid.value);

  deleteDoc(exercisesRef)
      .then(() => {
        router.push({name: "exercises"})
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() =>
      {
        confirmModalData.value.open = false;
      })
}

function openEditExerciseModal() {
  isEditExerciseModalOpen.value = true;
}

function closeEditExerciseModal() {
  isEditExerciseModalOpen.value = false;
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
