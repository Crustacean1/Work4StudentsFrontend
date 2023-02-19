import { Viewer } from "@react-pdf-viewer/core";

const PDFViewer = ({ url }: { url: string }) => {
  return (
    <div
      style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
        maxHeight: '500px',
        overflow: 'scroll'
      }}
    >
      <Viewer fileUrl={url} />
    </div>
  );
}

export default PDFViewer;