package com.mateus.catalog.tests;

import com.mateus.catalog.dto.ProductDTO;
import com.mateus.catalog.entities.Category;
import com.mateus.catalog.entities.Product;

import java.time.Instant;

public class Factory {

    public static Product createProduct() {
        Product product = new Product(1L, "Sofá Retrátil 3 Lugares",
                "Sofá confortável em linho cinza, perfeito para sala de estar.",
                2500.0, "https://picsum.photos/seed/sofa1/800/600",
                Instant.parse("2024-02-20T14:30:00Z"));
        product.getCategories().add(new Category(1L, "Móveis"));
        return product;
    }

    public static ProductDTO createProductDTO() {
        Product product = createProduct();
        return new ProductDTO(product, product.getCategories());
    }
}
