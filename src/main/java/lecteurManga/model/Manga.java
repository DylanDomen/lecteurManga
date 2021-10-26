package lecteurManga.model;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Manga implements Serializable{

	private static final long serialVersionUID = 1702793668809774127L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String title;
	@Column(columnDefinition="TEXT")
	private String summary;
	private String cover_name;
	private Date update_date;
	private Boolean is_deleted;
	private Date deleted_date;
	private Date created_date;
	private String author;
	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "manga")
    @JsonManagedReference
    private Set<Chapter> chapters;
	
	@OneToMany(fetch = FetchType.EAGER,mappedBy = "manga_Rating")
    @JsonManagedReference
    private Set<Rating> ratings;
	
	@ManyToMany
	private Set<Account> accounts;
	
	public void addFavoris_account(Account account) {
		accounts.add(account);
	}
	
	public void addChapter(Chapter chapter) {
		chapters.add(chapter);
	}
	
	public void addRating(Rating rating) {
		ratings.add(rating);
	}
	
	public Manga() {
		super();
	}


	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getSummary() {
		return summary;
	}


	public void setSummary(String summary) {
		this.summary = summary;
	}


	public String getCover_name() {
		return cover_name;
	}


	public void setCover_name(String cover_name) {
		this.cover_name = cover_name;
	}


	public Date getUpdate_date() {
		return update_date;
	}


	public void setUpdate_date(Date update_date) {
		this.update_date = update_date;
	}


	public Boolean getIs_deleted() {
		return is_deleted;
	}


	public void setIs_deleted(Boolean is_deleted) {
		this.is_deleted = is_deleted;
	}


	public Date getDeleted_date() {
		return deleted_date;
	}


	public void setDeleted_date(Date deleted_date) {
		this.deleted_date = deleted_date;
	}


	public Date getCreated_date() {
		return created_date;
	}


	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}


	public String getAuthor() {
		return author;
	}


	public void setAuthor(String author) {
		this.author = author;
	}

	public Set<Chapter> getChapters() {
		if(chapters ==null) chapters = new HashSet<>();
		return chapters;
	}

	public void setChapters(Set<Chapter> chapters) {
		this.chapters = chapters;
	}

	public Set<Rating> getRatings() {
		if(ratings ==null) ratings = new HashSet<>();
		return ratings;
	}

	public void setRatings(Set<Rating> ratings) {
		this.ratings = ratings;
	}

	public Set<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(Set<Account> accounts) {
		this.accounts = accounts;
	}

	
	
}
