package lecteurManga.model;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Role implements Serializable{

	private static final long serialVersionUID = -1298172466581632200L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String name;
	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "role")
    @JsonManagedReference
    private Set<Account> accounts;
    
	
	public void addUser(Account account) {
		accounts.add(account);
	}
	
	
	public Role() {
		super();
	}
	
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public Set<Account> getAccounts() {
		return accounts;
	}


	public void setAccounts(Set<Account> accounts) {
		if(accounts ==null) accounts = new HashSet<>();
		this.accounts = accounts;
	}
	
	
	
	
}
