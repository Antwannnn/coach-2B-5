<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Create admin user
        $adminUser = new User();
        $adminUser->setNom('Admin');
        $adminUser->setPrenom('Super');
        $adminUser->setEmail('admin@coach2b5.fr');
        $adminUser->setRole('ROLE_ADMIN');
        
        $hashedPassword = $this->passwordHasher->hashPassword(
            $adminUser,
            'admin123'
        );
        $adminUser->setPassword($hashedPassword);
        
        $manager->persist($adminUser);

        // Create regular user
        $user = new User();
        $user->setNom('User');
        $user->setPrenom('Regular');
        $user->setEmail('user@coach2b5.fr');
        $user->setRole('ROLE_USER');
        
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            'user123'
        );
        $user->setPassword($hashedPassword);
        
        $manager->persist($user);

        $manager->flush();
    }
}
