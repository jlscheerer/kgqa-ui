import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import { format as sqlFormat } from "sql-formatter";
import sparqlFormat from "sparql-formatter";

import {
  Background,
  BackgroundVariant,
  Handle,
  Position,
  ReactFlow,
} from "reactflow";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import "reactflow/dist/style.css";
import "./style.css";

import ResultEntry from "../components/ResultEntry";
import SearchBox from "../components/SearchBox";

type ResultInfo = {
  id: string;
  title: string;
  description: string;
  score: string;
  scoreColor: string;
  image: string;
  opacity: string;
  link: string;
  derivation: string;
};

const ResultsTab = (props: { results: [ResultInfo] }) => {
  return (
    <>
      {props.results.map((result) => (
        <ResultEntry
          id={result.id}
          title={result.title}
          description={result.description}
          score={result.score}
          scoreColor={result.scoreColor}
          image={result.image}
          opacity={result.opacity}
          link={result.link}
          derivation={result.derivation}
        />
      ))}
    </>
  );
};

/*
const handleStyle = { left: 10 };
const QGVariableNode = ({ data, isConnectable }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  return (
    <div className="text-updater-node">
      <div>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};
*/

type QueryGraphTabProps = {
  graph: { nodes: any; edges: any };
};

const QueryGraphTab = (props: QueryGraphTabProps) => {
  // const nodeTypes = useMemo(() => ({ variableNode: QGVariableNode }), []);
  return (
    <div
      style={{ border: "1px solid #F1E9E4", width: "100%", height: "500px" }}
    >
      <ReactFlow
        nodes={props.graph.nodes}
        edges={props.graph.edges}
        edgesUpdatable={false}
        nodesConnectable={false}
        // nodeTypes={nodeTypes}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
};

type CodeTabProps = {
  code: string;
  language: string;
};

const CodeTab = (props: CodeTabProps) => {
  return (
    <SyntaxHighlighter language={props.language} style={oneLight}>
      {props.code}
    </SyntaxHighlighter>
  );
};

type IRTabProps = {
  code: string;
};

const IRTab = (props: IRTabProps) => {
  return (
    <>
      <p>
        <b>Intermediate Representation (QirK)</b>
      </p>
      <CodeTab code={props.code} language="none" />
    </>
  );
};

const ResultsPage = () => {
  const [searchParams, _] = useSearchParams();
  const uuid = searchParams.get("uuid");

  const [search, setSearch] = useState("");
  const [time, setTime] = useState("");
  const [results, setResults] = useState<[ResultInfo]>(
    [] as unknown as [ResultInfo]
  );
  const [QirK, setQirK] = useState("");
  const [graph, setGraph] = useState<any>({ nodes: [], edges: [] });
  const [sparql, setSparql] = useState("");
  const [sql, setSql] = useState("");

  const remoteFetchQueryResults = async () => {
    const response = await fetch(
      "http://127.0.0.1:5000/search/results?" +
        new URLSearchParams({ uuid: uuid! }).toString()
    ).then((response) => response.json());
    setSearch(response["query"]);
    setResults(response["results"]);
    setTime(response["time"]);
    setQirK(response["QirK"]);
    setGraph(response["graph"]);
    setSparql(response["SPARQL"]);
    setSql(response["SQL"]);
    document.title = response["query"] + " - QirK";
  };
  useEffect(() => {
    remoteFetchQueryResults();
  }, []);
  return (
    <div style={{ width: "90%", paddingTop: "5%", paddingLeft: "10%" }}>
      <SearchBox
        search={search}
        onUpdateSearch={setSearch}
        textAlign="left"
        autoFocus={false}
        showStatus={false}
      />
      <div
        style={{
          backgroundColor: "rgb(33, 195, 84, 0.1)",
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <p
          style={{
            flex: 1,
            margin: 0,
            color: "rgb(23, 114, 51)",
          }}
        >
          Retrieved query results and relative scores. {results.length} result
          {results.length === 1 ? "" : "s"} ({time})
        </p>
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="results">
        <Row>
          <Col>
            <Nav variant="pills" className="justify-content-start">
              <Nav.Item>
                <Nav.Link eventKey="results" className="format-pill">
                  Results
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ir" className="format-pill">
                  QirK
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="graph" className="format-pill">
                  Query Graph
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sparql" className="format-pill">
                  SPARQL
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sql" className="format-pill">
                  SQL
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <div style={{ padding: "5px" }}></div>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="results">
                <ResultsTab results={results} />
              </Tab.Pane>
              <Tab.Pane eventKey="ir">
                <IRTab code={QirK} />
              </Tab.Pane>
              <Tab.Pane eventKey="graph">
                <QueryGraphTab graph={graph} />
              </Tab.Pane>
              <Tab.Pane eventKey="sparql">
                <CodeTab code={sparqlFormat(sparql)} language="sparql" />
              </Tab.Pane>
              <Tab.Pane eventKey="sql">
                <CodeTab code={sqlFormat(sql)} language="sql" />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default ResultsPage;
