import { GLOBALTYPES } from "../globalTypes";

const callReducer = (state, action) => {
  switch (action.type) {
    case GLOBALTYPES.CALL:
      return action.payload;
    default:
      return state;
  }
};

export default callReducer;
