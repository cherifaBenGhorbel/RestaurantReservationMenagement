package com.example.demo.repository;

import com.example.demo.model.Reservation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReservationRepository extends MongoRepository<Reservation, String> {
    List<Reservation> findByRestaurantId(String restaurantId);
    List<Reservation> findByCustomerEmail(String customerEmail);
}
