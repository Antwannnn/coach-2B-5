<?php

namespace App\Controller;

use App\Entity\Exercice;
use App\Repository\ExerciceRepository;
use App\Repository\SeanceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/exercices')]
class ExerciceController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ExerciceRepository $exerciceRepository;
    private SeanceRepository $seanceRepository;
    private SerializerInterface $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        ExerciceRepository $exerciceRepository,
        SeanceRepository $seanceRepository,
        SerializerInterface $serializer
    ) {
        $this->entityManager = $entityManager;
        $this->exerciceRepository = $exerciceRepository;
        $this->seanceRepository = $seanceRepository;
        $this->serializer = $serializer;
    }

    #[Route('', name: 'api_exercices_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $exercices = $this->exerciceRepository->findAll();
        
        return $this->json($exercices, Response::HTTP_OK, [], ['groups' => 'exercice:read']);
    }

    #[Route('/{id}', name: 'api_exercices_show', methods: ['GET'])]
    public function show(string $id): JsonResponse
    {
        $exercice = $this->exerciceRepository->find($id);
        
        if (!$exercice) {
            return $this->json(['message' => 'Exercice not found'], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json($exercice, Response::HTTP_OK, [], ['groups' => 'exercice:read']);
    }

    #[Route('/seance/{seanceId}', name: 'api_exercices_by_seance', methods: ['GET'])]
    public function getBySeance(string $seanceId): JsonResponse
    {
        $seance = $this->seanceRepository->find($seanceId);
        
        if (!$seance) {
            return $this->json(['message' => 'Seance not found'], Response::HTTP_NOT_FOUND);
        }
        
        $exercices = $this->exerciceRepository->findBy(['seance' => $seance]);
        
        return $this->json($exercices, Response::HTTP_OK, [], ['groups' => 'exercice:read']);
    }

    #[Route('', name: 'api_exercices_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        $exercice = new Exercice();
        
        if (isset($data['seance_id'])) {
            $seance = $this->seanceRepository->find($data['seance_id']);
            if (!$seance) {
                return $this->json(['message' => 'Seance not found'], Response::HTTP_BAD_REQUEST);
            }
            $exercice->addSeance($seance);
        }
        
        $exercice->setNom($data['nom'] ?? null);
        $exercice->setDescription($data['description'] ?? null);
        $exercice->setDureeEstimee($data['dureeEstimee'] ?? 0);
        $exercice->setDifficulte($data['difficulte'] ?? 'moyen');
        
        $this->entityManager->persist($exercice);
        $this->entityManager->flush();
        
        return $this->json($exercice, Response::HTTP_CREATED, [], ['groups' => 'exercice:read']);
    }

    #[Route('/{id}', name: 'api_exercices_update', methods: ['PUT', 'PATCH'])]
    public function update(string $id, Request $request): JsonResponse
    {
        $exercice = $this->exerciceRepository->find($id);
        
        if (!$exercice) {
            return $this->json(['message' => 'Exercice not found'], Response::HTTP_NOT_FOUND);
        }
        
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        if (isset($data['seance_id'])) {
            $seance = $this->seanceRepository->find($data['seance_id']);
            if (!$seance) {
                return $this->json(['message' => 'Seance not found'], Response::HTTP_BAD_REQUEST);
            }
            $exercice->addSeance($seance);
        }
        
        if (isset($data['nom'])) {
            $exercice->setNom($data['nom']);
        }
        
        if (isset($data['description'])) {
            $exercice->setDescription($data['description']);
        }
        
        if (isset($data['dureeEstimee'])) {
            $exercice->setDureeEstimee($data['dureeEstimee']);
        }
        
        if (isset($data['difficulte'])) {
            $exercice->setDifficulte($data['difficulte']);
        }
        
        $this->entityManager->flush();
        
        return $this->json($exercice, Response::HTTP_OK, [], ['groups' => 'exercice:read']);
    }

    #[Route('/{id}', name: 'api_exercices_delete', methods: ['DELETE'])]
    public function delete(string $id): JsonResponse
    {
        $exercice = $this->exerciceRepository->find($id);
        
        if (!$exercice) {
            return $this->json(['message' => 'Exercice not found'], Response::HTTP_NOT_FOUND);
        }
        
        $this->entityManager->remove($exercice);
        $this->entityManager->flush();
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
} 