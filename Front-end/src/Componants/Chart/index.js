import { Tree, TreeNode } from "react-organizational-chart";
import styles from "./chart.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { config } from "../../config/config";

// Chart Componant To get Data From App Componant, then Draw Our Chart.
export default function Chart({ chartData }) {
  useEffect(() => {
    // It's Recursion Function To set some event to all node we have.
    function shapeEffect(chartObj) {
      const nodeEl = document.getElementById(`${"id-" + chartObj._id}`);
      const rootWidth =
        document.getElementById(`${"id-" + chartObj._id}`).offsetWidth -
        40 +
        "px";
      document.getElementById(`${"id-" + chartObj._id}`).style.height =
        chartObj.shape === "Circle"
          ? rootWidth
          : chartObj.shape === "Square"
          ? rootWidth
          : null;

      nodeEl.addEventListener("mouseenter", () => {
        nodeEl.style.color = "black";
        nodeEl.style.backgroundColor = "white";
      });
      nodeEl.addEventListener("mouseleave", () => {
        nodeEl.style.color = chartObj.txColor;
        nodeEl.style.backgroundColor = chartObj.bgColor;
      });

      // --------------- Drag and Drop Functionalty ---------------

      // Store Node ID in our session storage
      nodeEl.addEventListener("dragstart", () => {
        window.sessionStorage.setItem("NodeID", nodeEl.id);
        nodeEl.style.opacity = 0.2;
      });

      // Store Parent ID in our session storage
      nodeEl.addEventListener("dragover", () => {
        window.sessionStorage.setItem("containerId", nodeEl.id);
      });

      // Get & Send Node ID and Parend ID to our DB
      nodeEl.addEventListener("dragend", async (e) => {
        nodeEl.style.opacity = 1;
        let _id = window.sessionStorage.getItem("NodeID");
        _id = _id.substring(3, _id.length);
        let Parent_id = window.sessionStorage.getItem("containerId");
        Parent_id = Parent_id.substring(3, Parent_id.length);

        if (_id !== Parent_id) {
          const childNode = document.querySelector(`#id-${_id}`).parentElement
            .parentElement;

          // If we Will remove last child, go to remove parent node
          if (childNode.parentElement.childElementCount === 1) {
            childNode.parentElement.remove();
          }

          const parentNode = document.querySelector(`#id-${Parent_id}`)
            .parentElement.parentElement;

          childNode.remove();

          // Check if we have ul tag already in our parent or Not
          if (parentNode.querySelector("ul") == null) {
            const ulClass = parentNode.parentElement.classList[0];
            const ulElement = document.createElement("ul");
            ulElement.classList.add(ulClass);
            ulElement.appendChild(childNode);
            parentNode.appendChild(ulElement);
          } else {
            parentNode.lastChild.appendChild(childNode);
          }

          const data = {
            _id,
            Parent_id,
          };
          // Check if Current Node in New Container Or Not. if in New Container Make A request.

          fetch(`${config.server}/movenodes`, {
            method: "PUT",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify(data),
          });
        }
      });

      // Check If our Curren Object Have a Node Child or Not
      if (chartObj.child.length > 0) {
        for (let i = 0; i < chartObj.child.length; i++) {
          shapeEffect(chartObj.child[i]);
        }
      }
    }
    shapeEffect(chartData[0]);
  });

  // It's Recursion Function ToBuild Our Child Nodes For Parent Node (ROOT)
  function buildChart(chart) {
    return chart.child.map((el, index) => {
      return el.title ? (
        <TreeNode
          label={
            <Link
              to="nodeControler"
              state={{ id: el._id, Parent_id: el.Parent_id }}
              style={{ textDecoration: "none" }}
            >
              <div
                id={"id-" + el._id}
                style={{
                  backgroundColor: el.bgColor,
                  color: el.txColor,
                  boxShadow: `0px 1px 20px 3px ${el.bgColor}66`,
                }}
                // To Allow Nodes To be in a Draggable Condition
                draggable={true}
                className={`${styles.node}   ${
                  el.shape === "Circle"
                    ? styles.circle
                    : el.shape === "Square"
                    ? styles.square
                    : styles.rectangle
                } `}
              >
                {el.title}
              </div>
            </Link>
          }
          key={index}
        >
          {/* Check IF We have Child from Root or Node and Call our build node function to send our child node */}
          {el.child.length > 0 ? buildChart(el) : null}
        </TreeNode>
      ) : null;
    });
  }

  // Retrun Our Chart
  return (
    <Tree
      label={
        <Link
          to="nodeControler"
          state={{ id: chartData[0]._id, Parent_id: chartData[0].Parent_id }}
          style={{ textDecoration: "none" }}
        >
          <div
            id={"id-" + chartData[0]._id}
            className={`${styles.margin_top} ${styles.node}   ${
              chartData[0].shape === "Circle"
                ? styles.circle
                : chartData[0].shape === "Square"
                ? styles.square
                : styles.rectangle
            }`}
            style={{
              backgroundColor: chartData[0].bgColor,
              color: chartData[0].txColor,
              boxShadow: `0px 1px 10px 3px ${chartData[0].bgColor}66`,
            }}
          >
            {chartData[0].title}
          </div>
        </Link>
      }
    >
      {buildChart(chartData[0])}
    </Tree>
  );
}
