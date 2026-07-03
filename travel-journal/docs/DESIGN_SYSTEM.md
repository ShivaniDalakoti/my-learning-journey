# Travel Journal - Design System & Wireframes

## Design Specifications

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Primary | `#667eea` | Headers, CTAs, primary actions |
| Secondary | `#764ba2` | Accents, secondary elements |
| Success | `#48bb78` | Positive feedback, ratings |
| Warning | `#f6ad55` | Alerts, incomplete entries |
| Error | `#f56565` | Errors, delete actions |
| Light BG | `#f7fafc` | Page backgrounds |
| Dark BG | `#1a202c` | Dark mode backgrounds |
| Text Primary | `#2d3748` | Body text |
| Text Secondary | `#718096` | Secondary text |
| Border | `#e2e8f0` | Dividers, borders |

### Typography

- **Display**: Inter, 48px, Bold (H1)
- **Heading Large**: Inter, 32px, Bold (H2)
- **Heading Medium**: Inter, 24px, Bold (H3)
- **Heading Small**: Inter, 18px, Semibold (H4)
- **Body Large**: Inter, 16px, Regular
- **Body Small**: Inter, 14px, Regular
- **Label**: Inter, 12px, Semibold

### Spacing System

```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
```

### Component Library

#### Button
- **Default**: Background: #667eea, Text: White, Padding: 12px 24px
- **Outline**: Border: 2px #667eea, Background: Transparent
- **Small**: Height: 36px, Padding: 8px 16px
- **Large**: Height: 48px, Padding: 16px 32px

#### Card
- Border Radius: 8px
- Box Shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
- Padding: 16px

#### Input Field
- Border: 1px solid #e2e8f0
- Border Radius: 6px
- Padding: 10px 12px
- Font Size: 14px
- Focus: Border color #667eea, Box shadow 0 0 0 3px rgba(102, 126, 234, 0.1)

#### Badge
- Border Radius: 16px
- Padding: 4px 12px
- Font Size: 12px
- Background: #edf2f7
- Text Color: #2d3748

---

## Page Wireframes

### 1. Journal Feed Page

**Path**: `/` or `/entries`

#### Layout
```
┌─────────────────────────────────────────────────────┐
│  Travel Journal              [User Menu]            │
├─────────────────────────────────────────────────────┤
│  Search: [____________]  [📍 Location ▼] [⭐ ▼]    │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌──────────────────┐  ┌──────────────────┐         │
│  │  🏖️ Bali Trip   │  │ 🗼 Paris Visit  │         │
│  │  Dec 15 - 20     │  │ Jul 8 - 15      │         │
│  │  Rating: ⭐⭐⭐⭐⭐ │  │ Rating: ⭐⭐⭐⭐  │         │
│  │                  │  │                  │         │
│  │ [Read More →]    │  │ [Read More →]    │         │
│  └──────────────────┘  └──────────────────┘         │
│                                                       │
│  ┌──────────────────┐  ┌──────────────────┐         │
│  │ 🏔️ Tokyo Hike   │  │ 🌅 Barcelona...  │         │
│  │ Jun 1 - 5        │  │ May 10 - 25      │         │
│  │ Rating: ⭐⭐⭐⭐⭐ │  │ Rating: ⭐⭐⭐⭐  │         │
│  │                  │  │                  │         │
│  │ [Read More →]    │  │ [Read More →]    │         │
│  └──────────────────┘  └──────────────────┘         │
│                                                       │
│ [← Previous]                         [Next →]       │
└─────────────────────────────────────────────────────┘
```

#### Components
- **Header**: Logo, title, user menu (profile/logout)
- **Search Bar**: Text input with placeholder "Search trips..."
- **Filter Buttons**: Location filter, Rating filter
- **Trip Cards** (Grid, 2 columns on desktop, 1 on mobile):
  - Trip photo (placeholder)
  - Trip title
  - Dates
  - Location tag
  - Rating stars
  - Short description (2 lines max)
  - "Read More" button
- **Action Button**: "Add New Entry" floating button (bottom right)
- **Pagination**: Previous/Next buttons

#### Interactive Elements
- Click trip card → View entry detail page
- Click "Add New Entry" → Go to Add Entry form
- Filter by location → API call to get filtered entries
- Search functionality → Real-time search as user types

---

### 2. Add Entry / Edit Entry Page

**Path**: `/entries/new` or `/entries/:id/edit`

#### Layout
```
┌─────────────────────────────────────────────────────┐
│  Travel Journal              [← Back]               │
├─────────────────────────────────────────────────────┤
│                                                       │
│  New Travel Entry                                    │
│                                                       │
│  Trip Title *                                        │
│  [____________________________________]              │
│                                                       │
│  Start Date *          End Date *                    │
│  [____________]        [____________]                │
│                                                       │
│  Location *                                          │
│  [____________________________________]              │
│                                                       │
│  Latitude              Longitude                     │
│  [____________]        [____________]                │
│                                                       │
│  Description                                         │
│  [_______________________________________           │
│   _______________________________________           │
│   _______________________________________]          │
│                                                       │
│  Rating                                              │
│  ☆ ☆ ☆ ☆ ☆                                          │
│                                                       │
│  Mood                                                │
│  [ Amazing ]  [ Good ]  [ Okay ]  [ Bad ]           │
│                                                       │
│  Tags (comma-separated)                              │
│  [____________________________________]              │
│  [Beach] [Food] [Adventure] [Culture]               │
│                                                       │
│  Photos                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────┐   │
│  │ [Upload img] │  │ [Image 1]    │  │ [+]    │   │
│  └──────────────┘  └──────────────┘  └────────┘   │
│                                                       │
│  [Cancel]                            [Save Entry]   │
│                                                       │
└─────────────────────────────────────────────────────┘
```

