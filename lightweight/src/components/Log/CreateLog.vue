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
                class="fixed inset-0 transition-opacity bg-bg-darkOffset bg-opacity-60"
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
                class="relative inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-bg dark:bg-bg-darkOffset shadow-xl sm:rounded-lg sm:my-8 sm:align-middle sm:max-w-sm sm:p-6 md:max-w-4xl"
            >
              <form
                  action="#"
                  @submit.prevent="submit"
                  class="h-full flex flex-col"
                  :class="{ 'pointer-events-none': loading }"
              >
                <div class="h-full">
                  <h2>Create log</h2>
                  <label
                      class="text-right text-sm font-light text-primary-textTitle pr-4"
                  >
                    {{ exercise.exerciseName }}
                  </label>
                  <div v-if="!exercise.isTime" class="space-y-6 sm:p-6">
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
                          <h3 class="mb-0 text-sm font-light text-red-800">
                            {{ formError }}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <h6
                        class="text-primary-textBody font-medium pt-4"
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
                        <Listbox as="div" v-model="set.reps">
                          <div class="relative">
                            <ListboxButton
                                class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-white sm:text-sm">
                              <span class="block truncate text-text">{{ set.reps }}</span>
                              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon class="h-5 w-5 text-black" aria-hidden="true"/>
                              </span>
                            </ListboxButton>
                            <transition leave-active-class="transition ease-in duration-100"
                                        leave-from-class="opacity-100" leave-to-class="opacity-0">
                              <ListboxOptions
                                  class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption as="template" v-for="amount in 200" :key="amount" :value="amount"
                                               v-slot="{ active, selected }">
                                  <li :class="[active ? 'text-text-dark bg-buttonPrimary' : 'text-text', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                        amount
                                      }}
                                    </span>
                                    <span v-if="selected"
                                          :class="[active ? 'text-white' : 'text-black', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                          <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                                    </span>
                                  </li>
                                </ListboxOption>
                              </ListboxOptions>
                            </transition>
                          </div>
                        </Listbox>
                      </div>
                      <div class="col-span-5">
                        <input
                            type="number"
                            step=".01"
                            :required="!exercise.isBodyWeight"
                            :placeholder="exercise.isBodyWeight ? 'Optional' : 'Required'"
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
                  <div v-else class="space-y-6 sm:p-6">
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
                          <h3 class="mb-0 text-sm font-light text-red-800">
                            {{ formError }}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <h6
                        class="text-primary-textBody font-medium pt-4"
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
                        >Time in seconds</label
                        >
                      </div>
                      <div class="col-span-4">
                        <label
                            class="block text-sm font-light text-primary-textSub"
                        >Weight (KG)</label
                        >
                      </div>
                    </div>
                    <!-- Toegevoegde sets -->
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
                        <input
                            type="number"
                            required
                            v-model="set.time"
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
                      <div class="col-span-5">
                        <input
                            type="number"
                            v-model="formData.setToAdd.weight"
                            step=".01"
                            placeholder="Optional"
                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                            :class="
                          formError
                            ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                        "
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-12">
                  <label for="comment"  class="block text-sm font-light text-primary-textSub">Remark</label>
                  <div class="mt-1">
                    <textarea placeholder="Optional" rows="2" v-model="formData.remark" class="block w-full border-gray-300 rounded-md text-text shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
                  </div>
                </div>
                <div v-if="!exercise.isTime" class="space-y-6 sm:p-6 py-4">
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
                      <Listbox horizontal as="div" v-model="formData.setToAdd.reps">
                        <div class="relative">
                          <ListboxButton
                              class="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm  focus:outline-none focus:ring-1 focus:ring-white sm:text-sm">
                            <span class="block truncate text-text">{{ formData.setToAdd.reps }}</span>
                            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon class="h-5 w-5 text-black" aria-hidden="true"/>
                              </span>
                          </ListboxButton>
                          <transition leave-active-class="transition ease-in duration-100"
                                      leave-from-class="opacity-100" leave-to-class="opacity-0"
                                    >
                            <ListboxOptions
                                class="absolute -top-2 transform -translate-y-full z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              <ListboxOption as="template" v-for="amount in 200" :key="amount" :value="amount"
                                             v-slot="{ active, selected }">
                                <li :class="[active ? 'text-text-dark bg-buttonPrimary' : 'text-text', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                    <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                                        amount
                                      }}
                                    </span>
                                  <span v-if="selected"
                                        :class="[active ? 'text-white' : 'text-black', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                                          <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                                    </span>
                                </li>
                              </ListboxOption>
                            </ListboxOptions>
                          </transition>
                        </div>
                      </Listbox>
                    </div>
                    <div class="col-span-5">
                      <input
                          type="number"
                          v-model="formData.setToAdd.weight"
                          step=".01"
                          :placeholder="exercise.isBodyWeight ? 'Optional' : 'Required'"
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
                          !exercise.isBodyWeight
                            ? !formData.setToAdd.reps > 0 ||
                              !formData.setToAdd.weight > 0
                            : !formData.setToAdd.reps > 0
                        "
                      >
                        <PlusSmIconOutline class="h-6 w-6" aria-hidden="true"/>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="space-y-6 sm:p-6 py-4">
                  <!-- Functionaliteit voor het toevoegen van een nieuw component -->
                  <!-- componenten headers -->
                  <h3 class="text-primary-textTitle font-light">New Set</h3>
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">
                      <label
                          class="block text-sm font-light text-primary-textSub"
                      >Time in seconds</label
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
                      <input
                          type="number"
                          v-model="formData.setToAdd.time"
                          placeholder="Required"
                          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                          :class="
                          formError
                            ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                        "
                      />
                    </div>
                    <div class="col-span-5">
                      <input
                          type="number"
                          v-model="formData.setToAdd.weight"
                          step=".01"
                          placeholder="Optional"
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
                          :disabled="!formData.setToAdd.time > 0"
                      >
                        <PlusSmIconOutline class="h-6 w-6" aria-hidden="true"/>
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
import {ref} from "vue";
import {
  Dialog,
  DialogOverlay,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  TransitionChild,
  TransitionRoot
} from "@headlessui/vue";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MinusIcon as MinusSmIconOutline,
  PlusSmallIcon as PlusSmIconOutline,
} from '@heroicons/vue/20/solid'
import Button from "../../components/Button.vue";
import {db} from "@/firebase/firebase.js";
import {addDoc, arrayUnion, collection, doc, updateDoc} from "firebase/firestore";

