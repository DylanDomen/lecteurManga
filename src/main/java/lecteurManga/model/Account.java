package lecteurManga.model;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class Account implements Serializable {

	private static final long serialVersionUID = 3854503702409245775L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String username;
	private String email;
	private String password;
	private String image_path;
	private Boolean is_deleted;
	private Date created_date;
	private Date updated_date;
	private Date deleted_date;
	
	@ManyToOne
	@JsonBackReference(value = "role")
	private Role role;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "account")
	@JsonManagedReference(value = "rating")
	private Set<Rating> ratings;

	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "accounts")
	private Set<Manga> manga;
	
	
	public Account() {
		super();
	}
	
	public Boolean getIs_deleted() {
		return is_deleted;
	}

	public void setIs_deleted(Boolean is_deleted) {
		this.is_deleted = is_deleted;
	}

	public Date getCreated_date() {
		return created_date;
	}

	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}

	public Date getUpdated_date() {
		return updated_date;
	}

	public void setUpdated_date(Date updated_date) {
		this.updated_date = updated_date;
	}

	public Date getDeleted_date() {
		return deleted_date;
	}

	public void setDeleted_date(Date deleted_date) {
		this.deleted_date = deleted_date;
	}

	public void addFavoris(Manga mangas) {
		manga.add(mangas);
	}

	public void addRating(Rating rating) {
		ratings.add(rating);
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getImage_path() {
		return image_path;
	}

	public void setImage_path(String image_path) {
		this.image_path = image_path;
	}

	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}

	public Set<Rating> getRatings() {
		if (ratings == null)
			ratings = new HashSet<>();
		return ratings;
	}

	public void setRatings(Set<Rating> ratings) {
		this.ratings = ratings;
	}

	public Set<Manga> getManga() {
		return manga;
	}

	public void setManga(Set<Manga> manga) {
		this.manga = manga;
	}

}
