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
import lecteurManga.model.Role;

/**
 * 
 */
@Stateless
@Path("/roles")
public class RoleEndpoint {
	@PersistenceContext(unitName = "primary")
	private EntityManager em;

	@POST
	@Consumes("application/json")
	public Response create(Role entity) {
		if(entity.getName() != null) {
			em.persist(entity);
			return Response.created(
					UriBuilder.fromResource(RoleEndpoint.class)
							.path(String.valueOf(entity.getId())).build()).build();
		}else {
			return Response.status(Response.Status.BAD_REQUEST).entity("Erreur : Le nom du role n'a pas été renseigné").build();
		}
		
	}

	@DELETE
	@Path("/{id:[0-9][0-9]*}")
	public Response deleteById(@PathParam("id") Integer id) {
		Role entity = em.find(Role.class, id);
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
		TypedQuery<Role> findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT r FROM Role r LEFT JOIN FETCH r.accounts WHERE r.id = :entityId ORDER BY r.id",
						Role.class);
		findByIdQuery.setParameter("entityId", id);
		Role entity;
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
	public List<Role> listAll(@QueryParam("start") Integer startPosition,
			@QueryParam("max") Integer maxResult) {
		TypedQuery<Role> findAllQuery = em
				.createQuery(
						"SELECT DISTINCT r FROM Role r LEFT JOIN FETCH r.accounts ORDER BY r.id",
						Role.class);
		if (startPosition != null) {
			findAllQuery.setFirstResult(startPosition);
		}
		if (maxResult != null) {
			findAllQuery.setMaxResults(maxResult);
		}
		final List<Role> results = findAllQuery.getResultList();
		return results;
	}

	@PUT
	@Path("/{id:[0-9][0-9]*}")
	@Consumes("application/json")
	public Response update(@PathParam("id") Integer id, Role entity) {
		if (entity == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (id == null) {
			return Response.status(Status.BAD_REQUEST).build();
		}
		if (!id.equals(entity.getId())) {
			return Response.status(Status.CONFLICT).entity(entity).build();
		}
		if (em.find(Role.class, id) == null) {
			return Response.status(Status.NOT_FOUND).build();
		}
		
			if(entity.getName() != null) {
				try {
					entity = em.merge(entity);
				} catch (OptimisticLockException e) {
					return Response.status(Response.Status.CONFLICT)
							.entity(e.getEntity()).build();
				}
				return Response.noContent().build();
			}else {
				return Response.status(Response.Status.BAD_REQUEST).entity("Erreur : Le nom du role n'a pas été renseigné").build();
			}
	}
}