import moment from "moment";
import {getAuth} from "firebase/auth";
import {createToaster} from "@meforma/vue-toaster";

const formError = ref("");
const toaster = createToaster({
  position: 'top', duration:
      5000
});

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
    default: () => {
    },
  },
});

const emit = defineEmits(["closeCreateLogModal"]);

const formData = ref({
  sets: [],
  remark: '',
  setToAdd: {
    reps: "1",
    weight: "",
    time: ""
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

  if (props.exercise.isWeight) {
    var oneRM = 0;

    for (var set of formData.value.sets) {
      const oneRMCalculated = set.weight * (36 / (37 - set.reps));

      if (oneRMCalculated > oneRM) {
        oneRM = oneRMCalculated;
      }
    }
  } else if (props.exercise.isBodyWeight) {
    var hR = 0;
    for (var set of formData.value.sets) {
      if (set.reps > hR) {
        hR = set.reps;
      }
    }
  } else if (props.exercise.isTime) {
    var hT = 0;
    for (var set of formData.value.sets) {
      if (set.time > hT) {
        hT = set.time;
      }
    }
  }
  addDoc(logsCollection, {
    sets: formData.value.sets,
    remark: formData.value.remark,
    createdByName: user.value.email,
    createdByUid: user.value.uid,
    createdDate: moment().format("DD-MM-YYYY HH:mm"),
    timeStampCreated: new Date(),
  })
      .then((result) => {
        if (props.exercise.isWeight) {
          if (props.exercise.exerciseEstimatedMax != undefined) {
            if (oneRM > props.exercise.exerciseEstimatedMax[props.exercise.exerciseEstimatedMax.length - 1]) {
              updateDoc(doc(db, "exercises", props.exerciseID), {
                exerciseEstimatedMax: arrayUnion(oneRM.toFixed(1)),
                exerciseEstimatedMaxDate: arrayUnion(moment().format("DD-MM-YYYY HH:mm:ss")),
                editedDate: moment().format("DD-MM-YYYY HH:mm"),
              })
                  .then((result) => {
                    toaster.show(`New record! 1RM ${oneRM.toFixed(1)} KG `);
                    closeCreateLogModal();
                  })
            } else {
              updateDoc(doc(db, "exercises", props.exerciseID), {
                editedDate: moment().format("DD-MM-YYYY HH:mm"),
              })
                  .then((result) => {
                    closeCreateLogModal();
                  })
            }
          } else {
            updateDoc(doc(db, "exercises", props.exerciseID), {
              exerciseEstimatedMax: arrayUnion(oneRM.toFixed(1)),
              exerciseEstimatedMaxDate: arrayUnion(moment().format("DD-MM-YYYY HH:mm:ss")),
              editedDate: moment().format("DD-MM-YYYY HH:mm"),
            })
                .then((result) => {
                  toaster.show(`New record! 1RM ${oneRM.toFixed(1)} KG `);
                  closeCreateLogModal();
                })
          }
        } else if (props.exercise.isBodyWeight) {
          if (props.exercise.exerciseHighestReps != undefined) {
            if (hR > props.exercise.exerciseHighestReps[props.exercise.exerciseHighestReps.length - 1]) {
              updateDoc(doc(db, "exercises", props.exerciseID), {
                exerciseHighestReps: arrayUnion(hR),
                exerciseEstimatedHighestRepsDate: arrayUnion(moment().format("DD-MM-YYYY HH:mm:ss")),
                editedDate: moment().format("DD-MM-YYYY HH:mm"),
              })
                  .then((result) => {
                    toaster.show(`New record! HR is now ${hR}`);
                    closeCreateLogModal();
                  })
            } else {
              updateDoc(doc(db, "exercises", props.exerciseID), {
                editedDate: moment().format("DD-MM-YYYY HH:mm"),
              })
                  .then((result) => {
                    closeCreateLogModal();
                  })
            }

          } else {
            updateDoc(doc(db, "exercises", props.exerciseID), {
              exerciseHighestReps: arrayUnion(hR),
              exerciseEstimatedHighestRepsDate: arrayUnion(moment().format("DD-MM-YYYY HH:mm:ss")),
              editedDate: moment().format("DD-MM-YYYY HH:mm"),
            })
                .then((result) => {
                  toaster.show(`New record! HR is now ${hR}`);
                  closeCreateLogModal();
                })

          }
        } else if (props.exercise.isTime) {
          if (props.exercise.exerciseHighestTime != undefined) {
            if (hT > props.exercise.exerciseHighestTime[props.exercise.exerciseHighestTime.length - 1]) {
              updateDoc(doc(db, "exercises", props.exerciseID), {
                exerciseHighestTime: arrayUnion(hT),
                exerciseEstimatedHighestTimeDate: arrayUnion(moment().format("DD-MM-YYYY HH:mm:ss")),
                editedDate: moment().format("DD-MM-YYYY HH:mm"),
              })
                  .then((result) => {
                    toaster.show(`New record! HT is now ${hT} seconds`);
                    closeCreateLogModal();
                  })
            } else {
              updateDoc(doc(db, "exercises", props.exerciseID), {
                editedDate: moment().format("DD-MM-YYYY HH:mm"),
              })
                  .then((result) => {
                    closeCreateLogModal();
                  })
            }
          } else {
            updateDoc(doc(db, "exercises", props.exerciseID), {
              exerciseHighestTime: arrayUnion(hT),
              exerciseEstimatedHighestTimeDate: arrayUnion(moment().format("DD-MM-YYYY HH:mm:ss")),
              editedDate: moment().format("DD-MM-YYYY HH:mm"),
            })
                .then((result) => {
                  toaster.show(`New record! HT is now ${hT} seconds`);
                  closeCreateLogModal();
                })
          }
        } else {
          closeCreateLogModal();
        }
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
  let newSet;

  if (formData.value.setToAdd.weight % 1 != 0) {
    formData.value.setToAdd.weight = parseFloat(
        formData.value.setToAdd.weight
    ).toFixed(2);
  }

  if (props.exercise.isTime) {
    if (formData.value.setToAdd.time % 1 != 0) {
      formData.value.setToAdd.time = Math.round(
          formData.value.setToAdd.time
      );
    }
    newSet = {
      time: formData.value.setToAdd.time,
      weight: formData.value.setToAdd.weight
    }
  } else {

    newSet = {
      reps: formData.value.setToAdd.reps,
      weight: formData.value.setToAdd.weight,
    };
  }
  formData.value.sets.push(newSet);
}

function removeAddedSet(index) {
  formData.value.sets.splice(index, 1);
}

function closeCreateLogModal() {
  formData.value = {
    sets: [],
    remark: '',
    setToAdd: {
      reps: '1',
      weight: '',
      time: ''
    },
  };
  formError.value = "";

  emit("closeCreateLogModal");
}
</script>

<style>
.c-toast {
  margin-top: 6em !important;
  background-color: #E31C25 !important;
  color: #FFFFFF !important;
}
</style>
