package com.prometheus.controller;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prometheus.model.Sidebar;
import com.prometheus.model.Sidecard;
import com.prometheus.model.SidecardLink;
import com.prometheus.model.repo.SidebarRepo;
import com.prometheus.model.repo.SidecardLinkRepo;
import com.prometheus.model.repo.SidecardRepo;
import com.prometheus.request.SidecardLinkRequest;
import com.prometheus.request.SidecardRequest;

@RestController
@RequestMapping("/sidebar")
public class SidebarController {

	// TODO: check Optional results before atttempting to get value

	private final static String DEFAULT_SIDEBAR_NAME = "default";
	private final static String DEFAULT_SIDEBAR_USERNAME = "default";

	@Autowired
	private SidebarRepo sidebarRepo;

	@Autowired
	private SidecardRepo sidecardRepo;

	@Autowired
	private SidecardLinkRepo sidecardLinkRepo;

	@RequestMapping(value = "/{name}", method = GET)
	public ResponseEntity<Sidebar> getSidebar(Authentication authentication, @PathVariable String name) {
		String username = authentication != null ? authentication.getName() : DEFAULT_SIDEBAR_USERNAME;
		ResponseEntity<Sidebar> response;
		Optional<Sidebar> optionalSidebar = sidebarRepo.findByNameAndUsername(name, username);
		if (optionalSidebar.isPresent()) {
			response = ResponseEntity.ok(optionalSidebar.get());
		} else {
			optionalSidebar = sidebarRepo.findByNameAndUsername(name, DEFAULT_SIDEBAR_USERNAME);
			if (optionalSidebar.isPresent()) {
				response = ResponseEntity.ok(optionalSidebar.get());
			} else {
				optionalSidebar = sidebarRepo.findByNameAndUsername(DEFAULT_SIDEBAR_NAME, username);
				if (optionalSidebar.isPresent()) {
					response = ResponseEntity.ok(optionalSidebar.get());
				} else {
					response = ResponseEntity.ok(sidebarRepo.findByNameAndUsername(DEFAULT_SIDEBAR_NAME, DEFAULT_SIDEBAR_USERNAME).get());
				}
			}
		}
		return response;
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{name}/card", method = POST)
	public ResponseEntity<Sidecard> addCard(Authentication authentication, @PathVariable String name, @RequestBody SidecardRequest sidecardRequest) {
		Sidebar sidebar;
		Optional<Sidebar> optionalSidebar = sidebarRepo.findByNameAndUsername(name, authentication.getName());
		if (!optionalSidebar.isPresent()) {
			optionalSidebar = sidebarRepo.findByNameAndUsername(name, DEFAULT_SIDEBAR_USERNAME);
			if (!optionalSidebar.isPresent()) {
				optionalSidebar = sidebarRepo.findByNameAndUsername(DEFAULT_SIDEBAR_NAME, DEFAULT_SIDEBAR_USERNAME);
			}
			Sidebar defaultSidebar = optionalSidebar.get();
			sidebar = sidebarRepo.save(new Sidebar(name, authentication.getName()));
			defaultSidebar.getCustomSidecards().forEach(customSidecard -> {
				sidebar.addCustomSidecard(customSidecard);
			});
			defaultSidebar.getDefaultSidecards().forEach(defaultSidecard -> {
				sidebar.addDefaultSidecard(defaultSidecard);
			});
		} else {
			sidebar = optionalSidebar.get();
		}
		Sidecard sidecard = sidecardRepo.save(new Sidecard(sidecardRequest.getTitle(), sidecardRequest.getInfo(), !authentication.getName().equals(DEFAULT_SIDEBAR_USERNAME)));
		if (authentication.getName().equals(DEFAULT_SIDEBAR_USERNAME)) {
			sidebar.addDefaultSidecard(sidecard);
		} else {
			sidebar.addCustomSidecard(sidecard);
		}
		sidebarRepo.save(sidebar);
		return ResponseEntity.ok(sidecard);
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{name}/card/update", method = POST)
	public ResponseEntity<Sidecard> updateCard(Authentication authentication, @PathVariable String name, @RequestBody SidecardRequest sidecardRequest) {
		Sidebar sidebar = sidebarRepo.findByNameAndUsername(name, authentication.getName()).get();
		Sidecard sidecard = sidebar.findSidecardById(sidecardRequest.getId()).get();
		sidecard.setTitle(sidecardRequest.getTitle());
		sidecard.setInfo(sidecardRequest.getInfo());
		sidebarRepo.save(sidebar);
		return ResponseEntity.ok(sidecard);
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{name}/card/{id}/remove", method = DELETE)
	public ResponseEntity<Boolean> removeCard(Authentication authentication, @PathVariable String name, @PathVariable Long id) {
		Sidebar sidebar = sidebarRepo.findByNameAndUsername(name, authentication.getName()).get();
		boolean removed = sidebar.removeSidecardById(id);
		sidebarRepo.save(sidebar);
		return ResponseEntity.ok(removed);
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{name}/card/{cardId}/link", method = POST)
	public ResponseEntity<SidecardLink> addLink(Authentication authentication, @PathVariable String name, @PathVariable Long cardId, @RequestBody SidecardLinkRequest sidecardLinkRequest) {
		Sidebar sidebar;
		Optional<Sidebar> optionalSidebar = sidebarRepo.findByNameAndUsername(name, authentication.getName());
		if (!optionalSidebar.isPresent()) {
			optionalSidebar = sidebarRepo.findByNameAndUsername(name, DEFAULT_SIDEBAR_USERNAME);
			if (!optionalSidebar.isPresent()) {
				optionalSidebar = sidebarRepo.findByNameAndUsername(DEFAULT_SIDEBAR_NAME, DEFAULT_SIDEBAR_USERNAME);
			}
			Sidebar defaultSidebar = optionalSidebar.get();
			sidebar = sidebarRepo.save(new Sidebar(name, authentication.getName()));
			defaultSidebar.getCustomSidecards().forEach(customSidecard -> {
				sidebar.addCustomSidecard(customSidecard);
			});
			defaultSidebar.getDefaultSidecards().forEach(defaultSidecard -> {
				sidebar.addDefaultSidecard(defaultSidecard);
			});
		} else {
			sidebar = optionalSidebar.get();
		}
		Sidecard sidecard = sidebar.findSidecardById(cardId).get();
		SidecardLink sidecardLink = sidecardLinkRepo.save(new SidecardLink(sidecardLinkRequest.getLabel(), sidecardLinkRequest.getDestination(), sidecardLinkRequest.getIcon(), sidecardLinkRequest.getExternal()));
		sidecard.addLink(sidecardLink);
		sidebarRepo.save(sidebar);
		return ResponseEntity.ok(sidecardLink);
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{name}/card/{cardId}/link/{linkId}/update", method = POST)
	public ResponseEntity<SidecardLink> updateLink(Authentication authentication, @PathVariable String name, @PathVariable Long cardId, @PathVariable Long linkId, @RequestBody SidecardLinkRequest sidecardLinkRequest) {
		Sidebar sidebar = sidebarRepo.findByNameAndUsername(name, authentication.getName()).get();
		Sidecard sidecard = sidebar.findSidecardById(cardId).get();
		SidecardLink sidecardLink = sidecard.findLinkById(linkId).get();
		sidecardLink.setExternal(sidecardLinkRequest.getExternal());
		sidecardLink.setLabel(sidecardLinkRequest.getLabel());
		sidecardLink.setDestination(sidecardLinkRequest.getDestination());
		sidecardLink.setIcon(sidecardLinkRequest.getIcon());
		sidebarRepo.save(sidebar);
		return ResponseEntity.ok(sidecardLink);
	}

	@PreAuthorize("isAuthenticated()")
	@RequestMapping(value = "/{name}/card/{cardId}/link/{linkId}/remove", method = DELETE)
	public ResponseEntity<Boolean> removeLink(Authentication authentication, @PathVariable String name, @PathVariable Long cardId, @PathVariable Long linkId) {
		Sidebar sidebar = sidebarRepo.findByNameAndUsername(name, authentication.getName()).get();
		Sidecard sidecard = sidebar.findSidecardById(cardId).get();
		boolean removed = sidecard.removeLinkById(linkId);
		sidebarRepo.save(sidebar);
		return ResponseEntity.ok(removed);
	}

}
