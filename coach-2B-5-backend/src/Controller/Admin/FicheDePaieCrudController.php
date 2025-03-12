<?php

namespace App\Controller\Admin;

use App\Entity\FicheDePaie;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class FicheDePaieCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return FicheDePaie::class;
    }

    public function configureCrud(Crud $crud): Crud
    {
        return $crud
            ->setEntityLabelInSingular('Fiche de paie')
            ->setEntityLabelInPlural('Fiches de paie')
            ->setPageTitle('index', 'Liste des fiches de paie')
            ->setPageTitle('new', 'Ajouter une fiche de paie')
            ->setPageTitle('edit', fn (FicheDePaie $ficheDePaie) => sprintf('Modifier la fiche de paie de <b>%s %s</b>', $ficheDePaie->getCoach()->getNom(), $ficheDePaie->getCoach()->getPrenom()));
    }

    public function configureFields(string $pageName): iterable
    {
        yield IdField::new('id')->hideOnForm();
        yield AssociationField::new('coach')
            ->setLabel('Coach')
            ->setRequired(true);
        yield TextField::new('periode')
            ->setLabel('Période (mois/année)')
            ->setHelp('Format: MM/YYYY');
        yield NumberField::new('totalHeures')
            ->setLabel('Total des heures')
            ->setNumDecimals(2);
        yield MoneyField::new('montantTotal')
            ->setLabel('Montant total')
            ->setCurrency('EUR');
    }
}
