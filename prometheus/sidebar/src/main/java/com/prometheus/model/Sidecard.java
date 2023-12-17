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

@Entity
public class Sidecard {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column
	private String info;

	@Column(nullable = false)
	private Boolean custom;

	@ManyToMany(fetch = EAGER, cascade = ALL)
	private Set<SidecardLink> links;

	public Sidecard() {
		setCustom(true);
		setLinks(new HashSet<SidecardLink>());
	}

	public Sidecard(String title) {
		this();
		setTitle(title);
	}

	public Sidecard(String title, String info) {
		this(title);
		setInfo(info);
	}

	public Sidecard(String title, String info, Boolean custom) {
		this(title, info);
		setCustom(custom);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public Boolean getCustom() {
		return custom;
	}

	public void setCustom(Boolean custom) {
		this.custom = custom;
	}

	public Set<SidecardLink> getLinks() {
		return links;
	}

	public void setLinks(Set<SidecardLink> links) {
		this.links = links;
	}

	public void addLink(SidecardLink link) {
		this.links.add(link);
	}

	public void removeLink(SidecardLink link) {
		this.links.remove(link);
	}

	public void clearLinks() {
		this.links.clear();
	}

	public Optional<SidecardLink> findLinkById(Long id) {
		Optional<SidecardLink> optionalLink = Optional.empty();
		for (SidecardLink link : getLinks()) {
			if (link.getId().equals(id)) {
				optionalLink = Optional.of(link);
				break;
			}
		}
		return optionalLink;
	}

	public boolean removeLinkById(Long id) {
		boolean removed = false;
		for (SidecardLink link : getLinks()) {
			if (link.getId().equals(id)) {
				removeLink(link);
				removed = true;
				break;
			}
		}
		return removed;
	}

	public void replaceLinks(Set<SidecardLink> links) {
		clearLinks();
		links.forEach(link -> {
			addLink(link);
		});
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (!Sidecard.class.isAssignableFrom(obj.getClass())) {
			return false;
		}
		final Sidecard other = (Sidecard) obj;
		if ((this.id == null) ? (other.id != null) : !this.id.equals(other.id)) {
			return false;
		}
		return true;
	}

}
