# Wedding Website - Project Documentation

## 📋 Project Overview

This is a modern, clean React + TypeScript wedding website built with Vite, Tailwind CSS, and React Router. It follows best practices for component architecture, code organization, and reusability.

### Technology Stack
- **Frontend Framework**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS with custom configurations
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Package Manager**: npm

---

## 📁 Folder Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── Button.tsx       # Button component with variants
│   │   ├── Section.tsx      # Section wrapper component
│   │   ├── SectionTitle.tsx # Title component for sections
│   │   ├── GalleryCard.tsx  # Image gallery card
│   │   └── index.ts         # Barrel export
│   ├── layout/              # Layout components
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Footer.tsx       # Footer with links
│   │   └── index.ts         # Barrel export
│   └── IntroPage.tsx        # Animated intro/pre-page
├── pages/                   # Page components
│   ├── HomePage.tsx         # Landing/home page
│   ├── OurStoryPage.tsx     # Our story timeline
│   ├── EventDetailsPage.tsx # Event schedule & info
│   ├── RSVPPage.tsx         # RSVP form
│   ├── GalleryPage.tsx      # Photo gallery
│   ├── ContactPage.tsx      # Contact form
│   └── index.ts             # Barrel export
├── context/                 # React Context for state management
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── App.tsx                  # Main app component with routing
├── App.css                  # Global styles
├── index.css                # Tailwind directives & animations
├── main.tsx                 # React entry point
└── vite-env.d.ts           # Vite type definitions

public/                      # Static assets
tailwind.config.js          # Tailwind configuration
postcss.config.js           # PostCSS configuration
tsconfig.json               # TypeScript configuration
vite.config.ts              # Vite configuration
package.json                # Dependencies & scripts
```

---

## 🎨 Component Architecture

### Common Components

#### Button
Reusable button component with multiple variants.

```tsx
<Button variant="primary" size="lg">Click me</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline'
- `size`: 'sm' | 'md' | 'lg'
- `onClick`: callback function
- `disabled`: boolean
- `type`: 'button' | 'submit' | 'reset'

#### Section
Wrapper component for page sections with background color options.

```tsx
<Section bgColor="rose">
  <h2>Section Title</h2>
</Section>
```

**Props:**
- `bgColor`: 'white' | 'gray' | 'rose'
- `id`: string for anchoring
- `className`: additional Tailwind classes

#### SectionTitle
Title component for section headers.

```tsx
<SectionTitle subtitle="A subtitle">Main Title</SectionTitle>
```

#### GalleryCard
Card component for displaying images with optional title/description.

```tsx
<GalleryCard 
  image="url" 
  title="Title"
  alt="alt text"
/>
```

### Layout Components

#### Header
Navigation header with active link tracking.

#### Footer
Footer with quick links and contact information.

---

## 📄 Page Details

### 1. IntroPage
**Route:** `/`

Animated intro screen displayed on first visit:
- Full-screen gradient background
- Animated floating elements
- Click-to-enter interaction
- Fade-out animation on exit
- Smooth transition to home page

### 2. HomePage
**Route:** `/home`

Main landing page featuring:
- Hero section with welcome message
- Quick info cards (Date, Location, Time)
- Call-to-action buttons
- Links to other pages

### 3. OurStoryPage
**Route:** `/story`

Story timeline including:
- Timeline of relationship milestones
- His & Her perspectives
- Custom animations
- Meaningful dates and events

### 4. EventDetailsPage
**Route:** `/events`

Event information page with:
- Event schedule with times and locations
- Important information boxes
- Dress code guidelines
- Hotel accommodations
- Parking information

### 5. RSVPPage
**Route:** `/rsvp`

RSVP form with:
- Guest information collection
- Attendance confirmation
- Dietary restriction tracking
- Number of guests selection
- Success confirmation message

### 6. GalleryPage
**Route:** `/gallery`

Photo gallery featuring:
- Grid layout of images
- Hover effects with zoom
- Social media sharing callout
- Hashtag suggestion

### 7. ContactPage
**Route:** `/contact`

Contact page with:
- Contact form
- Multiple contact methods (email, phone)
- Social media links
- Venue map placeholder

