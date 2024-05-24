package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private Set<Role> roles;
    private String twoFactorAuthSecret;
    private boolean is2FAEnabled;

    @DBRef
    private Set<Restaurant> restaurants; // Restaurants owned by the user if they are a RESTAURANT_OWNER

    @DBRef
    private Set<Reservation> reservations; // Reservations made by the user if they are a CLIENT


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Restaurant> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

	public String getTwoFactorAuthSecret() {
		return twoFactorAuthSecret;
	}

	public void setTwoFactorAuthSecret(String twoFactorAuthSecret) {
		this.twoFactorAuthSecret = twoFactorAuthSecret;
	}

	public boolean isIs2FAEnabled() {
		return is2FAEnabled;
	}

	public void setIs2FAEnabled(boolean is2faEnabled) {
		is2FAEnabled = is2faEnabled;
	}
}
