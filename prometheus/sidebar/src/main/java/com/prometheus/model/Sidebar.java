package com.prometheus.model;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.EAGER;
import static javax.persistence.GenerationType.IDENTITY;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "name", "username" }))
public class Sidebar {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String username;

	@ManyToMany(fetch = EAGER, cascade = ALL)
	private Set<Sidecard> defaultSidecards;

	@ManyToMany(fetch = EAGER, cascade = ALL)
	private Set<Sidecard> customSidecards;

	public Sidebar() {
		setDefaultSidecards(new HashSet<Sidecard>());
		setCustomSidecards(new HashSet<Sidecard>());
	}

	public Sidebar(String name, String username) {
		this();
		setName(name);
		setUsername(username);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Set<Sidecard> getDefaultSidecards() {
		return defaultSidecards;
	}

	public void setDefaultSidecards(Set<Sidecard> defaultSidecards) {
		this.defaultSidecards = defaultSidecards;
	}

	public void addDefaultSidecard(Sidecard defaultSidecard) {
		this.defaultSidecards.add(defaultSidecard);
	}

	public void removeDefaultSidecard(Sidecard defaultSidecard) {
		this.defaultSidecards.remove(defaultSidecard);
	}

	public boolean removeDefaultSidecardById(Long id) {
		boolean removed = false;
		for (Sidecard defaultSidecard : getDefaultSidecards()) {
			if (defaultSidecard.getId().equals(id)) {
				removeDefaultSidecard(defaultSidecard);
				removed = true;
				break;
			}
		}
		return removed;
	}

	public Optional<Sidecard> findDefaultSidecardById(Long id) {
		Optional<Sidecard> optionalSidecard = Optional.empty();
		for (Sidecard defaultSidecard : getDefaultSidecards()) {
			if (defaultSidecard.getId().equals(id)) {
				optionalSidecard = Optional.of(defaultSidecard);
				break;
			}
		}
		return optionalSidecard;
	}

	public Set<Sidecard> getCustomSidecards() {
		return customSidecards;
	}

	public void setCustomSidecards(Set<Sidecard> customSidecards) {
		this.customSidecards = customSidecards;
	}

	public void addCustomSidecard(Sidecard customSidecard) {
		this.customSidecards.add(customSidecard);
	}

	public void removeCustomSidecard(Sidecard customSidecard) {
		this.customSidecards.remove(customSidecard);
	}

	public boolean removeCustomSidecardById(Long id) {
		boolean removed = false;
		for (Sidecard customSidecard : getCustomSidecards()) {
			if (customSidecard.getId().equals(id)) {
				removeCustomSidecard(customSidecard);
				removed = true;
				break;
			}
		}
		return removed;
	}

	public Optional<Sidecard> findCustomSidecardById(Long id) {
		Optional<Sidecard> optionalSidecard = Optional.empty();
		for (Sidecard customSidecard : getCustomSidecards()) {
			if (customSidecard.getId().equals(id)) {
				optionalSidecard = Optional.of(customSidecard);
				break;
			}
		}
		return optionalSidecard;
	}

	public Optional<Sidecard> findSidecardById(Long id) {
		Optional<Sidecard> optionalSidecard = findDefaultSidecardById(id);
		if (!optionalSidecard.isPresent()) {
			optionalSidecard = findCustomSidecardById(id);
		}
		return optionalSidecard;
	}

	public boolean removeSidecardById(Long id) {
		boolean removed = removeDefaultSidecardById(id);
		if (!removed) {
			removed = removeCustomSidecardById(id);
		}
		return removed;
	}

}
