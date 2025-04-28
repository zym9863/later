export interface TimeLogEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  images?: string[]; // Base64 encoded images or URLs
}
