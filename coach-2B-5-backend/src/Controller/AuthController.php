<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Coach;
use App\Entity\Sportif;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

#[Route('/api')]
class AuthController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->entityManager = $entityManager;
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return $this->json(['message' => 'Email et mot de passe requis'], Response::HTTP_BAD_REQUEST);
        }
        
        $user = $this->userRepository->findOneBy(['email' => $data['email']]);
        
        if (!$user || !$this->passwordHasher->isPasswordValid($user, $data['password'])) {
            return $this->json(['message' => 'Identifiants invalides'], Response::HTTP_UNAUTHORIZED);
        }
        
        // Générer un token simple pour le développement
        // Inclure le rôle de l'utilisateur dans le token pour pouvoir le récupérer plus tard
        $userRole = strtolower(str_replace('ROLE_', '', $user->getRole()));
        $token = bin2hex(random_bytes(16)) . '_' . $userRole . '_' . bin2hex(random_bytes(16));
        
        return $this->json([
            'user' => $user,
            'token' => $token,
        ], Response::HTTP_OK, [], ['groups' => 'user:read']);
    }

    #[Route('/register', name: 'api_register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        // Vérifier si l'email existe déjà
        $existingUser = $this->userRepository->findOneBy(['email' => $data['email'] ?? '']);
        if ($existingUser) {
            return $this->json(['message' => 'Email already exists'], Response::HTTP_BAD_REQUEST);
        }
        
        $role = $data['role'] ?? 'ROLE_USER';
        
        if ($role === 'ROLE_COACH') {
            return $this->registerCoach($request);
        } elseif ($role === 'ROLE_SPORTIF') {
            return $this->registerSportif($request);
        } elseif ($role === 'ROLE_RESPONSABLE') {
            return $this->registerResponsable($request);
        } else {
            return $this->json(['message' => 'Invalid role'], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/register/coach', name: 'api_register_coach', methods: ['POST'])]
    public function registerCoach(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        // Vérifier si l'email existe déjà
        $existingUser = $this->userRepository->findOneBy(['email' => $data['email'] ?? '']);
        if ($existingUser) {
            return $this->json(['message' => 'Email already exists'], Response::HTTP_BAD_REQUEST);
        }
        
        $coach = new Coach();
        $coach->setEmail($data['email'] ?? null);
        $coach->setRole('ROLE_COACH');
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($coach, $data['password']);
            $coach->setPassword($hashedPassword);
        } else {
            return $this->json(['message' => 'Password is required'], Response::HTTP_BAD_REQUEST);
        }
        
        $coach->setNom($data['nom'] ?? null);
        $coach->setPrenom($data['prenom'] ?? null);
        $coach->setSpecialites($data['specialites'] ?? []);
        $coach->setTarifHoraire($data['tarifHoraire'] ?? $data['tarif_horaire'] ?? 0.0);
        
        $this->entityManager->persist($coach);
        $this->entityManager->flush();
        
        // Générer un token simple pour le développement
        $token = bin2hex(random_bytes(32));
        
        return $this->json([
            'user' => $coach,
            'token' => $token,
        ], Response::HTTP_CREATED, [], ['groups' => 'user:read']);
    }

    #[Route('/register/sportif', name: 'api_register_sportif', methods: ['POST'])]
    public function registerSportif(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        // Vérifier si l'email existe déjà
        $existingUser = $this->userRepository->findOneBy(['email' => $data['email'] ?? '']);
        if ($existingUser) {
            return $this->json(['message' => 'Email already exists'], Response::HTTP_BAD_REQUEST);
        }
        
        $sportif = new Sportif();
        $sportif->setEmail($data['email'] ?? null);
        $sportif->setRole('ROLE_SPORTIF');
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($sportif, $data['password']);
            $sportif->setPassword($hashedPassword);
        } else {
            return $this->json(['message' => 'Password is required'], Response::HTTP_BAD_REQUEST);
        }
        
        $sportif->setNom($data['nom'] ?? null);
        $sportif->setPrenom($data['prenom'] ?? null);
        $sportif->setDateInscription(new \DateTime());
        $sportif->setNiveauSportif($data['niveauSportif'] ?? 'débutant');
        
        $this->entityManager->persist($sportif);
        $this->entityManager->flush();
        
        // Générer un token simple pour le développement
        $token = bin2hex(random_bytes(32));
        
        return $this->json([
            'user' => $sportif,
            'token' => $token,
        ], Response::HTTP_CREATED, [], ['groups' => 'user:read']);
    }

    #[Route('/register/responsable', name: 'api_register_responsable', methods: ['POST'])]
    public function registerResponsable(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        // Vérifier si l'email existe déjà
        $existingUser = $this->userRepository->findOneBy(['email' => $data['email'] ?? '']);
        if ($existingUser) {
            return $this->json(['message' => 'Email already exists'], Response::HTTP_BAD_REQUEST);
        }
        
        $responsable = new User();
        $responsable->setEmail($data['email'] ?? null);
        $responsable->setRole('ROLE_RESPONSABLE');
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($responsable, $data['password']);
            $responsable->setPassword($hashedPassword);
        } else {
            return $this->json(['message' => 'Password is required'], Response::HTTP_BAD_REQUEST);
        }
        
        $responsable->setNom($data['nom'] ?? 'Admin');
        $responsable->setPrenom($data['prenom'] ?? 'Admin');
        
        $this->entityManager->persist($responsable);
        $this->entityManager->flush();
        
        // Générer un token simple pour le développement
        $token = bin2hex(random_bytes(32));
        
        return $this->json([
            'user' => $responsable,
            'token' => $token,
        ], Response::HTTP_CREATED, [], ['groups' => 'user:read']);
    }

    #[Route('/user/profile', name: 'api_user_profile', methods: ['GET'])]
    public function getUserProfile(Request $request): JsonResponse
    {
        // Dans un vrai système, on récupérerait l'utilisateur à partir du token
        // Pour le développement, on simule avec un ID passé en header
        $userId = $request->headers->get('X-User-Id');
        
        if (!$userId) {
            return $this->json(['message' => 'User ID required'], Response::HTTP_UNAUTHORIZED);
        }
        
        $user = $this->userRepository->find($userId);
        
        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'user:read']);
    }

    #[Route('/user/me', name: 'api_user_me', methods: ['GET'])]
    public function getCurrentUser(Request $request): JsonResponse
    {
        // Récupérer le token depuis l'en-tête Authorization
        $authHeader = $request->headers->get('Authorization');
        
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->json(['message' => 'Token required'], Response::HTTP_UNAUTHORIZED);
        }
        
        $token = substr($authHeader, 7); // Enlever 'Bearer ' du début
        
        // Dans un vrai système avec JWT, on décoderait le token pour obtenir l'ID utilisateur
        // Pour le développement, on va essayer de récupérer l'utilisateur à partir du token stocké
        
        // Essayer de trouver l'utilisateur associé au token dans la base de données
        // Comme nous n'avons pas de table de tokens, nous allons simuler différents types d'utilisateurs
        
        // Vérifier si le token contient des indices sur le type d'utilisateur (pour le développement)
        $userRole = 'ROLE_USER';
        
        // Récupérer l'email de l'utilisateur depuis les headers (pour le développement)
        $userEmail = $request->headers->get('X-User-Email');
        
        if ($userEmail) {
            // Essayer de trouver l'utilisateur par email
            $user = $this->userRepository->findOneBy(['email' => $userEmail]);
            
            if ($user) {
                // Retourner les informations réelles de l'utilisateur
                return $this->json([
                    'id' => $user->getId(),
                    'email' => $user->getEmail(),
                    'roles' => [$user->getRole()], // Convertir en tableau car le frontend attend un tableau
                    'nom' => $user->getNom(),
                    'prenom' => $user->getPrenom(),
                    'role' => $user->getRole() // Ajouter le champ 'role' au singulier pour le frontend
                ], Response::HTTP_OK);
            }
        }
        
        // Si nous n'avons pas pu trouver l'utilisateur, simuler un utilisateur en fonction du token
        if (strpos($token, 'coach') !== false) {
            $userRole = 'ROLE_COACH';
        } elseif (strpos($token, 'sportif') !== false) {
            $userRole = 'ROLE_SPORTIF';
        } elseif (strpos($token, 'responsable') !== false) {
            $userRole = 'ROLE_RESPONSABLE';
        }
        
        // Pour le développement, retourner un utilisateur fictif avec le rôle approprié
        return $this->json([
            'id' => 1,
            'email' => 'user@example.com',
            'roles' => ['ROLE_USER', $userRole],
            'nom' => 'Dupont',
            'prenom' => 'Jean',
            'role' => $userRole // Ajouter le champ 'role' au singulier pour le frontend
        ], Response::HTTP_OK);
    }
} 