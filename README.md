# Kevin Agyeman - Portfolio Website

A modern, full-stack personal portfolio website showcasing projects, skills, and professional experience. Built with performance, accessibility, and maintainability in mind.

🌐 **Live Site**: [www.kevinagyeman.com](https://www.kevinagyeman.com)

## ✨ Features

- **Dynamic Project Showcase** - Display projects with detailed descriptions, tech stacks, and live links
- **Admin Dashboard** - Full-featured CMS for managing content without code changes
- **Interactive Code Viewer** - Visualize profile data in multiple programming languages
- **Responsive Design** - Optimized for all devices with Tailwind CSS
- **Dark Mode** - Automatic theme switching with user preference persistence
- **PDF Resume Viewer** - Embedded resume with fallback support
- **Contact Form** - Easy way for visitors to get in touch
- **CDN Fallback** - Automatic local fallbacks when CDN is blocked
- **Type-Safe** - Full TypeScript + Zod validation for reliability
- **SEO Optimized** - Built-in sitemap generation and meta tags

## 🛠️ Tech Stack

### Frontend
- **Framework**: Astro 5.x (Static Site Generation)
- **UI Library**: React 19 (Islands Architecture)
- **Styling**: Tailwind CSS 4.x
- **Forms**: React Hook Form + Zod validation
- **Code Quality**: Biome (Linting & Formatting)
- **Deployment**: Vercel

### Backend
- **Framework**: Django 5.x + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: JWT with httpOnly cookies
- **Media Storage**: CDN integration
- **API**: RESTful endpoints with CORS support

---

## 🏗️ Architecture

This project follows a **decoupled architecture** with a clear separation between frontend and backend:

- **Frontend (Astro + React)**: Statically generated pages with React islands for interactivity
- **Backend (Django REST API)**: Provides RESTful endpoints for content management
- **Authentication**: JWT tokens stored in httpOnly cookies for security
- **Media Handling**: CDN for images/files with automatic local fallbacks
- **Deployment**: Frontend on Vercel, Backend on your preferred platform

### Key Design Decisions

- **Islands Architecture**: Only interactive components are hydrated (better performance)
- **Type Safety**: TypeScript + Zod ensure runtime validation
- **Error Handling**: Comprehensive try-catch blocks with user-friendly messages
- **Accessibility**: ARIA labels, keyboard navigation, semantic HTML
- **Performance**: Lazy loading, code splitting, optimized assets

---

## 💎 Code Quality

This project maintains high code quality standards:

✅ **A+ Grade** - Comprehensive error handling
✅ **Type Safe** - Full TypeScript with Zod validation
✅ **No Memory Leaks** - Proper cleanup in useEffect hooks
✅ **Secure** - No XSS vulnerabilities, proper authentication
✅ **Accessible** - WCAG compliant with ARIA support
✅ **Tested** - React best practices followed throughout

### Frontend Best Practices
- Error boundaries for graceful failure handling
- Loading states for all async operations
- Proper React hooks usage with correct dependencies
- setTimeout/setInterval cleanup to prevent memory leaks
- Unique stable keys for list items

### Backend Best Practices
- Django REST Framework for API consistency
- Proper CORS configuration
- JWT authentication with secure cookies
- Database migrations for schema management

---

## 📝 License

This project is for personal use and portfolio demonstration.
Feel free to use the code structure as inspiration for your own projects.

---

## 👤 Author

**Kevin Agyeman**
- Website: [www.kevinagyeman.com](https://www.kevinagyeman.com)
- GitHub: [@kevinagyeman](https://github.com/kevinagyeman)
- LinkedIn: [kevinagyeman](https://www.linkedin.com/in/kevinagyeman/)

---

## ⭐ Acknowledgments

Built with love using modern web technologies. Special thanks to the open-source community for the amazing tools and libraries that made this project possible.

If you find this project helpful or interesting, please consider giving it a star! ⭐