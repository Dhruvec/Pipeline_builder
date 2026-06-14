export const DraggableNode = ({ type, label, description }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <button
      className="palette-node"
      type="button"
      draggable
      onDragStart={(event) => onDragStart(event, type)}
    >
      <span className="palette-node-icon">{label.slice(0, 3).toUpperCase()}</span>
      <span>
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
    </button>
  );
};
