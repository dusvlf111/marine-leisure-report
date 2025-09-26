# AI Coding Agent Instructions

## Project Overview
**AI 기반 해양레저스포츠 자율신고제도 MVP** - Korean marine leisure safety reporting system addressing the critical information gap that causes conflicts between leisure participants and fishermen. Built with Next.js 15, TypeScript, React 19, and Leaflet maps.

**Core Mission**: Provide comprehensive pre-activity reporting system integrating multiple public APIs for safety analysis, weather data, fishing rights information, and emergency response to reduce marine leisure conflicts by 30%.

## Architecture & Key Patterns

### Core Structure
- **Next.js App Router**: All routes in `src/app/` with API routes in `src/app/api/`
- **Component Architecture**: Domain-driven organization in `src/components/` (forms, map, safety, ui, layout)
- **Type Safety**: Centralized types in `src/types/global.ts` with strict TypeScript configuration
- **Utility Functions**: Shared logic in `src/lib/utils/` (especially `mapUtils.ts` for geospatial calculations)
- **Mock Data System**: Comprehensive marine data simulation in `src/lib/data/mockData.ts` - includes 20+ coastal locations, safety zones, weather patterns

### Business Logic Flow
1. **Pre-Activity Reporting**: Users submit activity plans via `ReportForm.tsx`
2. **Multi-API Integration**: System queries weather, fishing rights, navigation warnings
3. **AI Safety Analysis**: Rule-based scoring considers activity type compatibility, weather conditions, legal restrictions
4. **Visual Feedback**: Map-based safety zones with color-coded risk levels
5. **Emergency Response**: Integrated contact system for coast guard and rescue services

### Color Palette System (Critical)
All components use a consistent 4-color palette defined inline:
- `#F3F3E0` (light beige) - backgrounds
- `#133E87` (dark blue) - primary text/accent
- `#608BC1` (medium blue) - secondary elements  
- `#CBDCEB` (light blue) - cards/highlights

**Never use arbitrary colors** - reference existing components for proper usage patterns.

### Map Integration Patterns
```tsx
// Always use DynamicMapView for SSR safety
import DynamicMapView from '@/components/map/DynamicMapView';

// Leaflet components require client-side only
'use client';
// Use configureLeafletIcons() from leafletConfig.ts
```

Key files:
- `DynamicMapView.tsx` - SSR-safe wrapper with error boundaries
- `MapView.tsx` - Main Leaflet integration  
- `leafletConfig.ts` - Icon configuration for SSR
- `mapUtils.ts` - Geospatial calculations (distance, validation, formatting)

### Form Patterns
All forms use `react-hook-form` + `zod` validation with Korean error messages:
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reportSchema } from '@/lib/data/schemas';
```

**Key Form Components**:
- `LocationSelector` - Dropdown + map integration for location selection
- `ActivitySelector` - Marine sports activity type selection (패들보드, 카약, 윈드서핑, etc.)
- `ContactForm` - User contact information with emergency contact validation

### API Route Structure
```typescript
// Standard response format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
```

**Critical API Endpoints**:
- `POST /api/report/submit` - Main reporting endpoint with comprehensive safety analysis
- `GET /api/safety/analysis` - Real-time safety scoring for locations
- Mock data includes realistic Korean coastal locations (부산, 여수, 강릉, etc.) with actual geographic coordinates

## Development Commands

### Essential Scripts
```bash
npm run dev          # Start with Turbopack (faster)
npm run build        # Build with Turbopack  
npm test             # Jest unit tests
npm run test:e2e     # Playwright E2E tests
```

### Testing Approach
- **Unit Tests**: Jest + Testing Library setup in `jest.config.js`
- **E2E Tests**: Playwright configuration in `playwright.config.ts`
- **Mock Data**: Comprehensive marine location/safety data in `src/lib/data/mockData.ts`

### Task Management (Critical)
**Follow strict task progression from `docs/MVP_Task List.md`**:
- Tasks 1.0-7.0 are complete (setup through results page)
- Task 8.0 (testing) is in progress 
- **ONE subtask at a time** - wait for user approval before proceeding
- Update task checkboxes `[ ]` → `[x]` immediately upon completion
- Reference `docs/tasks/task-list-management.mdc` for detailed workflow rules

## Component Conventions

### UI Components
Located in `src/components/ui/` - follow compound component pattern:
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
```

### Styling Approach
- **Tailwind CSS** + inline styles for color palette
- **Animate.css** for entrance animations
- **Glassmorphism effects** using `backdrop-blur-md` and color palette

### Error Handling
- Map components use error boundaries with fallback UI
- API routes return consistent error response format
- Form validation uses Zod schemas with Korean error messages

## Critical Integration Points

### Geospatial Data Flow
1. User selects location via `LocationSelector` (dropdown + map)
2. Coordinates sent to `/api/safety/analysis` for AI safety scoring
3. Results include weather, fishing rights, navigation warnings
4. Uses `calculateDistance()` from `mapUtils.ts` for proximity checks

### Safety Analysis Logic
Mock AI analysis in API routes considers:
- Activity type compatibility with location
- Weather conditions simulation
- Fishing rights restrictions  
- Navigation route proximity
- Historical safety data

### State Management
Currently uses React state + props drilling. Key shared state:
- Selected location (coordinates + metadata)
- Safety analysis results
- Form submission status

## Known Issues & Priorities

### Critical Issues (from `docs/Critical_Priority_Tasks.md`)
- **Code Duplication**: Multiple MapView versions cleaned up, but watch for new duplicates
- **SSR/Leaflet Problems**: Solved with DynamicMapView pattern but requires `'use client'` directive
- **Color Consistency**: 4-color palette must be maintained - never introduce arbitrary colors
- **Type Safety**: Eliminate remaining `any` types, add proper type guards

### Performance Requirements (from PRD)
- **API Response Time**: Must be under 3 seconds
- **Concurrent Users**: Support 1,000 simultaneous users
- **Mobile Optimization**: 3G network compatibility required
- **Availability**: 99.5% uptime target

## Files Requiring Special Attention

- `src/lib/utils/mapUtils.ts` - Core geospatial utilities, recently consolidated
- `src/components/map/DynamicMapView.tsx` - SSR/client-side rendering boundary
- `src/app/api/report/submit/route.ts` - Main report processing logic
- `docs/Critical_Priority_Tasks.md` - Development roadmap and known issues

## Marine Domain Terminology

### Activity Types (Korean)
- 패들보드 (Paddleboard)
- 프리다이빙 (Free diving)
- 카약 (Kayak)
- 윈드서핑 (Windsurfing)
- 수상스키 (Water skiing)
- 요트 (Yacht)

### Safety Status Levels
- `APPROVED` - 승인됨 (Green)
- `CAUTION` - 주의 (Yellow)
- `DENIED` - 거부됨 (Red)

### Key Stakeholders
- 해양레저스포츠 참여자 (Marine leisure participants)
- 어업인 (Fishermen)
- 해양경찰 (Coast Guard)
- 구조기관 (Rescue organizations)

## Debugging Notes

- **Map Loading Issues**: Check browser-only execution in `leafletConfig.ts`
- **Korean Text**: Components include Korean strings - preserve Unicode correctly
- **Build Errors**: Turbopack enabled - fallback to standard Next.js build if issues occur
- **Type Errors**: Strict TypeScript config - resolve all type issues before committing