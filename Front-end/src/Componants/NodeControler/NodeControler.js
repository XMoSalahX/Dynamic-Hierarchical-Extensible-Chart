import styles from "./nodeControler.module.css";
import OverLay from "../OverLay/OverLay";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../config/config";

// Node Controler Funcion is used in {(CREATE & EDIT & REMOVE): [ROOT,Child]}
export default function NodeControler() {
  // Hook for get state from "/" Home Route
  const location = useLocation();
  // Hook For Navgate "/" Home Page Without Reload
  const navgation = useNavigate();

  // Check IF we have a state from our hook(useLocation) to handel error if we dont have a {state} Object.
  if (location.state !== null) {
    var { id, Parent_id } = location.state;
  }

  let data = {};
  const title = document.querySelector('input[type="text"]');

  // to Submit Root or Child Function
  async function submit() {
    try {
      data = {
        title: document.querySelector("#title").value,
        shape: document.querySelector('input[name="shape"]:checked').value,
        bgColor: document.querySelector("#bgColor").value,
        txColor: document.querySelector("#txColor").value,
        child: [],
        Parent_id: id,
      };

      if (data.title !== "") {
        await fetch(`${config.server}/insertNode`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        title.placeholder = "Field is empty";
      }
    } catch (err) {
      document.querySelector("span").style.display = "inline-block";
    }
  }

  // Edit for ROOT || Child Node Function
  async function edit() {
    try {
      data = {
        _id: id,
        title: document.querySelector("#title").value,
        shape: document.querySelector('input[name="shape"]:checked').value,
        bgColor: document.querySelector("#bgColor").value,
        txColor: document.querySelector("#txColor").value,
        Parent_id: Parent_id,
      };
      if (data.title !== "") {
        await fetch(`${config.server}/nodeupdate`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        title.placeholder = "Field is empty";
      }
    } catch (err) {
      document.querySelector("span").style.display = "inline-block";
    }
  }

  // To Remove Root or Node Function
  async function remove() {
    data = {
      _id: id,
    };
    await fetch(`${config.server}/deletenode`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      window.location.href = "/";
    });
  }

  // Bulding our Form
  return (
    <>
      <div className={styles.nodeControlerContainer}>
        <h2>
          {id
            ? "Enter Your Child Node Information"
            : "Please Enter Your First Node"}
        </h2>
        <label htmlFor="title">Enter Node Title: </label>
        <input id="title" type="text" required></input>
        <label htmlFor="shape">Select Shape: </label>
        <span className={styles.shapeError}>* Require</span>
        <div className={styles.radContainer}>
          <div className={styles.rad}>
            <input type="radio" name="shape" value="Square" />
            <label>Square</label>
          </div>
          <div className={styles.rad}>
            <input type="radio" name="shape" value="Rectangle" />
            <label>Rectangle</label>
          </div>
          <div className={styles.rad}>
            <input type="radio" name="shape" value="Circle" />
            <label>Circle</label>
          </div>
        </div>
        <label htmlFor="bgColor">Background Color: </label>
        <input type="color" id="bgColor" defaultValue={"#470348"}></input>
        <label htmlFor="txColor">Text Color: </label>
        <input type="color" id="txColor" defaultValue={"#FFFFFF"}></input>
        <div className={styles.btnContainer}>
          {/* Submit Root Or Child Button */}
          <button
            type="submit"
            className={`${styles.creatbtn} ${styles.btn}`}
            onClick={() => {
              submit();
            }}
          >
            Create
          </button>
          {/* Check If we Came to her from home or from start, {this option form home Only} */}
          {location.state !== null ? (
            <>
              {/* To Clode Node Controler "Route" */}
              <div
                className={styles.close}
                onClick={() => {
                  navgation("/");
                }}
              ></div>
              {/* To Edit Our ROOT or CHILD */}
              <button
                className={`${styles.edit} ${styles.btn}`}
                onClick={() => {
                  edit();
                }}
              >
                Edit
              </button>
              {/* TO Remove our ROOT or CHILD */}
              <button
                className={`${styles.remove} ${styles.btn}`}
                onClick={() => {
                  remove();
                }}
              >
                Remove
              </button>
            </>
          ) : null}
        </div>
      </div>
      {/* Set Overlay in the background */}
      <OverLay />
    </>
  );
}
