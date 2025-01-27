// src/auth/types/user.type.ts
export type User = {
    id: number;
    name: string;
    email: string;
    role: 'STUDENT' | 'DONOR' | 'ADMIN';
    createdAt: Date;
    // Don't include the password here
  };
  