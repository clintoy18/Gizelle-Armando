# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript wedding website built with Vite, Tailwind CSS, and React Router. It features a component-based architecture with clear separation of concerns, responsive design, and custom animations.

**Tech Stack:**
- React 19.2.0 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router v6 (routing)
- Framer Motion (animations)
- Lucide React (icons)

## Common Development Commands

### Setup & Installation
```bash
npm install          # Install dependencies
```

### Development
```bash
npm run dev          # Start dev server with HMR (http://localhost:5173)
```

### Building & Testing
```bash
npm run build        # Build for production (TypeScript check + Vite build)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint on all TypeScript/TSX files
```

### Single Test/File Development
```bash
# ESLint specific file
npm run lint -- src/components/Button.tsx

# Build and check specific file
npm run build        # Full build (includes type checking)
```

## Project Architecture

### High-Level Structure

```
App.tsx (Router)
├── IntroPage (/) - Standalone animated intro screen
└── MainLayout (all other routes)
    ├── Header (Navigation)
    ├── Pages (Route-specific content)
    │   ├── HomePage (/home)
    │   ├── OurStoryPage (/story)
    │   ├── EventDetailsPage (/events)
    │   ├── RSVPPage (/rsvp)
    │   ├── GalleryPage (/gallery)
    │   └── ContactPage (/contact)
    └── Footer
```

### Component Organization

**src/components/common/** - Reusable UI components
- `Button.tsx` - Button with variants (primary, secondary, outline) and sizes (sm, md, lg)
- `Section.tsx` - Page section wrapper with background color options (white, gray, rose)
- `SectionTitle.tsx` - Section header with optional subtitle
- `GalleryCard.tsx` - Image card component for galleries

**src/components/layout/** - Layout components used across pages
- `Header.tsx` - Navigation header with active link tracking
- `Footer.tsx` - Footer with links and contact info

**src/components/Intro.tsx** - Animated intro/splash screen

**src/pages/** - Page components (one per route)
- Each page is a self-contained component managing its own state
- Pages are wrapped in `MainLayout` (except IntroPage) which provides Header/Footer

### Data Flow & State Management

**Current approach:** React's built-in `useState` for local component state
- Page components manage their own state (e.g., form data in RSVPPage)
- Props are passed down to child components
- No global state management currently in place

**For future expansion:** Context API structure exists in `src/context/` for global state if needed.

### Styling Architecture

**Tailwind CSS** - Utility-first approach
- All component styling uses Tailwind classes in `className` attributes
- No separate CSS files for components (except global `index.css`)
- Custom animations and base styles defined in `src/index.css` using `@layer` directives

**Key Tailwind customizations** (in `tailwind.config.js`):
- Extended color palette (rose colors for wedding theme)
- Custom animations (fadeIn, slideDown, scaleIn, float)
- Responsive breakpoints (mobile-first design)

**Global styles** (`src/index.css`):
- Tailwind directives (@tailwind)
- Custom component classes (@layer components)
- Keyframe animations (@keyframes)
- Base element styles (@layer base)

### Routing Architecture

**React Router v6** with two main patterns:

1. **Intro Page** - Standalone route without layout
   ```tsx
   <Route path="/" element={<IntroPage />} />
   ```

2. **Main Pages** - All wrapped in MainLayout for consistent Header/Footer
   ```tsx
   <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
   ```

**Navigation:**
- Use React Router's `<Link>` component for navigation
- Use `useNavigate()` hook for programmatic navigation
- Use `useLocation()` to get current pathname for active link styling

## Key Design Patterns

### Component Props Pattern
Components receive data via props rather than fetching internally. Example:
```tsx
// Parent passes data
<InfoCard icon="📅" title="Date" value="June 15, 2024" />

// Child receives and displays
interface InfoCardProps {
  icon: string;
  title: string;
  value: string;
}
```

### Form Handling Pattern
Page components manage form state with `useState`:
```tsx
const [formData, setFormData] = useState<FormDataType>({...});
const handleChange = (e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
const handleSubmit = (e) => { e.preventDefault(); /* submit logic */ };
```

### Conditional Rendering
Use ternary operators for simple conditions:
```tsx
{submitted ? <SuccessMessage /> : <Form />}
```

### List Rendering
Always use unique `key` prop when mapping:
```tsx
{items.map(item => <Item key={item.id} {...item} />)}
```

## TypeScript Conventions

- **Component Props:** Define `interface ComponentNameProps` for all component props
- **Form Data:** Define `interface FormDataType` for form state
- **Event Handlers:** Use React's typed event handlers (`React.ChangeEventHandler`, `React.FormEventHandler`)
- **React.FC:** Use `React.FC<Props>` for component type annotations

Example:
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  // ...
};
```

