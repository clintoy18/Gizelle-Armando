# Architecture & Best Practices Guide

## 🏗️ Architecture Overview

This wedding website follows a **component-based architecture** with clear separation of concerns.

```
┌─────────────────────────────────────┐
│          App.tsx (Router)           │
│  ┌──────────────┬──────────────────┐│
│  │ Intro Page   │ Main Layout      ││
│  │              │ ┌──────────────┐ ││
│  │              │ │ Header       │ ││
│  │              │ ├──────────────┤ ││
│  │              │ │ Pages        │ ││
│  │              │ │ - Home       │ ││
│  │              │ │ - Story      │ ││
│  │              │ │ - Events     │ ││
│  │              │ │ - Gallery    │ ││
│  │              │ │ - RSVP       │ ││
│  │              │ │ - Contact    │ ││
│  │              │ ├──────────────┤ ││
│  │              │ │ Footer       │ ││
│  │              │ └──────────────┘ ││
│  └──────────────┴──────────────────┘│
└─────────────────────────────────────┘
```

## 📦 Component Hierarchy

### Component Types

1. **Layout Components** (Layout boundary)
   - Header
   - Footer
   - Used across all pages

2. **Page Components** (Route boundary)
   - HomePage
   - OurStoryPage
   - EventDetailsPage
   - RSVPPage
   - GalleryPage
   - ContactPage

3. **Common Components** (Reusable)
   - Button (with variants)
   - Section (layout container)
   - SectionTitle (typography)
   - GalleryCard (image display)

4. **Specialized Components** (One-off)
   - IntroPage (animated entrance)

## 🎯 Component Design Principles

### 1. Single Responsibility Principle (SRP)
Each component does ONE thing well.

```tsx
// ✅ Good: Button only handles button logic
<Button onClick={handleClick}>Click</Button>

// ❌ Avoid: Button with complex internal logic
<Button fetchDataAndSubmit={true}>Click</Button>
```

### 2. DRY (Don't Repeat Yourself)
Extract reusable logic into separate components.

```tsx
// ✅ Good: Reusable component
const InfoCard = ({ icon, title, content }) => (
  <div className="p-6 bg-gray-50 rounded-lg">
    <span className="text-4xl mb-4">{icon}</span>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600">{content}</p>
  </div>
);

// Use in multiple pages
<InfoCard icon="📅" title="Date" content="June 15, 2024" />
```

### 3. Props Over Context (When Possible)
Keep data flow explicit.

```tsx
// ✅ Better: Props clearly show dependencies
<Section bgColor={isDark ? "gray" : "white"}>
  <SectionTitle>Title</SectionTitle>
</Section>

// ❌ Less clear: Hidden context dependency
<Section>
  <SectionTitle />
</Section>
```

### 4. Composition Over Inheritance
Build complex UIs from simple pieces.

```tsx
// ✅ Good: Composing components
<Section>
  <SectionTitle>Gallery</SectionTitle>
  <div className="grid grid-cols-3 gap-4">
    {images.map(img => <GalleryCard key={img.id} {...img} />)}
  </div>
</Section>

// ❌ Avoid: Complex inheritance hierarchies
class AdvancedGallery extends Section { ... }
```

## 📊 Data Flow

### State Management Pattern

```tsx
// Page component manages state
const RSVPPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // ...
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send to server
  };

  return (
    <Section>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
      </form>
    </Section>
  );
};
```

### Props Pattern

```tsx
// Parent passes data to child
const HomePage = () => {
  const quickInfo = [
    { icon: '📅', title: 'Date', value: 'June 15, 2024' },
    // ...
  ];

  return (
    <div>
      {quickInfo.map(info => (
        <InfoCard key={info.title} {...info} />
      ))}
    </div>
  );
};

// Child receives and displays
const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value }) => (
  <div className="text-center">
    <span className="text-4xl">{icon}</span>
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);
```

## 🎨 Styling Architecture

### Tailwind Utility Classes
Used for all styling - no CSS files needed for components.

```tsx
// Component styling via className
<button className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
  Submit
</button>
```

### Global Styles (index.css)
- Tailwind directives (@tailwind)
- Custom components (@layer components)
- Animations and keyframes
- Base styles (@layer base)

