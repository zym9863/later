import { useState, useEffect } from 'react';
import { FiPlus, FiBookOpen, FiInbox } from 'react-icons/fi';
import { TimeLogEntry as TimeLogEntryType } from '../types';
import { TimeLogEntry } from './TimeLogEntry';
import { getAllEntries, deleteEntry } from '../utils/storage';
import './TimeLogList.css';

interface TimeLogListProps {
  onEdit: (id: string) => void;
  onView: (id: string) => void;
  onCreateNew: () => void;
}

export function TimeLogList({ onEdit, onView, onCreateNew }: TimeLogListProps) {
  const [entries, setEntries] = useState<TimeLogEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  // Load entries when component mounts
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = () => {
    setLoading(true);
    try {
      const loadedEntries = getAllEntries();
      // Sort by date, newest first
      loadedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEntries(loadedEntries);
    } catch (error) {
      console.error('Failed to load entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    const success = deleteEntry(id);
    if (success) {
      setEntries(entries.filter(entry => entry.id !== id));
    } else {
      alert('删除失败，请重试');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div className="time-log-list">
      <div className="time-log-list-header">
        <h2>
          <FiBookOpen className="icon" />
          时光记录
        </h2>
        <button className="create-button" onClick={onCreateNew}>
          <FiPlus />
          新建记录
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="no-entries">
          <FiInbox className="empty-icon" />
          <p>还没有记录，点击"新建记录"开始记录你的时光吧！</p>
        </div>
      ) : (
        <div className="entries-container">
          {entries.map(entry => (
            <TimeLogEntry
              key={entry.id}
              entry={entry}
              onEdit={onEdit}
              onDelete={handleDelete}
              onClick={onView}
            />
          ))}
        </div>
      )}
    </div>
  );
}
