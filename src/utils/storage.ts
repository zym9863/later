import { TimeLogEntry } from '../types';

const STORAGE_KEY = 'later_time_logs';

// Get all time log entries
export const getAllEntries = (): TimeLogEntry[] => {
  const entriesJson = localStorage.getItem(STORAGE_KEY);
  if (!entriesJson) return [];
  
  try {
    return JSON.parse(entriesJson) as TimeLogEntry[];
  } catch (error) {
    console.error('Failed to parse time log entries:', error);
    return [];
  }
};

// Save a new time log entry
export const saveEntry = (entry: TimeLogEntry): void => {
  const entries = getAllEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

// Update an existing time log entry
export const updateEntry = (updatedEntry: TimeLogEntry): boolean => {
  const entries = getAllEntries();
  const index = entries.findIndex(entry => entry.id === updatedEntry.id);
  
  if (index === -1) return false;
  
  entries[index] = updatedEntry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return true;
};

// Delete a time log entry
export const deleteEntry = (id: string): boolean => {
  const entries = getAllEntries();
  const filteredEntries = entries.filter(entry => entry.id !== id);
  
  if (filteredEntries.length === entries.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEntries));
  return true;
};

// Get a single time log entry by ID
export const getEntryById = (id: string): TimeLogEntry | null => {
  const entries = getAllEntries();
  const entry = entries.find(entry => entry.id === id);
  return entry || null;
};
