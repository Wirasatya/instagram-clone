import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Avatar } from "@material-ui/core";
import { GLOBALTYPES } from "../../context/globalTypes";
import { StateContext } from "../../context/StateProvider";
import { addMessage } from "../../context/actions/messageAction";
import RingRing from "../../audio/ringring.mp3";
import { Call, PhoneDisabled, Videocam } from "@material-ui/icons";
import "./callModal.scss";

const CallModal = () => {
  const [{ call, auth, peer, socket, theme }, dispatch] =
    useContext(StateContext);

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);

  const [answer, setAnswer] = useState(false);
  const youVideo = useRef();
  const otherVideo = useRef();
  const [tracks, setTracks] = useState(null);
  const [newCall, setNewCall] = useState(null);

  // Set Time
  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();

    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);

  // End Call
  const addCallMessage = useCallback(
    (call, times, disconnect) => {
      if (call.recipient !== auth.user._id || disconnect) {
        const msg = {
          sender: call.sender,
          recipient: call.recipient,
          text: "",
          media: [],
          call: { video: call.video, times },
          createdAt: new Date().toISOString(),
        };
        addMessage({ msg, auth, socket }, dispatch);
      }
    },
    [auth, dispatch, socket]
  );

  const handleEndCall = () => {
    tracks && tracks.forEach((track) => track.stop());
    if (newCall) newCall.close();
    let times = answer ? total : 0;
    socket.emit("endCall", { ...call, times });

    addCallMessage(call, times);
    dispatch({ type: GLOBALTYPES.CALL, payload: null });
  };

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit("endCall", { ...call, times: 0 });
        addCallMessage(call, 0);
        dispatch({ type: GLOBALTYPES.CALL, payload: null });
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    socket.on("endCallToClient", (data) => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      addCallMessage(data, data.times);
      dispatch({ type: GLOBALTYPES.CALL, payload: null });
    });

    return () => socket.off("endCallToClient");
  }, [socket, dispatch, tracks, addCallMessage, newCall]);

  // Stream Media
  const openStream = (video) => {
    const config = { audio: true, video };
    return navigator.mediaDevices.getUserMedia(config);
  };

  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  // Answer Call
  const handleAnswer = () => {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);

      const newCall = peer.call(call.peerId, stream);
      newCall.on("stream", function (remoteStream) {
        playStream(otherVideo.current, remoteStream);
      });
      setAnswer(true);
      setNewCall(newCall);
    });
  };

  useEffect(() => {
    peer.on("call", (newCall) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }
        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);
        newCall.on("stream", function (remoteStream) {
          if (otherVideo.current) {
            playStream(otherVideo.current, remoteStream);
          }
        });
        setAnswer(true);
        setNewCall(newCall);
      });
    });
    return () => peer.removeListener("call");
  }, [peer, call.video]);

  // Disconnect
  useEffect(() => {
    socket.on("callerDisconnect", () => {
      tracks && tracks.forEach((track) => track.stop());
      if (newCall) newCall.close();
      let times = answer ? total : 0;
      addCallMessage(call, times, true);

      dispatch({ type: GLOBALTYPES.CALL, payload: null });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: `The ${call.username} disconnect` },
      });
    });

    return () => socket.off("callerDisconnect");
  }, [socket, tracks, dispatch, call, addCallMessage, answer, total, newCall]);

  // Play - Pause Audio
  const playAudio = (newAudio) => {
    newAudio.play();
  };

  const pauseAudio = (newAudio) => {
    newAudio.pause();
    newAudio.currentTime = 0;
  };

  useEffect(() => {
    let newAudio = new Audio(RingRing);
    if (answer) {
      pauseAudio(newAudio);
    } else {
      playAudio(newAudio);
    }

    return () => pauseAudio(newAudio);
  }, [answer]);

  return (
    <div className="callModal">
      <div
        className="callBox"
        style={{
          display: answer && call.video ? "none" : "flex",
        }}
      >
        <div className="headerContent" style={{ padding: "40px 0" }}>
          <Avatar
            style={{
              filter: theme ? "invert(1)" : "invert(0)",
            }}
            src={call.avatar}
            className="avatarCallModal"
          />
          <h4>{call.username}</h4>
          <h6>{call.fullname}</h6>

          {answer ? (
            <div>
              <span>{hours.toString().length < 2 ? "0" + hours : hours}</span>
              <span>:</span>
              <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
              <span>:</span>
              <span>
                {second.toString().length < 2 ? "0" + second : second}
              </span>
            </div>
          ) : (
            <div>
              {call.video ? (
                <span>calling video...</span>
              ) : (
                <span>calling audio...</span>
              )}
            </div>
          )}
        </div>

        {!answer && (
          <div className="timer">
            <small>{mins.toString().length < 2 ? "0" + mins : mins}</small>
            <small>:</small>
            <small>
              {second.toString().length < 2 ? "0" + second : second}
            </small>
          </div>
        )}

        <div className="callMenu">
          <button className="buttonCallDisable" onClick={handleEndCall}>
            <PhoneDisabled
              style={{
                filter: theme ? "invert(1)" : "invert(0)",
              }}
              className="iconCallModal"
            ></PhoneDisabled>
          </button>

          {call.recipient === auth.user._id && !answer && (
            <>
              {call.video ? (
                <button className="buttonCallVideo" onClick={handleAnswer}>
                  <Videocam
                    style={{
                      filter: theme ? "invert(1)" : "invert(0)",
                    }}
                    className="iconCallModal"
                  ></Videocam>
                </button>
              ) : (
                <button className="buttonCallCall" onClick={handleAnswer}>
                  <Call
                    style={{
                      filter: theme ? "invert(1)" : "invert(0)",
                    }}
                    className="iconCallModal"
                  ></Call>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div
        className="showVideo"
        style={{
          opacity: answer && call.video ? "1" : "0",
          filter: theme ? "invert(1)" : "invert(0)",
        }}
      >
        <video ref={youVideo} className="yourVideo" playsInline muted />
        <video ref={otherVideo} className="otherVideo" playsInline />

        <div className="timeVideo">
          <span>{hours.toString().length < 2 ? "0" + hours : hours}</span>
          <span>:</span>
          <span>{mins.toString().length < 2 ? "0" + mins : mins}</span>
          <span>:</span>
          <span>{second.toString().length < 2 ? "0" + second : second}</span>
        </div>

        <button className="buttonEndCall" onClick={handleEndCall}>
          <PhoneDisabled className="iconCallModal"></PhoneDisabled>
        </button>
      </div>
    </div>
  );
};

export default CallModal;
