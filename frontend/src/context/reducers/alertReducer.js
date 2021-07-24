import { GLOBALTYPES } from "../globalTypes";

const alertReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case GLOBALTYPES.ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