### CSS Modules (Optional)
For complex component styling:

```typescript
// Button.module.css
.primaryButton {
  @apply px-6 py-3 bg-rose-500 text-white rounded-lg;
}

// Button.tsx
import styles from './Button.module.css';
<button className={styles.primaryButton}>
```

## 🔄 Routing Architecture

### Route Structure

```tsx
<Router>
  <Routes>
    {/* Intro page - no header/footer */}
    <Route path="/" element={<IntroPage />} />
    
    {/* All other pages - with header/footer */}
    <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
    <Route path="/story" element={<MainLayout><OurStoryPage /></MainLayout>} />
    {/* ... */}
  </Routes>
</Router>
```

### Navigation Patterns

```tsx
// Using React Router Link
import { Link } from 'react-router-dom';

<Link to="/story">
  <Button>Our Story</Button>
</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/home');

// Active link styling
const { pathname } = useLocation();
const isActive = pathname === '/home';
```

## 📝 TypeScript Patterns

### Component Props Interface

```tsx
interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bgColor?: 'white' | 'gray' | 'rose';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  bgColor = 'white',
}) => {
  // ...
};
```

### Form Data Interface

```tsx
interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no' | 'maybe';
  guests: string;
  dietary: string;
  message: string;
}

const [formData, setFormData] = useState<RSVPFormData>({
  // ...
});
```

### Event Handlers

```tsx
const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
  // Fully typed
};

const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault();
  // Fully typed
};
```

## 🧪 Testing Considerations

### Unit Testing (Component)
```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Integration Testing (Pages)
```tsx
// HomePage.test.tsx
test('homepage renders all sections', () => {
  render(<HomePage />);
  expect(screen.getByText('Welcome to Our Wedding')).toBeInTheDocument();
});
```

### E2E Testing (User flows)
```tsx
// cypress/e2e/rsvp-flow.cy.ts
describe('RSVP Flow', () => {
  it('should submit RSVP form', () => {
    cy.visit('/rsvp');
    cy.get('input[name="name"]').type('John Doe');
    cy.get('button[type="submit"]').click();
    cy.contains('Thank you');
  });
});
```

## 🚀 Performance Optimization

### Code Splitting
```tsx
// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const OurStoryPage = lazy(() => import('./pages/OurStoryPage'));

// Use Suspense
<Suspense fallback={<Loading />}>
  <HomePage />
</Suspense>
```

### Memoization
```tsx
// Prevent unnecessary re-renders
const GalleryCard = memo(({ image, title }: GalleryCardProps) => {
  return <div>{/* ... */}</div>;
});
```

### Image Optimization
```tsx
// Use next-gen formats
<img src="image.webp" alt="description" />

// Or lazy load
<img loading="lazy" src="image.jpg" alt="description" />
```

## 🔐 Security Best Practices

### Input Validation
```tsx
const handleEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

### Sanitization
```tsx
// Prevent XSS
import DOMPurify from 'dompurify';

const safeHTML = DOMPurify.sanitize(userInput);
```

### Environment Variables
```tsx
// Store sensitive data in .env
const API_URL = import.meta.env.VITE_API_URL;

// Never commit secrets
```

## 📱 Responsive Design Checklist

- ✅ Mobile-first approach
- ✅ Breakpoint coverage (sm, md, lg, xl)
- ✅ Touch-friendly buttons (min 44x44px)
- ✅ Readable font sizes
- ✅ Proper spacing on all devices
- ✅ Tested on multiple screen sizes

## 🎯 Common Patterns

### Conditional Rendering
```tsx
{submitted ? (
  <SuccessMessage />
) : (
  <Form />
)}
```

### List Rendering with Keys
```tsx
{items.map(item => (
  <Item key={item.id} {...item} />
))}
```

### Event Handling
```tsx
const handleClick = () => { /* ... */ };
<Button onClick={handleClick}>Click</Button>
```

### Form Handling
```tsx
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />
```

## 📚 File Organization Tips

1. **Group by feature/page** when appropriate
2. **One component per file** (with small exceptions)
3. **Keep related files together**
4. **Use index.ts for barrel exports**
5. **Separate concerns** (logic, presentation, styling)

---

**Remember**: Code is read more often than it's written. Optimize for clarity and maintainability!
