import { useEffect, useRef } from "react";

function Qrcode() {
  const ssid = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const encryptionType = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const downloadPng = useRef<HTMLButtonElement>(null);
  const downloadSvg = useRef<HTMLButtonElement>(null);

  const color = useRef<HTMLInputElement>(null);
  const bgColor = useRef<HTMLInputElement>(null);
  const shape = useRef<HTMLSelectElement>(null);
  const margin = useRef<HTMLInputElement>(null);
  const hiddenSsid = useRef<HTMLInputElement>(null);

  const imgRef = useRef<HTMLImageElement>(null);

  const getData = () => {
    if (!ssid.current?.value) return "0";

    let qrvalue = `WIFI:S:${ssid.current?.value};`;
    if (hiddenSsid.current?.checked) {
      qrvalue += `H:true;`;
    }
    if (encryptionType.current?.value === "wpa") {
      qrvalue += `T:WPA;P:${password.current?.value};;`;
    } else if (encryptionType.current?.value === "wpa3") {
      qrvalue += `T:WPA;R:1;P:${password.current?.value};;`;
    } else if (encryptionType.current?.value === "wep") {
      qrvalue += `T:WEP;P:${password.current?.value};;`;
    } else if (encryptionType.current?.value === "open") {
      qrvalue += `T:nopass;;`;
    } else return "0";
    return qrvalue;
  };

  const getOption = () => {
    const data = getData();
    console.log(data);
    const mainOption = {
      width: 1000,
      height: 1000,
      type: "svg",
      data: data,
      backgroundOptions: { color: bgColor.current?.value },
      margin: parseInt(margin.current?.value || "0"),
    };

    let typeOption = {};
    switch (shape.current?.value) {
      case "round":
        typeOption = {
          dotsOptions: { color: color.current?.value, type: "rounded" },
          cornersSquareOptions: { color: color.current?.value, type: "extra-rounded" },
          cornersDotOptions: { type: "dot", color: color.current?.value },
        };
        break;
      case "dot":
        typeOption = {
          dotsOptions: { color: color.current?.value, type: "dots" },
          cornersSquareOptions: { color: color.current?.value, type: "dot" },
          cornersDotOptions: { type: "dot", color: color.current?.value },
        };
        break;
      default:
        typeOption = {
          dotsOptions: { color: color.current?.value, type: "square" },
          cornersSquareOptions: { color: color.current?.value, type: "square" },
          cornersDotOptions: { type: "square", color: color.current?.value },
        };
        break;
    }
    return Object.assign(mainOption, typeOption);
  };

  useEffect(() => {
    (async () => {
      const QRCodeStyling = await import("styled-qr-code");
      const onchange = () => {
        const option = getOption();
        //@ts-ignore
        const qr = new QRCodeStyling.default(option);
        qr.getRawData("png").then((data: any) => {
          const url = URL.createObjectURL(data);
          imgRef.current!.src = url;
        });
      };

      const downloadQr = (ext: "svg" | "png") => {
        const option = getOption();
        //@ts-ignore
        const qr = new QRCodeStyling.default(option);
        qr.download({ extension: ext });
      };
      onchange();

      formRef.current!.onchange = onchange;
      downloadPng.current!.onclick = () => downloadQr("png");
      downloadSvg.current!.onclick = () => downloadQr("svg");
    })();
  }, []);

  return (
    <div>
      <form ref={formRef}>
        <div className="mb-6 grid gap-1">
          <div>
            <label className="m-1 block text-sm font-medium text-base-content">SSID</label>
            <input
              ref={ssid}
              type="text"
              className="w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="ssid"
            />
          </div>
          <div>
            <label className="m-1 block text-sm font-medium text-base-content">PASSWORD</label>
            <input
              ref={password}
              type="text"
              className="w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="password"
            />
          </div>
          <div>
            <label className="m-1 block text-sm font-medium text-base-content">暗号化方式</label>
            <select
              ref={encryptionType}
              className="w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="wpa">WPA / WPA2 / WPA3 (一般的)</option>
              <option value="wpa3">WPA3 Only (最新)</option>
              <option value="wep">WEP (古い)</option>
              <option value="open">パスワードなし</option>
            </select>
          </div>
        </div>
        <div className="flex">
          <input ref={hiddenSsid} type="checkbox" className="m-1" />
          <label className="m-1 block text-sm font-medium text-base-content">SSIDを非表示にする</label>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <div>
            <label className="m-1 block text-sm font-medium text-base-content">色</label>
            <input
              type="color"
              ref={color}
              className="h-10 w-full rounded-lg border border-gray-400 bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="m-1 block text-sm font-medium text-base-content">背景色</label>
            <input
              type="color"
              defaultValue="#ffffff"
              ref={bgColor}
              className="h-10 w-full rounded-lg border border-gray-400 bg-gray-50 p-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="m-1 block text-sm font-medium text-base-content">形</label>
            <select
              ref={shape}
              className="h-10 w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="round">Round</option>
              <option value="dot">Dot</option>
              <option value="square">Square</option>
            </select>
          </div>
          <div>
            <label className="m-1 block text-sm font-medium text-base-content">マージン</label>
            <input
              type="number"
              defaultValue="26"
              ref={margin}
              className="h-10 w-full rounded-lg border border-gray-400 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </form>
      <img ref={imgRef} className="mx-auto w-96 max-w-full border-2 border-solid border-neutral" />
      <div className="flex justify-center">
        <button
          ref={downloadPng}
          className="mx-4 inline-flex items-center rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        >
          <svg className="mr-2 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>PNG</span>
        </button>
        <button
          ref={downloadSvg}
          className="mx-4 inline-flex items-center rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        >
          <svg className="mr-2 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
          </svg>
          <span>SVG</span>
        </button>
      </div>
    </div>
  );
}

export default Qrcode;
