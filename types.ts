
export interface User {
  email: string;
  full_name?: string;
  id_number?: string;
  phone_number?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (data: { user: User; token: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface Feature {
    title: string;
    description: string;
    images: string[];
}

export interface Service {
    title: string;
    description: string;
    icon: React.ReactNode;
}