import React, { ReactNode, RefObject } from "react";
import "./style.css";

interface State {
  search: string;
  status: string;
  progressStyle: string;
  submit: boolean;
}

class SearchPage extends React.Component {
  inputRef: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  public state = {
    search: "",
    status: "",
    progressStyle: "show",
    submit: false,
  };

  public render = (): ReactNode => {
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

    const searchFieldStyle: React.CSSProperties = {
      fontSize: "25px",
      width: "80vw",
      textAlign: "center",
      marginBottom: "15px",
      border: "none",
      outline: "none",
      caretColor: this.state.search.length > 0 ? "" : "transparent",
    };

    const searchFieldElementsStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "row",
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

    const inputRectLeft =
      this.inputRef.current?.getBoundingClientRect()?.left ?? 0;
    const textWidth = this.getSearchTextWidth();
    const loadingStyle: React.CSSProperties = {
      position: "absolute",
      top: "25%",
      transform: "translateY(-50%)",
      right: "5px",
      zIndex: 5,
      left: inputRectLeft + 1.15 * textWidth + 495 + "px",
    };

    const progressStyle: React.CSSProperties = {
      color: "#666",
      marginTop: "10px",
      textAlign: "center",
    };

    return (
      <div>
        <div style={verticalCenter}>
          <div style={searchFieldElementsStyle}>
            <input
              ref={this.inputRef}
              id="inputField"
              placeholder="What would you like to know? Ask here and press Enter &#8629;"
              type="text"
              style={searchFieldStyle}
              autoFocus
              onChange={(event) => this.onSearchChange(event)}
              onKeyDown={(event) => this.onPerformSearch(event)}
              value={this.state.search}
              readOnly={this.state.submit}
              autoComplete="off"
              autoCorrect="false"
            />
            <div style={loadingStyle} hidden={!this.state.submit}>
              <div className="col-3">
                <div className="snippet" data-title="dot-pulse">
                  <div className="stage">
                    <div className="dot-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.submit && this.state.status.length > 0 ? (
            <div
              className={"text-" + this.state.progressStyle}
              style={progressStyle}
            >
              {this.state.status}
            </div>
          ) : (
            <div
              className={"text-" + this.state.progressStyle}
              style={{ ...progressStyle, visibility: "hidden" }}
            >
              &nbsp;
            </div>
          )}
        </div>
        <div style={copyrightStyle}>
          KGIR: Semantic Query Answering with Natural Language on Knowledge
          Graphs
        </div>
      </div>
    );
  };

  componentDidUpdate() {
    /* if (this.props.args["status"] !== this.state.status) {
      this.setState({
        progressStyle: "fade",
      });
      setTimeout(() => {
        this.setState((_) => ({
          progressStyle: "show",
          status: this.props.args["status"],
        }));
      }, 1000);
    }
    */
  }

  private onSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newSearch = event.target.value;
    this.setState(
      (_) => ({ search: newSearch })
      /*
      () =>
        Streamlit.setComponentValue({
          search: this.state.search,
          submit: this.state.submit,
        })
        */
    );
  };

  private getSearchTextWidth = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context != null) {
      context.font = this.inputRef.current?.style.font ?? "";
      const metrics = context.measureText(this.state.search);
      return metrics.width;
    }
    return 0;
  };

  private onPerformSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.setState(
        (_) => ({ status: "Parsing Query", submit: true })
        /*
        () =>
          Streamlit.setComponentValue({
            search: this.state.search,
            submit: this.state.submit,
          })
          */
      );
    }
  };
}

export default SearchPage;
