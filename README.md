# Pred - Advanced Trading Platform

<div align="center">
  <img src="public/logo.svg" alt="Pred Logo" width="120" height="120">
  
  **Advanced trading and prediction platform with real-time market data**
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)](https://vitejs.dev/)
  [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?logo=redux)](https://redux-toolkit.js.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
</div>

## 🚀 Features

### 🎯 **Core Trading Features**

- **Market Orders** - Instant execution at current market price with immediate position creation
- **Limit Orders** - Set specific price levels for buy/sell orders with automatic execution
- **Real-time Position Tracking** - Live position monitoring with dynamic PnL calculations
- **Order Management** - View, modify, and cancel pending limit orders
- **Trade History** - Complete record of executed trades with fees and realized PnL

### 📊 **Advanced Portfolio Management**

- **Real-time PnL Calculation** - Live profit/loss updates based on current market prices
- **Position Sizing** - Percentage-based position sizing with balance allocation
- **ROI Tracking** - Real-time return on investment calculations for all positions
- **Margin Tracking** - Monitor margin usage and available balance
- **Multi-Asset Support** - Trade multiple assets with individual position tracking

### 📈 **Real-time Market Data**

- **Live Price Updates** - Real-time asset price feeds with 500ms refresh rate
- **Price Direction Indicators** - Visual indicators for price movements (up/down)
- **Bid/Offer Spreads** - Current market bid and offer prices
- **Historical Price Data** - Track price changes and percentage movements
- **Market Mid-Price** - Real-time mid-market pricing for optimal execution

### 🔄 **Order Execution System**

- **Instant Market Execution** - Market orders execute immediately at current price
- **Limit Order Queue** - Pending limit orders with partial fill tracking
- **Order Validation** - Price and quantity validation before order placement
- **Smart Order Routing** - Automatic routing to positions or open orders based on type
- **Order Notifications** - Toast notifications for successful order execution

### 💰 **Financial Management**

- **Balance Tracking** - Real-time account balance updates
- **Fee Calculation** - Automatic trading fee computation (0.1% default)
- **Realized PnL** - Track actual profits/losses from closed positions
- **Unrealized PnL** - Live unrealized gains/losses on open positions
- **Capital Allocation** - Percentage-based capital allocation with visual indicators

### 📱 **User Experience Features**

- **Progressive Web App (PWA)** - Installable app with offline capabilities
- **Responsive Design** - Optimized for desktop and mobile devices
- **Real-time Notifications** - Success/error notifications for all trading actions
- **Intuitive Interface** - Clean, modern UI with component library
- **Tab-based Navigation** - Easy switching between Open Orders, Positions, and Trade History

### 🛡️ **Risk Management**

- **Price Validation** - Prevent invalid limit orders (buy below/sell above market)
- **Quantity Validation** - Ensure positive quantities for all orders
- **Balance Checks** - Prevent orders exceeding available balance
- **Position Limits** - Monitor position sizes and exposure
- **Error Handling** - Comprehensive error handling with user feedback

### 🔧 **Technical Features**

- **State Management** - Efficient state management with Redux Toolkit
- **Local Storage** - Persistent data storage for positions and orders
- **TypeScript Support** - Full type safety and development experience
- **Performance Monitoring** - Built-in performance tracking and optimization
- **API Integration** - Real-time data integration with external trading APIs

## 📋 Trading Workflow

### 🎯 **Place Orders**

1. **Choose Order Type**: Select between Market or Limit orders
2. **Set Parameters**: Enter price (for limit orders) and quantity
3. **Position Sizing**: Use percentage-based allocation or manual entry
4. **Order Validation**: System validates price and quantity constraints
5. **Execute Order**: Market orders execute instantly, limit orders queue for execution

### 📊 **Monitor Positions**

1. **Real-time Updates**: Positions update every 500ms with current market prices
2. **PnL Tracking**: Live calculation of unrealized profits/losses
3. **ROI Monitoring**: Real-time return on investment percentages
4. **Position Management**: Close positions manually or let them run
5. **Risk Assessment**: Monitor margin usage and exposure levels

### 📈 **Track Performance**

1. **Trade History**: Complete record of all executed trades
2. **Realized PnL**: Track actual profits/losses from closed positions
3. **Fee Tracking**: Monitor trading fees and costs
4. **Performance Analytics**: Analyze trading patterns and success rates
5. **Export Data**: Download trading history for external analysis

### 🔄 **Order Management**

1. **Open Orders**: View all pending limit orders
2. **Order Status**: Track filled/unfilled quantities
3. **Cancel Orders**: Cancel pending orders before execution
4. **Modify Orders**: Update price or quantity (coming soon)
5. **Order History**: Complete audit trail of all order activity

## 🛠️ Tech Stack

### Frontend Framework

- **React 18.2.0** - Modern React with hooks and concurrent features
- **TypeScript 5.2.2** - Full type safety and enhanced developer experience
- **Vite 5.0.8** - Lightning-fast build tool and development server

### State Management & Routing

- **Redux Toolkit 2.8.2** - Predictable state container
- **React Redux 9.1.0** - Official React bindings for Redux
- **React Router DOM 6.22.0** - Declarative routing

### UI & Styling

- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Sass 1.70.0** - CSS preprocessor for advanced styling
- **Tailwind Merge 2.2.1** - Utility for merging Tailwind classes

### Development & Build Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS post-processing
- **Autoprefixer** - CSS vendor prefixing
- **Terser** - JavaScript minification

### PWA & Performance

- **Vite PWA Plugin** - Progressive Web App capabilities
- **Service Worker** - Offline functionality and caching
- **Performance Monitoring** - Built-in performance tracking

## 📁 Project Structure

```
fe-pred/
├── public/                 # Static assets
│   ├── pwa/               # PWA icons and assets
│   ├── logo.svg           # App logo
│   └── robots.txt         # Search engine directives
├── src/
│   ├── assets/            # Images, icons, and static files
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Shared components
│   │   └── home/          # Page-specific components
│   ├── contexts/          # React contexts
│   ├── enum/              # TypeScript enums
│   ├── hooks/             # Custom React hooks
│   ├── interface/         # TypeScript interfaces
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── redux/             # Redux store and slices
│   ├── scss/              # Global SCSS styles
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── router.config.tsx  # Routing configuration
├── dist/                  # Build output
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **Yarn** (v1.22 or higher) or **npm**

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd fe-pred
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start the development server**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. **Open your browser**

   The app will be available at `http://localhost:9028` (or another port if 9028 is in use)

## 📜 Available Scripts

| Script         | Description                              |
| -------------- | ---------------------------------------- |
| `yarn dev`     | Start development server with hot reload |
| `yarn build`   | Build the app for production             |
| `yarn preview` | Preview the production build locally     |
| `yarn lint`    | Run ESLint to check code quality         |

## 🔧 Configuration

### Environment Variables

The app uses modern configuration for development and production environments.

### PWA Configuration

The app is configured as a Progressive Web App with:

- **Installable** - Can be installed on devices
- **Caching Strategy** - Intelligent caching for performance
- **Responsive** - Works on all device sizes
- **Shortcuts** - Quick access to Portfolio and Trade features

### Build Optimization

- **Code Splitting** - Automatic code splitting for better performance
- **Tree Shaking** - Remove unused code
- **Minification** - Compressed JavaScript and CSS
- **Asset Optimization** - Optimized images and fonts

## 🎨 Styling

The project uses a combination of:

- **Tailwind CSS** - For utility-first styling
- **SCSS** - For complex styling and mixins
- **CSS Modules** - For component-scoped styles

## 🔗 API Integration

The app integrates with external APIs through:

- **Axios** - HTTP client for API requests
- **Proxy Configuration** - Development proxy for CORS handling
- **Error Handling** - Robust error handling and retry logic

## 📱 PWA Features

- **Offline Support** - Works without internet connection
- **Installation** - Can be installed on devices
- **Push Notifications** - Real-time trading notifications
- **Background Sync** - Sync data when connection is restored

## 🚀 Deployment

### Production Build

```bash
yarn build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment Platforms

This app can be deployed to:

- **Vercel** - Recommended for Vite apps
- **Netlify** - Static site hosting
- **GitHub Pages** - Free hosting for public repos
- **AWS S3 + CloudFront** - Scalable cloud hosting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Code Style

- **ESLint** - Follow the configured ESLint rules
- **TypeScript** - Use proper typing throughout
- **Component Structure** - Follow React best practices
- **File Naming** - Use camelCase for files and PascalCase for components

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use** - The dev server will automatically find an available port
2. **Build errors** - Make sure all dependencies are installed correctly
3. **TypeScript errors** - Check your type definitions and imports

### Performance Tips

- Use React DevTools for debugging
- Monitor bundle size with build analyzer
- Optimize images and assets
- Use lazy loading for large components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples
- Email: **sjais973@gmail.com** for direct support

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript, and Vite</p>
</div>
