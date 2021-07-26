import React, { useState, useContext } from "react";
import { getDataAPI } from "../../utils/fetchData";
import { GLOBALTYPES } from "../../context/globalTypes";
import UserCard from "../userCard/UserCard";
import LoadIcon from "../../images/loading.gif";
import { StateContext } from "../../context/StateProvider";
import { SearchOutlined } from "@material-ui/icons";
import "./search.scss";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const [{ auth }, dispatch] = useContext(StateContext);
  const [load, setLoad] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <div className="search">
      <form className="form" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          value={search}
          id="search"
          title="Enter to Search"
          onChange={(e) =>
            setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
          }
        />
        <div className="iconWrap">
          <SearchOutlined className="searchIcon"></SearchOutlined>
          <span className="material-icons">Search a User here </span>
        </div>
        <div
          className="close_search"
          onClick={handleClose}
          style={{ opacity: users.length === 0 ? 0 : 1 }}
        >
          &times;
        </div>
        <button type="submit" style={{ display: "none" }}>
          Search
        </button>
        {load && <img className="loadingSearch" src={LoadIcon} alt="loading" />}
        <div className="users">
          {search &&
            users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                border="border"
                handleClose={handleClose}
              />
            ))}
        </div>
      </form>
    </div>
  );
};
export default Search;
