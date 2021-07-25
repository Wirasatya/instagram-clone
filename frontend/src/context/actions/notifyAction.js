import { GLOBALTYPES } from "../globalTypes";
import {
  postDataAPI,
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
} from "../../utils/fetchData";

export const NOTIFY_TYPES = {
  GET_NOTIFIES: "GET_NOTIFIES",
  CREATE_NOTIFY: "CREATE_NOTIFY",
  REMOVE_NOTIFY: "REMOVE_NOTIFY",
  UPDATE_NOTIFY: "UPDATE_NOTIFY",
  UPDATE_SOUND: "UPDATE_SOUND",
  DELETE_ALL_NOTIFIES: "DELETE_ALL_NOTIFIES",
};

export const createNotify = async ({ msg, auth, socket }, dispatch) => {
  try {
    const res = await postDataAPI("notify", msg, auth.token);
    socket.emit("createNotify", {
      ...res.data.notify,
      user: {
        username: auth.user.username,
        avatar: auth.user.avatar,
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const removeNotify = async ({ msg, auth, socket }, dispatch) => {
  try {
    await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);

    socket.emit("removeNotify", msg);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const getNotifies = async (token, dispatch) => {
  try {
    const res = await getDataAPI("notifies", token);
    dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const isReadNotify = async ({ msg, auth }, dispatch) => {
  dispatch({
    type: NOTIFY_TYPES.UPDATE_NOTIFY,
    payload: { ...msg, isRead: true },
  });
  try {
    await patchDataAPI(`/isReadNotify/${msg._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const deleteAllNotifies = async (token, dispatch) => {
  dispatch({ type: NOTIFY_TYPES.DELETE_ALL_NOTIFIES, payload: [] });
  try {
    await deleteDataAPI("deleteAllNotify", token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
