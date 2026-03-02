package com.mateus.catalog.config.customgrant;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class CustomUserAuthorities {

	private Long userId;
	private String username;
	private String firstName;
	private String lastName;
	private Collection<? extends GrantedAuthority> authorities;

	public CustomUserAuthorities(String username, Collection<? extends GrantedAuthority> authorities,
			String firstName, String lastName, Long userId) {
		this.userId = userId;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.authorities = authorities;
	}

	public Long getUserId() {
		return userId;
	}

	public String getUsername() {
		return username;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}
}
