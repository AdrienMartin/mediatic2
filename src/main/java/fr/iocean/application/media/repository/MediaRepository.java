package fr.iocean.application.media.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import fr.iocean.application.media.Media;

@Transactional
public interface  MediaRepository extends JpaRepository<Media, Long>{
	

	
	

}
