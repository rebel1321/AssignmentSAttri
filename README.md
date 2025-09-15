# SaaS Contracts Dashboard

A modern React + Tailwind CSS application for managing SaaS contracts with AI-powered insights and analytics.

## 🚀 Live Demo

[View Live Demo](https://your-deployment-url.vercel.app) *(Will be updated after deployment)*

## 📋 Features

### Authentication
- Mock authentication system
- JWT token storage
- Protected routes
- User session management

### Dashboard
- Contracts overview with search and filtering
- Status-based filtering (Active, Renewal Due, Expired)
- Risk-level filtering (Low, Medium, High)
- Pagination (10 items per page)
- Responsive design for mobile and desktop

### Contract Management
- Detailed contract view with metadata
- AI-powered clause analysis with confidence scores
- Risk insights and recommendations
- Evidence panel with relevance scoring
- Contract status tracking

### File Upload
- Drag & drop interface
- Multiple file selection
- Upload progress tracking
- Simulated upload with success/error states
- File type validation (PDF, DOC, DOCX)

## 🛠️ Tech Stack

- **Framework**: React 19.1.1 (Functional components with hooks)
- **Styling**: Tailwind CSS 4.1.13
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: ESLint for code quality

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DashboardLayout.jsx
│   ├── ProtectedRoute.jsx
│   └── UploadModal.jsx
├── contexts/           # React Context providers
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── LoginPage.jsx
│   ├── ContractsDashboard.jsx
│   └── ContractDetailPage.jsx
├── services/           # API services
│   └── api.js
├── App.jsx             # Main app component
└── main.jsx           # App entry point

public/
└── contracts.json      # Mock API data
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/saas-contracts-dashboard.git
   cd saas-contracts-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The build files will be generated in the `dist/` directory.

## 🔐 Demo Credentials

Use any username with the password `test123` to log in.

Examples:
- Username: `admin` | Password: `test123`
- Username: `user` | Password: `test123`

## 📱 Features Overview

### 1. Login Page
- Clean, responsive login interface
- Mock authentication with any username + `test123` password
- JWT token storage in localStorage
- Auto-redirect to dashboard on successful login

### 2. Contracts Dashboard
- **Search**: Find contracts by name or parties
- **Filters**: Filter by status (Active, Renewal Due, Expired) and risk level (Low, Medium, High)
- **Pagination**: Navigate through contract pages (10 per page)
- **State Management**: Loading, empty, and error states
- **Responsive Table**: Mobile-friendly contract display

### 3. Contract Detail Page
- **Metadata Display**: Contract parties, dates, status, and risk score
- **Clauses Analysis**: AI-powered clause extraction with confidence scores
- **Risk Insights**: Categorized risk assessment with recommendations
- **Evidence Panel**: Supporting evidence with relevance scoring
- **Evidence Modal**: Detailed view of contract evidence

### 4. File Upload
- **Drag & Drop**: Intuitive file upload interface
- **Progress Tracking**: Real-time upload progress with status indicators
- **File Validation**: Support for PDF, DOC, DOCX files up to 10MB
- **Error Handling**: Graceful handling of upload failures

## 🎨 Design Decisions

### UI/UX Design
- **Modern Interface**: Clean, professional design with consistent spacing
- **Color Scheme**: Indigo primary with semantic colors for status indicators
- **Typography**: Clear hierarchy with proper font weights
- **Responsive**: Mobile-first approach with desktop enhancements

### Technical Architecture
- **Context API**: Lightweight state management for authentication
- **Component Structure**: Reusable components with clear separation of concerns
- **API Abstraction**: Service layer for easy API integration
- **Error Boundaries**: Comprehensive error handling throughout the app

### Performance Optimizations
- **Lazy Loading**: Component-based routing for better performance
- **Efficient Rendering**: Proper React hooks usage to minimize re-renders
- **Pagination**: Efficient data handling for large contract lists

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📦 Key Dependencies

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^6.x",
  "tailwindcss": "^4.1.13",
  "lucide-react": "^0.x",
  "vite": "^7.1.2"
}
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect to GitHub**
   - Push your code to a GitHub repository
   - Connect your Vercel account to GitHub

2. **Deploy**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configure**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node.js Version: 18.x or higher

### Netlify Deployment

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

## 🧪 Testing

The application includes comprehensive state management for:
- Loading states during API calls
- Error states with retry functionality
- Empty states with helpful messaging
- Success states with proper feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For any questions or issues, please open an issue on GitHub or contact [your-email@domain.com].

---

**Built with ❤️ using React and Tailwind CSS**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
