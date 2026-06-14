import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const nodeShellStyle = {
  width: 260,
  minHeight: 124,
};

export const BaseNode = ({
  id,
  data,
  title,
  subtitle,
  icon,
  children,
  handles = [],
  width = nodeShellStyle.width,
  minHeight = nodeShellStyle.minHeight,
  accent = '#8b0000',
}) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const isDeactivated = data?.deactivated;
  const executionState = data?.executionState;

  const handleExecute = (e) => {
    e.stopPropagation();
    if (isDeactivated) return;
    updateNodeField(id, 'executionState', 'running');
    
    setTimeout(() => {
      // Basic validation checks
      let hasError = false;
      if (title === 'API' && !data?.url) hasError = true;
      if (title === 'Email' && !data?.to) hasError = true;
      if (title === 'Database' && !data?.query) hasError = true;
      if (title === 'Text' && !data?.text) hasError = true;
      
      if (hasError) {
        updateNodeField(id, 'executionState', 'error');
      } else {
        updateNodeField(id, 'executionState', 'success');
      }
    }, 1000);
  };

  const handleToggleDeactivate = (e) => {
    e.stopPropagation();
    updateNodeField(id, 'deactivated', !isDeactivated);
    if (!isDeactivated) {
      updateNodeField(id, 'executionState', null);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  return (
    <div
      className={`pipeline-node ${isDeactivated ? 'is-deactivated' : ''} ${executionState ? `is-${executionState}` : ''}`}
      style={{
        width,
        minHeight,
        '--node-accent': accent,
      }}
    >
      {/* Floating Controls above the node */}
      <div className="node-controls">
        <button 
          className="node-control-btn execute-btn" 
          onClick={handleExecute} 
          title="Execute node"
          disabled={isDeactivated}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        <button 
          className={`node-control-btn deactivate-btn ${isDeactivated ? 'active' : ''}`} 
          onClick={handleToggleDeactivate} 
          title={isDeactivated ? "Activate node" : "Deactivate node"}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10"/>
          </svg>
        </button>
        <button 
          className="node-control-btn delete-btn" 
          onClick={handleDelete} 
          title="Delete node"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>

      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      <div className="node-header">
        <div className="node-title-wrap">
          {icon && <span className="node-icon">{icon}</span>}
          <div>
            <div className="node-title">{title}</div>
            {subtitle && <div className="node-subtitle">{subtitle}</div>}
          </div>
        </div>

        {/* Status Badge */}
        {executionState && (
          <div className={`node-status-badge ${executionState}`} title={`Execution status: ${executionState}`}>
            {executionState === 'running' && <span className="spinner"></span>}
            {executionState === 'success' && '✓'}
            {executionState === 'error' && '!'}
          </div>
        )}
      </div>

      <div className="node-content">{children}</div>
    </div>
  );
};

export const Field = ({ label, children }) => (
  <label className="node-field">
    <span>{label}</span>
    {children}
  </label>
);

export const TextInput = ({ value, onChange, placeholder }) => (
  <input
    className="node-input"
    type="text"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
  />
);

export const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea
    className="node-textarea"
    value={value}
    onChange={(event) => onChange(event.target.value)}
    placeholder={placeholder}
    rows={rows}
  />
);

export const SelectInput = ({ value, onChange, options }) => (
  <select
    className="node-select"
    value={value}
    onChange={(event) => onChange(event.target.value)}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const leftHandle = (id, style) => ({
  id,
  type: 'target',
  position: Position.Left,
  style,
});

export const rightHandle = (id, style) => ({
  id,
  type: 'source',
  position: Position.Right,
  style,
});
