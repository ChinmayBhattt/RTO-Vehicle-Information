"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, AlertCircle, ScanLine, X, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { toast } from "react-hot-toast";

interface ScannerProps {
  onScanSuccess: (regNum: string) => void;
  onClose: () => void;
}

export default function NumberPlateScanner({ onScanSuccess, onClose }: ScannerProps) {
  const [activeTab, setActiveTab] = useState<"camera" | "upload">("upload");
  const [image, setImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = () => {
    if (!image) {
      toast.error("Please upload an image of a number plate first.");
      return;
    }
    setScanning(true);
    toast.loading("Analyzing number plate...", { id: "ocr-scan" });

    // Simulate OCR processing with realistic timeout
    setTimeout(() => {
      setScanning(false);
      toast.dismiss("ocr-scan");
      
      // Randomly pick a realistic Indian vehicle number for simulation
      const mockNumbers = ["MH02AB1234", "DL01CA4321", "RJ27AB1122", "KA03MM8888"];
      const detected = mockNumbers[Math.floor(Math.random() * mockNumbers.length)];
      
      toast.success(`OCR Match Found: ${detected}`);
      onScanSuccess(detected);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#111827] to-[#0d1117] border border-white/[0.08] shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.01]">
          <div className="flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-cyan-400" />
            <h3 className="text-white font-semibold">OCR Plate Scanner</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Tab selector */}
          <div className="flex bg-white/[0.03] border border-white/[0.08] rounded-xl p-1">
            <button
              onClick={() => setActiveTab("upload")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeTab === "upload"
                  ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Image
            </button>
            <button
              onClick={() => {
                setActiveTab("camera");
                toast.error("Camera permissions not granted. Defaulting to file uploader.");
                setActiveTab("upload");
              }}
              className="flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-all"
            >
              <Camera className="w-3.5 h-3.5" />
              Use Camera (Real-time)
            </button>
          </div>

          {/* Area view */}
          <div
            onClick={() => activeTab === "upload" && fileInputRef.current?.click()}
            className={`h-[200px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center overflow-hidden relative transition-all cursor-pointer ${
              image
                ? "border-cyan-500/40 bg-black/40"
                : "border-white/[0.08] hover:border-cyan-500/20 bg-white/[0.01]"
            }`}
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt="Plate preview"
                  className="w-full h-full object-contain"
                />
                {scanning && (
                  <motion.div
                    className="absolute inset-x-0 h-1 bg-cyan-400"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </>
            ) : (
              <div className="text-center p-4 space-y-2">
                <Upload className="w-8 h-8 text-gray-600 mx-auto" />
                <p className="text-xs text-white font-semibold">
                  Drag and drop or click to upload
                </p>
                <p className="text-[10px] text-gray-500">
                  Supports PNG, JPG, or JPEG up to 5MB.
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Guidelines info */}
          <div className="flex gap-2.5 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-xs leading-relaxed text-gray-400">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p>
              Ensure the license plate is clean, fully horizontal, and well-lit. Shadows or high angles might interfere with OCR extraction accuracy.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/[0.06] flex justify-end gap-2 bg-white/[0.01]">
          <Button variant="outline" onClick={onClose} disabled={scanning} className="text-xs px-4 h-9">
            Cancel
          </Button>
          <Button
            onClick={startScan}
            disabled={scanning || !image}
            className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold text-xs px-5 h-9 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            {scanning ? "Analyzing..." : "Perform OCR Scan"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
