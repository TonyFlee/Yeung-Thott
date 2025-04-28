import React, { useState } from "react";

const PropsOverlay = () => {
  const [props, setProps] = useState<{ id: number; type: string; x: number; y: number }[]>([]);

  const addProp = (type: string) => {
    setProps([...props, { id: Date.now(), type, x: 100, y: 100 }]);
  };

  const handleDrag = (id: number, x: number, y: number) => {
    setProps(props.map(prop => (prop.id === id ? { ...prop, x, y } : prop)));
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {props.map(prop => (
        <img
          key={prop.id}
          src={`/props/${prop.type}.png`}
          alt={prop.type}
          className="absolute pointer-events-auto"
          style={{ left: prop.x, top: prop.y }}
          draggable
          onDragEnd={e => handleDrag(prop.id, e.clientX, e.clientY)}
        />
      ))}
      <div className="absolute bottom-4 left-4 space-x-2">
        <button
          onClick={() => addProp("hat")}
          className="px-4 py-2 bg-blue-500 text-white rounded pointer-events-auto"
        >
          Add Hat
        </button>
        <button
          onClick={() => addProp("glasses")}
          className="px-4 py-2 bg-blue-500 text-white rounded pointer-events-auto"
        >
          Add Glasses
        </button>
      </div>
    </div>
  );
};

export default PropsOverlay;