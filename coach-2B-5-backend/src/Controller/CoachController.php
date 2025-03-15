<?php

namespace App\Controller;

use App\Entity\Coach;
use App\Repository\CoachRepository;
use App\Repository\SeanceRepository;
use App\Repository\SportifRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/coachs')]
class CoachController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private CoachRepository $coachRepository;
    private SeanceRepository $seanceRepository;
    private SportifRepository $sportifRepository;
    private SerializerInterface $serializer;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        CoachRepository $coachRepository,
        SeanceRepository $seanceRepository,
        SportifRepository $sportifRepository,
        SerializerInterface $serializer,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->entityManager = $entityManager;
        $this->coachRepository = $coachRepository;
        $this->seanceRepository = $seanceRepository;
        $this->sportifRepository = $sportifRepository;
        $this->serializer = $serializer;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('', name: 'api_coachs_index', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        // Récupérer les paramètres de filtrage
        $specialites = $request->query->get('specialites');
        $tarifMin = $request->query->get('tarifMin');
        $tarifMax = $request->query->get('tarifMax');
        
        // Convertir les spécialités en tableau si elles sont fournies
        if ($specialites && !is_array($specialites)) {
            $specialites = [$specialites];
        }
        
        // Récupérer tous les coachs
        $coaches = $this->coachRepository->findAll();
        
        // Filtrer les coachs selon les critères
        if ($specialites || $tarifMin !== null || $tarifMax !== null) {
            $coaches = array_filter($coaches, function($coach) use ($specialites, $tarifMin, $tarifMax) {
                // Filtrer par spécialités
                if ($specialites) {
                    $coachSpecialites = $coach->getSpecialites();
                    $hasSpecialite = false;
                    
                    foreach ($specialites as $specialite) {
                        if (in_array($specialite, $coachSpecialites)) {
                            $hasSpecialite = true;
                            break;
                        }
                    }
                    
                    if (!$hasSpecialite) {
                        return false;
                    }
                }
                
                // Filtrer par tarif minimum
                if ($tarifMin !== null && $coach->getTarifHoraire() < (float)$tarifMin) {
                    return false;
                }
                
                // Filtrer par tarif maximum
                if ($tarifMax !== null && $coach->getTarifHoraire() > (float)$tarifMax) {
                    return false;
                }
                
                return true;
            });
        }
        
        return $this->json(array_values($coaches), Response::HTTP_OK, [], ['groups' => 'coach:read']);
    }

    #[Route('/{id}', name: 'api_coachs_show', methods: ['GET'])]
    public function show(string $id): JsonResponse
    {
        $coach = $this->coachRepository->find($id);
        
        if (!$coach) {
            return $this->json(['message' => 'Coach not found'], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json($coach, Response::HTTP_OK, [], ['groups' => 'coach:read']);
    }

    #[Route('', name: 'api_coachs_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        $coach = new Coach();
        $coach->setEmail($data['email'] ?? null);
        $coach->setRole('ROLE_COACH');
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($coach, $data['password']);
            $coach->setPassword($hashedPassword);
        }
        
        $coach->setNom($data['nom'] ?? null);
        $coach->setPrenom($data['prenom'] ?? null);
        $coach->setSpecialites($data['specialites'] ?? []);
        $coach->setTarifHoraire($data['tarif'] ?? null);
        
        $this->entityManager->persist($coach);
        $this->entityManager->flush();
        
        return $this->json($coach, Response::HTTP_CREATED, [], ['groups' => 'coach:read']);
    }

    #[Route('/{id}', name: 'api_coachs_update', methods: ['PUT', 'PATCH'])]
    public function update(string $id, Request $request): JsonResponse
    {
        $coach = $this->coachRepository->find($id);
        
        if (!$coach) {
            return $this->json(['message' => 'Coach not found'], Response::HTTP_NOT_FOUND);
        }
        
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        if (isset($data['email'])) {
            $coach->setEmail($data['email']);
        }
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($coach, $data['password']);
            $coach->setPassword($hashedPassword);
        }
        
        if (isset($data['nom'])) {
            $coach->setNom($data['nom']);
        }
        
        if (isset($data['prenom'])) {
            $coach->setPrenom($data['prenom']);
        }
        
        if (isset($data['specialites'])) {
            $coach->setSpecialites($data['specialites']);
        }
        
        if (isset($data['tarif'])) {
            $coach->setTarifHoraire($data['tarif']);
        }
        
        $this->entityManager->flush();
        
        return $this->json($coach, Response::HTTP_OK, [], ['groups' => 'coach:read']);
    }

    #[Route('/{id}', name: 'api_coachs_delete', methods: ['DELETE'])]
    public function delete(string $id): JsonResponse
    {
        $coach = $this->coachRepository->find($id);
        
        if (!$coach) {
            return $this->json(['message' => 'Coach not found'], Response::HTTP_NOT_FOUND);
        }
        
        $this->entityManager->remove($coach);
        $this->entityManager->flush();
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/seances', name: 'api_coachs_seances', methods: ['GET'])]
    public function getSeances(string $id): JsonResponse
    {
        $coach = $this->coachRepository->find($id);
        
        if (!$coach) {
            return $this->json(['message' => 'Coach not found'], Response::HTTP_NOT_FOUND);
        }
        
        $seances = $this->seanceRepository->findBy(['coach' => $coach]);
        
        return $this->json($seances, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }

    #[Route('/{id}/sportifs', name: 'api_coachs_sportifs', methods: ['GET'])]
    public function getSportifs(string $id): JsonResponse
    {
        $coach = $this->coachRepository->find($id);
        
        if (!$coach) {
            return $this->json(['message' => 'Coach not found'], Response::HTTP_NOT_FOUND);
        }
        
        // Dans un vrai système, on récupérerait les sportifs associés au coach
        // Pour le développement, on renvoie tous les sportifs
        $sportifs = $this->sportifRepository->findAll();
        
        return $this->json($sportifs, Response::HTTP_OK, [], ['groups' => 'sportif:read']);
    }
} 