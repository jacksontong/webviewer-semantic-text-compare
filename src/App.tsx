import { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

function App() {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        licenseKey: "your_license_key", // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current!
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
    });
  }, []);

  return (
    <div className="MyComponent">
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
}

export default App;
