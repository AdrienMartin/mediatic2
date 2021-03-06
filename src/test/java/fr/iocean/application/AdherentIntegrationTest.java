package fr.iocean.application;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import fr.iocean.application.adherent.modele.Adherent;
import fr.iocean.application.adherent.service.AdherentService;

public class AdherentIntegrationTest extends IntegrationTest {

	@Autowired
	AdherentService adherentService;
	
	@Test
	public void testCreate() throws Exception {
		Adherent ad = new Adherent();
		ad.setIdentifiant("id");
		ad.setMotDePasse("password");
		ad.setNom("name");
		ad.setPrenom("prenom");
		ad.setEmail("ad@email.com");
		ad.setDateNaissance(new Date());
		this.mockMvc.perform(post("/api/adherent").contentType(MediaType.APPLICATION_JSON).characterEncoding("UTF-8")
				.content(jsonHelper.serialize(ad))).andExpect(status().isCreated());
		this.mockMvc.perform(get("/api/adherent")).andDo(MockMvcResultHandlers.print()).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(2)));
	}
	
	
	@Test
	public void testFindAll() throws Exception {
		this.mockMvc.perform(get("/api/adherent")).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));
	};
	
	@Test
	public void testFindById() throws Exception {
		this.mockMvc.perform(get("/api/adherent/15")).andExpect(status().isOk()).andExpect(jsonPath("$.identifiant").value("pseudo"));
	}
	
	@Test
	public void testUpdate() throws Exception {
		Adherent ad = new Adherent();
		ad = adherentService.findById(15l);
		ad.setIdentifiant("newname");
		this.mockMvc.perform(put("/api/adherent/15").contentType(MediaType.APPLICATION_JSON).characterEncoding("UTF-8")
				.content(jsonHelper.serialize(ad))).andExpect(status().isOk());
		this.mockMvc.perform(get("/api/adherent/15").contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk()).andExpect(jsonPath("$.identifiant").value("newname"));
	}
	
	@Test
	public void testDelete() throws Exception {
		this.mockMvc.perform(delete("/api/adherent/15").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
		this.mockMvc.perform(get("/api/adherent")).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(0)));

	}
	
	
}
