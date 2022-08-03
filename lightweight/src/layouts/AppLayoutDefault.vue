<template>
  <div class="min-h-full  bg-primary-darker text-primary-textBody text-base font-medium tracking-tight">
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
          <div class="relative flex flex-col flex-1 w-full max-w-xs bg-primary-dark">
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
                  class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex justify-center">
              <img
                class="w-auto h-12 lg:h-20 pt-2 "
                src="../assets/images/Lightweight.png"
                alt="Lightweight"
              />
            </div>
            <nav
              class="flex-shrink-0 h-full pt-5 pb-4 mt-5 overflow-y-auto divide-y divide-primary-dark"
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
                          ? 'bg-primary-darker text-white'
                          : 'text-secondary hover:bg-primary-dark hover:text-white',
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
                            ? 'text-white'
                            : 'text-secondary group-hover:text-white',
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
                              ? 'bg-primary-darker text-white'
                              : 'text-secondary hover:bg-primary-dark hover:text-white',
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
            </nav>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden xl:flex xl:w-64 xl:flex-col xl:fixed xl:inset-y-0">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-grow overflow-y-auto bg-primary-dark">
        <div class="flex justify-center">
          <img
            class="w-auto h-12 px-2 pt-2 lg:h-20"
            src="../assets/images/Lightweight.png"
            alt="Lightweight"
          />
        </div>
        <nav
          class="flex flex-col flex-1 pt-5 pb-4 mt-5 overflow-y-auto divide-y divide-primary-dark"
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
                      ? 'bg-primary-darker text-white'
                      : 'text-secondary hover:bg-primary-dark hover:text-white',
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
                        ? 'text-white'
                        : 'text-secondary group-hover:text-white',
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
                          ? 'bg-primary-darker text-white'
                          : 'text-secondary hover:bg-primary-dark hover:text-white',
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
        </nav>
      </div>
    </div>

    <div class="min-h-full">
      <div class="flex flex-col flex-1 h-screen xl:pl-64">
        <div
          class="stickyz-20 p-8 flex flex-shrink-0 h-16 bg-primary-dark  lg:border-none"
        >
          <button
            type="button"
            class="px-4 text-gray-400 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light xl:hidden"
            @click="sidebarOpen = true"
          >
            <span class="sr-only">Open sidebar</span>
            <MenuAlt1Icon class="w-6 h-6" aria-hidden="true" />
          </button>
          <!-- Header bar -->
          <div
            class="flex items-center flex-1 gap-4 px-4 mx-auto md:justify-end sm:px-6 lg:px-8 max-w-screen-2xl md:gap-6"
          >
            <div class="w-full max-w-lg lg:max-w-xs"></div>
            <div
              class="flex items-center gap-2"
              :class="{ 'hidden sm:flex': globalState.searchBarExpanded }"
            >
              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3" v-if="user">
                <div>
                  <MenuButton
                    class="flex items-center max-w-xs text-sm bg-primary rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white lg:p-2 lg:rounded-md "
                  >
                    <img
                      v-if="user.photoURL"
                      class="w-8 h-8 rounded-full"
                      :src="user.photoURL"
                      :alt="user.displayName"
                    />
                    <div
                      v-else
                      class="flex items-center justify-center w-8 h-8 text-secondary-textBody font-bold uppercase bg-gray-300 rounded-full"
                    >
                      {{ user.email.substring(0, 1) }}
                    </div>
                    <span
                      class="hidden ml-3 text-sm text-secondary-textBody font-medium lg:block"
                    >
                      <span class="sr-only">Open menu voor </span
                      >{{ user.displayName || user.email }}</span
                    >
                    <ChevronDownIcon
                      class="flex-shrink-0 hidden w-5 h-5 ml-1 text-secondary-textBody lg:block"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <MenuItems
                    class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-primary rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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

        <div class="flex flex-col h-full">
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
import {
  CogIcon,
  FolderIcon,
  UserGroupIcon,
  UsersIcon,
  HomeIcon,
  XIcon,
  QuestionMarkCircleIcon,
  StatusOfflineIcon,
  StatusOnlineIcon,
  MenuAlt1Icon,
} from "@heroicons/vue/outline";
import { getAuth, signOut } from 'firebase/auth';

import { onMounted, onBeforeUnmount, ref } from "vue";

import { useUiStateComposable } from "@/composables/uistate-composable";

import { ChevronDownIcon } from "@heroicons/vue/solid";

const { globalState } = useUiStateComposable();

const sidebarOpen = ref(false);
const navigation = ref([
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
]);
const user = ref();
const loggedIn = ref(false);

getAuth().onAuthStateChanged((u) => {
    user.value = u;


  });
  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.s
        router.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }
</script>
