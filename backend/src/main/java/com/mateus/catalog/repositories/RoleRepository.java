package com.mateus.catalog.repositories;

import com.mateus.catalog.entities.Role;
import com.mateus.catalog.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}
