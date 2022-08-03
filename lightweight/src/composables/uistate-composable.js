import { reactive } from 'vue';

const globalState = reactive({
  loading: false,
  searchBarExpanded: false,
});

export const useUiStateComposable = () => {
  const localState = reactive({
    loading: false,
    searchBarExpanded: false,
  });

  const toggleLoading = (value) => {
    // Set the global state values
    globalState.loading = value;

    // Set the local state values
    localState.loading = value;
  };

  return {
    globalState,
    localState,
    toggleLoading,
  };
};
