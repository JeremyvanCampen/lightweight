<template>
  <div>
    <TransitionRoot as="template" :show="createExerciseModalOpen">
      <Dialog
          as="div"
          class="fixed inset-0 z-20 overflow-y-auto"
          @close="closeCreateExerciseModal()"
      >
        <div
            class="flex justify-center min-h-screen text-center sm:block relative"
        >
          <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
          >
            <DialogOverlay
                class="fixed inset-0 transition-opacity bg-bg-600 bg-opacity-75"
            />
          </TransitionChild>

          <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
          >&#8203;</span
          >
          <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
                class="relative inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-bg shadow-xl sm:rounded-lg sm:my-8 sm:align-middle sm:max-w-sm sm:p-6 md:max-w-4xl"
            >
              <form
                  action="#"
                  @submit.prevent="submit"
                  class="h-full flex flex-col"
                  :class="{ 'pointer-events-none': loading }"
              >
                <div class="h-full">
                  <h2 class="text-3xl font-light text-primary">
                    Create exercise
                  </h2>
                  <div class="space-y-6 sm:p-6">
                    <h3 class="text-primary-textTitle font-light">
                      Basic Information
                    </h3>
                    <div
                        class="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6 grid-cols-6"
                    >
                      <div class="sm:col-span-6 col-span-6">
                        <label
                            for="exerciseName"
                            class="block text-sm font-light text-primary-textSub"
                        >
                          Name
                        </label>
                        <div class="mt-1">
                          <input
                              type="text"
                              name="description"
                              id="description"
                              v-model="formData.exerciseName"
                              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                              :class="
                              formError
                                ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                            "
                              :aria-invalid="formError"
                              aria-describedby="description-error"
                          />
                          <div
                              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                              v-if="formError"
                          >
                            <svg
                                class="w-5 h-5 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                              <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 class="text-primary-textTitle font-light">
                      Exercise type
                    </h3>
                    <div
                        class="grid mt-6 gap-y-6 gap-x-4 sm:grid-cols-6 grid-cols-6 "
                    >
                      <div class="sm:col-span-2 col-span-2 ">
                        <label
                            for="exerciseName"
                            class="block text-sm font-light text-primary-textSub"
                        >
                          Weights
                        </label>
                        <div class="mt-1">
                          <Switch
                              v-model="weightEnabled"
                              class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span class="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                class="pointer-events-none absolute  w-full h-full rounded-md"
                            />
                            <span
                                aria-hidden="true"
                                :class="[
                                weightEnabled ? 'bg-secondary-button' : 'bg-gray-200',
                                'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200',
                              ]"
                            />
                            <span
                                aria-hidden="true"
                                :class="[
                                weightEnabled ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200',
                              ]"
                            />
                          </Switch>
                          <div
                              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                              v-if="formError"
                          >
                            <svg
                                class="w-5 h-5 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                              <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div class="sm:col-span-2 col-span-2  ">
                        <label
                            for="exerciseName"
                            class="block text-sm font-light text-primary-textSub "
                        >
                          Bodyweight
                        </label>
                        <div class="mt-1">
                          <Switch
                              v-model="bwEnabled"
                              class="flex-shrink-0 m-auto group relative rounded-full inline-flex  items-center  h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span class="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                class="pointer-events-none absolute  w-full h-full rounded-md"
                            />
                            <span
                                aria-hidden="true"
                                :class="[
                                bwEnabled ? 'bg-secondary-button' : 'bg-gray-200',
                                'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200',
                              ]"
                            />
                            <span
                                aria-hidden="true"
                                :class="[
                                bwEnabled ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200',
                              ]"
                            />
                          </Switch>
                          <div
                              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                              v-if="formError"
                          >
                            <svg
                                class="w-5 h-5 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                              <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div class="sm:col-span-2 col-span-2 ">
                        <label
                            for="exerciseName"
                            class="block text-sm font-light text-primary-textSub"
                        >
                          Time
                        </label>
                        <div class="mt-1 justify-self-center">
                          <Switch
                              v-model="timeEnabled"
                              class="flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <span class="sr-only">Use setting</span>
                            <span
                                aria-hidden="true"
                                class="pointer-events-none absolute  w-full h-full rounded-md"
                            />
                            <span
                                aria-hidden="true"
                                :class="[
                                timeEnabled ? 'bg-secondary-button' : 'bg-gray-200',
                                'pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200',
                              ]"
                            />
                            <span
                                aria-hidden="true"
                                :class="[
                                timeEnabled ? 'translate-x-5' : 'translate-x-0',
                                'pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full bg-white shadow transform ring-0 transition-transform ease-in-out duration-200',
                              ]"
                            />
                          </Switch>
                          <div
                              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                              v-if="formError"
                          >
                            <svg
                                class="w-5 h-5 text-red-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                              <path
                                  fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="px-4 py-3 text-right sm:px-6 sm:relative"></div>
                    <div v-if="formError" class="p-4 rounded-md bg-red-50">
                      <div class="flex">
                        <div class="flex-shrink-0">
                          <svg
                              class="w-5 h-5 text-red-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                          >
                            <path
                                fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <div class="ml-3">
                          <h3 class="mb-0 text-sm font-medium text-red-800">
                            {{ formError }}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end p-6 space-x-2">
                  <button
                      type="button"
                      @click="closeCreateExerciseModal"
                      class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Cancel
                  </button>
                  <Button type="submit" :loading="loading">
                    <template #text>Save</template>
                    <template #loading-text>Saving...</template>
                  </Button>
                </div>
              </form>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup lang="ts">
