'use client';

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
      <div className="flex items-center justify-between">
        <p>{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

