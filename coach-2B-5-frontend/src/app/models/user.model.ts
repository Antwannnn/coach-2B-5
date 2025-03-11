export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'ROLE_COACH' | 'ROLE_SPORTIF' | 'ROLE_RESPONSABLE';
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends Omit<User, 'id'> {
  password: string;
}
