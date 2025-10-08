import React, { useState, useRef, useEffect } from 'react';
import { FaQrcode, FaCamera, FaStop } from 'react-icons/fa';
import axios from 'axios';
import jsQR from 'jsqr';
import { toast } from 'react-toastify';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [manualCode, setManualCode] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setIsScanning(true);
      setLastResult(null);

      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play();
        startDecoding();
      };
    } catch (error) {
      toast.error('Error accessing camera: ' + error.message);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    setIsScanning(false);
  };

  const startDecoding = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    scanIntervalRef.current = setInterval(() => {
      if (!videoRef.current || videoRef.current.readyState !== 4) return;

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        handleQRCodeDetected(code.data);
      }
    }, 400);
  };

  const handleQRCodeDetected = async (result) => {
    if (result && result !== lastResult) {
      setLastResult(result);
      toast.info(`QR Detected: ${result}`);
      await logEntry(result);
    }
  };

  const logEntry = async (authCode) => {
    try {
      const response = await axios.get(`/api/log-entry?auth_code=${authCode}`);
      const data = response.data;

      if (data.status === 'success') {
        toast.success(`Entry logged for ${data.name} (${data.internId})`);
        stopScanning(); // ✅ Automatically stop scanning on successful entry
      } else if (data.status === 'warning') {
        toast.warning(data.message);
      } else {
        toast.error(data.message || 'Invalid QR Code');
      }
    } catch (error) {
      toast.error(
        'Error logging entry: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      await logEntry(manualCode.trim());
      setManualCode('');
    }
  };

  useEffect(() => {
    return () => stopScanning();
  }, []);

  return (
    <div>
      <h1 className="mb-4">QR Code Scanner</h1>

      <div className="grid">
        {/* Camera Scanner */}
        <div className="card">
          <h3 className="mb-4">
            <FaCamera style={{ marginRight: '8px' }} />
            Camera Scanner
          </h3>

          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                maxWidth: '400px',
                height: '300px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                display: isScanning ? 'block' : 'none',
              }}
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {!isScanning && (
              <div
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: '300px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px dashed #dee2e6',
                }}
              >
                <div className="text-center">
                  <FaQrcode size={48} color="#6c757d" />
                  <p className="mt-3 text-muted">Camera not active</p>
                </div>
              </div>
            )}
          </div>

          <div className="d-flex gap-3">
            {!isScanning ? (
              <button className="btn" onClick={startScanning}>
                <FaCamera /> Start Scanning
              </button>
            ) : (
              <button className="btn btn-danger" onClick={stopScanning}>
                <FaStop /> Stop Scanning
              </button>
            )}
          </div>

          {lastResult && (
            <div
              className="mt-4 p-3"
              style={{ backgroundColor: '#d4edda', borderRadius: '8px' }}
            >
              <strong>Last Scanned:</strong> {lastResult}
            </div>
          )}
        </div>

        {/* Manual Entry */}
        <div className="card">
          <h3 className="mb-4">
            <FaQrcode style={{ marginRight: '8px' }} />
            Manual Entry
          </h3>

          <form onSubmit={handleManualSubmit}>
            <div className="form-group">
              <label htmlFor="manualCode" className="form-label">
                Enter Auth Code Manually
              </label>
              <input
                type="text"
                id="manualCode"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="form-control"
                placeholder="Enter auth code from QR code"
              />
            </div>

            <button type="submit" className="btn" disabled={!manualCode.trim()}>
              Log Entry
            </button>
          </form>
        </div>
      </div>

      {/* Instructions */}
      <div className="card mt-4">
        <h3>Instructions</h3>
        <ul>
          <li>Use the camera scanner to scan QR codes from intern devices</li>
          <li>Alternatively, manually enter the auth code from the QR code</li>
          <li>Each intern can only log one entry per day</li>
          <li>Successful entries will trigger email notifications to CSO</li>
        </ul>
      </div>
    </div>
  );
};

export default QRScanner;
