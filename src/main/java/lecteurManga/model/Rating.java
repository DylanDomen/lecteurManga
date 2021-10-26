package lecteurManga.model;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class Rating implements Serializable {

	private static final long serialVersionUID = 3365748413891183121L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer rating;

	@ManyToOne
	@JsonBackReference(value = "manga_rating")
	private Manga manga_Rating;

	@ManyToOne
	@JsonBackReference(value = "rating")
	private Account account;

	public Rating() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	
	public Manga getManga_Rating() {
		return manga_Rating;
	}

	public void setManga_Rating(Manga manga_Rating) {
		this.manga_Rating = manga_Rating;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

}
