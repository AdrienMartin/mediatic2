package fr.iocean.application.adherent.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import fr.iocean.application.adherent.modele.Adherent;
import fr.iocean.application.adherent.modele.AdherentDTO;

public class AdherentRepositoryImpl extends AbstractJpaRepository<AdherentDTO> implements AdherentRepositoryCustom {

	@Override
	protected Class<AdherentDTO> getEntityClass() {
		// TODO Auto-generated method stub
		return AdherentDTO.class;
	}
	
	public List<AdherentDTO> recherche(String identifiant, String text, int typeTrie, int page){
		String desc="";
		String trie="";
		switch(typeTrie/2)
		{
			case 0: trie="identifiant"; break;
			case 2: trie="prenom";break;
			case 3: trie="dateNaissance";break;
			case 4: trie="aJourCotisation"; break;
			case 5: trie="emprunt"; break;
			default: trie="nom";
		}
		if((typeTrie%2)==1)
		{
			desc="desc";
		}
		
		org.hibernate.Query q = getSession().createQuery("Select a, "
				+ "("
					+ "Select count(b) as emprunt "
					+ "from Emprunt b "
					+ "where (b.dateRetour is null or b.dateRetour > now()) "
					+ "and b.emprunteur = a"
				+ ") "
				+ "From Adherent a "
				+ "where a.identifiant LIKE :identifiant "
				+ "and (a.nom LIKE :text or a.prenom LIKE :text) "
				+ "group by a "
				+ "order by " + trie + " " +desc);
		
		q.setParameter("identifiant", identifiant+"%");
	    q.setParameter("text", "%"+text+"%");
	    q.setFirstResult(page*15);
	    q.setMaxResults(15);
		
		System.out.println(q.list());
	    List<AdherentDTO> adherentsDTOTemp = new ArrayList<>();
		for(int i = 0; i < q.list().size(); i++)
		{
	    	AdherentDTO adherentDTOTemp = new AdherentDTO();
	    	adherentDTOTemp.setAdherent((Adherent) ((Object[])q.list().get(i))[0]);
	    	adherentDTOTemp.setNbEmprunts((Long) ((Object[])q.list().get(i))[1]);
	    	adherentsDTOTemp.add(adherentDTOTemp);
		}
	    return adherentsDTOTemp;
	}
	
	public Long getNbPages(String identifiant, String text){
		org.hibernate.Query q = getSession().createQuery("Select count(a) "
				+ "From Adherent a "
				+ "where a.identifiant LIKE :identifiant "
				+ "and (a.nom LIKE :text or a.prenom LIKE :text)");
		
		q.setParameter("identifiant", identifiant+"%");
	    q.setParameter("text", "%"+text+"%");
	    Long nbElements = (Long) q.list().get(0);
	    Long nbPages = nbElements / 15 + ((nbElements % 15 > 0)?1:0);
	    return nbPages;
	}
	
	public List<Object[]> rechercheMediasEmpruntes(Adherent adherent, int typeTrie)
	{		
		String desc="";
		String trie="";
		
		switch(typeTrie/2){
			
			
			case 1: trie="auteur";break;
			case 2: trie="typeMedia";break;
			case 3: trie="date";
			case 4: trie="nomPrenom";
			default: trie="titre";
		}
		if((typeTrie%2)==1){
			
			desc="desc";
			
		}
		Query q = em.createQuery("Select m, "
				+ "("
					+ "Select e.dateRetour as date "
					+ "from e "
					+ "where (e.dateRetour is null or e.dateRetour > now()) "
					+ "and e.media = m"
				+ "), "
				+ "("
					+ "Select concat(a.nom, ' ', a.prenom) as nomPrenom "
					+ "from a "
					+ "where e.emprunteur = a"
				+ ") "
				+ "From Media m "
				+ "join m.emprunts e "
				+ "join e.emprunteur a "
				+ "where a.id = :id "
				+ "order by " + trie + " " + desc);
		
	    q.setParameter("id", adherent.getId());
	    
	    List<Object[]> mediasTemp = q.getResultList();

	    System.out.println(mediasTemp.size());
	    
	    for(int i = 0; i < mediasTemp.size(); i++)
	    {
	    	for(int j = 0; j < mediasTemp.get(i).length; j++)
	    	{
	    	    System.out.println(mediasTemp.get(i)[j]);
	    	}
	    }
	    
		return mediasTemp;
		
	}



}
