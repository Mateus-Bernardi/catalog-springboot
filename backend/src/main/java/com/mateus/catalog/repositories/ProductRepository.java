package com.mateus.catalog.repositories;

import com.mateus.catalog.entities.Category;
import com.mateus.catalog.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}
