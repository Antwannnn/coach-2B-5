<?php

namespace App\Controller;

use App\Entity\Sportif;
use App\Repository\SportifRepository;
use App\Repository\SeanceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/sportifs')]
class SportifController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private SportifRepository $sportifRepository;
    private SeanceRepository $seanceRepository;
    private SerializerInterface $serializer;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        SportifRepository $sportifRepository,
        SeanceRepository $seanceRepository,
        SerializerInterface $serializer,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->entityManager = $entityManager;
        $this->sportifRepository = $sportifRepository;
        $this->seanceRepository = $seanceRepository;
        $this->serializer = $serializer;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('', name: 'api_sportifs_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $sportifs = $this->sportifRepository->findAll();
        
        return $this->json($sportifs, Response::HTTP_OK, [], ['groups' => 'sportif:read']);
    }

    #[Route('/{id}', name: 'api_sportifs_show', methods: ['GET'])]
    public function show(string $id): JsonResponse
    {
        $sportif = $this->sportifRepository->find($id);
        
        if (!$sportif) {
            return $this->json(['message' => 'Sportif not found'], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json($sportif, Response::HTTP_OK, [], ['groups' => 'sportif:read']);
    }

    #[Route('', name: 'api_sportifs_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        $sportif = new Sportif();
        $sportif->setEmail($data['email'] ?? null);
        $sportif->setRole('ROLE_SPORTIF');
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($sportif, $data['password']);
            $sportif->setPassword($hashedPassword);
        }
        
        $sportif->setNom($data['nom'] ?? null);
        $sportif->setPrenom($data['prenom'] ?? null);
        $sportif->setDateInscription(new \DateTime());
        $sportif->setNiveauSportif($data['niveauSportif'] ?? 'débutant');
        
        $this->entityManager->persist($sportif);
        $this->entityManager->flush();
        
        return $this->json($sportif, Response::HTTP_CREATED, [], ['groups' => 'sportif:read']);
    }

    #[Route('/{id}', name: 'api_sportifs_update', methods: ['PUT', 'PATCH'])]
    public function update(string $id, Request $request): JsonResponse
    {
        $sportif = $this->sportifRepository->find($id);
        
        if (!$sportif) {
            return $this->json(['message' => 'Sportif not found'], Response::HTTP_NOT_FOUND);
        }
        
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        if (isset($data['email'])) {
            $sportif->setEmail($data['email']);
        }
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($sportif, $data['password']);
            $sportif->setPassword($hashedPassword);
        }
        
        if (isset($data['nom'])) {
            $sportif->setNom($data['nom']);
        }
        
        if (isset($data['prenom'])) {
            $sportif->setPrenom($data['prenom']);
        }
        
        if (isset($data['niveauSportif'])) {
            $sportif->setNiveauSportif($data['niveauSportif']);
        }
        
        $this->entityManager->flush();
        
        return $this->json($sportif, Response::HTTP_OK, [], ['groups' => 'sportif:read']);
    }

    #[Route('/{id}', name: 'api_sportifs_delete', methods: ['DELETE'])]
    public function delete(string $id): JsonResponse
    {
        $sportif = $this->sportifRepository->find($id);
        
        if (!$sportif) {
            return $this->json(['message' => 'Sportif not found'], Response::HTTP_NOT_FOUND);
        }
        
        $this->entityManager->remove($sportif);
        $this->entityManager->flush();
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/seances', name: 'api_sportifs_seances', methods: ['GET'])]
    public function getSeances(string $id): JsonResponse
    {
        $sportif = $this->sportifRepository->find($id);
        
        if (!$sportif) {
            return $this->json(['message' => 'Sportif not found'], Response::HTTP_NOT_FOUND);
        }
        
        $seances = $this->seanceRepository->findBy(['sportif' => $sportif]);
        
        return $this->json($seances, Response::HTTP_OK, [], ['groups' => 'seance:read']);
    }
} 