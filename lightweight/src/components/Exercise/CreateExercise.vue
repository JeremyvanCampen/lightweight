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
              class="fixed inset-0 transition-opacity bg-primary-darker bg-opacity-75"
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
              class="relative inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-primary-dark shadow-xl sm:rounded-lg sm:my-8 sm:align-middle sm:max-w-sm sm:p-6 md:max-w-4xl"
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
                      class="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                      <div class="sm:col-span-6">
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
                            v-model="formData.name"
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
import { db, storage } from "@/firebase/firebase.js";
import Button from "../../components/Button.vue";
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
import {
  getDownloadURL,
  ref as firebaseRef,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import moment from "moment";
import { getAuth } from "firebase/auth";

const formError = ref("");

const loading = ref(false);
const user = ref();

const props = defineProps({
  createExerciseModalOpen: {
    type: Boolean,
    required: false,
    default: () => false,
  },
});

const emit = defineEmits(["closeCreateExerciseModal"]);

const formData = ref({
  name: "",
});

getAuth().onAuthStateChanged((u) => {
  user.value = u;
});

async function submit() {
  loading.value = true;
  saveExercise();
}

async function saveExercise() {
  //todo saving
  loading.value = false;

  closeCreateExerciseModal();
}

function closeCreateExerciseModal() {
  formData.value = {
    name: "",
  };
  emit("closeCreateExerciseModal");
}
</script>
