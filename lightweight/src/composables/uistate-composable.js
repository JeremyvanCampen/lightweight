import { reactive } from 'vue';

const globalState = reactive({
  loading: false,
  searchBarExpanded: false,
  searchTerm: ''
});

export const useUiStateComposable = () => {
  const localState = reactive({
    loading: false,
    searchBarExpanded: false,
    searchTerm: ''
  });

  const toggleLoading = (value) => {
    // Set the global state values
    globalState.loading = value;

    // Set the local state values
    localState.loading = value;
  };

  const setSearchTerm = (value) =>
  {
     // Set the global state values
     globalState.searchTerm = value;

     // Set the local state values
     localState.searchTerm = value;
  }

  return {
    globalState,
    localState,
    toggleLoading,
    setSearchTerm
  };
};
