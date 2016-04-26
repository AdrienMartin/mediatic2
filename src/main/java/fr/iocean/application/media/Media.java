package fr.iocean.application.media;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;

import fr.iocean.application.emprunt.Emprunt;

@Entity
@Table(name = "media_")
public class Media {
	public static enum TypeMedia{CD, DVD, LIVRE};
	
	@Id
	@SequenceGenerator(name="Media_SEQ", sequenceName="Media_SEQ", allocationSize=0)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="Media_SEQ")
	private Long id;
	@NotEmpty
	private String titre;
	@NotEmpty
	private String auteur;
	@NotNull
	@Enumerated(EnumType.STRING)
	private TypeMedia typeMedia;
	
	@OneToMany(mappedBy="media")
	private List<Emprunt> emprunts;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	public String getAuteur() {
		return auteur;
	}
	public void setAuteur(String auteur) {
		this.auteur = auteur;
	}
	public TypeMedia getTypeMedia() {
		return typeMedia;
	}
	public void setTypeMedia(TypeMedia type) {
		this.typeMedia = type;
	}
	
	@Override
	public String toString() {
		return "Media [id=" + id + ", titre=" + titre + ", auteur=" + auteur + ", type=" + typeMedia + "]";
	}
	
	
}
