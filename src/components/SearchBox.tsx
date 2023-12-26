import { useEffect, useRef, useState } from "react";

type SearchBoxProps = {
  textAlign: "center" | "left";
  search: string;
  onUpdateSearch: (newSearch: string) => void;
  autoFocus: boolean;
  showStatus: boolean;
};

const SearchBox = (props: SearchBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [rstatus, setRStatus] = useState(
    "Generating Intermediate Representation"
  );
  const [status, setStatus] = useState("");

  const [progressType, setProgressType] = useState("");
  const [uuid, setUUID] = useState("");
  const [submit, setSubmit] = useState(false);

  const remoteUpdateStatus = async () => {
    if (uuid !== "") {
      const response = await fetch(
        "http://127.0.0.1:5000/search/status?" +
          new URLSearchParams({ uuid: uuid }).toString()
      ).then((response) => response.json());
      if (response["status"] === "Done") {
        setRStatus("Generating Intermediate Representation");
        setStatus("");
        setProgressType("");
        setUUID("");
        setSubmit(false);
        window.location.href =
          "results?" + new URLSearchParams({ uuid: uuid }).toString();
      } else if (response["status"] !== rstatus) {
        setRStatus(response["status"]);
        setProgressType("fade");
        setTimeout(() => {
          setProgressType("show");
          setStatus(response["status"]);
        }, 1000);
      }
    }
  };

  const remoteSubmitQuery = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/search/query?" +
        new URLSearchParams({ query: props.search }).toString()
    ).then((response) => response.json());
    setUUID(response["uuid"]);
  };

  useEffect(() => {
    const interval = setInterval(remoteUpdateStatus, 250);
    return () => clearInterval(interval);
  }, [uuid, rstatus]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSearch = event.target.value;
    props.onUpdateSearch(newSearch);
  };

  const onPerformSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      remoteSubmitQuery();
      setStatus("Generating Intermediate Representation");
      setSubmit(true);
    }
  };

  const getSearchTextWidth = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context != null) {
      context.font = inputRef.current?.style.font ?? "";
      const metrics = context.measureText(props.search);
      return metrics.width;
    }
    return 0;
  };

  const searchFieldStyle: React.CSSProperties = {
    fontSize: "25px",
    width: "100vw",
    textAlign: props.textAlign,
    border: "none",
    outline: "none",
    padding: 0,
    margin: 0,
    caretColor: props.search.length > 0 ? "" : "transparent",
  };

  const searchFieldTextStyle: React.CSSProperties = {
    ...searchFieldStyle,
    width: undefined,
  };

  const searchFieldElementsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
  };

  const loadingStyle: React.CSSProperties = {
    position: "relative",
    top: "14px",
    left: "38px",
    zIndex: 10,
    float: "left",
    flexShrink: 0,
    marginLeft: "-10px",
  };

  const progressStyle: React.CSSProperties = {
    color: "#666",
    marginTop: "10px",
    textAlign: "center",
  };

  return (
    <>
      <div style={searchFieldElementsStyle}>
        {!submit ? (
          <input
            ref={inputRef}
            id="inputField"
            placeholder={
              props.textAlign === "center"
                ? "What would you like to know? Ask here and press Enter ↵"
                : ""
            }
            type="text"
            style={searchFieldStyle}
            autoFocus={props.autoFocus}
            onChange={(event) => onSearchChange(event)}
            onKeyDown={(event) => onPerformSearch(event)}
            value={props.search}
            readOnly={submit}
            autoComplete="off"
            autoCorrect="false"
          />
        ) : (
          <p style={searchFieldTextStyle}>{props.search}</p>
        )}
        <div style={loadingStyle} hidden={!submit}>
          <div className="col-3">
            <div className="snippet" data-title="dot-pulse">
              <div className="stage">
                <div className="dot-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.showStatus ? (
        <>
          {submit && status.length > 0 ? (
            <div className={"text-" + progressType} style={progressStyle}>
              {status}
            </div>
          ) : (
            <div
              className={"text-" + progressType}
              style={{ ...progressStyle, visibility: "hidden" }}
            >
              &nbsp;
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchBox;
