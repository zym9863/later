[中文](README.md) | [English](README_EN.md)

# Later - Time Recording Application

"Later" is an elegant time recording application that allows users to create, edit, and save entries with dates, text, and images. This application is built with React and TypeScript, providing a modern, responsive user interface.

## Features

- Create and edit time logs with titles, content, and dates
- Support for adding multiple images to each entry
- Beautiful card layout to display all entries
- Detailed view to see full entry content and images
- Responsive design that adapts to various screen sizes
- Local storage of data, no backend server required
- Modern user interface with animations and transition effects

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 6
- **Styling**: CSS (custom design system)
- **Icons**: React Icons
- **Storage**: Browser LocalStorage

## Project Structure

```
src/
├── assets/            # Static resource files
├── components/        # React components
│   ├── Header.tsx     # Application header component
│   ├── TimeLogList.tsx # Entry list component
│   ├── TimeLogEntry.tsx # Single entry card component
│   ├── TimeLogDetail.tsx # Entry detail component
│   └── TimeLogForm.tsx # Create/edit entry form component
├── types/             # TypeScript type definitions
│   └── index.ts       # Define TimeLogEntry interface
├── utils/             # Utility functions
│   ├── helpers.ts     # Helper functions (ID generation, date formatting, etc.)
│   └── storage.ts     # Local storage operation functions
├── App.tsx            # Main application component
├── App.css            # Application global styles
├── index.css          # Global CSS variables and base styles
└── main.tsx           # Application entry point
```

## Design System

The application uses a custom design system, including:

- **Colors**: Main color scheme is purple-blue (#5b6cf9), complemented by orange (#f97316) as an accent
- **Shadows**: Multi-level shadow effects to enhance depth
- **Rounded Corners**: Unified border radius for a modern feel
- **Animations**: Smooth transition animations to enhance user experience
- **Icons**: Using React Icons to provide a consistent icon style

## Data Model

The core data model is `TimeLogEntry`, defined as follows:

```typescript
interface TimeLogEntry {
  id: string;         // Unique identifier
  title: string;      // Entry title
  content: string;    // Entry content
  date: string;       // ISO format date string
  images?: string[];  // Optional array of Base64 encoded images
}
```

## Local Storage

The application uses the browser's LocalStorage to store all entry data. The main storage operations include:

- `getAllEntries()`: Get all entries
- `saveEntry(entry)`: Save a new entry
- `updateEntry(entry)`: Update an existing entry
- `deleteEntry(id)`: Delete an entry
- `getEntryById(id)`: Get a single entry by ID

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

### Build Production Version

```bash
npm run build
```

## Future Plans

- Add dark mode support
- Implement entry categorization and tagging
- Add search and filtering functionality
- Support cloud synchronization
- Add more custom theme options

## License

MIT
