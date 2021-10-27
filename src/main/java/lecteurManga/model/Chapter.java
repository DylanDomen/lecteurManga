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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class Chapter implements Serializable {

	private static final long serialVersionUID = -6227473343692781660L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private String title;
	private Date created_date;
	private Date deleted_date;
	private Date updated_date;
	private Float chapter_number;

	@ManyToOne
	@JsonBackReference(value = "chapter")
	private Manga manga;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "chapter")
	@JsonManagedReference(value = "page")
	private Set<Page> pages;

	public void addPage(Page page) {
		pages.add(page);
	}

	public Chapter() {
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

	public Date getCreated_date() {
		return created_date;
	}

	public void setCreated_date(Date created_date) {
		this.created_date = created_date;
	}

	public Date getDeleted_date() {
		return deleted_date;
	}

	public void setDeleted_date(Date deleted_date) {
		this.deleted_date = deleted_date;
	}

	public Date getUpdated_date() {
		return updated_date;
	}

	public void setUpdated_date(Date updated_date) {
		this.updated_date = updated_date;
	}

	public Float getChapter_number() {
		return chapter_number;
	}

	public void setChapter_number(Float chapter_number) {
		this.chapter_number = chapter_number;
	}

	public Manga getManga() {
		return manga;
	}

	public void setManga(Manga manga) {
		this.manga = manga;
	}

	public Set<Page> getPages() {
		if (pages == null)
			pages = new HashSet<>();
		return pages;
	}

	public void setPages(Set<Page> pages) {
		this.pages = pages;
	}

}
