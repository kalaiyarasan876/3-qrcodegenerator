import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";

export default function QrCode() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrSize, setQrSize] = useState("");

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR Code", error);
    } finally {
      setLoading(false);
    }
  }

  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QrCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error Download Qr Code ", error);
      });
  }

  return (
    <div className="container col-sm-6 position-static">
      <div className="text-center my-4">
        {img && <img src={img} className="img-fluid qr-code-image" alt="QR Code" />}
        {loading && <p>Please Wait...</p>}
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          value={qrData}
          className="form-control"
          id="floatingInput"
          placeholder="Enter data for QR code"
          onChange={(e) => setQrData(e.target.value)}
        />
        <label htmlFor="floatingInput">Data for QR code</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          value={qrSize}
          className="form-control"
          id="floatingSize"
          placeholder="Enter img size"
          onChange={(e) => setQrSize(e.target.value)}
        />
        <label htmlFor="floatingSize">Image size (e.g., 150):</label>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <button
          className="btn btn-primary"
          onClick={generateQR}
          disabled={loading}
        >
          Generate QR Code
        </button>
        <button className="btn btn-success" onClick={downloadQR}>
          Download QR Code
        </button>
      </div>
      <p className="text-center">
        Developed By <a href="https://portfoliokalai.netlify.app/" target="_blank" rel="noopener noreferrer">Kalai</a>
      </p>
    </div>
  );
}
