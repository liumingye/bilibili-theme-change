import { createRoot } from 'react-dom/client';
import App from './app';

const container = document.getElementById('root');
if (!container) throw new Error('root container is not found');
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
