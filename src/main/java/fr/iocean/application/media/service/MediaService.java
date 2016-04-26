package fr.iocean.application.media.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import fr.iocean.application.exception.NotFoundException;
import fr.iocean.application.media.Media;
import fr.iocean.application.media.repository.MediaRepository;

@Service
public class MediaService {

	@Autowired
	MediaRepository mediaRepository;
	

	public List<Media> findAll(){
		
		return mediaRepository.findAll();
	}

	public Media  save(Media media){
		
		return mediaRepository.save(media);
	}
	public void delete(Long id)throws NotFoundException{
		
		Media media=mediaRepository.findOne(id);
		if (media == null) {
			throw new NotFoundException();
		}
		mediaRepository.delete(id);
	}
	public Media findOne(Long id) throws NotFoundException{
		
		Media media=mediaRepository.findOne(id);
		if (media == null) {
			throw new NotFoundException();
		}
		return media;
	}
	public List<Media>findByTitreAndAuteurAndTypeMedia(){
		return null;
	}

	public Media updateMedia(Long id,Media media){
		if (mediaRepository.findOne(id) == null) {
			throw new NotFoundException();
		}
		return mediaRepository.save(media);
		
	}
}
