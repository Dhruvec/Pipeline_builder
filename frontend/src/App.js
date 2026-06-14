import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-shell">
      <PipelineToolbar />
      <main className="workspace">
        <PipelineUI />
        <SubmitButton />
      </main>
    </div>
  );
}

export default App;
