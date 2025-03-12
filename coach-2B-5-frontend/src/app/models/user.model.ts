export interface User {
  id: string | number; // UUID ou number pour la compatibilité
  nom: string;
  prenom: string;
  email: string;
  role: 'ROLE_COACH' | 'ROLE_SPORTIF' | 'ROLE_RESPONSABLE' | 'ROLE_USER' | 'ROLE_ADMIN';
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserRegistration extends Omit<User, 'id'> {
  password: string;
}

export class AuthUser {
  constructor(
    public email: string = "",
    public roles: string[] = []
  ) {}

  isAdmin(): boolean {
    return this.roles.includes("ROLE_ADMIN");
  }

  isUser(): boolean {
    return this.roles.includes("ROLE_USER") || this.isAdmin();
  }

  isLogged(): boolean {
    return this.email.length > 0;
  }
}
