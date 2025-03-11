<?php

namespace App\Entity;

use App\Repository\SeanceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity(repositoryClass: SeanceRepository::class)]
class Seance
{
    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'doctrine.uuid_generator')]
    private ?Uuid $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $dateHeure = null;

    #[ORM\Column(length: 255)]
    private ?string $typeSeance = null;

    #[ORM\Column(length: 255)]
    private ?string $themeSeance = null;

    #[ORM\ManyToOne(inversedBy: 'seances')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Coach $coach = null;

    #[ORM\ManyToMany(targetEntity: Sportif::class, inversedBy: 'seances')]
    private Collection $sportifs;

    #[ORM\ManyToMany(targetEntity: Exercice::class, inversedBy: 'seances')]
    private Collection $exercices;

    #[ORM\Column(length: 255)]
    private ?string $statut = null;

    #[ORM\Column(length: 255)]
    private ?string $niveauSeance = null;

    public function __construct()
    {
        $this->sportifs = new ArrayCollection();
        $this->exercices = new ArrayCollection();
    }

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getDateHeure(): ?\DateTimeInterface
    {
        return $this->dateHeure;
    }

    public function setDateHeure(\DateTimeInterface $dateHeure): static
    {
        $this->dateHeure = $dateHeure;

        return $this;
    }

    public function getTypeSeance(): ?string
    {
        return $this->typeSeance;
    }

    public function setTypeSeance(string $typeSeance): static
    {
        $this->typeSeance = $typeSeance;

        return $this;
    }

    public function getThemeSeance(): ?string
    {
        return $this->themeSeance;
    }

    public function setThemeSeance(string $themeSeance): static
    {
        $this->themeSeance = $themeSeance;

        return $this;
    }

    public function getCoach(): ?Coach
    {
        return $this->coach;
    }

    public function setCoach(?Coach $coach): static
    {
        $this->coach = $coach;

        return $this;
    }

    /**
     * @return Collection<int, Sportif>
     */
    public function getSportifs(): Collection
    {
        return $this->sportifs;
    }

    public function addSportif(Sportif $sportif): static
    {
        if (!$this->sportifs->contains($sportif)) {
            $this->sportifs->add($sportif);
        }

        return $this;
    }

    public function removeSportif(Sportif $sportif): static
    {
        $this->sportifs->removeElement($sportif);

        return $this;
    }

    /**
     * @return Collection<int, Exercice>
     */
    public function getExercices(): Collection
    {
        return $this->exercices;
    }

    public function addExercice(Exercice $exercice): static
    {
        if (!$this->exercices->contains($exercice)) {
            $this->exercices->add($exercice);
        }

        return $this;
    }

    public function removeExercice(Exercice $exercice): static
    {
        $this->exercices->removeElement($exercice);

        return $this;
    }

    public function getStatut(): ?string
    {
        return $this->statut;
    }

    public function setStatut(string $statut): static
    {
        $this->statut = $statut;

        return $this;
    }

    public function getNiveauSeance(): ?string
    {
        return $this->niveauSeance;
    }

    public function setNiveauSeance(string $niveauSeance): static
    {
        $this->niveauSeance = $niveauSeance;

        return $this;
    }
}