<template>
  <div>
    <TransitionRoot as="template" :show="createLogModalOpen">
      <Dialog
        as="div"
        class="fixed inset-0 z-20 overflow-y-auto"
        @close="closeCreateLogModal()"
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
                  <h2 class="text-3xl font-light text-primary">Create log</h2>
                  <div class="space-y-6 sm:p-6">
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
                    <h6
                      class="text-primary-textTitle font-light"
                      v-if="formData.sets.length > 0"
                    >
                      All sets
                    </h6>
                    <!-- sets headers -->
                    <div
                      class="grid grid-cols-12 gap-4"
                      v-if="formData.sets.length > 0"
                    >
                      <div class="col-span-1"></div>
                      <div class="col-span-2 text-center">
                        <label
                          class="block text-sm font-light text-primary-textSub"
                          >Set</label
                        >
                      </div>
                      <div class="col-span-4">
                        <label
                          class="block text-sm font-light text-primary-textSub"
                          >Reps</label
                        >
                      </div>
                      <div class="col-span-4">
                        <label
                          class="block text-sm font-light text-primary-textSub"
                          >Weight (KG)</label
                        >
                      </div>
                    </div>
                    <!-- Toegevoegde componenten met een match (addedComponents) -->
                    <div
                      class="grid grid-cols-12 gap-4"
                      v-for="(set, index) in formData.sets"
                      :key="index"
                      :value="set"
                    >
                      <div class="relative col-span-1">
                        <button
                          type="button"
                          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-transparent rounded-full shadow-sm text-secondary-textBody bg-buttonPrimary hover:bg-buttonPrimary-hover"
                          @click="removeAddedSet(index, false)"
                        >
                          <MinusSmIconOutline
                            class="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      <div class="col-span-2 self-center text-center">
                        <label class="text-sm font-light text-primary-textSub">
                          {{ index + 1 }}
                        </label>
                      </div>
                      <div class="col-span-4">
                        <select
                          required
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-200"
                          v-model="set.reps"
                        >
                          <option value="" disabled hidden>
                            Select an amount
                          </option>
                          <option
                            v-for="amount in 200"
                            :key="amount"
                            :value="amount"
                          >
                            {{ amount }}
                          </option>
                        </select>
                      </div>
                      <div class="col-span-5">
                        <input
                          type="number"
                          name="description"
                          id="description"
                          step=".01"
                          required
                          v-model="set.weight"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm required"
                          :class="
                            formError
                              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                          "
                          :aria-invalid="formError"
                          aria-describedby="description-error"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-6 sm:p-6 py-4">
                  <!-- Functionaliteit voor het toevoegen van een nieuw component -->
                  <!-- componenten headers -->
                  <h3 class="text-primary-textTitle font-light">New Set</h3>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">
                      <label
                        class="block text-sm font-light text-primary-textSub"
                        >Reps</label
                      >
                    </div>
                    <div class="col-span-4">
                      <label
                        class="block text-sm font-light text-primary-textSub"
                        >Weight (KG)</label
                      >
                    </div>
                  </div>

                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">
                      <select
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-200"
                        v-model="formData.setToAdd.reps"
                      >
                        <option value="" disabled hidden>
                          Select an amount
                        </option>
                        <option
                          v-for="amount in 100"
                          :key="amount"
                          :value="amount"
                        >
                          {{ amount }}
                        </option>
                      </select>
                    </div>
                    <div class="col-span-5">
                      <input
                        type="number"
                        name="description"
                        id="description"
                        v-model="formData.setToAdd.weight"
                        step=".01"
                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                        :class="
                          formError
                            ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                        "
                      />
                    </div>
                    <div class="relative col-span-2">
                      <button
                        @click="addNewSet()"
                        type="button"
                        class="absolute top-1/2 left-1/2 p-2 disabled:bg-primary transform -translate-x-1/2 -translate-y-1/2 border border-transparent rounded-full shadow-sm text-secondary-textBody bg-buttonPrimary hover:bg-buttonPrimary-hover"
                        :disabled="
                          !formData.setToAdd.reps > 0 ||
                          !formData.setToAdd.weight > 0
                        "
                      >
                        <PlusSmIconOutline class="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end p-6 space-x-2">
                  <button
                    type="button"
                    @click="closeCreateLogModal"
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
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import {
  PlusSmIcon as PlusSmIconOutline,
  MinusSmIcon as MinusSmIconOutline,
} from "@heroicons/vue/outline";
import {
  CheckIcon,
  SelectorIcon,
  PencilAltIcon,
  TrashIcon,
  XIcon,
  MinusIcon,
  PlusIcon,
  QrcodeIcon,
  PhotographIcon,
} from "@heroicons/vue/outline";
import Button from "../../components/Button.vue";
import { db } from "@/firebase/firebase.js";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  query,
  orderBy,
  increment,
  deleteDoc,
  setDoc,
  getDocsFromCache,
} from "firebase/firestore";

import moment from "moment";
import { getAuth } from "firebase/auth";

const formError = ref("");

const loading = ref(false);
const user = ref();

const props = defineProps({
  createLogModalOpen: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  exerciseID: {
    type: String,
    required: true,
    default: () => "",
  },
  exercise: {
    type: Object,
    required: true,
    default: () => {},
  },
});

const emit = defineEmits(["closeCreateLogModal"]);

const formData = ref({
  sets: [],
  setToAdd: {
    reps: "",
    weight: "",
  },
});

getAuth().onAuthStateChanged((u) => {
  user.value = u;
});

async function submit() {
  loading.value = true;
  if (formData.value.sets.length > 0) {
    saveExercise();
  } else {
    formError.value = "Atleast one set needs to be added to save a new log";
    loading.value = false;
  }
}

async function saveExercise() {
  const logsCollection = collection(db, "exercises", props.exerciseID, "logs");

  var oneRM = 0;

  for (var set of formData.value.sets) {
    const oneRMCalculated = set.weight * (36 / (37 - set.reps));

    if (oneRMCalculated > oneRM) {
      oneRM = oneRMCalculated;
    }
  }

  addDoc(logsCollection, {
    sets: formData.value.sets,
    createdByName: user.value.email,
    createdByUid: user.value.uid,
    createdDate: moment().format("DD-MM-YYYY HH:mm"),
    timeStampCreated: new Date(),
  })
    .then((result) => {
      if (oneRM > props.exercise.exerciseEstimatedMax) {
        return updateDoc(doc(db, "exercises", props.exerciseID), {
          exerciseEstimatedMax: oneRM.toFixed(1),
        });
      } else {
        closeCreateLogModal();
      }
    })
    .then((result) => {
      closeCreateLogModal();
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

function addNewSet() {
  if (formData.value.setToAdd.weight % 1 != 0) {
    formData.value.setToAdd.weight = parseFloat(
      formData.value.setToAdd.weight
    ).toFixed(2);
  }

  let newSet = {
    reps: formData.value.setToAdd.reps,
    weight: formData.value.setToAdd.weight,
  };
  formData.value.sets.push(newSet);
}

function removeAddedSet(index) {
  formData.value.sets.splice(index, 1);
}
function closeCreateLogModal() {
  formData.value = {
    sets: [],
    setToAdd: {
      reps: "",
      weight: "",
    },
  };
  formError.value = "";

  emit("closeCreateLogModal");
}
</script>
