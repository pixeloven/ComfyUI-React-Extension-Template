# ComfyUI React Extension Development Guide

This guide shows how to leverage the [ComfyUI-Docker](https://github.com/pixeloven/ComfyUI-Docker) project to create a fully functioning development environment for ComfyUI extensions.

## Overview

The development environment consists of:
- **ComfyUI Container**: Running the main ComfyUI application with your extension
- **React Dev Server**: Hot-reload development server for the React extension
- **Persistent Volumes**: For models, outputs, and user data

## Prerequisites

- Docker and Docker Compose installed
- Git (for cloning the repository)

## Quick Start

### 1. Start the Development Environment

```bash
# Start with CPU-only mode (recommended for development)
docker-compose --profile comfy-cpu up -d

# Or start with GPU support (requires NVIDIA Docker)
docker-compose --profile comfy-nvidia up -d

# View logs
docker-compose logs -f
```

### 2. Access Your Services

- **ComfyUI**: http://localhost:8188
- **React Dev Server**: http://localhost:5173

### 3. Development Workflow

```bash
# View running services
docker-compose ps

# Access ComfyUI container shell (CPU mode)
docker-compose exec comfyui bash

# Access ComfyUI container shell (GPU mode)
docker-compose exec comfyui-nvidia bash

# Access React dev container shell
docker-compose exec react-dev sh

# Stop all services
docker-compose down
```

## Development Commands

### Building the Extension

```bash
# Build the React extension inside the container (CPU mode)
docker-compose exec comfyui bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm run build
"

# Or for GPU mode
docker-compose exec comfyui-nvidia bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm run build
"
```

### Installing Dependencies

```bash
# Install Node.js dependencies (CPU mode)
docker-compose exec comfyui bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm install
"

# Or for GPU mode
docker-compose exec comfyui-nvidia bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm install
"
```

### Running Tests

```bash
# Run tests (CPU mode)
docker-compose exec comfyui bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm test
"

# Or for GPU mode
docker-compose exec comfyui-nvidia bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm test
"
```

### Code Quality

```bash
# Lint code (CPU mode)
docker-compose exec comfyui bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm run lint
"

# Format code (CPU mode)
docker-compose exec comfyui bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm run format
"
```

## Development Modes

### 1. Standalone Development (Recommended for UI Development)

The React dev server runs independently at `http://localhost:5173` with:
- Hot reload for instant feedback
- Mock ComfyUI APIs for development
- TypeScript compilation
- Sample data for testing

### 2. Integrated Development

The extension is automatically built and loaded into ComfyUI at `http://localhost:8188`:
- Real ComfyUI environment
- Full extension functionality
- Access to all ComfyUI APIs

## File Structure

```
ComfyUI-React-Extension-Template/
├── docker-compose.yml        # Development environment
├── .dockerignore             # Docker build exclusions
├── README-DEVELOPMENT.md     # This file
├── __init__.py               # Python entry point
├── pyproject.toml            # Project metadata
└── ui/                       # React application
    ├── src/
    ├── package.json
    └── vite.config.ts
```

## Volumes and Persistence

The development environment uses Docker volumes for persistence:

- `comfyui_models`: AI models and checkpoints
- `comfyui_input`: Input images and files
- `comfyui_output`: Generated images and outputs
- `comfyui_temp`: Temporary files
- `comfyui_user`: User configurations and data

## Troubleshooting

### Common Issues

**Q: ComfyUI container fails to start**
A: Check if the port 8188 is already in use:
```bash
docker-compose logs comfyui
```

**Q: React dev server not accessible**
A: Ensure the React container is running:
```bash
docker-compose ps
```

**Q: Extension not appearing in ComfyUI**
A: Rebuild the extension:
```bash
# For CPU mode
docker-compose exec comfyui bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm run build
"

# For GPU mode
docker-compose exec comfyui-nvidia bash -c "
  cd /workspace/ComfyUI-React-Extension-Template/ui
  npm run build
"
```

**Q: Changes not reflecting**
A: The React dev server has hot reload. For ComfyUI integration, rebuild the extension.

### Useful Commands

```bash
# Rebuild containers
docker-compose build --no-cache

# Restart services
docker-compose restart

# Clean up volumes (WARNING: This will delete all data)
docker-compose down -v

# View resource usage
docker stats
```

## Integration with ComfyUI-Docker

This setup leverages the [ComfyUI-Docker](https://github.com/pixeloven/ComfyUI-Docker) project which provides:

- **Production-ready ComfyUI images** from GitHub Container Registry
- **Multi-profile architecture** (GPU/CPU modes)
- **Automated model management**
- **Persistent storage**
- **Custom node management**

### Using Different ComfyUI-Docker Profiles

The setup now supports both CPU and GPU modes using Docker Compose profiles:

```bash
# CPU-only mode (smaller, faster startup)
docker-compose --profile comfy-cpu up -d

# GPU-accelerated mode (requires NVIDIA Docker)
docker-compose --profile comfy-nvidia up -d
```

The profiles automatically select the appropriate ComfyUI-Docker image:
- `comfy-cpu`: Uses `ghcr.io/pixeloven/comfyui:comfy-cpu` (smaller image)
- `comfy-nvidia`: Uses `ghcr.io/pixeloven/comfyui:comfy-nvidia` (GPU support)

## Next Steps

1. **Customize the Extension**: Modify `ui/src/App.tsx` to create your own UI
2. **Add New Features**: Use ComfyUI's JavaScript APIs to extend functionality
3. **Publish to Registry**: Use the existing GitHub Actions workflow to publish
4. **Add Tests**: Extend the test suite in `ui/src/__tests__/`

## Resources

- [ComfyUI JavaScript Developer Documentation](https://docs.comfy.org/custom-nodes/js/javascript_overview)
- [ComfyUI-Docker Project](https://github.com/pixeloven/ComfyUI-Docker)
- [ComfyUI Registry](https://registry.comfy.org)
- [React Extension Template](https://github.com/Comfy-Org/ComfyUI-React-Extension-Template) 