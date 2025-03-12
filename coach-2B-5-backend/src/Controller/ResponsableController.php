<?php

namespace App\Controller;

use App\Entity\Responsable;
use App\Repository\ResponsableRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/responsables')]
class ResponsableController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private ResponsableRepository $responsableRepository;
    private SerializerInterface $serializer;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(
        EntityManagerInterface $entityManager,
        ResponsableRepository $responsableRepository,
        SerializerInterface $serializer,
        UserPasswordHasherInterface $passwordHasher
    ) {
        $this->entityManager = $entityManager;
        $this->responsableRepository = $responsableRepository;
        $this->serializer = $serializer;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('', name: 'api_responsables_index', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $responsables = $this->responsableRepository->findAll();
        
        return $this->json($responsables, Response::HTTP_OK, [], ['groups' => 'responsable:read']);
    }

    #[Route('/{id}', name: 'api_responsables_show', methods: ['GET'])]
    public function show(string $id): JsonResponse
    {
        $responsable = $this->responsableRepository->find($id);
        
        if (!$responsable) {
            return $this->json(['message' => 'Responsable not found'], Response::HTTP_NOT_FOUND);
        }
        
        return $this->json($responsable, Response::HTTP_OK, [], ['groups' => 'responsable:read']);
    }

    #[Route('', name: 'api_responsables_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        $responsable = new Responsable();
        $responsable->setEmail($data['email'] ?? null);
        $responsable->setNom($data['nom'] ?? null);
        $responsable->setPrenom($data['prenom'] ?? null);
        $responsable->setDepartement($data['departement'] ?? null);
        
        if (isset($data['telephone'])) {
            $responsable->setTelephone($data['telephone']);
        }
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($responsable, $data['password']);
            $responsable->setPassword($hashedPassword);
        }
        
        $this->entityManager->persist($responsable);
        $this->entityManager->flush();
        
        return $this->json($responsable, Response::HTTP_CREATED, [], ['groups' => 'responsable:read']);
    }

    #[Route('/{id}', name: 'api_responsables_update', methods: ['PUT', 'PATCH'])]
    public function update(string $id, Request $request): JsonResponse
    {
        $responsable = $this->responsableRepository->find($id);
        
        if (!$responsable) {
            return $this->json(['message' => 'Responsable not found'], Response::HTTP_NOT_FOUND);
        }
        
        $data = json_decode($request->getContent(), true);
        
        if (!$data) {
            return $this->json(['message' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }
        
        if (isset($data['email'])) {
            $responsable->setEmail($data['email']);
        }
        
        if (isset($data['nom'])) {
            $responsable->setNom($data['nom']);
        }
        
        if (isset($data['prenom'])) {
            $responsable->setPrenom($data['prenom']);
        }
        
        if (isset($data['departement'])) {
            $responsable->setDepartement($data['departement']);
        }
        
        if (isset($data['telephone'])) {
            $responsable->setTelephone($data['telephone']);
        }
        
        if (isset($data['password'])) {
            $hashedPassword = $this->passwordHasher->hashPassword($responsable, $data['password']);
            $responsable->setPassword($hashedPassword);
        }
        
        $this->entityManager->flush();
        
        return $this->json($responsable, Response::HTTP_OK, [], ['groups' => 'responsable:read']);
    }

    #[Route('/{id}', name: 'api_responsables_delete', methods: ['DELETE'])]
    public function delete(string $id): JsonResponse
    {
        $responsable = $this->responsableRepository->find($id);
        
        if (!$responsable) {
            return $this->json(['message' => 'Responsable not found'], Response::HTTP_NOT_FOUND);
        }
        
        $this->entityManager->remove($responsable);
        $this->entityManager->flush();
        
        return $this->json(null, Response::HTTP_NO_CONTENT);
    }
} 