# 🎬 Movie Watchlist - Frontend

The frontend application for a full-stack movie watchlist manager. Provides a beautiful, responsive interface for users to discover movies and manage their personal watchlist.

## 🚀 Live Demo

**Frontend:** [https://movie-watchlist-frontend.vercel.app](https://movie-watchlist-frontend.vercel.app)

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT token-based authentication
- Protected routes for authenticated users
- Automatic redirect to login when accessing protected features

### 🎯 Movie Discovery
- Browse all available movies
- Search movies by title
- Filter movies by genre
- View detailed movie information
- Responsive movie grid layout

### 📝 Watchlist Management
- Add movies to personal watchlist with one click
- Visual feedback for movies already in watchlist ("Added" button)
- Update watch status (Planned, Watching, Completed, Dropped)
- Rate movies from 1-10
- Add personal notes
- Remove movies from watchlist
- Persistent watchlist across sessions

### 🎨 UI/UX Highlights
- Modern dark-themed design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Loading states for better UX
- Mobile-friendly navigation menu
- Toast notifications for user actions

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build tool and dev server |
| **Tailwind CSS v4** | Styling and theming |
| **React Router DOM v7** | Client-side routing |
| **Axios** | API request handling |
| **Lucide React** | Icon library |
| **Vercel** | Hosting and deployment |

## 📁 Project Structure


## 🚀 Local Setup

### Prerequisites
- Node.js (v18 or higher)
- Backend API running (see backend repo)

### Installation

```bash
# Clone the repository
git clone https://github.com/rahulbandekar/Movie-Watchlist-Frontend.git
cd Movie-Watchlist-Frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5001" > .env

# Start development server
npm run dev


## 🔗 API Integration

This frontend communicates with the backend API at:

- **Development:** `http://localhost:5001`
- **Production:** `https://movie-watchlist-api-euko.onrender.com`

### API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/register` | User registration |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| GET | `/movies` | Fetch all movies |
| GET | `/movies/:id` | Fetch movie details |
| GET | `/watchlist` | Fetch user's watchlist |
| POST | `/watchlist` | Add movie to watchlist |
| PUT | `/watchlist/:id` | Update watchlist item |
| DELETE | `/watchlist/:id` | Remove from watchlist |

## 🎯 Features in Detail

### Authentication Flow

1. User registers with name, email, password
2. On login, JWT token is stored in localStorage
3. Token is automatically added to all subsequent requests
4. Protected routes check for authentication
5. 401 responses automatically redirect to login

### Watchlist Button States

| State | Button Appearance |
|-------|-------------------|
| "Watchlist" | Movie not in watchlist (red button) |
| "Added" | Movie already in watchlist (green, disabled) |
| "Adding..." | Loading state during API call |
| "Loading..." | Initial watchlist check in progress |

### Search and Filter

- Real-time movie search by title
- Genre-based filtering with buttons
- Combined search + filter functionality

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| Mobile (< 768px) | 1 column grid, stacked navbar |
| Tablet (768px - 1024px) | 2-3 column grid |
| Desktop (> 1024px) | 4 column grid |

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

### Manual Deployment via GitHub

1. Push code to GitHub repository
2. Import project to [Vercel](https://vercel.com)
3. Add environment variable `VITE_API_URL`
4. Deploy

### Vercel Configuration

The `vercel.json` file handles client-side routing:

```json
{
    "rewrites": [
      { "source": "/(.*)", "destination": "/" }
    ],
    "headers": [
      {
        "source": "/assets/(.*)",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      }
    ]
  }

  ## 🧪 Testing the App

### Test Credentials

```text
Email: test@example.com
Password: 123456


### Test Flow

1. Register a new account
2. Login with your credentials
3. Browse movies on the home page
4. Search for specific movies
5. Filter by genre
6. Add movies to your watchlist
7. Navigate to Watchlist page
8. Update status and rating
9. Remove movies from watchlist

## 📦 Build for Production

```bash
npm run build

The build output will be in the `dist/` folder.

## 🤝 Related Repository

- **Backend API:** [Movie-Watchlist-API](https://github.com/rahulbandekar/Movie-Watchlist-API)

## 📄 License

MIT License

## 👨‍💻 Author

**Rahul Bandekar**

- GitHub: [@rahulbandekar](https://github.com/rahulbandekar)

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

## 🙏 Acknowledgments

- [PedroTech](https://www.youtube.com/@pedrotechnologies) - Backend course inspiration
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) - Amazing styling framework