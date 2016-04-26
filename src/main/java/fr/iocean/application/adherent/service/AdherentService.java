package fr.iocean.application.adherent.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import fr.iocean.application.adherent.modele.Adherent;
import fr.iocean.application.adherent.repository.AdherentRepository;

@Service
public class AdherentService {

	@Autowired
	@Qualifier("adherentRepository")
	AdherentRepository adherentRepository;
	
	public List<Adherent> findAll(){
		return adherentRepository.findAll();
	}
	
	public Adherent findById(Long id){
		return adherentRepository.findOne(id);
	}
	
	public void create(Adherent adherent){
		adherentRepository.save(adherent);
	}
	
	public void delete(Long id){
		Adherent adherent = this.findById(id);
		adherentRepository.delete(adherent);
	}

	public void update(Adherent adherent){
		adherentRepository.save(adherent);
	}
	
	public AdherentRepository getAdherentRepository() {
		return adherentRepository;
	}

	public void setAdherentRepository(AdherentRepository adherentRepository) {
		this.adherentRepository = adherentRepository;
	}
	
}
