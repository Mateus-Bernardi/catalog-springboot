package com.mateus.catalog.repositories;

import com.mateus.catalog.entities.Product;
import com.mateus.catalog.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}
