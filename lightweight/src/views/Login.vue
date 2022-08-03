<template>
  <div class="flex min-h-full bg-primary-darker text-primary-textBody text-base font-medium">
    <div
      class="relative flex flex-col justify-center flex-1 px-4 py-12"
    >
      <div
        class="flex justify-center"
      >
        <img
          class="w-auto h-12 lg:h-20"
          src="../assets/images/Lightweight.png"
          alt="Lightweight"
        />
      </div>
      <div class="w-full max-w-sm mx-auto mt-12 lg:w-96 lg:mt-20 bg-primary-dark rounded-lg p-4">
        <div>
          <h2 class="mt-6 text-3xl font-extrabold text-primary">
            My Lightweight
          </h2>
        </div>

        <div class="mt-8">
          <div class="mt-6">
            <TabGroup :selectedIndex="selectedTab">
              <TabList class="hidden">
                <Tab as="div" v-slot="{ selected }"> Inloggen </Tab>
                <Tab as="div" v-slot="{ selected }"> Wachtwoord resetten </Tab>
              </TabList>

              <TabPanels class="mt-2">
                <TabPanel>
                  <form action="#" @submit.prevent="submit" class="space-y-6">
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-primary"
                        >Email</label
                      >
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          @focus="formError = ''"
                          v-model="formData.email"
                          required
                          class="block w-full pr-10 border rounded-md shadow-sm appearance-none sm:text-sm focus:outline-none"
                          :class="
                            formError
                              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                          "
                          placeholder=""
                          :aria-invalid="formError"
                          aria-describedby="email-error"
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

                    <div>
                      <label
                        for="password"
                        class="block text-sm font-medium text-primary"
                        >Password</label
                      >
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          @focus="formError = ''"
                          v-model="formData.password"
                          required
                          class="block w-full pr-10 border rounded-md shadow-sm appearance-none sm:text-sm focus:outline-none"
                          :class="
                            formError
                              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                          "
                          placeholder=""
                          :aria-invalid="formError"
                          aria-describedby="password-error"
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

                  

                    <div>
                      <Button :loading="loading">
                        <template #text>Sign in</template>
                        <template #loading-text>Inloggen...</template>
                      </Button>
                    </div>
                  </form>
                </TabPanel>
                <TabPanel>
                  <form
                    action="#"
                    @submit.prevent="resetPassword"
                    class="space-y-6"
                  >
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >E-mailadres</label
                      >
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          @focus="formError = ''"
                          v-model="formData.email"
                          required
                          class="block w-full pr-10 border rounded-md shadow-sm appearance-none sm:text-sm focus:outline-none"
                          :class="
                            formError
                              ? 'text-red-900 placeholder-red-300 border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'placeholder-gray-400 border-gray-300 focus:ring-primary focus:border-primary'
                          "
                          placeholder=""
                          :aria-invalid="formError"
                          aria-describedby="email-error"
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
                    <div class="flex items-center justify-end">
                      <div class="text-sm">
                        <a
                          @click="changeTab(0)"
                          href="#"
                          class="font-medium text-primary hover:text-primary-dark"
                        >
                          Terug naar login
                        </a>
                      </div>
                    </div>

                    <div>
                      <Button :loading="loading">
                        <template #text>Reset wachtwoord</template>
                        <template #loading-text>Resetten...</template>
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
  import {
    getAuth,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
  } from 'firebase/auth';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Button from '../components/Button.vue';
  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

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
        router.replace({ name: 'dashboard' });
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
