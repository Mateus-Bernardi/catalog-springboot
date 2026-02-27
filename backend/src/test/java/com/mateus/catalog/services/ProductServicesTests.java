package com.mateus.catalog.services;

import com.mateus.catalog.dto.CategoryDTO;
import com.mateus.catalog.dto.ProductDTO;
import com.mateus.catalog.entities.Category;
import com.mateus.catalog.entities.Product;
import com.mateus.catalog.exceptions.DatabaseException;
import com.mateus.catalog.exceptions.ResourceNotFoundException;
import com.mateus.catalog.repositories.CategoryRepository;
import com.mateus.catalog.repositories.ProductRepository;
import com.mateus.catalog.tests.Factory;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class ProductServicesTests {

    @InjectMocks
    private ProductService service;

    @Mock
    private ProductRepository repository;

    @Mock
    private CategoryRepository categoryRepository;

    private long existingId;
    private long nonExistingId;
    private long dependentId;
    private PageImpl<Product> page;
    private Product product;
    private ProductDTO productDTO;
    private Category category;

    @BeforeEach
    void setup() throws Exception {
        existingId = 1L;
        nonExistingId = 1000L;
        dependentId = 2L;
        product = Factory.createProduct();
        category = new Category(2L, "Electronics");
        product.getCategories().add(category);
        productDTO = new ProductDTO(product, product.getCategories());
        page = new PageImpl<>(List.of(product));
    }

    @Test
    public void findAllPagedShouldReturnPage() {
        Pageable pageable = PageRequest.of(0, 10);
        Mockito.when(repository.findAll(pageable)).thenReturn(page);
        Page<ProductDTO> result = service.findAllPaged(pageable);
        Assertions.assertNotNull(result);
        Assertions.assertFalse(result.isEmpty());
        Mockito.verify(repository).findAll(pageable);
    }

    @Test
    public void findByIdShouldReturnProductDTOWhenIdExists() {
        Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
        ProductDTO result = service.findById(existingId);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(product.getName(), result.getName());
        Mockito.verify(repository).findById(existingId);
    }

    @Test
    public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
        Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.findById(nonExistingId);
        });
        Mockito.verify(repository).findById(nonExistingId);
    }

    @Test
    public void insertShouldReturnProductDTO() {
        Mockito.when(repository.save(ArgumentMatchers.any(Product.class))).thenReturn(product);
        Mockito.when(categoryRepository.getReferenceById(ArgumentMatchers.anyLong())).thenReturn(category);
        ProductDTO result = service.insert(productDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(product.getName(), result.getName());
        Mockito.verify(repository).save(ArgumentMatchers.any(Product.class));
    }

    @Test
    public void updateShouldReturnProductDTOWhenIdExists() {
        Mockito.when(repository.getReferenceById(existingId)).thenReturn(product);
        Mockito.when(repository.save(ArgumentMatchers.any(Product.class))).thenReturn(product);
        Mockito.when(categoryRepository.getReferenceById(ArgumentMatchers.anyLong())).thenReturn(category);
        ProductDTO result = service.update(existingId, productDTO);
        Assertions.assertNotNull(result);
        Assertions.assertEquals(product.getName(), result.getName());
        Mockito.verify(repository).getReferenceById(existingId);
        Mockito.verify(repository).save(ArgumentMatchers.any(Product.class));
    }

    @Test
    public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
        Mockito.when(repository.getReferenceById(nonExistingId)).thenThrow(EntityNotFoundException.class);
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.update(nonExistingId, productDTO);
        });
        Mockito.verify(repository).getReferenceById(nonExistingId);
        Mockito.verify(repository, Mockito.never()).save(ArgumentMatchers.any(Product.class));
    }

    @Test
    public void deleteShouldDoNothingWhenIdExists() {
        Mockito.when(repository.existsById(existingId)).thenReturn(true);
        Assertions.assertDoesNotThrow(() -> {
            service.delete(existingId);
        });
        Mockito.verify(repository).deleteById(existingId);
    }

    @Test
    public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
        Mockito.when(repository.existsById(nonExistingId)).thenReturn(false);
        Assertions.assertThrows(ResourceNotFoundException.class, () -> {
            service.delete(nonExistingId);
        });
        Mockito.verify(repository, Mockito.never()).deleteById(nonExistingId);
    }

    @Test
    public void deleteShouldThrowDatabaseExceptionWhenDependentId() {
        Mockito.when(repository.existsById(dependentId)).thenReturn(true);
        Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
        Assertions.assertThrows(DatabaseException.class, () -> {
            service.delete(dependentId);
        });
        Mockito.verify(repository).deleteById(dependentId);
    }
}
