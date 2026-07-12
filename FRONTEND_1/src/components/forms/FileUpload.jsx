import React, { useRef, useState } from 'react';
import { UploadCloud, File, Trash2 } from 'lucide-react';
import Button from '../common/Button';

export const FileUpload = ({
  onFileSelect,
  accept = "*",
  multiple = false,
  label = "Upload files",
}) => {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const processFiles = (files) => {
    const filesArray = Array.from(files);
    setSelectedFiles((prev) => {
      const next = multiple ? [...prev, ...filesArray] : filesArray;
      if (onFileSelect) onFileSelect(next);
      return next;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => {
      const next = prev.filter((_, idx) => idx !== index);
      if (onFileSelect) onFileSelect(next);
      return next;
    });
  };

  return (
    <div style={styles.container}>
      <label style={styles.label}>{label}</label>
      <div 
        style={{
          ...styles.dropZone,
          borderColor: isDragActive ? 'var(--color-primary)' : 'var(--border-color)',
          backgroundColor: isDragActive ? 'var(--color-primary-light)' : 'var(--input-bg)',
        }}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <UploadCloud size={32} style={styles.uploadIcon} />
        <p style={styles.prompt}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Click to upload</span> or drag and drop
        </p>
        <p style={styles.subtext}>Files up to 10MB</p>
        <input 
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div style={styles.fileList}>
          {selectedFiles.map((file, idx) => (
            <div key={idx} style={styles.fileRow}>
              <div style={styles.fileInfo}>
                <File size={16} style={{ marginRight: '8px', color: 'var(--text-secondary)' }} />
                <span style={styles.fileName}>{file.name}</span>
                <span style={styles.fileSize}>({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button onClick={() => removeFile(idx)} style={styles.deleteBtn}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  },
  dropZone: {
    border: '2px dashed var(--border-color)',
    borderRadius: 'var(--radius-md)',
    padding: '32px 24px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIcon: {
    color: 'var(--text-muted)',
    marginBottom: '12px',
  },
  prompt: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '4px',
  },
  subtext: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  fileList: {
    marginTop: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  fileRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'var(--surface-color)',
    border: '1px solid var(--border-color)',
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '13px',
  },
  fileName: {
    color: 'var(--text-primary)',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '220px',
  },
  fileSize: {
    color: 'var(--text-muted)',
    marginLeft: '6px',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--color-danger)',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
  },
};

export default FileUpload;
