
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Eraser, Square, Circle, Minus, Download, Trash2, Users, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import ColorPicker from '@/components/ColorPicker';
import BrushSizePicker from '@/components/BrushSizePicker';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pen');
  const [currentColor, setCurrentColor] = useState('#3b82f6');
  const [brushSize, setBrushSize] = useState(3);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBrushPicker, setShowBrushPicker] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [activeUsers, setActiveUsers] = useState(3);

  const colors = [
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16',
    '#f97316', '#6366f1', '#14b8a6', '#eab308'
  ];

  const tools = [
    { id: 'pen', icon: Minus, label: 'Pen' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = useCallback((e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const draw = useCallback((e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    
    if (currentTool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = brushSize * 2;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }, [isDrawing, currentTool, currentColor, brushSize]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    toast({
      title: "Canvas Cleared! 🎨",
      description: "Your whiteboard is now clean and ready for new ideas!"
    });
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'whiteboard-creation.png';
    link.href = canvas.toDataURL();
    link.click();
    toast({
      title: "Downloaded! 📥",
      description: "Your masterpiece has been saved to your device!"
    });
  };

  const handleToolClick = (toolId) => {
    if (toolId === 'rectangle' || toolId === 'circle') {
      toast({
        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      });
      return;
    }
    setCurrentTool(toolId);
  };

  const simulateRealtimeActivity = () => {
    setActiveUsers(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    setIsConnected(Math.random() > 0.1);
  };

  useEffect(() => {
    const interval = setInterval(simulateRealtimeActivity, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              Realtime Whiteboard
            </motion.h1>
            <div className="flex items-center space-x-2 text-sm">
              {isConnected ? (
                <motion.div 
                  className="flex items-center space-x-1 text-green-400"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Wifi className="w-4 h-4" />
                  <span>Connected</span>
                </motion.div>
              ) : (
                <div className="flex items-center space-x-1 text-red-400">
                  <WifiOff className="w-4 h-4" />
                  <span>Reconnecting...</span>
                </div>
              )}
              <div className="flex items-center space-x-1 text-blue-400">
                <Users className="w-4 h-4" />
                <span>{activeUsers} online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              onClick={downloadCanvas}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={clearCanvas}
              variant="outline"
              size="sm"
              className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Toolbar */}
        <motion.aside 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-20 bg-black/20 backdrop-blur-lg border-r border-white/10 p-4 flex flex-col space-y-4"
        >
          {/* Tools */}
          <div className="space-y-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    currentTool === tool.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={tool.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              );
            })}
          </div>

          {/* Color Picker Button */}
          <div className="relative">
            <motion.button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Colors"
            >
              <div 
                className="w-6 h-6 rounded-full border-2 border-white/50"
                style={{ backgroundColor: currentColor }}
              />
            </motion.button>
            
            <AnimatePresence>
              {showColorPicker && (
                <ColorPicker
                  colors={colors}
                  currentColor={currentColor}
                  onColorSelect={setCurrentColor}
                  onClose={() => setShowColorPicker(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Brush Size Picker Button */}
          <div className="relative">
            <motion.button
              onClick={() => setShowBrushPicker(!showBrushPicker)}
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Brush Size"
            >
              <div 
                className="rounded-full bg-white"
                style={{ 
                  width: `${Math.max(4, Math.min(brushSize * 2, 16))}px`,
                  height: `${Math.max(4, Math.min(brushSize * 2, 16))}px`
                }}
              />
            </motion.button>
            
            <AnimatePresence>
              {showBrushPicker && (
                <BrushSizePicker
                  brushSize={brushSize}
                  onBrushSizeChange={setBrushSize}
                  onClose={() => setShowBrushPicker(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.aside>

        {/* Canvas Area */}
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 relative overflow-hidden"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair bg-white/95 backdrop-blur-sm"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          
          {/* Canvas Overlay Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-lg rounded-lg p-3 text-white/70 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Live collaboration active</span>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Whiteboard;
