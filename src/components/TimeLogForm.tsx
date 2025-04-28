import { useState, useEffect, useRef } from 'react';
import { FiEdit, FiSave, FiX, FiFileText, FiAlignLeft, FiImage, FiUpload, FiTrash2 } from 'react-icons/fi';
import { TimeLogEntry } from '../types';
import { generateId, fileToBase64 } from '../utils/helpers';
import './TimeLogForm.css';

interface TimeLogFormProps {
  entry?: TimeLogEntry;
  onSave: (entry: TimeLogEntry) => void;
  onCancel: () => void;
}

export function TimeLogForm({ entry, onSave, onCancel }: TimeLogFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If editing an existing entry, populate the form
  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setImages(entry.images || []);
    }
  }, [entry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('标题和内容不能为空');
      return;
    }

    setIsSubmitting(true);

    try {
      const savedEntry: TimeLogEntry = {
        id: entry?.id || generateId(),
        title: title.trim(),
        content: content.trim(),
        date: entry?.date || new Date().toISOString(),
        images: images.length > 0 ? images : undefined
      };

      onSave(savedEntry);
    } catch (error) {
      console.error('Failed to save entry:', error);
      alert('保存失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const newImages = [...images];

      for (let i = 0; i < files.length; i++) {
        const base64 = await fileToBase64(files[i]);
        newImages.push(base64);
      }

      setImages(newImages);
    } catch (error) {
      console.error('Failed to process images:', error);
      alert('图片处理失败，请重试');
    }

    // Clear the input to allow uploading the same file again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form className="time-log-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2 className="form-title">
          <FiEdit className="icon" />
          {entry ? '编辑记录' : '创建新记录'}
        </h2>
        <p className="form-subtitle">
          {entry ? '修改你的时光记录' : '记录下你想留给后来的时光'}
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="title">
          <FiFileText className="icon" />
          标题
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="输入标题..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">
          <FiAlignLeft className="icon" />
          内容
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="记录你的想法、事件或感受..."
          rows={6}
          required
        />
      </div>

      <div className="form-group">
        <label>
          <FiImage className="icon" />
          图片
        </label>

        <div className="file-input-container">
          <label className="file-input-button" onClick={triggerFileInput}>
            <FiUpload className="icon" />
            选择图片
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />

          {images.length > 0 && (
            <div className="image-preview-container">
              {images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image} alt={`Preview ${index}`} />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                    aria-label="删除图片"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          <FiX />
          取消
        </button>
        <button
          type="submit"
          className="save-button"
          disabled={isSubmitting}
        >
          <FiSave />
          {isSubmitting ? '保存中...' : '保存'}
        </button>
      </div>
    </form>
  );
}
