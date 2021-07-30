import React, { useState, useEffect, useRef, useContext } from "react";
import UserCard from "../userCard/UserCard";
import { useParams, useHistory } from "react-router-dom";
import MsgDisplay from "./MsgDisplay";
import Icons from "../icons/Icons";
import { GLOBALTYPES } from "../../context/globalTypes";
import { imageShow, videoShow } from "../../utils/mediaShow";
import { imageUploadMessage } from "../../utils/imageUpload";
import {
  addMessage,
  getMessages,
  loadMoreMessages,
  deleteConversation,
} from "../../context/actions/messageAction";
import LoadIcon from "../../images/loading.gif";
import { StateContext } from "../../context/StateProvider";
import {
  Call,
  DeleteOutline,
  ImageOutlined,
  NearMeOutlined,
  Videocam,
} from "@material-ui/icons";
import "./rightSide.scss";

const RightSide = () => {
  const [{ auth, message, theme, socket, peer }, dispatch] =
    useContext(StateContext);

  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const refDisplay = useRef();
  const pageEnd = useRef();

  const [data, setData] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(0);

  const history = useHistory();

  useEffect(() => {
    const newData = message.data.find((item) => item._id === id);
    if (newData) {
      setData(newData.messages);
      setResult(newData.result);
      setPage(newData.page);
    }
  }, [message.data, id]);

  useEffect(() => {
    if (id && message.users.length > 0) {
      setTimeout(() => {
        refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);

      const newUser = message.users.find((user) => user._id === id);
      if (newUser) setUser(newUser);
    }
  }, [message.users, id]);

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (err = "The image/video largest is 5mb.");
      }

      return newMedia.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUploadMessage(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    await addMessage({ msg, auth, socket }, dispatch);
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    const getMessagesData = async () => {
      if (message.data.every((item) => item._id !== id)) {
        await getMessages({ auth, id }, dispatch);
        setTimeout(() => {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 50);
      }
    };
    getMessagesData();
  }, [id, dispatch, auth, message.data]);

  // Load More
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoadMore((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(pageEnd.current);
  }, [setIsLoadMore]);

  useEffect(() => {
    if (isLoadMore > 1) {
      if (result >= page * 9) {
        loadMoreMessages({ auth, id, page: page + 1 }, dispatch);
        setIsLoadMore(1);
      }
    }
    // eslint-disable-next-line
  }, [isLoadMore]);

  const handleDeleteConversation = () => {
    if (window.confirm("Do you want to delete?")) {
      deleteConversation({ auth, id }, dispatch);
      return history.push("/message");
    }
  };

  // Call
  const caller = ({ video }) => {
    const { _id, avatar, username, fullname } = user;

    const msg = {
      sender: auth.user._id,
      recipient: _id,
      avatar,
      username,
      fullname,
      video,
    };
    dispatch({ type: GLOBALTYPES.CALL, payload: msg });
  };

  const callUser = ({ video }) => {
    const { _id, avatar, username, fullname } = auth.user;

    const msg = {
      sender: _id,
      recipient: user._id,
      avatar,
      username,
      fullname,
      video,
    };

    if (peer.open) msg.peerId = peer._id;

    socket.emit("callUser", msg);
  };

  const handleAudioCall = () => {
    caller({ video: false });
    callUser({ video: false });
  };

  const handleVideoCall = () => {
    caller({ video: true });
    callUser({ video: true });
  };

  return (
    <>
      <div className="rightSideHeader" style={{ cursor: "pointer" }}>
        {user.length !== 0 && (
          <UserCard user={user}>
            <div>
              <Call
                style={{ marginRight: "5px" }}
                fontSize="medium"
                onClick={handleAudioCall}
              ></Call>
              <Videocam
                style={{ marginRight: "5px" }}
                fontSize="medium"
                onClick={handleVideoCall}
              ></Videocam>
              <DeleteOutline
                style={{ color: "crimson" }}
                onClick={handleDeleteConversation}
              ></DeleteOutline>
            </div>
          </UserCard>
        )}
      </div>

      <div
        className="chatContentContainer"
        style={{ height: media.length > 0 ? "calc(100% - 180px)" : "" }}
      >
        <div className="chatDisplay" ref={refDisplay}>
          <button style={{ marginTop: "-25px", opacity: 0 }} ref={pageEnd}>
            Load more
          </button>

          {data.map((msg, index) => (
            <div key={index}>
              {msg.sender !== auth.user._id && (
                <div className="chatRow otherMessage">
                  <MsgDisplay user={user} msg={msg} theme={theme} />
                </div>
              )}

              {msg.sender === auth.user._id && (
                <div className="chatRow yourMessage">
                  <MsgDisplay
                    user={auth.user}
                    msg={msg}
                    theme={theme}
                    data={data}
                  />
                </div>
              )}
            </div>
          ))}

          {loadMedia && (
            <div className="chatRow yourMessage">
              <img src={LoadIcon} alt="loading" />
            </div>
          )}
        </div>
      </div>

      <div
        className="showMedia"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item), theme)
              : imageShow(URL.createObjectURL(item), theme)}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>

      <form className="chatFooter" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter you message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            background: theme ? "#040404" : "",
            color: theme ? "white" : "",
          }}
        />

        <Icons setContent={setText} content={text} theme={theme} />

        <div className="fileUpload">
          <ImageOutlined
            className="iconImageInput"
            fontSize="small"
          ></ImageOutlined>
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>

        <button
          type="submit"
          className="submitMessage"
          disabled={text || media.length > 0 ? false : true}
        >
          <NearMeOutlined fontSize="small"></NearMeOutlined>
        </button>
      </form>
    </>
  );
};

export default RightSide;
