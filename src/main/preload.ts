// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

// Function to update the title bar with the current URL
const updateTitleBarWithURL = () => {
  // Get CSS variables for the Window Controls Overlay
  const wcoRect = { x: 0, y: 0, width: 0, height: 0 };

  // Check if Window Controls Overlay is available
  if ('windowControlsOverlay' in navigator) {
    // Get the bounding rect of the Window Controls Overlay
    const wco = (navigator as any).windowControlsOverlay;

    if (wco.visible) {
      const rect = wco.getTitlebarAreaRect();
      wcoRect.x = rect.x;
      wcoRect.y = rect.y;
      wcoRect.width = rect.width;
      wcoRect.height = rect.height;

      // Create or update the URL display element
      let urlDisplay = document.getElementById('wco-url-display');
      if (!urlDisplay) {
        urlDisplay = document.createElement('div');
        urlDisplay.id = 'wco-url-display';
        urlDisplay.style.position = 'fixed';
        urlDisplay.style.top = `${wcoRect.y}px`;
        urlDisplay.style.left = `${wcoRect.x}px`;
        urlDisplay.style.width = `calc(${wcoRect.right} - ${wcoRect.left}px`;
        urlDisplay.style.height = `${wcoRect.height}px`;
        urlDisplay.style.display = 'flex';
        urlDisplay.style.alignItems = 'center';
        urlDisplay.style.padding = '0px 10px';
        urlDisplay.style.fontSize = '14px';
        urlDisplay.style.overflow = 'hidden';
        urlDisplay.style.textOverflow = 'ellipsis';
        urlDisplay.style.whiteSpace = 'nowrap';
        document.body.appendChild(urlDisplay);
      }

      // Update the URL display with the current URL
      urlDisplay.textContent = window.location.href;
    }
  }
};

// Initialize the title bar URL display when the DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  updateTitleBarWithURL();

  // Update the URL display when the URL changes
  window.addEventListener('popstate', updateTitleBarWithURL);

  // For SPAs that use history.pushState
  const originalPushState = window.history.pushState;
  window.history.pushState = function (...args: any[]) {
    originalPushState.apply(this, args);
    updateTitleBarWithURL();
  };

  // For SPAs that use history.replaceState
  const originalReplaceState = window.history.replaceState;
  window.history.replaceState = function (...args: any[]) {
    originalReplaceState.apply(this, args);
    updateTitleBarWithURL();
  };

  // Update when Window Controls Overlay geometry changes
  if ('windowControlsOverlay' in navigator) {
    (navigator as any).windowControlsOverlay.addEventListener(
      'geometrychange',
      updateTitleBarWithURL,
    );
  }
});

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  // Expose the updateTitleBarWithURL function to the renderer process
  windowControlsOverlay: {
    updateTitleBarWithURL,
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
