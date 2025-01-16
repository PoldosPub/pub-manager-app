import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`border rounded-lg shadow p-4 bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div
      className={`border-b pb-2 font-semibold ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div
      className={`py-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div
      className={`border-t pt-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
