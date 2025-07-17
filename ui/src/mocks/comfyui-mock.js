// Mock implementation of ComfyUI for standalone development
console.log('Loading ComfyUI mock for development...');

// Mock graph with sample nodes
const mockGraph = {
  _nodes: [
    {
      id: 1,
      title: 'Load Image',
      type: 'LoadImage',
      category: 'loaders',
      inputs: [{ name: 'image' }],
      outputs: [{ name: 'image' }],
      pos: [100, 100],
      color: '#7e57c2'
    },
    {
      id: 2,
      title: 'CLIP Text Encode',
      type: 'CLIPTextEncode',
      category: 'conditioning',
      inputs: [{ name: 'text' }, { name: 'clip' }],
      outputs: [{ name: 'conditioning' }],
      pos: [300, 100],
      color: '#26a69a'
    },
    {
      id: 3,
      title: 'KSampler',
      type: 'KSampler',
      category: 'sampling',
      inputs: [{ name: 'model' }, { name: 'positive' }, { name: 'negative' }],
      outputs: [{ name: 'latent' }],
      pos: [500, 100],
      color: '#ef5350'
    },
    {
      id: 4,
      title: 'VAE Decode',
      type: 'VAEDecode',
      category: 'latent',
      inputs: [{ name: 'samples' }, { name: 'vae' }],
      outputs: [{ name: 'image' }],
      pos: [700, 100],
      color: '#66bb6a'
    }
  ],
  setDirtyCanvas: (flag1, flag2) => {
    console.log('Mock: setDirtyCanvas called', flag1, flag2);
  },
  clear: () => {
    console.log('Mock: Graph cleared');
    mockGraph._nodes = [];
  }
};

// Mock API
const mockApi = {
  addEventListener: (event, handler) => {
    console.log('Mock: Added event listener for', event);
  },
  removeEventListener: (event, handler) => {
    console.log('Mock: Removed event listener for', event);
  }
};

// Mock canvas
const mockCanvas = {
  centerOnNode: (node) => {
    console.log('Mock: Centering on node', node.id);
  }
};

// Mock extension manager
const mockExtensionManager = {
  registerSidebarTab: (tab) => {
    console.log('Mock: Registered sidebar tab', tab.id);
  },
  dialog: {
    prompt: (options) => {
      console.log('Mock: Dialog prompt', options);
      return Promise.resolve('Mock response');
    },
    confirm: (options) => {
      console.log('Mock: Dialog confirm', options);
      return Promise.resolve(true);
    }
  },
  toast: {
    add: (options) => {
      console.log('Mock: Toast added', options);
    }
  }
};

// Mock app object
const mockApp = {
  graph: mockGraph,
  api: mockApi,
  canvas: mockCanvas,
  extensionManager: mockExtensionManager,
  queuePrompt: (promptId) => {
    console.log('Mock: Queue prompt', promptId);
  },
  registerExtension: (extension) => {
    console.log('Mock: Registered extension', extension.name);
  }
};

// Set up the global app object
if (typeof window !== 'undefined') {
  window.app = mockApp;
  console.log('Mock ComfyUI app initialized for development');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { mockApp, mockGraph, mockApi };
} 