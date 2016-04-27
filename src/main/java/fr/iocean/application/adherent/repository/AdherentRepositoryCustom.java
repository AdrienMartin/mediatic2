package fr.iocean.application.adherent.repository;

import java.util.List;

import fr.iocean.application.adherent.modele.Adherent;

public interface AdherentRepositoryCustom {
	public List<Object[]> recherche(String identifiant,String nom, int typeTrie);
	public List<Object[]> rechercheMediasEmpruntes(Adherent adherent, int typeTrie);
}
