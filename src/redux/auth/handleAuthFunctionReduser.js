//================ All Pendings  ==============
export const handleAuthPending = state => {
  state.error = null;
  state.isLoading = true;
};

//================ Pending Refresh User ==============
export const handleAuthRefreshUserPending = state => {
  state.isRefreshing = true;
  state.error = null;
  state.isLoading = true;
};

//================ All Rejected User ==============
export const handleAuthRejected = (state, payload) => {
  state.isLoggedIn = false;
  state.isRefreshing = false;
  state.error = payload;
  state.isLoading = false;
  state.token = '';
};

//================ Fulfilled Register User ==============
export const handleFulfilledRegisterUser = (state, payload) => {
  state.isRefreshing = false;
  state.isLoading = false;
  state.error = null;
  state.isLoggedIn = true;
  state.userData = payload.user;
  state.token = payload.token;
};

//================ Fulfilled LogIn User ==============
export const handleFulfilledLogInUser = (state, payload) => {
  state.isRefreshing = false;
  state.isLoading = false;
  state.error = null;
  state.isLoggedIn = true;
  state.userData = payload.user;
  state.token = payload.token;
};

//================ Fulfilled Refresh User ==============
export const handleFulfilledRefreshUser = (state, payload) => {
  state.isRefreshing = false;
  state.isLoading = false;
  state.error = null;
  state.isLoggedIn = true;
  state.userData = payload;
};

//================ Fulfilled LogOut User ==============
export const handleFulfilledLogOutUser = state => {
  state.isRefreshing = false;
  state.isLoading = false;
  state.error = null;
  state.isLoggedIn = false;
  state.token = null;
  state.userData = { name: null, number: null };
};
