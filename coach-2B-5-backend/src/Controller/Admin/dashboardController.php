<?php

namespace App\Controller\Admin;

use App\Entity\User;
use App\Entity\Coach;
use App\Entity\Sportif;
use App\Entity\Responsable;
use App\Entity\Seance;
use App\Entity\Exercice;
use App\Entity\FicheDePaie;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class dashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        return $this->render('admin/dashboard.html.twig');
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Coach 2B-5 Admin');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::section('Gestion');
        yield MenuItem::linkToCrud('Utilisateurs', 'fa fa-user', User::class);
        yield MenuItem::linkToCrud('Coachs', 'fa fa-user-tie', Coach::class);
        yield MenuItem::linkToCrud('Sportifs', 'fa fa-running', Sportif::class);
        yield MenuItem::linkToCrud('Responsables', 'fa fa-user-shield', Responsable::class);
        yield MenuItem::section('Activités');
        yield MenuItem::linkToCrud('Séances', 'fa fa-calendar', Seance::class);
        yield MenuItem::linkToCrud('Exercices', 'fa fa-dumbbell', Exercice::class);
        yield MenuItem::section('Administration');
        yield MenuItem::linkToCrud('Fiches de paie', 'fa fa-file-invoice-dollar', FicheDePaie::class);
    }
}
