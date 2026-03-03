-- ============================================================
-- 1. CATEGORIAS
-- ============================================================
INSERT INTO category (id, name, created_at) VALUES (1, 'Móveis', TIMESTAMP WITH TIME ZONE '2024-01-01T10:00:00Z');
INSERT INTO category (id, name, created_at) VALUES (2, 'Decoração', TIMESTAMP WITH TIME ZONE '2024-01-01T10:00:00Z');
INSERT INTO category (id, name, created_at) VALUES (3, 'Iluminação', TIMESTAMP WITH TIME ZONE '2024-01-01T10:00:00Z');

-- ============================================================
-- 2. PRODUTOS (25 ITENS COM DATAS VARIADAS)
-- ============================================================

-- MÓVEIS (IDs 1-10)
INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (1, 'Sofá Retrátil 3 Lugares', 2500.0, TIMESTAMP WITH TIME ZONE '2024-02-20T14:30:00Z', 'Sofá confortável em linho cinza, perfeito para sala de estar.', 'https://picsum.photos/seed/sofa1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (2, 'Mesa de Jantar Madeira', 1800.0, TIMESTAMP WITH TIME ZONE '2024-03-15T09:15:00Z', 'Mesa de madeira maciça com acabamento rústico para 6 pessoas.', 'https://picsum.photos/seed/table2/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (3, 'Cadeira Eames', 250.0, TIMESTAMP WITH TIME ZONE '2024-04-10T11:00:00Z', 'Cadeira design moderno com pés de madeira e assento branco.', 'https://picsum.photos/seed/chair1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (4, 'Poltrona de Leitura', 890.0, TIMESTAMP WITH TIME ZONE '2024-05-05T16:45:00Z', 'Poltrona ergonômica com apoio para os pés, tecido aveludado azul.', 'https://picsum.photos/seed/armchair/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (5, 'Rack para TV 65"', 950.0, TIMESTAMP WITH TIME ZONE '2024-06-20T10:20:00Z', 'Rack minimalista branco com detalhes em carvalho.', 'https://picsum.photos/seed/tvstand/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (6, 'Cama Queen Size', 1500.0, TIMESTAMP WITH TIME ZONE '2024-07-01T08:00:00Z', 'Estrutura de cama estofada com cabeceira capitonê.', 'https://picsum.photos/seed/bed1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (7, 'Guarda-Roupa Casal', 2200.0, TIMESTAMP WITH TIME ZONE '2024-07-15T13:10:00Z', 'Guarda-roupa grande com portas de correr e espelho central.', 'https://picsum.photos/seed/closet/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (8, 'Escrivaninha Office', 600.0, TIMESTAMP WITH TIME ZONE '2024-08-12T15:30:00Z', 'Mesa de escritório compacta estilo industrial com gavetas.', 'https://picsum.photos/seed/desk1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (9, 'Estante de Livros', 450.0, TIMESTAMP WITH TIME ZONE '2024-09-05T19:00:00Z', 'Estante alta com 5 prateleiras para organização.', 'https://picsum.photos/seed/bookshelf/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (10, 'Mesa de Cabeceira', 200.0, TIMESTAMP WITH TIME ZONE '2024-09-25T21:45:00Z', 'Mesa de apoio lateral com gaveta e nicho.', 'https://picsum.photos/seed/nightstand/800/600');

-- ILUMINAÇÃO (IDs 11-15)
INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (11, 'Abajur Moderno', 180.0, TIMESTAMP WITH TIME ZONE '2024-10-02T10:00:00Z', 'Abajur de mesa com base de cerâmica e cúpula de tecido.', 'https://picsum.photos/seed/lamp1/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (12, 'Lustre Pendente', 520.0, TIMESTAMP WITH TIME ZONE '2024-10-15T14:15:00Z', 'Lustre de cristal para sala de jantar.', 'https://picsum.photos/seed/chandelier/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (13, 'Luminária de Chão', 350.0, TIMESTAMP WITH TIME ZONE '2024-11-01T17:30:00Z', 'Luminária de piso articulada estilo arquitetura.', 'https://picsum.photos/seed/floorlamp/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (14, 'Arandela de Parede', 120.0, TIMESTAMP WITH TIME ZONE '2024-11-20T09:45:00Z', 'Arandela dourada para iluminação indireta no quarto.', 'https://picsum.photos/seed/sconce/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (15, 'Kit Fita LED Smart', 99.9, TIMESTAMP WITH TIME ZONE '2024-12-05T20:00:00Z', 'Fita de LED RGB com controle via aplicativo e assistente de voz.', 'https://picsum.photos/seed/ledstrip/800/600');

-- DECORAÇÃO (IDs 16-25)
INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (16, 'Vaso Decorativo', 75.0, TIMESTAMP WITH TIME ZONE '2025-01-10T11:20:00Z', 'Vaso de vidro trabalhado para arranjos florais.', 'https://picsum.photos/seed/vase2/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (17, 'Quadro Abstrato', 210.0, TIMESTAMP WITH TIME ZONE '2025-01-15T15:50:00Z', 'Tela impressa em canvas com moldura flutuante.', 'https://picsum.photos/seed/artframe/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (18, 'Espelho Redondo', 340.0, TIMESTAMP WITH TIME ZONE '2025-02-01T08:30:00Z', 'Espelho estilo Adnet com alça de couro sintético.', 'https://picsum.photos/seed/mirror2/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (19, 'Tapete Geométrico', 560.0, TIMESTAMP WITH TIME ZONE '2025-02-20T13:40:00Z', 'Tapete de sala 2x2.5m com estampa moderna preto e branco.', 'https://picsum.photos/seed/rug2/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (20, 'Kit Almofadas', 120.0, TIMESTAMP WITH TIME ZONE '2025-03-05T10:10:00Z', 'Conjunto de 4 capas de almofada em veludo colorido.', 'https://picsum.photos/seed/pillows/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (21, 'Cortina Blackout', 180.0, TIMESTAMP WITH TIME ZONE '2025-03-15T16:00:00Z', 'Cortina de tecido grosso que bloqueia 100% da luz.', 'https://picsum.photos/seed/curtains/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (22, 'Relógio de Parede', 85.0, TIMESTAMP WITH TIME ZONE '2025-04-01T09:00:00Z', 'Relógio grande estilo estação de trem vintage.', 'https://picsum.photos/seed/wallclock/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (23, 'Porta-Retrato', 45.0, TIMESTAMP WITH TIME ZONE '2025-04-10T14:55:00Z', 'Porta-retrato de metal prateado para fotos 10x15.', 'https://picsum.photos/seed/frame/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (24, 'Vela Aromática', 35.9, TIMESTAMP WITH TIME ZONE '2025-05-01T18:20:00Z', 'Vela perfumada de lavanda em pote de vidro.', 'https://picsum.photos/seed/candle/800/600');

INSERT INTO product (id, name, price, date, description, img_url) VALUES
    (25, 'Cesto Organizador', 55.0, TIMESTAMP WITH TIME ZONE '2025-05-20T11:15:00Z', 'Cesto de fibra natural para organizar mantas ou brinquedos.', 'https://picsum.photos/seed/basket/800/600');

-- ============================================================
-- 3. RELACIONAMENTOS (PRODUCT_CATEGORY)
-- ============================================================

-- Categoria 1: Móveis (Produtos 1 ao 10)
INSERT INTO product_category (product_id, category_id) VALUES (1, 1);
INSERT INTO product_category (product_id, category_id) VALUES (2, 1);
INSERT INTO product_category (product_id, category_id) VALUES (3, 1);
INSERT INTO product_category (product_id, category_id) VALUES (4, 1);
INSERT INTO product_category (product_id, category_id) VALUES (5, 1);
INSERT INTO product_category (product_id, category_id) VALUES (6, 1);
INSERT INTO product_category (product_id, category_id) VALUES (7, 1);
INSERT INTO product_category (product_id, category_id) VALUES (8, 1);
INSERT INTO product_category (product_id, category_id) VALUES (9, 1);
INSERT INTO product_category (product_id, category_id) VALUES (10, 1);

-- Categoria 3: Iluminação (Produtos 11 ao 15)
INSERT INTO product_category (product_id, category_id) VALUES (11, 3);
INSERT INTO product_category (product_id, category_id) VALUES (12, 3);
INSERT INTO product_category (product_id, category_id) VALUES (13, 3);
INSERT INTO product_category (product_id, category_id) VALUES (14, 3);
INSERT INTO product_category (product_id, category_id) VALUES (15, 3);
-- Abajur (11) também pode ser Decoração (2)
INSERT INTO product_category (product_id, category_id) VALUES (11, 2);

-- Categoria 2: Decoração (Produtos 16 ao 25)
INSERT INTO product_category (product_id, category_id) VALUES (16, 2);
INSERT INTO product_category (product_id, category_id) VALUES (17, 2);
INSERT INTO product_category (product_id, category_id) VALUES (18, 2);
INSERT INTO product_category (product_id, category_id) VALUES (19, 2);
INSERT INTO product_category (product_id, category_id) VALUES (20, 2);
INSERT INTO product_category (product_id, category_id) VALUES (21, 2);
INSERT INTO product_category (product_id, category_id) VALUES (22, 2);
INSERT INTO product_category (product_id, category_id) VALUES (23, 2);
INSERT INTO product_category (product_id, category_id) VALUES (24, 2);
INSERT INTO product_category (product_id, category_id) VALUES (25, 2);

-- ============================================================
-- 4. USUÁRIOS E ROLES
-- ============================================================
INSERT INTO users (id, first_name, last_name, email, password) VALUES
    (1, 'Alex', 'Brown', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO users (id, first_name, last_name, email, password) VALUES
    (2, 'Maria', 'Green', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG');

INSERT INTO role (id, authority) VALUES (1, 'ROLE_OPERATOR');
INSERT INTO role (id, authority) VALUES (2, 'ROLE_ADMIN');

INSERT INTO user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO user_role (user_id, role_id) VALUES (2, 2);

-- Atualiza o valor do auto-incremento para evitar conflito de chaves primárias
ALTER TABLE category ALTER COLUMN id RESTART WITH 4;
ALTER TABLE product ALTER COLUMN id RESTART WITH 26;
ALTER TABLE users ALTER COLUMN id RESTART WITH 3;
ALTER TABLE role ALTER COLUMN id RESTART WITH 3;