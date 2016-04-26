package fr.iocean.application.media.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import fr.iocean.application.exception.NotFoundException;
import fr.iocean.application.media.Media;
import fr.iocean.application.media.service.MediaService;



@RestController
@RequestMapping(value="/api/medias")
@Transactional
public class MediaController {
	
	@Autowired
	 private MediaService mediaService;

	 @RequestMapping(method = RequestMethod.GET)
	 public List<Media> findAll() {
		 
		 return mediaService.findAll();

	 }
	 @RequestMapping(value = "{id}", method = RequestMethod.GET)
	 public Media findById(@PathVariable Long id) throws NotFoundException{
	
		 return mediaService.findOne(id);
	 }

	 @RequestMapping(value="/add", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	 @ResponseStatus(HttpStatus.CREATED)
	 public  void create(@RequestBody Media resource) {
		 
		mediaService.save(resource);

	 }

	 @RequestMapping(value = "{id}", method = RequestMethod.PUT,consumes=MediaType.APPLICATION_JSON_VALUE)
	 public Media update(@PathVariable Long id,@RequestBody @Valid Media resource) throws NotFoundException {
			 return mediaService.updateMedia(id,resource);
	 }
	 @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	 public void delete(@PathVariable Long id) throws NotFoundException{
		
			  mediaService.delete(id);
	 }
}
