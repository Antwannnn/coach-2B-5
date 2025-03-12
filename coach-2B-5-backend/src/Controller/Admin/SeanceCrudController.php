<?php

namespace App\Controller\Admin;

use App\Entity\Seance;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class SeanceCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Seance::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Séance')
            ->setEntityLabelInPlural('Séances')
            ->setPageTitle('index', 'Liste des séances')
            ->setPageTitle('new', 'Ajouter une séance')
            ->setPageTitle('edit', fn (Seance $seance) => sprintf('Modifier la séance <b>%s</b>', $seance->getThemeSeance()));
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield DateTimeField::new('dateHeure')
            ->setLabel('Date et heure')
            ->setFormat('dd/MM/yyyy HH:mm');
        yield TextField::new('themeSeance')
            ->setLabel('Thème');
        yield TextField::new('typeSeance')
            ->setLabel('Type');
        yield ChoiceField::new('niveauSeance')
            ->setLabel('Niveau')
            ->setChoices([
                'Débutant' => 'Débutant',
                'Intermédiaire' => 'Intermédiaire',
                'Avancé' => 'Avancé',
            ]);
        yield ChoiceField::new('statut')
            ->setChoices([
                'Planifiée' => 'Planifiée',
                'En cours' => 'En cours',
                'Terminée' => 'Terminée',
                'Annulée' => 'Annulée',
            ]);
        yield AssociationField::new('coach')
            ->setLabel('Coach')
            ->setRequired(true);
        yield AssociationField::new('sportifs')
            ->setLabel('Sportifs')
            ->setFormTypeOption('by_reference', false);
        yield AssociationField::new('exercices')
            ->setLabel('Exercices')
            ->setFormTypeOption('by_reference', false);
    }
}