import {ref, watch} from "vue";
import {Dialog, DialogOverlay, Switch, TransitionChild, TransitionRoot,} from "@headlessui/vue";
import Button from "../../components/Button.vue";
import {db} from "@/firebase/firebase.js";
import {addDoc, collection,} from "firebase/firestore";
import {ExerciseType} from '@/enums/ExerciseType'
import moment from "moment";
import {getAuth} from "firebase/auth";

const formError = ref("");

const loading = ref(false);
const user = ref();
const bwEnabled = ref(false);
const timeEnabled = ref(false);
const weightEnabled = ref(false);

const props = defineProps({
  createExerciseModalOpen: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});

watch(
    () => bwEnabled.value,
    (newValue) => {
      if (newValue) {
        timeEnabled.value = false;
        weightEnabled.value = false;
      }
    },
);

watch(
    () => timeEnabled.value,
    (newValue) => {
      if (newValue) {
        bwEnabled.value = false;
        weightEnabled.value = false;
      }
    },
);

watch(
    () => weightEnabled.value,
    (newValue) => {
      if (newValue) {
        bwEnabled.value = false;
        timeEnabled.value = false;
      }
    },
);

const emit = defineEmits(["closeCreateExerciseModal"]);

const formData = ref({
  exerciseName: "",
});

getAuth().onAuthStateChanged((u) => {
  user.value = u;
});

async function submit() {
  loading.value = true;
  if(!bwEnabled.value && !weightEnabled.value && !timeEnabled.value)
  {
    loading.value = false;
    formError.value =
        "An exercise type needs to be selected";
  }
  else
  {
    saveExercise();
  }


}

async function saveExercise() {
  const exercisesCollection = collection(db, "exercises");


  addDoc(exercisesCollection, {
    exerciseName: formData.value.exerciseName,
    createdByName: user.value.email,
    createdByUid: user.value.uid,
    createdDate: moment().format("DD-MM-YYYY HH:mm"),
    editedDate: '',
    timeStampCreated: new Date(),
    isBodyWeight: bwEnabled.value,
    isTime: timeEnabled.value,
    isWeight: weightEnabled.value
  })
      .then((result) => {
        closeCreateExerciseModal();
      })
      .catch((error) => {
        switch (error.code) {
          case "unauthenticated": {
            formError.value =
                "You are not authorized to perform the specified operation";
            break;
          }
          case "permission-denied": {
            formError.value =
                "You are not authorized to perform the specified operation";
            break;
          }
        }
      })
      .finally(() => {
        loading.value = false;
      });
}

function closeCreateExerciseModal() {
  formData.value = {
    exerciseName: "",
  };
  emit("closeCreateExerciseModal");
}
</script>
