package lecteurManga.model;
import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.security.Provider;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.Base64.Encoder;
import java.util.concurrent.ThreadLocalRandom;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.wildfly.security.WildFlyElytronProvider;
import org.wildfly.security.password.PasswordFactory;
import org.wildfly.security.password.interfaces.BCryptPassword;
import org.wildfly.security.password.spec.EncryptablePasswordSpec;
import org.wildfly.security.password.spec.IteratedSaltedPasswordAlgorithmSpec;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
public class Account implements Serializable {
	
	static final Provider ELYTRON_PROVIDER = new WildFlyElytronProvider();

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
	private String salt;
	private Integer iteration_count;
	
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
		try {
			PasswordFactory passwordFactory = PasswordFactory.getInstance(
					BCryptPassword.ALGORITHM_BCRYPT, ELYTRON_PROVIDER);
			
			byte[] salt = new byte[BCryptPassword.BCRYPT_SALT_SIZE];
			
			SecureRandom random = new SecureRandom();
			random.nextBytes(salt);

			int randomIterationCount = ThreadLocalRandom.current().nextInt(10, 15 + 1);

			IteratedSaltedPasswordAlgorithmSpec iteratedAlgorithmSpec = new IteratedSaltedPasswordAlgorithmSpec(
					randomIterationCount, salt);
			
			EncryptablePasswordSpec encryptableSpec = new EncryptablePasswordSpec(
					password.toCharArray(), iteratedAlgorithmSpec);

			BCryptPassword original = (BCryptPassword) passwordFactory
					.generatePassword(encryptableSpec);
			
			Encoder encoder = Base64.getEncoder();
			byte[] hash = original.getHash();

			this.password = encoder.encodeToString(hash);
			this.salt = encoder.encodeToString(salt);
			this.iteration_count = (randomIterationCount);

		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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

	public Integer getIteration_count() {
		return iteration_count;
	}

	public void setIteration_count(Integer iteration_count) {
		this.iteration_count = iteration_count;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

}
