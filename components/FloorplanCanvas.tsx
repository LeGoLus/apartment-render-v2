"use client"

import React, { useRef, useEffect, useState } from 'react';

interface Room {
  x: number;
  y: number;
}

interface FloorplanCanvasProps {
  imageUrl: string;
  rooms?: Room[];
  editable?: boolean;
  onRoomsChange?: (rooms: Room[]) => void;
}

const FloorplanCanvas: React.FC<FloorplanCanvasProps> = ({ 
  imageUrl, 
  rooms = [], 
  editable = true, 
  onRoomsChange 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImage(img);
      setError(null);
    };
    img.onerror = () => {
      console.error('Error loading image:', imageUrl);
      setError('Failed to load image');
    };
  }, [imageUrl]);

  useEffect(() => {
    if (image) {
      drawFloorplan();
    }
  }, [image, rooms]);

  const drawFloorplan = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !image) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    rooms.forEach((room, index) => {
      ctx.beginPath();
      ctx.arc(room.x, room.y, 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
      ctx.fill();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = 'white';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((index + 1).toString(), room.x, room.y);
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!editable) return;
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (!rect) return;

    const scaleX = canvas!.width / rect.width;
    const scaleY = canvas!.height / rect.height;

    const newRoom = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };

    const updatedRooms = [...rooms, newRoom];
    if (onRoomsChange) {
      onRoomsChange(updatedRooms);
    }
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ border: '1px solid #ccc', maxWidth: '100%', height: 'auto', cursor: editable ? 'pointer' : 'default' }}
      />
      {editable && (
        <p className="mt-2 text-sm text-gray-600">Click on the image to mark rooms. Rooms marked: {rooms.length}</p>
      )}
    </div>
  );
};

export default FloorplanCanvas;