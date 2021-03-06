package fr.iocean.application.adherent.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fr.iocean.application.adherent.modele.Adherent;
import fr.iocean.application.adherent.modele.AdherentDTO;
import fr.iocean.application.adherent.service.AdherentService;

@RestController
@RequestMapping("/api/adherents")
@Transactional
public class AdherentController {

	@Autowired
	private AdherentService adherentService;
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Adherent> findAll(){
		return adherentService.findAll();
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	public Adherent findById(@PathVariable Long id){
		return adherentService.findById(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	public void create(@RequestBody @Valid Adherent resource){
		adherentService.create(resource);
	}
	
	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable Long id){
		adherentService.delete(id);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.PUT)
	public void update(@PathVariable Long id, @RequestBody @Valid Adherent resource){
		adherentService.update(resource);
	}
	
	@RequestMapping(value = "recherche", method = RequestMethod.GET)
	public List<AdherentDTO> recherche(@RequestParam(required = false, defaultValue = "") String id,  @RequestParam(required = false, defaultValue = "0") int page,  @RequestParam(required = false, defaultValue = "") String texte,  @RequestParam(required = false, defaultValue = "0") int tri){
		return adherentService.recherche(id, texte, tri, page);
	}
	
	@RequestMapping(value = "page", method = RequestMethod.GET)
	public Long page(@RequestParam(required = false, defaultValue = "") String id,  @RequestParam(required = false, defaultValue = "") String texte){
		return adherentService.getNbPages(id, texte);
	}
}
