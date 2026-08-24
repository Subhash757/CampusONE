import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Download, QrCode, Sparkles } from 'lucide-react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  title?: string;
  subtitle?: string;
  showCopy?: boolean;
  showDownload?: boolean;
  fgColor?: string;
  bgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  className?: string;
  badgeText?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 200,
  title,
  subtitle,
  showCopy = true,
  showDownload = true,
  fgColor = '#0f172a',
  bgColor = '#ffffff',
  level = 'H',
  includeMargin = true,
  className = '',
  badgeText
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSVG = () => {
    const svgElement = document.getElementById(`qr-svg-${value.replace(/[^a-zA-Z0-9]/g, '')}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `VVCE_QR_${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const elementId = `qr-svg-${value.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div className={`flex flex-col items-center p-5 rounded-2xl bg-slate-900/90 border border-white/15 shadow-2xl backdrop-blur-md space-y-4 ${className}`}>
      {badgeText && (
        <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[11px] font-mono border border-teal-500/30">
          <Sparkles className="w-3 h-3 text-teal-400" />
          <span>{badgeText}</span>
        </span>
      )}

      {title && (
        <h4 className="text-sm font-bold text-white text-center flex items-center justify-center space-x-2">
          <QrCode className="w-4 h-4 text-teal-400" />
          <span>{title}</span>
        </h4>
      )}

      {/* QR Code Container */}
      <div className="p-3 bg-white rounded-xl shadow-inner border border-slate-200 relative group transition-all duration-300 hover:scale-105">
        <QRCodeSVG
          id={elementId}
          value={value}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          level={level}
          includeMargin={includeMargin}
          imageSettings={{
            src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100', // VVCE Logo feel / clean emblem
            x: undefined,
            y: undefined,
            height: 32,
            width: 32,
            excavate: true,
          }}
        />
      </div>

      {subtitle && (
        <p className="text-xs text-slate-300 text-center max-w-xs leading-relaxed font-mono">
          {subtitle}
        </p>
      )}

      {/* Payload display & Action buttons */}
      <div className="w-full space-y-2 pt-1">
        <div className="bg-slate-950/80 border border-white/10 rounded-xl p-2 font-mono text-[10px] text-teal-400 break-all text-center select-all">
          {value}
        </div>

        {(showCopy || showDownload) && (
          <div className="flex items-center justify-center space-x-2 pt-1">
            {showCopy && (
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-white/10 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-teal-400" />}
                <span>{copied ? 'Copied Payload!' : 'Copy Code'}</span>
              </button>
            )}

            {showDownload && (
              <button
                onClick={handleDownloadSVG}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-semibold border border-teal-500/40 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-teal-400" />
                <span>Download SVG</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
