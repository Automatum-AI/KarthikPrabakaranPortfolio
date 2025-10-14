import React from 'react';

interface BodyProps {
  children: React.ReactNode;
}

export function Body({ children }: BodyProps) {
  return (
    <div className="body-layout">
      {children}
    </div>
  );
}