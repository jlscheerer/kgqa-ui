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
    width: "80vw",
    textAlign: props.textAlign,
    marginBottom: "15px",
    border: "none",
    outline: "none",
    caretColor: props.search.length > 0 ? "" : "transparent",
  };

  const searchFieldElementsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
  };

  const inputRectLeft = inputRef.current?.getBoundingClientRect()?.left ?? 0;
  const textWidth = getSearchTextWidth();

  const loadingStyle: React.CSSProperties =
    props.textAlign === "center"
      ? {
          position: "absolute",
          top: "23%",
          transform: "translateY(-50%)",
          right: "5px",
          zIndex: 5,
          left: inputRectLeft + 1.2 * textWidth + 495 + "px",
        }
      : {
          position: "relative",
          zIndex: 5,
          left: -1170 + 2.47 * textWidth + "px",
          top: "15px",
        };

  const progressStyle: React.CSSProperties = {
    color: "#666",
    marginTop: "10px",
    textAlign: "center",
  };

  return (
    <>
      <div style={searchFieldElementsStyle}>
        <input
          ref={inputRef}
          id="inputField"
          placeholder="What would you like to know? Ask here and press Enter &#8629;"
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
