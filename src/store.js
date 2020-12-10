import { createContext, useReducer } from "react";

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

const initialState = { isAuth: false };

const store = createContext(initialState);
const { Provider } = store;

const reducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isAuth: true };
    case LOG_OUT:
      return { ...state, isAuth: false };
    default:
      return state;
  }
};

const actions = (dispatch) => ({
  logIn: () => {
    dispatch({ type: LOG_IN });
  },
  logOut: () => {
    dispatch({ type: LOG_OUT });
  },
});

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider value={{ state, actions: actions(dispatch) }}>
      {children}
    </Provider>
  );
};

export { store, StoreProvider };
