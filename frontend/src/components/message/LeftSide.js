import React, { useState, useEffect, useRef, useContext } from "react";
import UserCard from "../userCard/UserCard";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../context/globalTypes";
import { useHistory, useParams } from "react-router-dom";
import {
  MESS_TYPES,
  getConversations,
} from "../../context/actions/messageAction";
import { StateContext } from "../../context/StateProvider";
import "./leftSide.scss";
import { FiberManualRecord } from "@material-ui/icons";

const LeftSide = () => {
  const [{ auth, message, online }, dispatch] = useContext(StateContext);

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch({
      type: MESS_TYPES.ADD_USER,
      payload: { ...user, text: "", media: [] },
    });
    dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    return history.push(`/message/${user._id}`);
  };

  const isActive = (user) => {
    if (id === user._id) return "active";
    return "";
  };

  useEffect(() => {
    if (message.firstLoad) return;
    getConversations({ auth }, dispatch);
  }, [dispatch, auth, message.firstLoad]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page > 1) {
      getConversations({ auth, page }, dispatch);
    }
  }, [message.resultUsers, page, auth, dispatch]);

  // Check User Online - Offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [online, message.firstLoad, dispatch]);

  return (
    <>
      <form className="leftSideHeader" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Enter to Search..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
      </form>

      <div className="messageChatList">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`messageUser ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`messageUser ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} msg={true}>
                  {user.online ? (
                    <FiberManualRecord
                      fontSize="small"
                      className="iconOnline"
                    ></FiberManualRecord>
                  ) : (
                    auth.user.following.find(
                      (item) => item._id === user._id
                    ) && (
                      <FiberManualRecord fontSize="small"></FiberManualRecord>
                    )
                  )}
                </UserCard>
              </div>
            ))}
          </>
        )}

        <button ref={pageEnd} style={{ opacity: 0 }}>
          Load More
        </button>
      </div>
    </>
  );
};

export default LeftSide;
