<template>
  <div
    class="min-h-full bg-bg dark:bg-bg-dark text-primary-textBody text-base font-medium tracking-tight"
  >
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 z-40 flex xl:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative flex flex-col flex-1  w-full max-w-xs bg-bg dark:bg-bg-darkOffset justify-between"
          >
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 pt-2 -mr-12">
                <button
                  type="button"
                  class="flex items-center justify-center w-10 h-10 ml-1 rounded-full"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="w-8 h-8 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex justify-center pt-4">
              <h2 class="font-bold">
                Lightweight
              </h2>
            </div>
            <nav
              class="flex-shrink-0 h-full pt-5 pb-4 mt-5 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div class="px-2 space-y-1">
                <div v-for="item in navigation" :key="item.name">
                  <router-link
                    v-if="!item.children"
                    :to="item.href"
                    :key="item.name"
                    custom
                    v-slot="{ navigate, href, isActive }"
                  >
                    <a
                      :href="href"
                      :class="[
                        isActive
                       ? 'bg-buttonPrimary text-text-dark dark:bg-bg-dark dark:text-text-dark'
                      : 'text-text dark:text-text-dark hover:bg-bg-dark',
                        'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                      ]"
                      @click="navigate"
                      :aria-current="isActive ? 'page' : undefined"
                    >
                      <component
                        :is="item.icon"
                        class="flex-shrink-0 w-6 h-6 mr-4"
                        :class="[
                          isActive
                           ? 'text-text-dark'
                        : 'text-text dark:text-text-dark ',
                        ]"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </a>
                  </router-link>
                  <Disclosure as="div" v-else>
                    <DisclosureButton
                      :class="[
                        'group flex w-full items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-secondary',
                      ]"
                    >
                      <component
                        :is="item.icon"
                        class="flex-shrink-0 w-6 h-6 mr-4"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </DisclosureButton>
                    <DisclosurePanel>
                      <router-link
                        v-for="subItem in item.children"
                        :to="subItem.href"
                        :key="subItem.name"
                        custom
                        v-slot="{ navigate, href, isActive }"
                      >
                        <a
                          :href="href"
                          :class="[
                            isActive
                              ? 'bg-bg-600 text-white'
                              : 'text-secondary hover:bg-bg hover:text-white',
                            'group flex items-center  pl-12 px-2 py-2 text-sm leading-6 font-medium rounded-md',
                          ]"
                          @click="navigate"
                          :aria-current="isActive ? 'page' : undefined"
                        >
                          {{ subItem.name }}
                        </a>
                      </router-link>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </div>
              <div class="absolute bottom-3 flex w-full justify-center">
                <dark-mode></dark-mode>
              </div>
            </nav>

          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">

          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden xl:flex xl:w-64 xl:flex-col xl:fixed xl:inset-y-0 shadow">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow overflow-y-auto bg-bg dark:bg-bg-darkOffset">
        <div class="flex justify-center pt-4">
          <h2>
            Lightweight
          </h2>
        </div>
        <nav
          class="flex flex-col flex-1 pt-5 pb-4 mt-5 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div class="px-2 space-y-1">
            <div v-for="item in navigation" :key="item.name">
              <router-link
                v-if="!item.children"
                :to="item.href"
                :key="item.name"
                custom
                v-slot="{ navigate, href, isActive }"
              >
                <a
                  :href="href"
                  :class="[
                   isActive
                        ? 'bg-buttonPrimary text-text-dark dark:bg-bg-dark dark:text-text-dark'
                      : 'text-text dark:text-text-dark hover:bg-bg-dark',
                        'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                      ]"
                  @click="navigate"
                  :aria-current="isActive ? 'page' : undefined"
                >
                  <component
                    :is="item.icon"
                    class="flex-shrink-0 w-6 h-6 mr-4"
                    :class="[
                      isActive
                        ? 'text-primary-textBody'
                        : 'text-primary-textBody ',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </a>
              </router-link>
              <Disclosure as="div" v-else>
                <DisclosureButton
                  :class="[
                    'group flex w-full items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-secondary',
                  ]"
                >
                  <component
                    :is="item.icon"
                    class="flex-shrink-0 w-6 h-6 mr-4"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </DisclosureButton>
                <DisclosurePanel>
                  <router-link
                    v-for="subItem in item.children"
                    :to="subItem.href"
                    :key="subItem.name"
                    custom
                    v-slot="{ navigate, href, isActive }"
                  >
                    <a
                      :href="href"
                      :class="[
                        isActive
                           ? 'bg-bg-600 text-primary-textBody'
                      : 'text-primary-textBody hover:bg-bg-400',
                        'group flex items-center  pl-12 px-2 py-2 text-sm leading-6 font-medium rounded-md',
                      ]"
                      @click="navigate"
                      :aria-current="isActive ? 'page' : undefined"
                    >
                      {{ subItem.name }}
                    </a>
                  </router-link>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </div>
          <div class="absolute bottom-3 flex w-full justify-center">
            <dark-mode></dark-mode>
          </div>
        </nav>
      </div>
    </div>

    <div class="min-h-full">
      <div class="flex flex-col flex-1 h-screen xl:pl-64">
        <div
          class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-bg dark:bg-bg-darkOffset shadow"
        >
          <button
            type="button"
            class="px-4 xl:hidden"
            @click="sidebarOpen = true"
          >
            <span class="sr-only">Open sidebar</span>
            <MenuAlt2Icon class="h-6 w-6 text-text dark:text-text-dark" aria-hidden="true" />
          </button>
          <div class="flex-1 px-4 flex justify-between">
            <div class="flex-1 flex">
    
                <label for="search-field" class="sr-only">Search</label>
                <div
                  class="relative w-full bg-bg dark:bg-bg-darkOffset"
                >
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pointer-events-none"
                  >
                    <SearchIcon
                      class="h-5 w-5 text-text dark:text-text-dark"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    id="search-field"
                    class="block w-full h-full pl-8 pr-3 py-2 border-transparent bg-bg dark:bg-bg-darkOffset text-text dark:text-text-dark placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                    placeholder="Search"
                    type="search"
                    name="search"
                    v-model="globalState.searchTerm"
                  />
                </div>
           
            </div>
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative" v-if="user">
                <div>
                  <MenuButton
                    class="flex items-center max-w-xs text-sm rounded-full lg:p-2 lg:rounded-md"
                  >
                    <img
                      v-if="user.photoURL"
                      class="w-8 h-8 rounded-full"
                      :src="user.photoURL"
                      :alt="user.displayName"
                    />
                    <div
                      v-else
                      class="flex items-center justify-center w-8 h-8 text-text font-bold uppercase bg-buttonSecondary  dark:bg-buttonPrimary-dark rounded-full"
                    >
                      {{ user.email.substring(0, 1) }}
                    </div>
                    <span
                      class="hidden ml-3 text-text dark:text-text-dark lg:block"
                    >
                      <span class="sr-only">Open menu voor </span
                      >{{ user.displayName || user.email }}</span
                    >
                    <ChevronDownIcon
                      class="flex-shrink-0 hidden w-5 h-5 ml-1 text-text dark:text-text-dark  lg:block"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-buttonSecondary dark:bg-buttonPrimary-dark rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    <MenuItem v-slot="{ active }">
                      <a
                        href="#"
                        @click="logOut"
                        :class="[
                          active ? '' : '',
                          'block px-4 py-2 text-sm text-secondary-textBody font-medium',
                        ]"
                        >Sign out</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
        <div class="flex flex-col h-fit bg-bg-600">
          <Transition
            enter-from-class="opacity-0"
            enter-active-class="transition-opacity duration-300 ease-in-out"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-active-class="transition-opacity duration-300 ease-in-out"
            leave-to-class="opacity-0"
            mode="out-in"
          >
            <slot />
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/vue";

import { HomeIcon, XCircleIcon as XIcon, Bars2Icon as MenuAlt2Icon,MagnifyingGlassIcon as SearchIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import { getAuth, signOut } from "firebase/auth";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useUiStateComposable } from "@/composables/uistate-composable";
import { useRouter, useRoute } from "vue-router";
import DarkMode from "@/components/DarkMode";

const { globalState } = useUiStateComposable();
const sidebarOpen = ref(false);
const navigation = ref([
  { name: "Exercises", href: "/exercises", icon: HomeIcon },
]);
const user = ref();
const loggedIn = ref(false);
const router = useRouter();

getAuth().onAuthStateChanged((u) => {
  user.value = u;
});
function logOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.s
      router.push("/login");
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
