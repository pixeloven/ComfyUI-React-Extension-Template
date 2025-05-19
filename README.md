# ComfyUI React Extension Example

A minimal example of integrating a React/TypeScript application as a ComfyUI extension, complete with internationalization support.

## Features

- **React & TypeScript Integration**: Demonstrates how to create a modern UI within ComfyUI
- **Interactive Dashboard**: Real-time monitoring of nodes with category-based filtering
- **Internationalization**: Multi-language support for English and Chinese
- **Full TypeScript Support**: Type-safe code using ComfyUI's official type definitions

## Installation

```bash
# Go to your ComfyUI custom_nodes directory
cd ComfyUI/custom_nodes

# Clone the repository
git clone https://github.com/yourusername/ComfyUI_example_frontend_extension.git

# Build the React application
cd ComfyUI_example_frontend_extension/ui
npm install
npm run build

# Restart ComfyUI
```

## Usage

After installation:

1. Look for the "React Example" tab in the ComfyUI sidebar
2. Click to open the interactive dashboard
3. Monitor your workflow's node statistics in real-time

## Development

### Setup Development Environment

```bash
# Go to the UI directory
cd ui

# Install dependencies
npm install

# Start development mode (watches for changes)
npm run watch
```

### File Structure

```
ComfyUI_example_frontend_extension/
├── __init__.py                 # Python entry point for ComfyUI integration
├── pyproject.toml              # Project metadata for ComfyUI Registry
├── locales/                    # Internationalization files
│   ├── en/
│   │   └── main.json           # English translations
│   └── zh/
│       └── main.json           # Chinese translations
└── ui/                         # React application
    ├── src/
    │   ├── App.tsx             # Main React component
    │   ├── main.tsx            # Entry point for React app
    │   └── utils/
    │       └── i18n.ts         # Internationalization setup
    ├── package.json            # npm dependencies
    └── tsconfig.json           # TypeScript configuration
```

### TypeScript Support

This extension uses the official `@comfyorg/comfyui-frontend-types` package for type-safe interaction with ComfyUI APIs. To install it:

```bash
cd ui
npm install -D @comfyorg/comfyui-frontend-types
```

## Publishing to ComfyUI Registry

### Prerequisites

1. Set up a [Registry](https://registry.comfy.org) account
2. Create an API key at https://registry.comfy.org/nodes

### Steps to Publish

1. Install the comfy-cli tool:
   ```bash
   npm install -g @comfy-org/cli
   ```

2. Verify your pyproject.toml has the correct metadata:
   ```toml
   [project]
   name = "comfyui_example_frontend_extension"
   description = "A minimal example of integrating a React application with TypeScript as a ComfyUI extension."
   version = "0.1.0"  # Increment this with each update

   [tool.comfy]
   PublisherId = "your_publisher_id"
   DisplayName = "ComfyUI React Extension Example"
   ```

3. Publish your extension:
   ```bash
   comfy node publish
   ```

4. When prompted, enter your API key

### Automatic Publishing with GitHub Actions

You can set up GitHub Actions to automatically publish when you update the version in pyproject.toml:

1. Create a GitHub secret called `REGISTRY_ACCESS_TOKEN` with your API key
2. Create a `.github/workflows/publish.yml` file with the following content:

```yaml
name: Publish to ComfyUI Registry

on:
  push:
    paths:
      - 'pyproject.toml'
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install -g @comfy-org/cli
      - run: comfy node publish --token ${{ secrets.REGISTRY_ACCESS_TOKEN }}
```

## Resources

- [ComfyUI Registry Documentation](https://docs.comfy.org/registry/publishing)
- [ComfyUI API Documentation](https://docs.comfy.org)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/reference/react)

## License

MIT