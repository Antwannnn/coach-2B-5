<?php

namespace App\Controller\Admin;

use App\Entity\Sportif;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Config\KeyValueStore;
use EasyCorp\Bundle\EasyAdminBundle\Context\AdminContext;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Dto\EntityDto;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SportifCrudController extends AbstractCrudController
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public static function getEntityFqcn(): string
    {
        return Sportif::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Sportif')
            ->setEntityLabelInPlural('Sportifs')
            ->setPageTitle('index', 'Liste des sportifs')
            ->setPageTitle('new', 'Ajouter un sportif')
            ->setPageTitle('edit', fn (Sportif $sportif) => sprintf('Modifier le sportif <b>%s %s</b>', $sportif->getNom(), $sportif->getPrenom()));
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
                'Sportif' => 'ROLE_SPORTIF',
                'Administrateur' => 'ROLE_ADMIN',
            ])
            ->setRequired(true)
            ->hideOnIndex();
            
        yield DateField::new('dateInscription')
            ->setLabel('Date d\'inscription');
            
        yield TextField::new('niveauSportif')
            ->setLabel('Niveau sportif');
        
        if ($pageName === Crud::PAGE_INDEX || $pageName === Crud::PAGE_DETAIL) {
            yield AssociationField::new('seances')
                ->setLabel('Séances')
                ->hideOnIndex();
        }
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
            $sportif = $event->getData();
            $form = $event->getForm();
            
            if (!$form->isValid()) {
                return;
            }
            
            $password = $form->get('password')->getData();
            
            if ($password === null) {
                return;
            }

            $hashedPassword = $this->passwordHasher->hashPassword($sportif, $password);
            $sportif->setPassword($hashedPassword);
        });
    }
}
