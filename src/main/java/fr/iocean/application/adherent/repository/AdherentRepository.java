package fr.iocean.application.adherent.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.iocean.application.adherent.modele.Adherent;

public interface AdherentRepository extends JpaRepository<Adherent, Long>, AdherentRepositoryCustom{

	Adherent findByIdentifiantAndMotDePasse(String identifiant, String motDePasse);
	
}
