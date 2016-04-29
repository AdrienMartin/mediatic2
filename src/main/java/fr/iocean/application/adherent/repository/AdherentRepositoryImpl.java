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
			case 5: trie="count(b)"; break;
			default: trie="nom";
		}
		if((typeTrie%2)==1)
		{
			desc="desc";
		}

		//getSession().createCriteria(Adherent.class).list();
		//getSession().createCriteria(Adherent.class).add(Restrictions.eq("",).list();
		
		org.hibernate.Query q = getSession().createQuery("Select a, "
				+ "("
					+ "Select count(b) "
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
	    /*q.setResultTransformer(new ResultTransformer() {
			
			@Override
			public AdherentDTO transformTuple(Object[] arg0, String[] arg1) {
		    	AdherentDTO adherentDTOTemp = new AdherentDTO();
		    	adherentDTOTemp.setAdherent((Adherent)arg0[0]);
		    	adherentDTOTemp.setNbEmprunts((Long)arg0[1]);
				return adherentDTOTemp;
			}
			
			@Override
			public List<AdherentDTO> transformList(List arg0) {
			    List<AdherentDTO> adherentsDTOTemp = new ArrayList<>();
				for (Object object : arg0) {
					adherentsDTOTemp.add((AdherentDTO) transformTuple((Object[])object, null));
				}
				return adherentsDTOTemp;
			}
		});*/
		
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
