<template>
  <div class="flex min-h-full">
    <div
        class="relative flex flex-col justify-center flex-1 px-4 "
    >
      <div class="w-full max-w-sm mx-auto lg:w-96 dark:bg-bg-darkOffset rounded-lg p-8">
        <div>
          <h2 class="mt-6 text-center">
            Lightweight
          </h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <TabGroup :selectedIndex="selectedTab">
              <TabList class="hidden">
                <Tab v-slot="{ selected }" as="div"> Inloggen</Tab>
                <Tab v-slot="{ selected }" as="div"> Wachtwoord resetten</Tab>
              </TabList>

              <TabPanels class="mt-2">
                <TabPanel>
                  <form action="#" class="space-y-6" @submit.prevent="submit">
                    <div>
                      <label
                          class="block"
                          for="email"
                      >Email</label
                      >
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                            id="email"
                            v-model="formData.email"
                            :aria-invalid="formError"
                            :class="
                            formError
                              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                          "
                            aria-describedby="email-error"
                            class="block w-full p-1 border rounded-md shadow-sm appearance-none sm:text-sm focus:outline-none text-secondary-textBody"
                            name="email"
                            placeholder=""
                            required
                            type="email"
                            @focus="formError = ''"
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

                    <div>
                      <label
                          class="block"
                          for="password"
                      >Password</label
                      >
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                            id="password"
                            v-model="formData.password"
                            :aria-invalid="formError"
                            :class="
                            formError
                              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                          "
                            aria-describedby="password-error"
                            class="block w-full p-1 border rounded-md shadow-sm appearance-none sm:text-sm focus:outline-none  text-secondary-textBody"
                            name="password"
                            placeholder=""
                            required
                            type="password"
                            @focus="formError = ''"
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
                    <div>
                      <Button :loading="loading">
                        <template #text>Sign in</template>
                        <template #loading-text>Signing in...</template>
                      </Button>
                    </div>
                  </form>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {getAuth, signInWithEmailAndPassword,} from 'firebase/auth';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import Button from '../components/Button.vue';
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/vue';

const router = useRouter();
const loading = ref(false);
const selectedTab = ref(0);

const formData = ref({
  email: '',
  password: '',
});

const formError = ref('');

function submit() {
  loading.value = true;

  const auth = getAuth();

  signInWithEmailAndPassword(
      auth,
      formData.value.email,
      formData.value.password
  )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.replace({name: 'exercises'});
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/wrong-password':
          case 'auth/user-not-found': {
            formError.value = 'Verkeerd e-mailadres of wachtwoord';
            break;
          }
          case 'auth/user-disabled':
          case 'user-disabled': {
            formError.value = 'Dit account is uitgeschakeld';
            break;
          }
        }
      })
      .finally(() => {
        loading.value = false;
      });
}

function changeTab(index) {
  selectedTab.value = index;
}

</script>
