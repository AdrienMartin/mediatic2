package fr.iocean.application;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;







import fr.iocean.application.helper.JsonHelper;
import fr.iocean.application.media.Media;
import fr.iocean.application.media.Media.TypeMedia;
import fr.iocean.application.media.service.MediaService;



public class MediaIntegrationTest extends IntegrationTest{
	
	@Autowired
	MediaService mediaService;
	
	@Autowired
	JsonHelper helper;
	
	@Test
	public void testFindAll() throws Exception{
		
        mockMvc.perform(get("/api/medias"))
	        .andExpect(status().isOk())
	        .andExpect(content().contentType("application/json;charset=UTF8"))
	        .andExpect(jsonPath("$", hasSize(1))
	        );
	}
	
	@Test
	public void testPost() throws Exception{
		
		Media media = new Media();
        media.setTitre("titre");
        media.setAuteur("titi");
        media.setTypeMedia(TypeMedia.DVD);
       
        System.out.println("requete:"+helper.serialize(media));
        
        mockMvc.perform(post("/api/medias/add").content(helper.serialize(media)).contentType(MediaType.APPLICATION_JSON_VALUE))
	       .andExpect(status().isCreated()) ;
           
        		  
	}
	@Test
	public void testPut() throws Exception{
		
		Media media=mediaService.findOne(2L);
		media.setTitre("autreTitre");
		mockMvc.perform(put("/api/medias/{id}",2).content(helper.serialize(media)).contentType(MediaType.APPLICATION_JSON_VALUE))
	       .andExpect(status().isOk()) ;
		
		mockMvc.perform(get("/api/medias/{id}",2))
	        .andExpect(status().isOk())
	        .andExpect(jsonPath("$.titre", is("autreTitre")));
        		  
	}
	@Test
	public void testNotFound() throws Exception{
		
		mockMvc.perform(get("/api/medias/{id}",5))
        .andExpect(status().isNotFound());
	}
	
	@Test
	public void testFindById() throws Exception{
	
		mockMvc.perform(get("/api/medias/{id}",2))
	        .andExpect(status().isOk())
	        .andExpect(content().string
	        		("{\"id\":2,\"titre\":\"autreTitre\",\"auteur\":\"toto\",\"typeMedia\":\"CD\"}"));
	        
        		  
	}
	@Test
	public void testDeleteWhenUserIsFound() throws Exception{
				
		mockMvc.perform(delete("/api/medias/{id}",1))
			    .andExpect(status().isOk()) ;
		
	}
	@Test
	public void deleteByIdWhenUserIsNotFound() throws Exception {
		
	        mockMvc.perform(delete("/api/medias/{id}", 10L))
	                .andExpect(status().isNotFound());
	}
	
}
