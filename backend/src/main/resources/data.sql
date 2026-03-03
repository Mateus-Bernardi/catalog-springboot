-- ============================================================
-- 1. CATEGORIAS (Móveis, Decoração, Iluminação)
-- ============================================================
INSERT INTO category (id, name, created_at) VALUES (1, 'Móveis', NOW());
INSERT INTO category (id, name, created_at) VALUES (2, 'Decoração', NOW());
INSERT INTO category (id, name, created_at) VALUES (3, 'Iluminação', NOW());

-- ============================================================
-- 2. PRODUTOS (URLs usando Lorem Picsum)
-- ============================================================
INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (1, 'Sofá Retrátil 3 Lugares', 2500.00, NOW(), 'Sofá super confortável com tecido em linho, ideal para sua sala de estar.', 'https://picsum.photos/seed/sofa1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (2, 'Mesa de Jantar Madeira', 1800.00, NOW(), 'Mesa de madeira maciça para 6 lugares. Acabamento rústico e verniz fosco.', 'https://picsum.photos/seed/table1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (3, 'Abajur Moderno', 150.50, NOW(), 'Luminária de mesa com design industrial na cor preta.', 'https://picsum.photos/seed/lamp1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (4, 'Vaso de Cerâmica', 89.90, NOW(), 'Vaso decorativo artesanal, perfeito para plantas ou apenas decoração.', 'https://picsum.photos/seed/vase1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (5, 'Poltrona de Leitura', 850.00, NOW(), 'Poltrona ergonômica com apoio para os pés. Tecido aveludado.', 'https://picsum.photos/seed/armchair/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (6, 'Quadro Abstrato', 220.00, NOW(), 'Impressão em canvas de arte abstrata colorida. Tamanho 90x60cm.', 'https://picsum.photos/seed/art/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (7, 'Lustre Pendente', 450.00, NOW(), 'Lustre de cristal moderno para sala de jantar ou hall de entrada.', 'https://picsum.photos/seed/chandelier/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (8, 'Espelho Redondo', 320.00, NOW(), 'Espelho com moldura em couro sintético e alça para pendurar.', 'https://picsum.photos/seed/mirror/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (9, 'Rack para TV', 900.00, NOW(), 'Rack minimalista branco com detalhes em madeira. Suporta TVs até 60 polegadas.', 'https://picsum.photos/seed/tvstand/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (10, 'Tapete Geométrico', 560.00, NOW(), 'Tapete de sala com estampa geométrica preto e branco. Fácil de limpar.', 'https://picsum.photos/seed/rug/800/600');

-- ============================================================
-- 3. RELACIONAMENTO PRODUTO_CATEGORIA
-- ============================================================

-- Móveis (Cat 1)
INSERT INTO product_category (product_id, category_id) VALUES (1, 1); -- Sofá
INSERT INTO product_category (product_id, category_id) VALUES (2, 1); -- Mesa
INSERT INTO product_category (product_id, category_id) VALUES (5, 1); -- Poltrona
INSERT INTO product_category (product_id, category_id) VALUES (9, 1); -- Rack

-- Decoração (Cat 2)
INSERT INTO product_category (product_id, category_id) VALUES (4, 2); -- Vaso
INSERT INTO product_category (product_id, category_id) VALUES (6, 2); -- Quadro
INSERT INTO product_category (product_id, category_id) VALUES (8, 2); -- Espelho
INSERT INTO product_category (product_id, category_id) VALUES (10, 2); -- Tapete

-- Iluminação (Cat 3)
INSERT INTO product_category (product_id, category_id) VALUES (3, 3); -- Abajur
INSERT INTO product_category (product_id, category_id) VALUES (7, 3); -- Lustre

-- Produto Misto (Ex: Abajur também pode ser Decoração)
INSERT INTO product_category (product_id, category_id) VALUES (3, 2);

-- ============================================================
-- 4. USUÁRIOS E ROLES (Novos Nomes)
-- ============================================================
INSERT INTO users (id, first_name, last_name, email, password) VALUES
    (1, 'Carlos', 'Silva', 'carlos@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO users (id, first_name, last_name, email, password) VALUES
    (2, 'Ana', 'Souza', 'ana@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO role (id, authority) VALUES (1, 'ROLE_OPERATOR');
INSERT INTO role (id, authority) VALUES (2, 'ROLE_ADMIN');

-- Carlos é Operador
INSERT INTO user_role (user_id, role_id) VALUES (1, 1);

-- Ana é Admin e Operadora
INSERT INTO user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO user_role (user_id, role_id) VALUES (2, 2);