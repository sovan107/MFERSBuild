# Microfrontend Services Management

This repository contains scripts to easily manage all microfrontend applications in the project.

## 🚀 Quick Start

### Using PowerShell Script (Recommended)

```powershell
# Stop all services and start fresh
.\manage.ps1 restart

# Start all services
.\manage.ps1 start

# Stop all services
.\manage.ps1 stop

# Check service status
.\manage.ps1 status

# Show help
.\manage.ps1 help
```

### Using Batch File (Alternative)

```cmd
# Double-click manage-services.bat or run:
.\manage-services.bat start
.\manage-services.bat stop
.\manage-services.bat restart
```

## 📁 Project Structure

```
MFERSBuild/
├── host/           # Host Application (React 18) - Port 3000
├── child/          # Child App (React 17) - Port 3001  
├── child18/        # Child18 App (React 18) - Port 3002
├── manage.ps1      # Simple PowerShell management script
├── manage-services.ps1  # Advanced PowerShell script (if needed)
└── manage-services.bat  # Batch wrapper
```

## 🔧 Services

| Service | Description | Port | Technology |
|---------|-------------|------|------------|
| **Host** | Main application that consumes other microfrontends | 3000 | React 18 + Module Federation |
| **Child** | Legacy React 17 microfrontend with mount/unmount | 3001 | React 17 + Module Federation |
| **Child18** | Modern React 18 microfrontend with routing | 3002 | React 18 + React Router + Module Federation |

## 🌟 Features

### Host Application Features
- 🔍 **Search Integration**: Search bar that filters products in Child18 app
- 🎯 **Auto-navigation**: Automatically navigates to products page when searching
- 🎨 **Visual Feedback**: Dynamic styling when search is active
- 📱 **Responsive Design**: Works across different screen sizes

### Child18 Application Features
- 🧭 **React Router**: Full routing with Home, About, and Products pages
- 🛍️ **Product Catalog**: Interactive product browsing with categories
- 🛒 **Shopping Cart**: Add/remove products functionality
- 🔍 **Search Integration**: Receives search keywords from host app
- 🎨 **Modern UI**: Clean, responsive design with hover effects

### Module Federation Setup
- ⚡ **Hot Module Replacement**: Live updates during development
- 🔄 **Independent Deployment**: Each app can be deployed separately
- 🌐 **Cross-Framework Support**: React 17 and React 18 working together
- 🔒 **Type Safety**: Proper TypeScript integration

## 📋 Usage Instructions

### 1. First Time Setup
```powershell
# Install dependencies for all apps
cd host && npm install
cd ../child && npm install  
cd ../child18 && npm install
cd ..
```

### 2. Development Workflow
```powershell
# Start all services
.\manage.ps1 restart

# Wait for all services to be ready (check status)
.\manage.ps1 status

# Open in browser
# Host: http://localhost:3000
# Child: http://localhost:3001  
# Child18: http://localhost:3002
```

### 3. Testing the Search Feature
1. Open the host application at `http://localhost:3000`
2. Use the search bar in the header
3. Try searching for: `"React"`, `"Module"`, `"Testing"`, `"Management"`
4. The app will automatically scroll to Child18 and show filtered results

### 4. Navigation Testing
1. In the Child18 section, click the navigation buttons
2. Test all routes: Home, About, Products
3. Verify the routing works properly within the microfrontend

## 🛠️ Troubleshooting

### Ports Already in Use
```powershell
# Stop all services and restart
.\manage.ps1 restart
```

### Services Not Starting
```powershell
# Check status
.\manage.ps1 status

# Stop all and restart
.\manage.ps1 stop
# Wait a few seconds
.\manage.ps1 start
```

### Router Navigation Issues
The Child18 app uses `HashRouter` for better microfrontend compatibility. If you experience navigation issues:

1. Check that Child18 is running on port 3002
2. Verify the module federation configuration
3. Ensure the host is properly loading the remote component

## 🎯 Access URLs

When all services are running:

- **Host Application**: http://localhost:3000
- **Child (React 17)**: http://localhost:3001
- **Child18 (React 18)**: http://localhost:3002

## 🤝 Contributing

1. Make changes to individual apps
2. Test using the management scripts
3. Ensure all services work together
4. Update this README if needed

## 📝 Notes

- The script automatically opens new PowerShell windows for each service
- You can close individual service windows to stop specific services
- The host application depends on both child applications being available
- Search functionality requires both host and child18 to be running
