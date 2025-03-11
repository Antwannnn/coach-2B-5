<?php

namespace App\Entity;

use App\Repository\CoachRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CoachRepository::class)]
class Coach extends User
{
    #[ORM\Column]
    #[Groups(['coach:read', 'user:read'])]
    private array $specialites = [];

    #[ORM\Column]
    #[Groups(['coach:read', 'user:read'])]
    private ?float $tarifHoraire = null;

    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: Seance::class)]
    #[Groups(['coach:read'])]
    private Collection $seances;

    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: FicheDePaie::class)]
    #[Groups(['coach:read'])]
    private Collection $fichesDePaie;

    public function __construct()
    {
        $this->seances = new ArrayCollection();
        $this->fichesDePaie = new ArrayCollection();
        $this->setRole('ROLE_COACH');
    }

    public function getSpecialites(): array
    {
        return $this->specialites;
    }

    public function setSpecialites(array $specialites): static
    {
        $this->specialites = $specialites;

        return $this;
    }

    public function getTarifHoraire(): ?float
    {
        return $this->tarifHoraire;
    }

    public function setTarifHoraire(float $tarifHoraire): static
    {
        $this->tarifHoraire = $tarifHoraire;

        return $this;
    }

    /**
     * @return Collection<int, Seance>
     */
    public function getSeances(): Collection
    {
        return $this->seances;
    }

    public function addSeance(Seance $seance): static
    {
        if (!$this->seances->contains($seance)) {
            $this->seances->add($seance);
            $seance->setCoach($this);
        }

        return $this;
    }

    public function removeSeance(Seance $seance): static
    {
        if ($this->seances->removeElement($seance)) {
            // set the owning side to null (unless already changed)
            if ($seance->getCoach() === $this) {
                $seance->setCoach(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, FicheDePaie>
     */
    public function getFichesDePaie(): Collection
    {
        return $this->fichesDePaie;
    }

    public function addFicheDePaie(FicheDePaie $ficheDePaie): static
    {
        if (!$this->fichesDePaie->contains($ficheDePaie)) {
            $this->fichesDePaie->add($ficheDePaie);
            $ficheDePaie->setCoach($this);
        }

        return $this;
    }

    public function removeFicheDePaie(FicheDePaie $ficheDePaie): static
    {
        if ($this->fichesDePaie->removeElement($ficheDePaie)) {
            // set the owning side to null (unless already changed)
            if ($ficheDePaie->getCoach() === $this) {
                $ficheDePaie->setCoach(null);
            }
        }

        return $this;
    }
}