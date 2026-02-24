package com.mateus.catalog.services;


import com.mateus.catalog.entities.Category;
import com.mateus.catalog.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    public CategoryRepository repository;

    public List<Category> findAll(){
        return repository.findAll();
    }
}