## Common Development Tasks

### Adding a New Page
1. Create `src/pages/NewPage.tsx` with component
2. Export from `src/pages/index.ts`
3. Add route in `App.tsx`:
   ```tsx
   <Route path="/newpage" element={<MainLayout><NewPage /></MainLayout>} />
   ```
4. Add navigation link in `Header.tsx`

### Creating a Reusable Component
1. Create in `src/components/common/ComponentName.tsx`
2. Define `interface ComponentNameProps`
3. Export from `src/components/common/index.ts`
4. Use in pages/other components

### Adding Custom Animations
1. Define `@keyframes` in `src/index.css`
2. Create utility class in `@layer utilities`
3. Apply via `className` in components

### Styling a Component
- Use Tailwind utility classes in `className`
- For complex styling, add custom classes to `src/index.css` using `@layer components`
- Avoid creating separate CSS files for individual components

## Important Files & Their Purposes

- **App.tsx** - Main router configuration, all routes defined here
- **src/index.css** - Global styles, animations, Tailwind directives
- **tailwind.config.js** - Tailwind theme customization (colors, animations, etc.)
- **vite.config.ts** - Vite build configuration
- **eslint.config.js** - ESLint rules (React hooks, TypeScript, React Refresh)
- **tsconfig.app.json** - TypeScript compiler options for app code
- **tsconfig.node.json** - TypeScript compiler options for build files

## Linting & Code Quality

**ESLint Configuration:**
- Enforces React hooks rules (dependencies, rules of hooks)
- TypeScript type checking
- React Refresh plugin for HMR
- Recommended ESLint rules

**Run linting:**
```bash
npm run lint              # Check all files
npm run lint -- --fix    # Auto-fix issues
```

**Common issues:**
- Missing dependencies in `useEffect` - ESLint will warn
- Unused variables - ESLint will flag
- Type mismatches - TypeScript will error during build

## Performance Considerations

- **Code Splitting:** React Router automatically code-splits pages
- **Lazy Loading:** Can use `React.lazy()` for components if needed
- **Memoization:** Use `React.memo()` for components that receive same props frequently
- **Image Optimization:** Use `loading="lazy"` for images below the fold

## Responsive Design

- **Mobile-first approach:** Start with mobile styles, add breakpoints for larger screens
- **Tailwind Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)
- **Example:** `className="text-sm md:text-base lg:text-lg"`
- **Touch targets:** Ensure buttons/interactive elements are at least 44x44px

## Environment Variables

Create `.env` file in root for environment-specific values:
```
VITE_API_URL=https://api.example.com
VITE_SITE_NAME=Our Wedding
```

Access in code:
```tsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## Deployment

**Build for production:**
```bash
npm run build
```

**Recommended platforms:**
- Vercel (optimized for React/Vite)
- Netlify
- GitHub Pages
- AWS Amplify

The build output is in the `dist/` directory.

## Troubleshooting

**Styles not applying:**
- Check Tailwind directives in `src/index.css`
- Verify `tailwind.config.js` content paths include `src/**/*.{tsx,ts}`
- Restart dev server

**Components not found:**
- Check barrel exports in `index.ts` files
- Verify import paths (use relative paths or configured aliases)

**Type errors:**
- Run `npm run build` to see full TypeScript errors
- Check component prop interfaces match usage

**HMR not working:**
- Restart dev server
- Check browser console for errors
- Verify Vite config is correct
