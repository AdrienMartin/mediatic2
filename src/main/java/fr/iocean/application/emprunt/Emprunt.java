package fr.iocean.application.emprunt;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import fr.iocean.application.adherent.Adherent;
import fr.iocean.application.media.Media;

@Entity
@Table(name = "emprunt_")
public class Emprunt {

	@Id
	@SequenceGenerator(name="Emprunt_SEQ", sequenceName="Emprunt_SEQ", allocationSize=0)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="Emprunt_SEQ")
	private Long id;
	@NotNull
	private Date dateEmprunt;
	private Date dateRetour;
	
	@ManyToOne
	@NotNull
	private Adherent emprunteur;
	
	@ManyToOne
	@NotNull
	private Media media;

	public Date getDateEmprunt() {
		return dateEmprunt;
	}

	public void setDateEmprunt(Date dateEmprunt) {
		this.dateEmprunt = dateEmprunt;
	}

	public Adherent getEmprunteur() {
		return emprunteur;
	}

	public void setEmprunteur(Adherent emprunteur) {
		this.emprunteur = emprunteur;
	}
	
	public Date getDateRetour() {
		return dateRetour;
	}

	public void setDateRetour(Date dateRetour) {
		this.dateRetour = dateRetour;
	}

	public Media getMedia() {
		return media;
	}

	public void setMedia(Media media) {
		this.media = media;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	
}
