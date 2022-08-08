<template>
  <div class="flex flex-col flex-1 w-full mx-auto bg-bg-600">
    <h2 class="m-8 text-3xl font-light text-primary">Exercises</h2>
    <TransitionGroup
        name="list"
        tag="ul"
        class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 m-8"
    >
      <li
          v-for="(exercise, index) of filteredAndSorted"
          :key="exercise.id"
          class="relative bg-bg rounded-lg cursor-pointer hover:border-2 hover:border-buttonPrimary flex flex-1 flex-col justify-between"
          @click="viewLogs(exercise.id)"
          :style="{ transitionDelay: 0.02 * index + 's' }"
      >
        <div class="flex mr-8">
          <span class="relative -mr-px flex-1 inline-flex items-center justify-left pt-3 text-base text-primary-textTitle font-regular border border-transparent rounded-bl-lg "
          >
            <span class="ml-3">{{ exercise.exerciseName }}</span>
          </span>


        </div>
        <button
            type="button"
            v-on:click.stop @click="deleteExercise(exercise.id)"
            class="absolute right-1 top-2"
        >
          <XIcon
              class="w-6 h-6 text-buttonPrimary"
              aria-hidden="true"
          />
        </button>

        <div class="flex flex-1 flex-col justify-between">
          <div class="flex-1 flex">
            <p
                class="relative -mr-px flex-1 inline-flex items-center justify-left pb-1 text-2xl text-primary-textBody font-medium border border-transparent rounded-bl-lg"
            >
              <span v-if="exercise.exerciseEstimatedMax" class="ml-3">
                1RM {{ exercise.exerciseEstimatedMax }} KG
              </span>
              <span v-else class="ml-3">No data yet</span>
            </p>
          </div>
        </div>
        <label v-if="exercise.isBodyWeight" class="text-right pr-2 pb-2">
          <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-buttonPrimary text-secondary-textBody"
          >
            BW
          </span>
        </label>
      </li>
    </TransitionGroup>

    <div class="fixed bottom-10 right-10">
      <button
          v-on:click="openCreateExerciseModal()"
          type="button"
          class="p-6 border border-transparent rounded-full shadow-sm text-secondary-textBody bg-buttonPrimary hover:bg-buttonPrimary-hover"
      >
        <PlusSmIconOutline class="h-6 w-6" aria-hidden="true"/>
      </button>
    </div>
    <CreateExercise
        :createExerciseModalOpen="isExerciseModalOpen"
        @closeCreateExerciseModal="closeCreateExerciseModal()"
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

  </div>
</template>

<script setup lang="ts">
import {PlusSmIcon as PlusSmIconOutline, XIcon} from "@heroicons/vue/outline";
import CreateExercise from "@/components/Exercise/CreateExercise.vue";
import {getAuth} from "firebase/auth";
import {onUnmounted, ref, computed} from "vue";
import {db} from "@/firebase/firebase.js";
import {useRouter} from "vue-router";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot, deleteDoc, doc, getDocs,
} from "firebase/firestore";
import {useUiStateComposable} from '@/composables/uistate-composable';
import ConfirmationModal from '@/components/ConfirmationModal'

const confirmModalData = ref({
  open: false,
  title: 'Delete exercise',
  body: 'Are you sure you want to delete this project? All data from this project and the underlying data will be permanently deleted from our servers. This action cannot be undone.',
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Confirm',
  loading: false,
});

const {globalState} = useUiStateComposable();
const activeDeleteUuid = ref();
const isExerciseModalOpen = ref(false);
const user = ref();
const router = useRouter();
const exercises = ref([]);
const filteredAndSorted = computed(() =>
    Array.isArray(exercises.value)
        ? exercises.value
            .filter((exercise) => {
              return exercise.exerciseName
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

function removeTraining(index) {
  console.log(index);
  people.value.splice(index, 1);
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

  function deleteExercise(id:any) {
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
          .then(() => {})
          .catch((error: any) => {
            console.log(error);
          });
    }

    //delete the component
    const exercisesRef = doc(db, 'exercises', activeDeleteUuid.value);

    deleteDoc(exercisesRef)
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    confirmModalData.value.open = false;
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
