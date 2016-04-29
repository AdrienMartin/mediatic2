package fr.iocean.application.adherent.modele;

import fr.iocean.application.IoEntity;

public class AdherentDTO implements IoEntity 
{
	private static final long serialVersionUID = 1L;
	private Adherent adherent;
	private Long nbEmprunts;
	
	public Adherent getAdherent() {
		return adherent;
	}
	public void setAdherent(Adherent adherent) {
		this.adherent = adherent;
	}

	public Long getNbEmprunts() {
		return nbEmprunts;
	}
	public void setNbEmprunts(Long nbEmprunts) {
		this.nbEmprunts = nbEmprunts;
	}
	
	@Override
	public Long getId() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public void setId(Long id) {
		// TODO Auto-generated method stub
	}
}
