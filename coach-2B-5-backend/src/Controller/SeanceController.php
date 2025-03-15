<?php

namespace App\Controller;

use App\Entity\Seance;
use App\Repository\SeanceRepository;
use App\Repository\CoachRepository;
use App\Repository\SportifRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/seances')]
class SeanceController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SeanceRepository $seanceRepository;
    private CoachRepository $coachRepository;
    private SportifRepository $sportifRepository;
    private SerializerInterface $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        SeanceRepository $seanceRepository,
        CoachRepository $coachRepository,
        SportifRepository $sportifRepository,
        SerializerInterface $serializer
    ) {
        $this->entityManager = $entityManager;
        $this->seanceRepository = $seanceRepository;
        $this->coachRepository = $coachRepository;
        $this->sportifRepository = $sportifRepository;
        $this->serializer = $serializer;
    }

    #[Route('', name: 'api_seances_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $seances = $this->seanceRepository->findAll();
        
        return $this->json($seances, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }

    #[Route('/{id}', name: 'api_seances_show', methods: ['GET'])]
    public function show(string $id): JsonResponse
    {
        $seance = $this->seanceRepository->find($id);
        
        if (!$seance) {
            return $this->json(['message' => 'Seance not found'], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json($seance, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }

    #[Route('/coach/{coachId}', name: 'api_seances_by_coach', methods: ['GET'])]
    public function getByCoach(int $coachId): JsonResponse
    {
        $coach = $this->coachRepository->find($coachId);
        
        if (!$coach) {
            return $this->json(['message' => 'Coach not found'], Response::HTTP_NOT_FOUND);
        }
        
        $seances = $this->seanceRepository->findBy(['coach' => $coach]);
        
        return $this->json($seances, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }

    #[Route('/sportif/{sportifId}', name: 'api_seances_by_sportif', methods: ['GET'])]
    public function getBySportif(int $sportifId): JsonResponse
    {
        $sportif = $this->sportifRepository->find($sportifId);
        
        if (!$sportif) {
            return $this->json(['message' => 'Sportif not found'], Response::HTTP_NOT_FOUND);
        }
        
        $seances = $this->seanceRepository->findBy(['sportif' => $sportif]);
        
        return $this->json($seances, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }

    // Nouvelle route pour la compatibilité avec le frontend
    #[Route('/api/sportifs/{sportifId}/seances', name: 'api_sportifs_seances', methods: ['GET'])]
    public function getSportifSeances(string $sportifId): JsonResponse
    {
        // Convertir l'UUID en entier si nécessaire
        try {
            // Essayer de trouver le sportif par son ID (UUID ou entier)
            $sportif = $this->sportifRepository->find($sportifId);
            
            if (!$sportif) {
                return $this->json(['message' => 'Sportif not found'], Response::HTTP_NOT_FOUND);
            }
            
            // Récupérer les séances du sportif
            $seances = $this->seanceRepository->findBy(['sportifs' => $sportif]);
            
            return $this->json($seances, Response::HTTP_OK, [], ['groups' => 'seance:read']);
        } catch (\Exception $e) {
            return $this->json(['message' => 'Error: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('', name: 'api_seances_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        $seance = new Seance();
        
        // Récupérer le coach
        $coachId = $data['coachId'] ?? $data['coach_id'] ?? null;
        if ($coachId) {
            $coach = $this->coachRepository->find($coachId);
            if (!$coach) {
                return $this->json(['message' => 'Coach not found'], Response::HTTP_BAD_REQUEST);
            }
            $seance->setCoach($coach);
        } else {
            return $this->json(['message' => 'Coach ID is required'], Response::HTTP_BAD_REQUEST);
        }
        
        // Récupérer le sportif (utilisateur connecté)
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['message' => 'You must be logged in to book a session'], Response::HTTP_UNAUTHORIZED);
        }
        
        $sportifId = $data['sportifId'] ?? $data['sportif_id'] ?? null;
        if ($sportifId) {
            $sportif = $this->sportifRepository->find($sportifId);
        } else {
            // Si l'ID du sportif n'est pas fourni, essayer de récupérer le sportif à partir de l'utilisateur connecté
            $sportif = $this->sportifRepository->findOneBy(['email' => $user->getUserIdentifier()]);
        }
        
        if (!$sportif) {
            return $this->json(['message' => 'Sportif not found'], Response::HTTP_BAD_REQUEST);
        }
        
        $seance->addSportif($sportif);
        
        // Construire la date et l'heure
        if (isset($data['date']) && isset($data['heure'])) {
            $dateTimeString = $data['date'] . ' ' . $data['heure'];
            $seance->setDateHeure(new \DateTime($dateTimeString));
        } elseif (isset($data['dateHeure'])) {
            $seance->setDateHeure(new \DateTime($data['dateHeure']));
        } else {
            return $this->json(['message' => 'Date and time are required'], Response::HTTP_BAD_REQUEST);
        }
        
        // Définir la durée
        if (isset($data['duree'])) {
            $seance->setDuree((int)$data['duree']);
        }
        
        // Autres champs
        $seance->setTypeSeance($data['typeSeance'] ?? 'standard');
        $seance->setThemeSeance($data['themeSeance'] ?? $data['notes'] ?? '');
        $seance->setStatut($data['statut'] ?? 'planifiée');
        $seance->setNiveauSeance($data['niveauSeance'] ?? 'débutant');
        
        $this->entityManager->persist($seance);
        $this->entityManager->flush();
        
        return $this->json($seance, Response::HTTP_CREATED, [], ['groups' => 'seance:read']);
    }

    #[Route('/{id}', name: 'api_seances_update', methods: ['PUT', 'PATCH'])]
    public function update(string $id, Request $request): JsonResponse
    {
        $seance = $this->seanceRepository->find($id);
        
        if (!$seance) {
            return $this->json(['message' => 'Seance not found'], Response::HTTP_NOT_FOUND);
        }
        
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        if (isset($data['coach_id'])) {
            $coach = $this->coachRepository->find($data['coach_id']);
            if (!$coach) {
                return $this->json(['message' => 'Coach not found'], Response::HTTP_BAD_REQUEST);
            }
            $seance->setCoach($coach);
        }
        
        if (isset($data['dateHeure'])) {
            $seance->setDateHeure(new \DateTime($data['dateHeure']));
        }
        
        if (isset($data['typeSeance'])) {
            $seance->setTypeSeance($data['typeSeance']);
        }
        
        if (isset($data['themeSeance'])) {
            $seance->setThemeSeance($data['themeSeance']);
        }
        
        if (isset($data['statut'])) {
            $seance->setStatut($data['statut']);
        }
        
        if (isset($data['niveauSeance'])) {
            $seance->setNiveauSeance($data['niveauSeance']);
        }
        
        $this->entityManager->flush();
        
        return $this->json($seance, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }

    #[Route('/{id}', name: 'api_seances_delete', methods: ['DELETE'])]
    public function delete(string $id): JsonResponse
    {
        $seance = $this->seanceRepository->find($id);
        
        if (!$seance) {
            return $this->json(['message' => 'Seance not found'], Response::HTTP_NOT_FOUND);
        }
        
        $this->entityManager->remove($seance);
        $this->entityManager->flush();
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/validate', name: 'api_seances_validate', methods: ['PATCH'])]
    public function validateSeance(string $id): JsonResponse
    {
        $seance = $this->seanceRepository->find($id);
        
        if (!$seance) {
            return $this->json(['message' => 'Seance not found'], Response::HTTP_NOT_FOUND);
        }
        
        $seance->setStatut('validée');
        $this->entityManager->flush();
        
        return $this->json($seance, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }

    #[Route('/{id}/cancel', name: 'api_seances_cancel', methods: ['PATCH'])]
    public function cancelSeance(string $id): JsonResponse
    {
        $seance = $this->seanceRepository->find($id);
        
        if (!$seance) {
            return $this->json(['message' => 'Seance not found'], Response::HTTP_NOT_FOUND);
        }
        
        $seance->setStatut('annulée');
        $this->entityManager->flush();
        
        return $this->json($seance, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }
} 