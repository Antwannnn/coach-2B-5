<?php

namespace App\Controller;

use App\Entity\FicheDePaie;
use App\Repository\FicheDePaieRepository;
use App\Repository\CoachRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/fiches-de-paie')]
class FicheDePaieController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private FicheDePaieRepository $ficheDePaieRepository;
    private CoachRepository $coachRepository;
    private SerializerInterface $serializer;

    public function __construct(
        EntityManagerInterface $entityManager,
        FicheDePaieRepository $ficheDePaieRepository,
        CoachRepository $coachRepository,
        SerializerInterface $serializer
    ) {
        $this->entityManager = $entityManager;
        $this->ficheDePaieRepository = $ficheDePaieRepository;
        $this->coachRepository = $coachRepository;
        $this->serializer = $serializer;
    }

    #[Route('', name: 'api_fiches_de_paie_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $fichesDePaie = $this->ficheDePaieRepository->findAll();
        
        return $this->json($fichesDePaie, Response::HTTP_OK, [], ['groups' => 'fiche_de_paie:read']);
    }

    #[Route('/{id}', name: 'api_fiches_de_paie_show', methods: ['GET'])]
    public function show(string $id): JsonResponse
    {
        $ficheDePaie = $this->ficheDePaieRepository->find($id);
        
        if (!$ficheDePaie) {
            return $this->json(['message' => 'Fiche de paie not found'], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json($ficheDePaie, Response::HTTP_OK, [], ['groups' => 'fiche_de_paie:read']);
    }

    #[Route('/coach/{coachId}', name: 'api_fiches_de_paie_by_coach', methods: ['GET'])]
    public function getByCoach(string $coachId): JsonResponse
    {
        $coach = $this->coachRepository->find($coachId);
        
        if (!$coach) {
            return $this->json(['message' => 'Coach not found'], Response::HTTP_NOT_FOUND);
        }
        
        $fichesDePaie = $this->ficheDePaieRepository->findBy(['coach' => $coach]);
        
        return $this->json($fichesDePaie, Response::HTTP_OK, [], ['groups' => 'fiche_de_paie:read']);
    }

    #[Route('', name: 'api_fiches_de_paie_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        $ficheDePaie = new FicheDePaie();
        
        if (isset($data['coach_id'])) {
            $coach = $this->coachRepository->find($data['coach_id']);
            if (!$coach) {
                return $this->json(['message' => 'Coach not found'], Response::HTTP_BAD_REQUEST);
            }
            $ficheDePaie->setCoach($coach);
        }
        
        $ficheDePaie->setPeriode($data['periode'] ?? null);
        $ficheDePaie->setTotalHeures($data['totalHeures'] ?? 0);
        $ficheDePaie->setMontantTotal($data['montantTotal'] ?? 0);
        
        $this->entityManager->persist($ficheDePaie);
        $this->entityManager->flush();
        
        return $this->json($ficheDePaie, Response::HTTP_CREATED, [], ['groups' => 'fiche_de_paie:read']);
    }

    #[Route('/{id}', name: 'api_fiches_de_paie_update', methods: ['PUT', 'PATCH'])]
    public function update(string $id, Request $request): JsonResponse
    {
        $ficheDePaie = $this->ficheDePaieRepository->find($id);
        
        if (!$ficheDePaie) {
            return $this->json(['message' => 'Fiche de paie not found'], Response::HTTP_NOT_FOUND);
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
            $ficheDePaie->setCoach($coach);
        }
        
        if (isset($data['periode'])) {
            $ficheDePaie->setPeriode($data['periode']);
        }
        
        if (isset($data['totalHeures'])) {
            $ficheDePaie->setTotalHeures($data['totalHeures']);
        }
        
        if (isset($data['montantTotal'])) {
            $ficheDePaie->setMontantTotal($data['montantTotal']);
        }
        
        $this->entityManager->flush();
        
        return $this->json($ficheDePaie, Response::HTTP_OK, [], ['groups' => 'fiche_de_paie:read']);
    }

    #[Route('/{id}', name: 'api_fiches_de_paie_delete', methods: ['DELETE'])]
    public function delete(string $id): JsonResponse
    {
        $ficheDePaie = $this->ficheDePaieRepository->find($id);
        
        if (!$ficheDePaie) {
            return $this->json(['message' => 'Fiche de paie not found'], Response::HTTP_NOT_FOUND);
        }
        
        $this->entityManager->remove($ficheDePaie);
        $this->entityManager->flush();
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
} 