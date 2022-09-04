import styles from "./start.module.css";
import { useState } from "react";
import NodeControler from "../NodeControler/NodeControler";

// Start Componant will runnig id we don't have any root
export default function Start({ setChart, chart, setRefresh }) {
  const [root, setRoot] = useState(null);

  return root === null ? (
    <div
      className={styles.startStyle}
      onClick={() => {
        setRoot("start root");
      }}
    >
      Start
    </div>
  ) : (
    <NodeControler setChart={setChart} chart={chart} setRefresh={setRefresh} />
  );
}