---

## 🎯 Key Features

### Responsive Design
All pages are fully responsive using Tailwind's breakpoints:
- Mobile: 320px
- Tablet: 640px (sm), 768px (md), 1024px (lg)

### Custom Colors
Extended Tailwind color palette:
- Rose colors for wedding theme
- Gold colors for accents (optional)

### Animations
Pre-built animations in `index.css`:
- `fadeIn`: Smooth opacity transition
- `slideDown`: Fade + slide down
- `scaleIn`: Fade + scale in
- `float`: Floating effect for background elements

### Form Handling
Built-in form handling with:
- State management using `useState`
- Validation ready
- Success confirmation messages
- Easy backend integration

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

---

## 📝 Styling Approach

### Tailwind CSS
- **Utility-first approach**: Compose styles with Tailwind classes
- **Dark mode support**: Can be enabled in `tailwind.config.js`
- **Custom theme**: Extended colors, fonts, and animations

### CSS Layers
- `@layer base`: Base element styles
- `@layer components`: Reusable component classes (buttons, sections)
- `@layer utilities`: Custom utility classes

### Example:
```tsx
<button className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
  Click me
</button>
```

---

## 🔧 Customization Guide

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      // Add custom colors
      wedding: {
        primary: '#ec4899',
        secondary: '#fbbf24',
      }
    }
  }
}
```

### Adding Pages
1. Create new page file in `src/pages/`
2. Export from `src/pages/index.ts`
3. Add route in `App.tsx`:
```tsx
<Route path="/newpage" element={<MainLayout><NewPage /></MainLayout>} />
```

### Extending Components
Modify existing components in `src/components/`:
```tsx
// Add new props
interface NewProps extends ExistingProps {
  newProp: string;
}
```

### Custom Animations
Add to `src/index.css`:
```css
@keyframes myAnimation {
  from { /* styles */ }
  to { /* styles */ }
}

.my-animation {
  animation: myAnimation 0.6s ease-out;
}
```

---

## 💾 State Management

Currently using React's built-in `useState`. For larger applications, consider:

### Option 1: Context API (included in project)
Use `src/context/` for global state:
```tsx
// Create context
const WeddingContext = createContext();

// Wrap app
<WeddingContext.Provider value={state}>
  <App />
</WeddingContext.Provider>
```

### Option 2: External Libraries
- Redux
- Zustand
- Jotai
- Recoil

---

## 🎓 Best Practices Implemented

✅ **Component Composition**: Small, reusable components
✅ **TypeScript**: Full type safety
✅ **Separation of Concerns**: Clear folder structure
✅ **Responsive Design**: Mobile-first approach
✅ **Accessibility**: Semantic HTML, focus states
✅ **Performance**: Code splitting via React Router
✅ **DRY Principle**: Reusable components & utilities
✅ **Clean Code**: Descriptive naming, comments where needed

---

## 🔄 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Platforms
- **Vercel** (recommended for React/Vite)
- **Netlify**
- **GitHub Pages**
- **AWS Amplify**
- **Self-hosted** (nginx, Apache)

### Environment Variables
Create `.env` file:
```
VITE_API_URL=https://api.example.com
VITE_SITE_NAME=Our Wedding
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 🐛 Troubleshooting

### Styles not applying
- Ensure Tailwind directives in `index.css`
- Check `tailwind.config.js` content paths
- Rebuild CSS: `npm run dev`

### Components not found
- Check barrel exports in `index.ts` files
- Verify import paths are correct
- Use IDE's "Go to Definition" to verify

### Routing issues
- Ensure all routes are in `App.tsx`
- Check path names match links
- Verify `BrowserRouter` wraps all routes

### Performance issues
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Lazy load components with `React.lazy()`

---

## 📞 Support & Maintenance

### Regular Updates
- Update dependencies: `npm update`
- Check for security vulnerabilities: `npm audit`
- Test in multiple browsers

### Adding Features
1. Plan component structure
2. Create component/page file
3. Add TypeScript interfaces
4. Implement logic
5. Test thoroughly
6. Update documentation

---

**Last Updated**: January 2026
**Version**: 1.0.0
**License**: MIT
