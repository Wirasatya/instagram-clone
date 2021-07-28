import { GLOBALTYPES } from "../globalTypes";

const peerReducer = (state, action) => {
  switch (action.type) {
    case GLOBALTYPES.PEER:
      return action.payload;
    default:
      return state;
  }
};

export default peerReducer;
