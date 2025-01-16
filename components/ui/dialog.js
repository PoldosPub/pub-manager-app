import React from 'react';

export function Dialog({ children, isOpen, onOpenChange, className = '', ...props }) {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className}`}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogContent({ children, className = '', onClick, ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-4 max-w-md w-full ${className}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogHeader({ children, className = '', ...props }) {
  return (
    <div className={`border-b pb-2 mb-4 font-bold text-lg ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ children, className = '', ...props }) {
  return (
    <h2 className={`text-xl font-bold ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function DialogFooter({ children, className = '', ...props }) {
  return (
    <div className={`border-t pt-2 mt-4 flex justify-end ${className}`} {...props}>
      {children}
    </div>
  );
}
