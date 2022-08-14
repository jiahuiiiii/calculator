import React, { useState, useEffect } from "react";
import moment from "moment";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

function App() {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [expression, setExpression] = useState("0");
  return (
    <div className="disable-select flex relative bg-[#9adfce] w-full h-screen overflow-hidden justify-center items-center">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Icon
        className="h-48 w-48 absolute animate-pulse opacity-10 left-20 top-40 text-[#8bc9b9]"
        icon="ant-design:cloud-filled"
      />
      <Icon
        className="h-48 w-48 absolute text-[#8bc9b9] animate-pulse opacity-10 right-[40rem] top-[5rem]"
        icon="ant-design:cloud-filled"
      />
      <Icon
        className="absolute text-[#8bc9b9] animate-pulse opacity-10 right-5 top-10 h-72 w-72"
        icon="ant-design:cloud-filled"
      />
      <Icon
        className="absolute text-[#8bc9b9] animate-pulse opacity-10 right-[20rem] top-[15rem] h-72 w-72"
        icon="ant-design:cloud-filled"
      />
      <Icon
        className="absolute text-[#8bc9b9] animate-pulse opacity-10 left-[35rem] top-[12rem] h-96 w-96"
        icon="ant-design:cloud-filled"
      />
      <Icon
        className="h-64 w-64 absolute text-[#8bc9b9] animate-pulse opacity-10 left-[20rem] top-0"
        icon="ant-design:cloud-filled"
      />
      <div className="animate__animated animate__tada p-10 w-96 calculator-shadow z-[9999]">
        <div className="animate__animated animate__rubberBand flex text-neutral-800 flex-row items-center w-full justify-between">
          <div className="w-16">{moment(time).format("HH:mm")}</div>
          <div className="flex flex-row gap-2 -mt-1">
            <div className="h-1 w-8 bg-neutral-800 rounded-xl"></div>
            <div className="h-1 w-1 bg-neutral-800 rounded-xl"></div>
          </div>
          <div className="flex flex-row gap-2">
            <Icon icon="ant-design:signal-filled" />
            <Icon icon="akar-icons:wifi" />
            <Icon icon="bi:battery-full" />
          </div>
        </div>
        <input
          value={expression}
          disabled
          className="animate__animated animate__zoomInLeft w-full tracking-wide text-right text-3xl mt-8 p-10 input-shadow"
        />
        <div className="grid gap-4 grid-cols-4 text-2xl mt-10">
          <div
            onClick={() => setExpression("0")}
            className=" key-shadow animate__animated animate__flip hover:cursor-pointer w-full h-full aspect-square flex items-center justify-center"
          >
            <div className="mt-1">AC</div>
          </div>
          <div
            onClick={() => setExpression(expression.slice(0, -1) || "0")}
            className="key-shadow animate__animated animate__flip hover:cursor-pointer w-full h-full aspect-square flex items-center justify-center"
          >
            <Icon icon="akar-icons:backspace" />
          </div>
          <div
            onClick={() => setExpression(expression + "%")}
            className="key-shadow animate__animated animate__flip hover:cursor-pointer w-full h-full aspect-square flex items-center justify-center"
          >
            <div className="mt-1">%</div>
          </div>
          <div
            onClick={() => setExpression(expression + "÷")}
            className="key-shadow animate__animated animate__flip hover:cursor-pointer w-full h-full aspect-square flex items-center justify-center"
          >
            <Icon icon="fa6-solid:divide" className="w-4 h-4" />
          </div>
          {[
            "7",
            "8",
            "9",
            "×",
            "4",
            "5",
            "6",
            "-",
            "1",
            "2",
            "3",
            "=",
            "0",
            ".",
            "+",
          ].map((e) => (
            <div
              onClick={() => {
                if (e === "=") {
                  try {
                    setExpression(
                      eval(
                        expression
                          .replace("×", "*")
                          .replace("÷", "/")
                          .replace("%", "/100")
                      )
                    );
                  } catch (error) {
                    if (error instanceof SyntaxError) {
                      toast("🦄 Invalid Expression");
                    }
                  }
                } else {
                  setExpression((expression == "0" ? "" : expression) + e);
                }
              }}
              className={`animate__animated animate__flip key-shadow hover:cursor-pointer w-full h-full aspect-square flex items-center justify-center ${
                e == "=" && "row-span-2"
              }`}
            >
              {e}
            </div>
          ))}
        </div>
      </div>
      <div className="c absolute bottom-0">
        <div className="card-home absolute bottom-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#8bc9b9"
              fill-opacity="1"
              d="M0,192L0,32L36.9,32L36.9,128L73.8,128L73.8,256L110.8,256L110.8,128L147.7,128L147.7,32L184.6,32L184.6,288L221.5,288L221.5,192L258.5,192L258.5,224L295.4,224L295.4,160L332.3,160L332.3,192L369.2,192L369.2,0L406.2,0L406.2,32L443.1,32L443.1,96L480,96L480,256L516.9,256L516.9,160L553.8,160L553.8,32L590.8,32L590.8,320L627.7,320L627.7,256L664.6,256L664.6,64L701.5,64L701.5,288L738.5,288L738.5,192L775.4,192L775.4,288L812.3,288L812.3,224L849.2,224L849.2,128L886.2,128L886.2,192L923.1,192L923.1,160L960,160L960,96L996.9,96L996.9,32L1033.8,32L1033.8,224L1070.8,224L1070.8,224L1107.7,224L1107.7,128L1144.6,128L1144.6,192L1181.5,192L1181.5,0L1218.5,0L1218.5,32L1255.4,32L1255.4,96L1292.3,96L1292.3,320L1329.2,320L1329.2,128L1366.2,128L1366.2,256L1403.1,256L1403.1,96L1440,96L1440,320L1403.1,320L1403.1,320L1366.2,320L1366.2,320L1329.2,320L1329.2,320L1292.3,320L1292.3,320L1255.4,320L1255.4,320L1218.5,320L1218.5,320L1181.5,320L1181.5,320L1144.6,320L1144.6,320L1107.7,320L1107.7,320L1070.8,320L1070.8,320L1033.8,320L1033.8,320L996.9,320L996.9,320L960,320L960,320L923.1,320L923.1,320L886.2,320L886.2,320L849.2,320L849.2,320L812.3,320L812.3,320L775.4,320L775.4,320L738.5,320L738.5,320L701.5,320L701.5,320L664.6,320L664.6,320L627.7,320L627.7,320L590.8,320L590.8,320L553.8,320L553.8,320L516.9,320L516.9,320L480,320L480,320L443.1,320L443.1,320L406.2,320L406.2,320L369.2,320L369.2,320L332.3,320L332.3,320L295.4,320L295.4,320L258.5,320L258.5,320L221.5,320L221.5,320L184.6,320L184.6,320L147.7,320L147.7,320L110.8,320L110.8,320L73.8,320L73.8,320L36.9,320L36.9,320L0,320L0,320Z"
            ></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#8bc9b9"
              fill-opacity="1"
              d="M0,192L0,32L36.9,32L36.9,128L73.8,128L73.8,256L110.8,256L110.8,128L147.7,128L147.7,32L184.6,32L184.6,288L221.5,288L221.5,192L258.5,192L258.5,224L295.4,224L295.4,160L332.3,160L332.3,192L369.2,192L369.2,0L406.2,0L406.2,32L443.1,32L443.1,96L480,96L480,256L516.9,256L516.9,160L553.8,160L553.8,32L590.8,32L590.8,320L627.7,320L627.7,256L664.6,256L664.6,64L701.5,64L701.5,288L738.5,288L738.5,192L775.4,192L775.4,288L812.3,288L812.3,224L849.2,224L849.2,128L886.2,128L886.2,192L923.1,192L923.1,160L960,160L960,96L996.9,96L996.9,32L1033.8,32L1033.8,224L1070.8,224L1070.8,224L1107.7,224L1107.7,128L1144.6,128L1144.6,192L1181.5,192L1181.5,0L1218.5,0L1218.5,32L1255.4,32L1255.4,96L1292.3,96L1292.3,320L1329.2,320L1329.2,128L1366.2,128L1366.2,256L1403.1,256L1403.1,96L1440,96L1440,320L1403.1,320L1403.1,320L1366.2,320L1366.2,320L1329.2,320L1329.2,320L1292.3,320L1292.3,320L1255.4,320L1255.4,320L1218.5,320L1218.5,320L1181.5,320L1181.5,320L1144.6,320L1144.6,320L1107.7,320L1107.7,320L1070.8,320L1070.8,320L1033.8,320L1033.8,320L996.9,320L996.9,320L960,320L960,320L923.1,320L923.1,320L886.2,320L886.2,320L849.2,320L849.2,320L812.3,320L812.3,320L775.4,320L775.4,320L738.5,320L738.5,320L701.5,320L701.5,320L664.6,320L664.6,320L627.7,320L627.7,320L590.8,320L590.8,320L553.8,320L553.8,320L516.9,320L516.9,320L480,320L480,320L443.1,320L443.1,320L406.2,320L406.2,320L369.2,320L369.2,320L332.3,320L332.3,320L295.4,320L295.4,320L258.5,320L258.5,320L221.5,320L221.5,320L184.6,320L184.6,320L147.7,320L147.7,320L110.8,320L110.8,320L73.8,320L73.8,320L36.9,320L36.9,320L0,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
