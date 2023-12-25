import { useState } from "react";

import SearchBox from "../components/SearchBox";

import "./style.css";

const SearchPage = () => {
  const [search, setSearch] = useState("");

  const verticalCenter: React.CSSProperties = {
    margin: "0",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  };
  const copyrightStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "10px",
    width: "100%",
    textAlign: "center",
    padding: "0 0 10px 0",
    fontSize: "10px",
    color: "#666",
  };
  return (
    <div>
      <div style={verticalCenter}>
        <SearchBox
          search={search}
          onUpdateSearch={setSearch}
          textAlign="center"
          autoFocus
          showStatus
        />
      </div>
      <div style={copyrightStyle}>
        QirK: Query Answering via Intermediate Representation on Knowledge
        Graphs
      </div>
    </div>
  );
};

export default SearchPage;
