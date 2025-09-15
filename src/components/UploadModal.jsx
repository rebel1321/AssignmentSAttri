import React, { useState, useRef } from 'react';
import { uploadApi } from '../services/api';
import { 
  Upload, 
  X, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Cloud
} from 'lucide-react';

const UploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = fileList.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      status: 'pending', // pending, uploading, success, error
      progress: 0,
      error: null
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Start uploading each file
    newFiles.forEach(fileItem => {
      uploadFile(fileItem);
    });
  };

  const uploadFile = async (fileItem) => {
    // Update status to uploading
    setFiles(prev => prev.map(f => 
      f.id === fileItem.id 
        ? { ...f, status: 'uploading', progress: 0 }
        : f
    ));

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map(f => 
          f.id === fileItem.id && f.progress < 90
            ? { ...f, progress: f.progress + Math.random() * 20 }
            : f
        ));
      }, 200);

      // Call the upload API
      await uploadApi.uploadFile(fileItem.file);
      
      clearInterval(progressInterval);
      
      // Update to success
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id 
          ? { ...f, status: 'success', progress: 100 }
          : f
      ));
    } catch (error) {
      // Update to error
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id 
          ? { ...f, status: 'error', error: error.message }
          : f
      ));
    }
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (file) => {
    switch (file.status) {
      case 'pending':
        return 'Pending...';
      case 'uploading':
        return `Uploading... ${Math.round(file.progress)}%`;
      case 'success':
        return 'Uploaded successfully';
      case 'error':
        return file.error || 'Upload failed';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <dialog id="upload-modal" className="modal" open>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <Upload className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Upload Files</h2>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Upload Area */}
            <div
              className={`
                relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
                ${dragActive 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Cloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-gray-500">
                  Support for PDF, DOC, DOCX files up to 10MB
                </p>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFiles(Array.from(e.target.files))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  Uploaded Files ({files.length})
                </h3>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 mr-3">
                        {getStatusIcon(file.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {file.name}
                          </p>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-gray-400 hover:text-red-500 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.size)}
                          </p>
                          <p className={`text-xs ${
                            file.status === 'success' ? 'text-green-600' :
                            file.status === 'error' ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {getStatusText(file)}
                          </p>
                        </div>
                        
                        {/* Progress Bar */}
                        {file.status === 'uploading' && (
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                              style={{ width: `${file.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              {files.length > 0 && (
                <>
                  {files.filter(f => f.status === 'success').length} of {files.length} files uploaded
                </>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add More Files
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default UploadModal;