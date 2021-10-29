package org.jboss.tools.examples.rest;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import lecteurManga.model.Manga;

/**
 * 
 */
@Stateless
@Path("/mangas")
public class MangaEndpoint {
	@PersistenceContext(unitName = "primary")
	private EntityManager em;

	@POST
	@Consumes("application/json")
	public Response create(Manga entity) {
		if(entity.getTitle() != null && entity.getCover_name() != null && entity.getCreated_date() != null && entity.getAuthor() != null) {
			em.persist(entity);
			return Response.created(
					UriBuilder.fromResource(MangaEndpoint.class)
							.path(String.valueOf(entity.getId())).build()).build();
		}else {
			return Response.status(Response.Status.BAD_REQUEST).entity("Erreur : Les champs pour la création du manga n'ont pas été remplis correctement").build();
		}
		
	}

	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Integer id) {
		Manga entity = em.find(Manga.class, id);
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		em.remove(entity);
		return Response.noContent().build();
	}

	@GET
	@Path("/{id:[0-9][0-9]*}")
	@Produces("application/json")
	public Response findById(@PathParam("id") Integer id) {
		TypedQuery<Manga> findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT m FROM Manga m LEFT JOIN FETCH m.chapters LEFT JOIN FETCH m.ratings LEFT JOIN FETCH m.accounts WHERE m.id = :entityId ORDER BY m.id",
						Manga.class);
		findByIdQuery.setParameter("entityId", id);
		Manga entity;
		try {
			entity = findByIdQuery.getSingleResult();
		} catch (NoResultException nre) {
			entity = null;
		}
		if (entity == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		return Response.ok(entity).build();
	}

	@GET
	@Produces("application/json")
	public List<Manga> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		TypedQuery<Manga> findAllQuery = em
				.createQuery(
						"SELECT DISTINCT m FROM Manga m LEFT JOIN FETCH m.chapters LEFT JOIN FETCH m.ratings LEFT JOIN FETCH m.accounts ORDER BY m.id",
						Manga.class);
		if (startPosition != null) {
			findAllQuery.setFirstResult(startPosition);
		}
		if (maxResult != null) {
			findAllQuery.setMaxResults(maxResult);
		}
		final List<Manga> results = findAllQuery.getResultList();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(@PathParam("id") Integer id, Manga entity) {
		if (entity == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (id == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (!id.equals(entity.getId())) {
			return Response.status(Status.CONFLICT).entity(entity).build();
		}
		if (em.find(Manga.class, id) == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		
			if(entity.getTitle() != null && entity.getCover_name() != null && entity.getCreated_date() != null && entity.getUpdate_date() != null && entity.getAuthor() != null) {
				try {
					entity = em.merge(entity);
				} catch (OptimisticLockException e) {
					return Response.status(Response.Status.CONFLICT)
							.entity(e.getEntity()).build();
				}
				return Response.noContent().build();
			}else {
				return Response.status(Response.Status.BAD_REQUEST).entity("Erreur : Les champs pour la mise à jour du manga n'ont pas été remplis correctement").build();
			}
	}
}
