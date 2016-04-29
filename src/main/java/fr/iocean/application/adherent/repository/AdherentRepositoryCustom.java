package fr.iocean.application.adherent.repository;

import java.util.List;

import fr.iocean.application.adherent.modele.Adherent;
import fr.iocean.application.adherent.modele.AdherentDTO;

public interface AdherentRepositoryCustom {
	public List<AdherentDTO> recherche(String identifiant,String nom, int typeTrie, int page);
	public Long getNbPages(String identifiant, String text);
	public List<Object[]> rechercheMediasEmpruntes(Adherent adherent, int typeTrie);
}
