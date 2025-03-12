<?php

namespace App\Controller\Admin;

use App\Entity\Responsable;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\KeyValueStore;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Dto\EntityDto;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TelephoneField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ResponsableCrudController extends AbstractCrudController
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public static function getEntityFqcn(): string
    {
        return Responsable::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Responsable')
            ->setEntityLabelInPlural('Responsables')
            ->setPageTitle('index', 'Liste des responsables')
            ->setPageTitle('new', 'Ajouter un responsable')
            ->setPageTitle('edit', fn (Responsable $responsable) => sprintf('Modifier le responsable <b>%s %s</b>', $responsable->getNom(), $responsable->getPrenom()));
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('nom');
        yield TextField::new('prenom');
        yield EmailField::new('email');
        
        yield TextField::new('password')
            ->setFormType(RepeatedType::class)
            ->setFormTypeOptions([
                'type' => PasswordType::class,
                'first_options' => ['label' => 'Mot de passe'],
                'second_options' => ['label' => 'Répéter le mot de passe'],
                'mapped' => false,
            ])
            ->setRequired($pageName === Crud::PAGE_NEW)
            ->onlyOnForms();
            
        yield ChoiceField::new('role')
            ->setChoices([
                'Responsable' => 'ROLE_RESPONSABLE',
                'Administrateur' => 'ROLE_ADMIN',
            ])
            ->setRequired(true)
            ->hideOnIndex();
            
        yield TextField::new('departement')
            ->setLabel('Département');
            
        yield TelephoneField::new('telephone')
            ->setLabel('Téléphone');
    }

    public function createNewFormBuilder(EntityDto $entityDto, KeyValueStore $formOptions, AdminContext $context): FormBuilderInterface
    {
        $formBuilder = parent::createNewFormBuilder($entityDto, $formOptions, $context);
        return $this->addPasswordEventListener($formBuilder);
    }

    public function createEditFormBuilder(EntityDto $entityDto, KeyValueStore $formOptions, AdminContext $context): FormBuilderInterface
    {
        $formBuilder = parent::createEditFormBuilder($entityDto, $formOptions, $context);
        return $this->addPasswordEventListener($formBuilder);
    }

    private function addPasswordEventListener(FormBuilderInterface $formBuilder): FormBuilderInterface
    {
        return $formBuilder->addEventListener(FormEvents::POST_SUBMIT, function (FormEvent $event) {
            $responsable = $event->getData();
            $form = $event->getForm();
            
            if (!$form->isValid()) {
                return;
            }
            
            $password = $form->get('password')->getData();
            
            if ($password === null) {
                return;
            }

            $hashedPassword = $this->passwordHasher->hashPassword($responsable, $password);
            $responsable->setPassword($hashedPassword);
        });
    }
} 