#### Components
- **Header**: Back button, page title
- **Form Fields**:
  - Title (text input, required)
  - Start Date (date picker, required)
  - End Date (date picker, required)
  - Location (text input, required)
  - Coordinates (two number inputs, optional)
  - Description (textarea)
  - Rating (star rating 1-5)
  - Mood (button group: amazing, good, okay, bad)
  - Tags (text input with chips)
- **Image Upload**:
  - Drag-and-drop area
  - File input button
  - Image preview thumbnails
  - Delete button per image
- **Action Buttons**: Cancel, Save Entry

#### Validation
- All required fields marked with *
- Show error messages below fields
- Disable save button until required fields filled
- Show success toast after save

---

### 3. Entry Detail Page

**Path**: `/entries/:id`

#### Layout
```
┌─────────────────────────────────────────────────────┐
│  Travel Journal              [← Back] [Edit] [⋮]    │
├─────────────────────────────────────────────────────┤
│                                                       │
│  🏖️ Bali Trip                                        │
│  ═══════════════════════════════════════════════    │
│                                                       │
│  [Large trip image or carousel]                     │
│                                                       │
│  ─────────────────────────────────────────────      │
│  📅 December 15 - 20, 2023                           │
│  📍 Bali, Indonesia                                  │
│  ⭐ 5.0 / 5.0                                        │
│  😊 Amazing                                          │
│  ─────────────────────────────────────────────      │
│                                                       │
│  Description                                         │
│  ───────────────────────────                        │
│  An incredible journey through the beaches and       │
│  temples of Bali. The sunsets were breathtaking,    │
│  and the local food was outstanding. Made some      │
│  great new friends and memories here.               │
│                                                       │
│  Tags                                                │
│  ───────────────────────────                        │
│  [Beach] [Food] [Relaxation]                        │
│                                                       │
│  Gallery                                             │
│  ───────────────────────────                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
│  │ Image 1  │  │ Image 2  │  │ Image 3  │         │
│  └──────────┘  └──────────┘  └──────────┘         │
│  ┌──────────┐  ┌──────────┐                        │
│  │ Image 4  │  │ Image 5  │                        │
│  └──────────┘  └──────────┘                        │
│                                                       │
│  Map                                                 │
│  ───────────────────────────                        │
│  ┌─────────────────────────────────┐               │
│  │                                 │               │
│  │   [Interactive Map Pin: Bali]   │               │
│  │                                 │               │
│  └─────────────────────────────────┘               │
│                                                       │
│  [Delete Entry]                                      │
│                                                       │
└─────────────────────────────────────────────────────┘
```

#### Components
- **Header**: Back button, Edit button, Menu (delete)
- **Title**: Large, bold entry title
- **Hero Image**: Large image or carousel
- **Meta Information**:
  - Start/End dates
  - Location
  - Rating (stars)
  - Mood emoji
- **Description**: Full text content
- **Tags**: Pill/badge style display
- **Photo Gallery**: Grid of entry photos (clickable for lightbox)
- **Map View**: Embedded map with pin at coordinates
- **Actions**: Edit button, Delete button (with confirmation)

#### Interactive Elements
- Image carousel/lightbox
- Click map pin → show location details
- Edit button → Go to edit form
- Delete button → Show confirmation modal

---

## Component Definitions

### TripCard Component

**Props:**
```javascript
{
  id: string,
  title: string,
  startDate: Date,
  endDate: Date,
  location: string,
  rating: number (1-5),
  mood: 'amazing' | 'good' | 'okay' | 'bad',
  photoUrl?: string,
  excerpt?: string,
  onView: () => void
}
```

**Features:**
- Display trip summary
- Show primary photo
- Clickable to view full entry
- Hover effect shows shadow/scale

### EntryForm Component

**Props:**
```javascript
{
  initialData?: {
    id: string,
    title: string,
    startDate: Date,
    endDate: Date,
    location: string,
    latitude?: number,
    longitude?: number,
    description: string,
    rating: number,
    mood: string,
    tags: string[],
    photos: Array<{url: string, caption: string}>
  },
  onSubmit: (data) => void,
  onCancel: () => void
}
```

**Features:**
- Form validation
- Date range selection
- Image upload with preview
- Tag management
- Auto-save drafts (optional)

### MapView Component

**Props:**
```javascript
{
  entries: Array<{
    id: string,
    title: string,
    latitude: number,
    longitude: number
  }>,
  onMarkerClick: (entryId) => void,
  center?: { lat: number, lng: number },
  zoom?: number
}
```

**Features:**
- Display all entry locations
- Cluster markers if many
- Show popup on hover
- Click to navigate to entry

---

## Responsive Breakpoints

| Device | Width | Columns | Layout |
|--------|-------|---------|--------|
| Mobile | < 640px | 1 | Single column, full width |
| Tablet | 640px - 1024px | 2 | Two columns |
| Desktop | > 1024px | 3 | Three columns |

---

## Accessibility

- All buttons have proper ARIA labels
- Color contrast ratio ≥ 4.5:1 for text
- Form labels associated with inputs
- Keyboard navigation supported
- Images have alt text
- Skip to main content link
- Focus visible on interactive elements

---

## Animation & Transitions

- Page transitions: 300ms fade
- Button hover: 200ms scale (1.05)
- Card hover: 200ms shadow increase
- Toast notifications: 300ms slide in
- Modal: 250ms fade in
