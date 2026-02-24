package com.mateus.catalog.controllers;

import com.mateus.catalog.entities.Category;
import com.mateus.catalog.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/categories")
public class CategoryController {

    @Autowired
    public CategoryService service;

    @GetMapping
    public ResponseEntity<List<Category>> finAll(){
        List<Category> list = service.findAll();
        return ResponseEntity.ok().body(list);
    }
}
