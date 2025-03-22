'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ResumeUploadProps {
  maxSizeMB?: number;
  allowedFileTypes?: string[];
}

export default function ResumeUpload({
  maxSizeMB = 5,
  allowedFileTypes = ['.pdf', '.doc', '.docx']
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');
    
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    // Validate file type
    const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      setError(`File type must be one of: ${allowedFileTypes.join(', ')}`);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setSuccess(true);
      setFile(null);
    } catch (err) {
      setError('Failed to upload resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
        {!file ? (
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              accept={allowedFileTypes.join(',')}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700">
                Drop your resume here or click to upload
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: {allowedFileTypes.join(', ')}
              </p>
              <p className="text-sm text-gray-500">
                Max size: {maxSizeMB}MB
              </p>
            </label>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
              {uploading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
      )}
      
      {success && (
        <div className="mt-4 text-green-600 text-sm text-center">
          Resume uploaded successfully!
        </div>
      )}
    </div>
  );
} 