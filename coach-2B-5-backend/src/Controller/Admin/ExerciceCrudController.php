<?php

namespace App\Controller\Admin;

use App\Entity\Exercice;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ExerciceCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Exercice::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Exercice')
            ->setEntityLabelInPlural('Exercices')
            ->setPageTitle('index', 'Liste des exercices')
            ->setPageTitle('new', 'Ajouter un exercice')
            ->setPageTitle('edit', fn (Exercice $exercice) => sprintf('Modifier l\'exercice <b>%s</b>', $exercice->getNom()));
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield TextField::new('nom')
            ->setLabel('Nom de l\'exercice');
        yield TextareaField::new('description')
            ->setLabel('Description')
            ->setNumOfRows(5)
            ->hideOnIndex();
        yield IntegerField::new('dureeEstimee')
            ->setLabel('Durée estimée (minutes)');
        yield ChoiceField::new('difficulte')
            ->setLabel('Difficulté')
            ->setChoices([
                'Facile' => 'Facile',
                'Moyen' => 'Moyen',
                'Difficile' => 'Difficile',
                'Expert' => 'Expert',
            ]);
        
        if ($pageName === Crud::PAGE_DETAIL) {
            yield AssociationField::new('seances')
                ->setLabel('Séances');
        }
    }
}
