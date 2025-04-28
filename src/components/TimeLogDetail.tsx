import { useEffect, useState } from 'react';
import { FiArrowLeft, FiEdit2, FiCalendar, FiFileText, FiImage, FiAlertCircle } from 'react-icons/fi';
import { TimeLogEntry } from '../types';
import { getEntryById } from '../utils/storage';
import { formatDate } from '../utils/helpers';
import './TimeLogDetail.css';

interface TimeLogDetailProps {
  id: string;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export function TimeLogDetail({ id, onBack, onEdit }: TimeLogDetailProps) {
  const [entry, setEntry] = useState<TimeLogEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEntry();
  }, [id]);

  const loadEntry = () => {
    setLoading(true);
    try {
      const loadedEntry = getEntryById(id);
      setEntry(loadedEntry);
    } catch (error) {
      console.error('Failed to load entry:', error);
    } finally {
      setLoading(false);
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

  if (!entry) {
    return (
      <div className="time-log-detail">
        <div className="detail-header">
          <button className="back-button" onClick={onBack}>
            <FiArrowLeft />
            返回
          </button>
          <h2>记录不存在</h2>
        </div>
        <div className="detail-content">
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <FiAlertCircle style={{ fontSize: '3rem', color: 'var(--text-tertiary)', marginBottom: '16px' }} />
            <p>找不到该记录，可能已被删除。</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="time-log-detail">
      <div className="detail-header">
        <button className="back-button" onClick={onBack}>
          <FiArrowLeft />
          返回
        </button>
        <button className="edit-button" onClick={() => onEdit(id)}>
          <FiEdit2 />
          编辑
        </button>
      </div>

      <div className="detail-content">
        <h1 className="detail-title">
          <FiFileText className="icon" />
          {entry.title}
        </h1>
        <p className="detail-date">
          <FiCalendar className="icon" />
          {formatDate(entry.date)}
        </p>

        <div className="detail-text">
          {entry.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {entry.images && entry.images.length > 0 && (
          <div className="detail-images">
            <h3 className="detail-images-title">
              <FiImage className="icon" />
              图片 ({entry.images.length})
            </h3>
            {entry.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="detail-image"
                onClick={() => window.open(image, '_blank')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
