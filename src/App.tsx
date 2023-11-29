import { useRef, useEffect } from "react";
import WebViewer from "@pdftron/webviewer";

function App() {
  const viewer = useRef(null);

  useEffect(() => {
    WebViewer(
      {
        path: "/webviewer/lib",
        licenseKey: "your_license_key", // sign up to get a free trial key at https://dev.apryse.com,
        fullAPI: true,
      },
      viewer.current!
    ).then((instance) => {
      const { UI, Core } = instance;
      const { Annotations } = Core;
      const { Color } = Annotations;
      UI.enableFeatures([UI.Feature.MultiViewerMode]);

      UI.addEventListener(UI.Events.MULTI_VIEWER_READY, () => {
        UI.enableMultiViewerSync();

        const [documentViewer1, documentViewer2] = Core.getDocumentViewers();
        const startCompare = async () => {
          const shouldCompare =
            documentViewer1.getDocument() && documentViewer2.getDocument();
          if (shouldCompare) {
            // Check if both documents loaded before comparing
            const beforeColor = new Color(21, 205, 131, 0.4);
            const afterColor = new Color(255, 73, 73, 0.4);
            const options = { beforeColor, afterColor };
            await documentViewer1.startSemanticDiff(documentViewer2, options);
          }
        };
        documentViewer1.addEventListener("documentLoaded", startCompare);
        documentViewer2.addEventListener("documentLoaded", startCompare);
        documentViewer1.loadDocument("/pdf/semantic_1.pdf");
        documentViewer2.loadDocument("/pdf/semantic_2.pdf");
      });
    });
  }, []);

  return (
    <div className="MyComponent">
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
}

export default App;
