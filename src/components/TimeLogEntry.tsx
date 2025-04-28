import { TimeLogEntry as TimeLogEntryType } from '../types';
import { formatDate } from '../utils/helpers';
import { FiEdit2, FiTrash2, FiCalendar, FiFileText, FiImage } from 'react-icons/fi';
import './TimeLogEntry.css';

interface TimeLogEntryProps {
  entry: TimeLogEntryType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

export function TimeLogEntry({ entry, onEdit, onDelete, onClick }: TimeLogEntryProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(entry.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('确定要删除这条记录吗？')) {
      onDelete(entry.id);
    }
  };

  return (
    <div className="time-log-entry" onClick={() => onClick(entry.id)}>
      <div className="time-log-header">
        <h3 className="time-log-title">
          <FiFileText className="icon" />
          {entry.title}
        </h3>
        <span className="time-log-date">
          <FiCalendar className="icon" />
          {formatDate(entry.date)}
        </span>
      </div>

      <p className="time-log-content">{entry.content.length > 100
        ? `${entry.content.substring(0, 100)}...`
        : entry.content}
      </p>

      {entry.images && entry.images.length > 0 && (
        <div className="time-log-images-preview">
          <img
            src={entry.images[0]}
            alt="Entry preview"
            className="time-log-image-thumbnail"
          />
          {entry.images.length > 1 && (
            <span className="time-log-image-count">
              <FiImage />
              +{entry.images.length - 1}
            </span>
          )}
        </div>
      )}

      <div className="time-log-actions">
        <button className="edit-button" onClick={handleEdit}>
          <FiEdit2 />
          编辑
        </button>
        <button className="delete-button" onClick={handleDelete}>
          <FiTrash2 />
          删除
        </button>
      </div>
    </div>
  );
}
