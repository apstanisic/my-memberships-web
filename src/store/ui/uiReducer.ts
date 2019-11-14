// import { UiAction, UiState, UiActionTypes } from '../../types/uiTypes';

// const defaultState: UiState = {
//   showSidebar: false,
//   showLoader: false,
//   alert: {
//     show: false,
//     text: ""
//   }
// };
const defaultState = {};

export default function uiReducer(
  state = defaultState,
  action: any
  //   action: UiAction
) {
  return state;
  //   switch (action.type) {
  //     case UiActionTypes.TOGGLE_SIDEBAR:
  //       return { ...state, showSidebar: !state.showSidebar };
  //     case UiActionTypes.SHOW_LOADER:
  //       return { ...state, showLoader: true };
  //     case UiActionTypes.HIDE_LOADER:
  //       return { ...state, showLoader: false };
  //     case UiActionTypes.SHOW_ALERT:
  //       return {
  //         ...state,
  //         alert: { show: true, text: action.payload as string }
  //       };
  //     case UiActionTypes.HIDE_ALERT:
  //       return { ...state, alert: { show: false, text: '' } };
  //     /* TODO: Maybe log errors to server? */
  //     case UiActionTypes.ERROR:
  //     case UiActionTypes.REMOVE_ERROR:
  //       return state;
  //     default:
  //       return state;
  //   }
}
