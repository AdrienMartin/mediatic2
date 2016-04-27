package fr.iocean.application.adherent.repository;

import java.util.List;

import javax.persistence.Query;

import fr.iocean.application.adherent.modele.Adherent;

public class AdherentRepositoryImpl extends AbstractJpaRepository<Adherent> implements AdherentRepositoryCustom {

	@Override
	protected Class<Adherent> getEntityClass() {
		// TODO Auto-generated method stub
		return Adherent.class;
	}
	
	public List<Object[]> recherche(String identifiant,String nom, int typeTrie){		
		String desc="";
		String trie="";
		switch(typeTrie/2){
				
			case 0: trie="identifiant"; break;
			case 2: trie="prenom";break;
			case 3: trie="dateNaissance";break;
			case 4: trie="aJourCotisation"; break;
			case 5: trie="count(b)"; break;
			default: trie="nom";
		}
		if((typeTrie%2)==1){
				
			desc="desc";
				
		}
		
		Query q = em.createQuery("Select a, "
				+ "("
					+ "Select count(b) "
					+ "from b "
					+ "where (b.dateRetour is null or b.dateRetour > now()) "
					+ "and b.emprunteur = a"
				+ ") "
				+ "From Adherent a "
				+ "left join a.emprunts b "
				+ "where a.identifiant LIKE :identifiant "
				+ "and (a.nom LIKE :nom or a.prenom LIKE :nom) "
				+ "group by a "
				+ "order by " + trie + " " +desc);
				
		q.setParameter("identifiant", identifiant+"%");
	    q.setParameter("nom", "%"+nom+"%");
	    
	    List<Object[]> adherentsTemp = q.getResultList();
	    for(int i = 0; i < adherentsTemp.size(); i++)
	    {
	    	for(int j = 0; j < adherentsTemp.get(i).length; j++)
	    	{
	    	    System.out.println(adherentsTemp.get(i)[j]);
	    	}
	    }
	    
	    return adherentsTemp;
		
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
