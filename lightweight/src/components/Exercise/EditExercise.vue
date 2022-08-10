<template>
  <div>
    <TransitionRoot :show="editExerciseModalOpen" as="template">
      <Dialog
          as="div"
          class="fixed inset-0 z-20 overflow-y-auto"
          @close="closeEditExerciseModal()"
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
              aria-hidden="true"
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
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
                  :class="{ 'pointer-events-none': loading }"
                  action="#"
                  class="h-full flex flex-col"
                  @submit.prevent="submit"
              >
                <div class="h-full">
                  <h2 class="text-3xl font-light text-primary truncate">
                    Edit {{ exercise.exerciseName }}
                  </h2>
                  <div class="space-y-6 sm:p-6">
                    <h3 class="text-primary-textTitle font-light">
                      Basic Information
                    </h3>
                    <div
                        class="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6">
                        <label
                            class="block text-sm font-light text-primary-textSub"
                            for="exerciseName"
                        >
                          Name
                        </label>
                        <div class="mt-1">
                          <input
                              id="description"
                              v-model="formData.exerciseName"
                              :aria-invalid="formError"
                              :class="
                              formError
                                ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                            "
                              aria-describedby="description-error"
                              class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                              name="description"
                              type="text"
                          />
                          <div
                              v-if="formError"
                              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                          >
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5 text-red-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                  clip-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                  fill-rule="evenodd"
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
                              aria-hidden="true"
                              class="w-5 h-5 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                                clip-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                fill-rule="evenodd"
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
                      class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      type="button"
                      @click="closeEditExerciseModal"
                  >
                    Cancel
                  </button>
                  <Button :loading="loading" type="submit">
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
<script lang="ts" setup>
import {ref, watch} from "vue";
import {Dialog, DialogOverlay, TransitionChild, TransitionRoot,} from "@headlessui/vue";

import Button from "../../components/Button.vue";
import {db} from "@/firebase/firebase.js";
import {collection, doc, updateDoc} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const formError = ref("");

const loading = ref(false);
const user = ref();
const bwEnabled = ref(false);

const props = defineProps({
  editExerciseModalOpen: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  exercise: {
    type: Object,
    required: true,
    default: () => {
    },
  }
});

watch(
    () => props.exercise,
    (newValue) => {
      if (newValue.exerciseName) {
        openEditExercise();
      }
    }
);

const emit = defineEmits(["closeEditExerciseModal"]);

const formData = ref({
  exerciseName: "",
});

function openEditExercise() {
  formData.value.exerciseName = props.exercise.exerciseName;
}

getAuth().onAuthStateChanged((u) => {
  user.value = u;
});

async function submit() {
  loading.value = true;
  saveExercise();
}

async function saveExercise() {
  const exercisesCollection = collection(db, "exercises");

  updateDoc(doc(
      db,
      'exercises',
      props.exercise.id,
  ), {
    exerciseName: formData.value.exerciseName
  })
      .then((result) => {
        closeEditExerciseModal();
      })
      .catch((error) => {
        switch (error.code) {
          case "unauthenticated": {
            formError.value =
                "U bent niet gemachtigd om de opgegeven bewerking uit te voeren";
            break;
          }
          case "permission-denied": {
            formError.value =
                "U bent niet gemachtigd om de opgegeven bewerking uit te voeren";
            break;
          }
        }
      })
      .finally(() => {
        loading.value = false;
      });
}

function closeEditExerciseModal() {
  emit("closeEditExerciseModal");
}
</script>
