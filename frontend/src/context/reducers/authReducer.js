import { GLOBALTYPES } from "../globalTypes";

const authReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
