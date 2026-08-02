import { useState, useMemo, useEffect } from "react";

const WHATSAPP_NUMBER = "582735527411";

// ---------------------------------------------------------------------------
// DATA
// ---------------------------------------------------------------------------
const PRODUCTS = [
  { id: 1, notes: ["Vainilla", "Lavanda", "Vetiver"], style: "dulce", img: "https://www.sephora.com/productimages/sku/s2639813-main-zoom.jpg?imwidth=1224", name: "Valentino Uomo Born In Roma Intense", size: "100ml", price: 210, cat: "hombre", desc: "Vainilla, lavanda y vetiver; nocturno y magnético.", stock: true, best: true },
  { id: 2, notes: ["Cítrico", "Mandarina", "Caramelo"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.106709.2x.avif", name: "Odyssey Mandarin Sky Elixir", size: "100ml EDP", price: 75, cat: "hombre", desc: "Cítrico y dulce con notas de mandarina y caramelo.", stock: true, best: true },
  { id: 3, notes: ["Lavanda", "Regaliz"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.46093.2x.avif", name: "212 VIP Black Elixir", size: "100ml EDP", price: 190, cat: "hombre", desc: "Oscuro y licoroso con lavanda negra y regaliz.", stock: true, best: true },
  { id: 4, notes: ["Cuero", "Iris"], style: "designer", name: "Prada L'Homme Intense", size: "100ml EDP", price: 160, cat: "hombre", desc: "Elegante y pulcro, dominado por el iris y el cuero.", stock: true, best: true },
  { id: 5, notes: ["Vainilla"], style: "dulce", img: "https://perfumerias.com/static/imagenes/productos/product_info/3614274219548.webp", name: "Stronger With You Parfum", size: "100ml", price: 195, cat: "hombre", desc: "Denso, amaderado y con una alta concentración de vainilla.", stock: true, best: true },
  { id: 6, notes: ["Vainilla", "Menta", "Manzana"], style: "dulce", name: "Versace Eros", size: "100ml EDT", price: 110, cat: "hombre", desc: "Fresco y juvenil con menta, manzana verde y vainilla.", stock: true, best: true },
  { id: 7, notes: ["Canela"], style: "dulce", img: "https://perfumerias.com/static/imagenes/productos/product_info/3614272225718.webp", name: "Armani Stronger With You Intensely", size: "100ml EDP", price: 160, cat: "hombre", desc: "Muy dulce y cálido con toffee, canela y gamuza.", stock: true },
  { id: 8, notes: ["Lavanda", "Sándalo", "Ron"], style: "designer", img: "https://perfumerias.com/static/imagenes/productos/product_info/3614273336383.webp", name: "Stronger With You Absolutely", size: "100ml EDP", price: 170, cat: "hombre", desc: "Toque licoroso de ron, lavanda y sándalo.", stock: true },
  { id: 9, notes: ["Cuero", "Iris"], style: "designer", img: "https://hairsense.ca/cdn/shop/files/valentino-50-ml-uomo-intense-eau-de-parfum-spray-34336090292360_1800x1800.jpg?v=1770668970", name: "Valentino Uomo Intense", size: "100ml EDP", price: 150, cat: "hombre", desc: "Cuero elegante impregnado de un iris empolvado.", stock: false },
  { id: 10, notes: ["Tabaco", "Manzana"], style: "fresco", img: "https://perfumerias.com/static/imagenes/productos/product_info/3614273672412.webp", name: "Valentino Uomo Born In Roma Coral Fantasy", size: "100ml EDT", price: 160, cat: "hombre", desc: "Afrutado y fresco con manzana roja y tabaco.", stock: false },
  { id: 11, notes: ["Bergamota", "Café"], style: "fresco", img: "https://perfumerias.com/static/imagenes/productos/product_info/3614274024807.webp", name: "Valentino Uomo Born In Roma Green Stravaganza", size: "100ml EDT", price: 160, cat: "hombre", desc: "Fresco y amaderado con bergamota y café.", stock: true },
  { id: 12, notes: ["Jengibre"], style: "designer", img: "https://hairsense.ca/cdn/shop/files/valentino-50-ml-uomo-born-in-roma-eau-de-toilette-spray-34335935201416_1800x1800.webp?v=1770668975", name: "Valentino Uomo Born In Roma", size: "100ml EDT", price: 180, cat: "hombre", desc: "El clásico moderno: amaderado, mineral y con jengibre.", stock: false },
  { id: 13, notes: ["Cítrico"], style: "arabe", img: "https://perfumania.com/cdn/shop/files/mandarin_sky.png?format=pjpg&v=1747402982&width=1100", name: "Odyssey Mandarin Sky", size: "100ml EDP", price: 55, cat: "hombre", desc: "Cítrico y acaramelado, fresco-dulce.", stock: false },
  { id: 14, notes: [], style: "arabe", img: "https://fragrantvilla.com/cdn/shop/files/dbc8bb598daf422a8d6e12f178b44f72_tplv-omjb5zjo8w-resize-jpeg_800_800_529f722b-f4c1-410c-bd6c-5f1ac1286780.jpg?v=1749076192&width=1946", name: "Odyssey Aqua", size: "100ml EDP", price: 60, cat: "hombre", desc: "Acuático, refrescante y limpio, ideal para el diario.", stock: false },
  { id: 15, notes: ["Chocolate", "Especias"], style: "arabe", name: "Odyssey Dubai Chocolate", size: "100ml EDP", price: 65, cat: "hombre", desc: "Gourmand exótico con notas marcadas de chocolate y especias.", stock: false },
  { id: 16, notes: ["Maderas"], style: "arabe", img: "https://cdn2.jomashop.com/media/catalog/product/cache/b3e31d40bbb1abcc90b26106659d5d3f/a/r/armaf-mens-odyssey-homme-white-edition-edp-spray-20-oz-fragrances-6294015189568.jpg?width=800&height=800", name: "Odyssey White", size: "100ml EDP", price: 65, cat: "hombre", desc: "Limpio, empolvado y versátil con maderas ligeras.", stock: true },
  { id: 17, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.98692.2x.avif", name: "Odyssey Spectra", size: "100ml EDP", price: 65, cat: "hombre", desc: "Especiado y dulce, dinámico y moderno.", stock: true },
  { id: 18, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.106710.2x.avif", name: "Odyssey Aristo", size: "100ml EDP", price: 75, cat: "hombre", desc: "Aromático, amaderado y formal.", stock: false },
  { id: 19, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.121561.2x.avif", name: "Jo Milano Game of Spades Boston", size: "100ml EDP", price: 110, cat: "hombre", desc: "Fresco, frutal y con un fondo almizclado muy duradero.", stock: true },
  { id: 20, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.105095.2x.avif", name: "Game of Spade Full House", size: "100ml EDP", price: 115, cat: "hombre", desc: "Especiado, rico y con carácter oriental.", stock: true },
  { id: 21, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.121557.2x.avif", name: "Jo Milano Game of Spades Moon", size: "100ml EDP", price: 120, cat: "hombre", desc: "Misterioso, dulce y ambarado.", stock: true },
  { id: 22, notes: ["Cítrico", "Jengibre", "Haba tonka", "Limón"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.38686.2x.avif", name: "Azzaro Wanted", size: "100ml EDT", price: 110, cat: "hombre", desc: "Cítrico y especiado con limón, jengibre y haba tonka.", stock: false },
  { id: 23, notes: ["Cardamomo", "Maderas"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.66826.2x.avif", name: "The Most Wanted Azzaro Intense", size: "100ml EDP", price: 120, cat: "hombre", desc: "Cardamomo especiado y maderas, sumamente seductor.", stock: false },
  { id: 24, notes: ["Vainilla", "Jengibre"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.73664.2x.avif", name: "Azzaro Most Wanted Parfum", size: "100ml", price: 125, cat: "hombre", desc: "Jengibre rojo y vainilla bourbon; ultra cálido y dulce.", stock: false },
  { id: 25, notes: [], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.102882.2x.avif", name: "Azzaro Wanted Elixir Forever", size: "100ml", price: 160, cat: "hombre", desc: "La versión más densa, dulce y duradera de la línea.", stock: true },
  { id: 26, notes: ["Vainilla", "Lavanda", "Limón"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.68226.2x.avif", name: "Phantom Paco Rabanne", size: "100ml EDT", price: 110, cat: "hombre", desc: "Futurista y moderno con lavanda, limón y vainilla cremosa.", stock: true },
  { id: 27, notes: [], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.101370.2x.avif", name: "Phantom Elixir", size: "100ml EDP", price: 160, cat: "hombre", desc: "Más oscuro, maduro y especiado que el original.", stock: false },
  { id: 28, notes: ["Haba tonka", "Coco"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.55785.2x.avif", name: "J.P. Gaultier Le Beau", size: "125ml EDT", price: 180, cat: "hombre", desc: "Tropical, fresco y dulce con notas de coco y haba tonka.", stock: true },
  { id: 29, notes: ["Vainilla", "Canela", "Pera"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.30947.2x.avif", name: "Jean Paul Gaultier Ultra Male", size: "125ml EDT", price: 185, cat: "hombre", desc: "Explosión de pera dulce, canela y vainilla; ideal para salir de fiesta.", stock: false },
  { id: 30, notes: ["Lavanda", "Tabaco", "Miel"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.81642.2x.avif", name: "Jean Paul Gaultier Le Male Elixir Parfum", size: "125ml", price: 195, cat: "hombre", desc: "Miel, lavanda y tabaco; denso, dulce y ultra masculino.", stock: false },
  { id: 31, notes: ["Coco", "Maderas"], style: "designer", name: "Jean Paul Gaultier Le Beau Le Parfum", size: "125ml EDP", price: 210, cat: "hombre", desc: "Coco intenso, maderas y un fondo ambarado muy potente.", stock: false },
  { id: 32, notes: ["Cítrico", "Mandarina", "Pimienta", "Maderas"], style: "fresco", name: "Versace Eros Flame", size: "100ml EDP", price: 120, cat: "hombre", desc: "Cítricos picantes con mandarina, pimienta y maderas.", stock: false },
  { id: 33, notes: [], style: "designer", name: "Versace Eros Energy", size: "100ml EDP", price: 140, cat: "hombre", desc: "Explosión cítrica y vibrante, ideal para el verano.", stock: false },
  { id: 34, notes: ["Ámbar", "Bergamota"], style: "designer", name: "Versace Pour Homme Dylan Blue", size: "200ml EDT", price: 160, cat: "hombre", desc: "Versátil y azul con notas marinas, bergamota y ámbar.", stock: true },
  { id: 35, notes: ["Limón", "Piña", "Maderas"], style: "arabe", name: "Club De Nuit Intense Man", size: "105ml EDT", price: 60, cat: "hombre", desc: "El clásico clon de Creed Aventus: piña ahumada, limón y maderas.", stock: true },
  { id: 36, notes: ["Cítrico"], style: "arabe", name: "Club De Nuit Blue Iconic", size: "105ml EDP", price: 65, cat: "hombre", desc: "Estilo Bleu de Chanel: cítrico, fresco, amaderado y versátil.", stock: true },
  { id: 37, notes: [], style: "arabe", name: "Khamrah Dukhan de Laattafa", size: "100ml EDP", price: 75, cat: "hombre", desc: "Toques ahumados e inciensados sobre la base dulce.", stock: true },
  { id: 38, notes: ["Toronja", "Ron"], style: "fresco", name: "Invictus By Paco Rabanne", size: "100ml EDT", price: 95, cat: "hombre", desc: "Marino, fresco y ganador con notas de toronja y laurel.", stock: false },
  { id: 39, notes: ["Vainilla", "Haba tonka", "Limón"], style: "dulce", name: "Invictus Victory", size: "100ml EDP", price: 140, cat: "hombre", desc: "Vainilla oscura y haba tonka con un toque fresco de limón.", stock: true },
  { id: 40, notes: ["Maderas"], style: "designer", name: "Invictus Parfum", size: "200ml", price: 175, cat: "hombre", desc: "Máxima potencia de frescura marina combinada con maderas limpias.", stock: false },
  { id: 41, notes: ["Mandarina", "Cuero", "Canela"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.3747.2x.avif", name: "1 Million Paco Rabanne", size: "100ml EDT", price: 115, cat: "hombre", desc: "Canela, cuero y mandarina; el clásico fiestero y audaz.", stock: true },
  { id: 42, notes: ["Lavanda", "Cedro"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.79159.2x.avif", name: "1 Million Royal Paco Rabanne", size: "100ml", price: 120, cat: "hombre", desc: "Fresco y amaderado con notas de cedro y lavanda moderna.", stock: true },
  { id: 43, notes: ["Oud"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.84554.2x.avif", name: "1 Million Golden Oud Rabanne", size: "100ml EDP", price: 120, cat: "hombre", desc: "Toque lujoso y denso de oud combinado con la base de 1 Million.", stock: false },
  { id: 44, notes: ["Menta"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.12865.2x.avif", name: "212 VIP Men Carolina Herrera", size: "100ml EDT", price: 120, cat: "hombre", desc: "Nocturno y juvenil con notas de vodka, maracuyá y menta.", stock: false },
  { id: 45, notes: ["Vainilla", "Lavanda"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.46093.2x.avif", name: "212 VIP Black", size: "100ml EDP", price: 120, cat: "hombre", desc: "Absenta, lavanda y vainilla negra; fiestero y moderno.", stock: true },
  { id: 46, notes: ["Cuero"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.65718.2x.avif", name: "Bad Boy Le Parfum", size: "100ml EDP", price: 135, cat: "hombre", desc: "Atrevido y verde, con notas de cannabis, cuero y pomelo.", stock: true },
  { id: 47, notes: ["Lavanda", "Ciruela"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.71888.2x.avif", name: "Bad Boy Cobalt Électrique", size: "100ml EDP", price: 145, cat: "hombre", desc: "Fresco y sexy con ciruela, lavanda y un toque de trufa.", stock: false },
  { id: 48, notes: ["Jengibre", "Enebro", "Salvia"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.79243.2x.avif", name: "Y Yves Saint Laurent Intense", size: "100ml EDP", price: 190, cat: "hombre", desc: "Azul, limpio y ultra elegante con jengibre, enebro y salvia.", stock: false },
  { id: 49, notes: ["Manzana"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.913.2x.avif", name: "Nautica Voyage", size: "100ml EDT", price: 40, cat: "hombre", desc: "El rey del diario: manzana verde, notas acuáticas y hojas verdes.", stock: true },
  { id: 50, notes: [], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.36402.2x.avif", name: "Nautica Voyage Sport", size: "100ml EDT", price: 55, cat: "hombre", desc: "Versión aún más cítrica, marina y deportiva.", stock: false },
  { id: 51, notes: ["Vainilla"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.101124.2x.avif", name: "Asad Bourbon by Lattafa", size: "100ml EDP", price: 50, cat: "hombre", desc: "Especiado, ahumado y dulce, con vibras densas de vainilla.", stock: true },
  { id: 52, notes: ["Lavanda", "Regaliz", "Especias"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.72821.2x.avif", name: "Asad Lattafa", size: "100ml EDP", price: 50, cat: "hombre", desc: "Inspirado en Sauvage Elixir: una bomba de especias, lavanda y regaliz.", stock: true },
  { id: 53, notes: ["Pimienta", "Coco"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.90713.2x.avif", name: "Asad Zanzibar", size: "100ml EDP", price: 60, cat: "hombre", desc: "Un giro tropical con notas de coco, pimienta negra y agua salada.", stock: true },
  { id: 54, notes: ["Cítrico", "Maderas"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.410.2x.avif", name: "Acqua Di Gio Giorgio Armani", size: "100ml EDT", price: 135, cat: "hombre", desc: "El clásico marino por excelencia: cítricos, agua de mar y maderas suaves.", stock: true },
  { id: 55, notes: ["Incienso", "Romero"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.81508.2x.avif", name: "Acqua Di Gio Parfum", size: "100ml", price: 165, cat: "hombre", desc: "El ADN clásico pero modernizado con incienso oscuro y romero.", stock: false },
  { id: 56, notes: ["Pimienta", "Bergamota"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.31861.2x.avif", name: "Christian Dior Sauvage", size: "100ml EDT", price: 170, cat: "hombre", desc: "Pimienta de Sichuan, bergamota y una sobredosis de ambroxan; ultra magnético.", stock: false },
  { id: 57, notes: ["Mandarina", "Sándalo"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.56324.2x.avif", name: "Christian Dior Sauvage Parfum", size: "100ml", price: 250, cat: "hombre", desc: "Más maduro, redondo y cremoso con mandarina y sándalo.", stock: false },
  { id: 58, notes: ["Pimienta", "Tabaco", "Canela", "Rosa"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.13857.2x.avif", name: "Spicebomb Viktor & Rolf", size: "100ml EDT", price: 120, cat: "hombre", desc: "Explosión especiada de canela, pimienta rosa y tabaco.", stock: true },
  { id: 59, notes: ["Vainilla", "Tabaco"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.30499.2x.avif", name: "Spicebomb Extreme Viktor & Rolf", size: "100ml EDP", price: 130, cat: "hombre", desc: "Una de las mejores vainillas masculinas combinada con tabaco y comino.", stock: true },
  { id: 60, notes: ["Especias", "Maderas"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.93646.2x.avif", name: "Glaciar Le Noir", size: "100ml EDP", price: 55, cat: "hombre", desc: "Fresco, nocturno y misterioso con maderas y especias frías.", stock: true },
  { id: 61, notes: ["Cítrico"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.103352.2x.avif", name: "Jean Lowe Vibe", size: "100ml EDP", price: 60, cat: "hombre", desc: "Clon refinado, limpio, cítrico y amaderado de alta gama.", stock: true },
  { id: 62, notes: [], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.94163.2x.avif", name: "Sceptre Malachite", size: "100ml EDP", price: 60, cat: "hombre", desc: "Notas ambaradas y especiadas en una botella muy elegante.", stock: true },
  { id: 63, notes: [], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.98241.2x.avif", name: "Art of Nature I", size: "100ml EDP", price: 65, cat: "hombre", desc: "Herbal, terroso y natural, evocando un bosque limpio.", stock: true },
  { id: 64, notes: ["Lavanda", "Mandarina"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.258.2x.avif", name: "Calvin Klein Eternity", size: "100ml EDT", price: 65, cat: "hombre", desc: "El clásico verde y pulcro de los 90s con lavanda y mandarina.", stock: false },
  { id: 65, notes: ["Canela", "Café"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.53215.2x.avif", name: "Halloween Man X", size: "125ml EDT", price: 70, cat: "hombre", desc: "Una joya económica para la noche: café tostado, whisky y canela.", stock: true },
  { id: 66, notes: ["Toronja", "Ron"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.33443.2x.avif", name: "Legend Spirit de Mont Blanc", size: "100ml EDT", price: 80, cat: "hombre", desc: "Súper limpio, fresco e informal, con notas acuáticas y toronja.", stock: false },
  { id: 67, notes: ["Cítrico", "Cedro"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.56358.2x.avif", name: "Dolce & Gabbana K", size: "100ml EDT", price: 90, cat: "hombre", desc: "Cítrico mediterráneo con pimiento picante y madera de cedro.", stock: false },
  { id: 68, notes: [], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.74184.2x.avif", name: "Bharara King", size: "100ml EDP", price: 90, cat: "hombre", desc: "Una bomba de proyección dulce y frutal, ultra duradera.", stock: true },
  { id: 69, notes: ["Pimienta", "Rosa", "Maderas"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.55858.2x.avif", name: "Toy Boy Moschino", size: "100ml EDP", price: 110, cat: "hombre", desc: "Una rosa masculina única, combinada con pimienta rosa y maderas oscuras.", stock: true },
  { id: 70, notes: ["Iris", "Cumarina", "Albahaca"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.65051.2x.avif", name: "Givenchy Gentleman Intense", size: "100ml EDT", price: 130, cat: "hombre", desc: "Iris azul, albahaca y cumarina; sumamente elegante y sofisticado.", stock: false },
  { id: 71, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.82815.2x.avif", name: "Lattafa Shaheen Silver", size: "100ml EDP", price: 60, cat: "hombre", desc: "Fresco, frutal-amaderado con notas cítricas muy marcadas.", stock: true },
  { id: 72, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.96866.2x.avif", name: "His Confession by Lattafa", size: "100ml EDP", price: 75, cat: "hombre", desc: "Cálido, seductor y con un fondo dulce especiado.", stock: true },
  { id: 73, notes: ["Jengibre", "Manzana", "Salvia"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.70465.2x.avif", name: "Fakhar Black Lattafa", size: "100ml EDP", price: 55, cat: "hombre", desc: "Inspirado en Y EDP de YSL: manzana verde, jengibre y salvia fresca.", stock: true },
  { id: 74, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.75902.2x.avif", name: "Lattafa Hayaati", size: "100ml EDP", price: 55, cat: "hombre", desc: "Frutal, dulce y limpio, excelente para el día a día.", stock: true },
  { id: 75, notes: ["Grosella"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.70703.2x.avif", name: "Supremacy in Heaven", size: "100ml EDP", price: 60, cat: "hombre", desc: "Clon de Silver Mountain Water: fresco, metálico, con té verde y grosellas.", stock: true },
  { id: 76, notes: ["Cítrico", "Manzana"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.78611.2x.avif", name: "Afnan 9AM Dive", size: "100ml EDP", price: 60, cat: "hombre", desc: "Cítrico y marino con un toque dulce de manzana; ultra refrescante.", stock: true },
  { id: 77, notes: ["Vainilla", "Canela", "Manzana"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.65414.2x.avif", name: "Afnan 9PM", size: "100ml EDP", price: 60, cat: "hombre", desc: "Clon de Ultra Male: vainilla, canela y manzana; una bestia nocturna.", stock: false },
  { id: 78, notes: [], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.99238.2x.avif", name: "9PM Rebel Afnan", size: "100ml", price: 65, cat: "hombre", desc: "Un giro más fresco y amaderado del clásico 9PM.", stock: false },
  { id: 79, notes: ["Lavanda", "Azafrán", "Oud"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.64948.2x.avif", name: "Badee al Oud for Glory Lattafa", size: "100ml EDP", price: 60, cat: "hombre", desc: "Clon de Oud For Greatness: azafrán, lavanda y un oud oscuro y lujoso.", stock: true },
  { id: 80, notes: ["Cítrico", "Pimienta", "Toronja", "Ron"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.485.2x.avif", name: "Dolce & Gabbana Light Blue", size: "100ml EDT", price: 80, cat: "hombre", desc: "Cítrico puro: toronja, pimienta y agua de mar.", stock: false },
  { id: 81, notes: ["Cuero", "Sándalo"], style: "arabe", img: "https://cdn2.jomashop.com/media/catalog/product/cache/b3e31d40bbb1abcc90b26106659d5d3f/e/m/emper-unisex-stallion-53-edp-spray-34-oz-fragrances-6291108524893.jpg?width=800&height=800", name: "Stallion 53", size: "100ml", price: 55, cat: "unisex", desc: "Amaderado, lineal y limpio con sándalo y cuero suave.", stock: false },
  { id: 82, notes: ["Piña", "Especias"], style: "arabe", img: "https://fandi-perfume.com/cdn/shop/files/lattafa-bade-e-al-oud-honor-glory-unisex-perfume-cologne-for-men-women-eau-de-parfum-3-4-oz-gift-set-3-4-oz-edp-1217979978.jpg?v=1769265070", name: "Badee Honor & Glory Al Oud by Lattafa", size: "100ml EDP", price: 60, cat: "unisex", desc: "Un aroma único que huele a crème brûlée de piña y especias.", stock: true },
  { id: 83, notes: ["Ámbar", "Azafrán", "Abeto"], style: "arabe", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh_TMjkL9i4inTNolLKAUxN3bgeZFOQCC07b6TG2TQuCygXK7ehXBJEnU&s=10", name: "Club de Nuit Untold", size: "105ml EDP", price: 55, cat: "unisex", desc: "El clon más famoso de Baccarat Rouge 540: resina de abeto, azafrán y ámbar dulce.", stock: false },
  { id: 84, notes: ["Azafrán", "Oud", "Maderas"], style: "arabe", img: "https://cdn2.jomashop.com/media/catalog/product/cache/b3e31d40bbb1abcc90b26106659d5d3f/a/r/armaf-mens-odyssey-aoud-edp-2-oz-fragrances-6294015189629.jpg?width=800&height=800", name: "Odyssey Aoud", size: "100ml EDP", price: 60, cat: "unisex", desc: "Oud suave mezclado con toques de azafrán y maderas.", stock: true },
  { id: 85, notes: ["Vainilla", "Canela"], style: "arabe", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Sb6836SN9_lfBit4UEnuK2_QyauA-lStbaayzypag9LnKnalrhwATTA&s=10", name: "Khamrah Lattafa", size: "100ml EDP", price: 60, cat: "unisex", desc: "Canela, dátiles y vainilla; súper dulce y opulento.", stock: false },
  { id: 86, notes: ["Café"], style: "arabe", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Sb6836SN9_lfBit4UEnuK2_QyauA-lStbaayzypag9LnKnalrhwATTA&s=10", name: "Khamrah Qahwa", size: "100ml EDP", price: 60, cat: "unisex", desc: "La versión original enriquecida con una nota de café tostado.", stock: true },
  { id: 87, notes: ["Vainilla", "Coco"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.42888.2x.avif", name: "Mancera Holidays", size: "120ml EDP", price: 160, cat: "unisex", desc: "Vacaciones en botella: coco, flor de tiaré, vainilla y notas marinas.", stock: true },
  { id: 88, notes: ["Piña", "Maderas"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.67996.2x.avif", name: "Lattafa Qaed al Fursan", size: "100ml EDP", price: 45, cat: "unisex", desc: "Piña jugosa, pura y dulce con un fondo de maderas.", stock: true },
  { id: 89, notes: ["Cítrico", "Limón"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.13064.2x.avif", name: "Yellow Diamond By Versace", size: "100ml EDT", price: 95, cat: "mujer", desc: "Cítrico, floral y brillante con limón de Amalfi y mimosa.", stock: true },
  { id: 90, notes: ["Frambuesa", "Granada", "Loto"], style: "fresco", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.21547.2x.avif", name: "Bright Crystal Absolu", size: "100ml EDP", price: 110, cat: "mujer", desc: "Flor de loto, granada y frambuesa; fresco, limpio y ultra femenino.", stock: true },
  { id: 91, notes: ["Vainilla", "Limón", "Azahar"], style: "dulce", img: "https://www.sephora.com/productimages/sku/s2703940-main-zoom.jpg?imwidth=1224", name: "Dolce & Gabbana Devotion", size: "100ml EDP", price: 120, cat: "mujer", desc: "Huele a panqué de limón con vainilla y azahar de naranjo.", stock: false },
  { id: 92, notes: [], style: "dulce", img: "https://www.sephora.com/productimages/sku/s2800415-main-zoom.jpg?imwidth=1224", name: "Devotion Intense D&G", size: "100ml EDP", price: 160, cat: "mujer", desc: "Versión más densa, profunda y azucarada del original.", stock: false },
  { id: 93, notes: [], style: "arabe", img: "https://www.tryoutyourscent.com/cdn/shop/files/template_fea1982e-e5e1-4207-800b-e3d0ab771a75.jpg?v=1723984506&width=1946", name: "Lattafa Fakhar Rose", size: "100ml EDP", price: 60, cat: "mujer", desc: "Un bouquet floral blanco e intenso.", stock: true },
  { id: 94, notes: [], style: "arabe", img: "https://www.tryoutyourscent.com/cdn/shop/files/template_51eefd0b-995c-4c7a-b0ce-460a22f12e0e.jpg?v=1722209670&width=713", name: "Fakhar Extrait", size: "100ml EDP", price: 60, cat: "mujer", desc: "Versión enriquecida con matices más dulces y frutales.", stock: true },
  { id: 95, notes: ["Cuero", "Iris", "Rosa"], style: "designer", img: "https://fimgs.net/mdimg/perfume/o.31411.jpg", name: "Valentino Donna", size: "100ml EDP", price: 180, cat: "mujer", desc: "Iris clásico, rosa y un fondo suave de cuero fino.", stock: false },
  { id: 96, notes: [], style: "designer", img: "https://www.sephora.com/productimages/sku/s2837060-main-zoom.jpg?imwidth=1224", name: "Valentino Born in Roma Extradose", size: "100ml", price: 220, cat: "mujer", desc: "Una versión ultra intensa y sofisticada de la línea Born in Roma.", stock: false },
  { id: 97, notes: ["Vainilla", "Coco", "Mango"], style: "arabe", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRlHPszuW_B2a2XP7-0zhWUhxfUmaVAqea9cC4E5Y6w7lb_nd0wlAMBHpKJTgbKaW3UNspiwyUUMLWex-3COwtS-CJYXG7jBUuT8LQ75vd-Jf7kDwNeCcUJVA", name: "Lattafa Yara Tous", size: "100ml EDP", price: 50, cat: "mujer", desc: "Muy tropical: mango jugoso, coco y vainilla.", stock: true },
  { id: 98, notes: ["Vainilla", "Rosa"], style: "arabe", img: "https://www.scentsangel.com/cdn/shop/files/UP6291108730515_720x.jpg?v=1718988269", name: "Lattafa Yara", size: "100ml EDP", price: 50, cat: "mujer", desc: "El ultra viral frasco rosa: huele a malteada de fresa y vainilla con notas polvorosas.", stock: true },
  { id: 99, notes: ["Caramelo", "Sándalo", "Durazno"], style: "arabe", img: "https://www.scentsangel.com/cdn/shop/files/UP6290360591421_720x.jpg?v=1718992636", name: "Lattafa Yara Moi", size: "100ml EDP", price: 55, cat: "mujer", desc: "El frasco blanco: notas de durazno, caramelo y sándalo.", stock: true },
  { id: 100, notes: ["Rosa", "Jazmín", "Orquídea", "Pachulí"], style: "dulce", img: "https://www.sephora.com/productimages/sku/s1377159-main-zoom.jpg?imwidth=1224", name: "FlowerBomb Viktor & Rolf", size: "100ml EDP", price: 130, cat: "mujer", desc: "Una explosión floral y dulce de orquídea, rosa, jazmín y pachulí.", stock: true },
  { id: 101, notes: ["Vainilla", "Jazmín", "Hinojo"], style: "dulce", img: "https://www.sephora.com/productimages/sku/s2553311-main-zoom.jpg?imwidth=1224", name: "Viktor & Rolf Good Fortune", size: "100ml EDP", price: 140, cat: "mujer", desc: "Místico y floral con hinojo, jazmín de la India y vainilla.", stock: true },
  { id: 102, notes: ["Lavanda", "Té blanco", "Azahar"], style: "fresco", img: "https://www.scentsangel.com/cdn/shop/files/Untitleddesign_35_e5a9e690-f190-47fc-a608-d7c845614fe5.jpg?v=1779747818&width=1946", name: "Libre Yves Saint Laurent", size: "100ml EDT", price: 135, cat: "mujer", desc: "Lavanda femenina, azahar de naranjo y té blanco; limpio y elegante.", stock: false },
  { id: 103, notes: ["Vainilla", "Haba tonka"], style: "dulce", img: "https://www.scentsangel.com/cdn/shop/files/SENTSANGEL_69_5bacef5f-d86f-4ced-9be7-65f8123dde45.jpg?v=1777390172&width=1946", name: "Libre Intense", size: "100ml EDP", price: 165, cat: "mujer", desc: "El original pero mucho más denso, cargado con vainilla de Madagascar y haba tonka.", stock: false },
  { id: 104, notes: [], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.66098.2x.avif", name: "Moschino Toy 2 Bubble Gum", size: "100ml EDT", price: 105, cat: "mujer", desc: "Huele exactamente a goma de mascar de fresa con un secado floral limpio.", stock: false },
  { id: 105, notes: ["Caramelo", "Almizcle"], style: "dulce", img: "https://www.sephora.com/productimages/sku/s1361948-main-zoom.jpg?imwidth=1224", name: "Prada Candy", size: "80ml EDP", price: 145, cat: "mujer", desc: "Un gourmand sofisticado centrado puramente en el caramelo y el almizcle.", stock: true },
  { id: 106, notes: [], style: "arabe", img: "https://mediafiles.maxaroma.com/9cd29e92-4b8f-436f-ad1f-8e368b30dc1d/https://www.maxaroma.com/productimages/large/UP6290171072607.jpg?ver=1679599118", name: "Afnan 9PM Pour Femme", size: "100ml EDP", price: 60, cat: "mujer", desc: "Frutal, dulce y nocturno; la contraparte femenina del éxito de Afnan.", stock: true },
  { id: 107, notes: [], style: "arabe", img: "https://target.scene7.com/is/image/Target/GUEST_167cdf05-0be7-4062-b01a-b2fa41bb1d7d?wid=750&qlt=80", name: "Odyssey Candee", size: "100ml EDP", price: 60, cat: "mujer", desc: "Dulce, juguetón y acaramelado.", stock: false },
  { id: 108, notes: [], style: "arabe", img: "https://images.ibspot.com/ek0gmukw3ey8adgx4u3uk5nftkfs?width=800&height=800&format=webp", name: "Her Confession by Lattafa", size: "100ml EDP", price: 75, cat: "mujer", desc: "Misterioso, dulce y con toques cremosos.", stock: false },
  { id: 109, notes: ["Piña", "Maderas"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.82814.2x.avif", name: "Shaheen Gold by Lattafa", size: "100ml EDP", price: 60, cat: "mujer", desc: "Lujoso y afrutado con piña, higo y maderas.", stock: true },
  { id: 110, notes: ["Ámbar", "Almizcle", "Rosa"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.75099.2x.avif", name: "Ajwad Lattafa", size: "75ml EDP", price: 55, cat: "mujer", desc: "Frutas dulces, rosa y un fondo de almizcle y ámbar muy potente.", stock: true },
  { id: 111, notes: [], style: "arabe", img: "https://oudlash.com/cdn/shop/files/GUEST_ca28d66d-45a9-4828-8cad-ad7e539516c9.avif?v=1777575905&width=713", name: "La Rouge Baroque", size: "100ml EDP", price: 50, cat: "mujer", desc: "Otra alternativa inspirada en el perfil dulce y ambarado de Baccarat Rouge.", stock: true },
  { id: 112, notes: ["Café"], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.58525.2x.avif", name: "Opium Black Neon", size: "75ml EDP", price: 150, cat: "mujer", desc: "El café clásico de Black Opium combinado con una vibrante nota de fruta de dragón.", stock: false },
  { id: 113, notes: ["Cítrico", "Rosa", "Pachulí"], style: "arabe", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.27655.2x.avif", name: "Club De Nuit Woman", size: "105ml EDP", price: 60, cat: "mujer", desc: "Elegante pachulí, rosa y cítricos.", stock: false },
  { id: 114, notes: ["Almendra", "Maderas"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.96014.2x.avif", name: "Perfect Elixir by Marc Jacobs", size: "100ml EDP", price: 180, cat: "mujer", desc: "Dulce y reconfortante con ruibarbo, almendra y maderas resinadas.", stock: true },
  { id: 115, notes: ["Haba tonka", "Café", "Almendra", "Nardo"], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.39681.2x.avif", name: "Carolina Herrera Good Girl", size: "100ml EDP", price: 190, cat: "mujer", desc: "El icónico tacón: almendra, café, nardos y haba tonka; sensual e irresistible.", stock: true },
  { id: 116, notes: [], style: "designer", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.101151.2x.avif", name: "Burberry Her Intense", size: "100ml EDP", price: 190, cat: "mujer", desc: "Frutos rojos oscuros con un fondo cremoso y resinoso.", stock: false },
  { id: 117, notes: [], style: "designer", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQoofF7YlMtgr_5tLD5Q7wgB5aGoLI0bvMZ8igORQaAkniVVj951hm8r2mFqfK1zI_9w6NnZoQx0L6WMZQ6IxmvA0b5RES0spoIHr6IruA47yDtQUrwzaNQ", name: "Guess Seductive Homme Blue", size: "Set 4p 100ml", price: 65, cat: "sets", desc: "Set con fragancia fresca, marina y amaderada.", stock: false },
  { id: 118, notes: ["Mandarina", "Pimienta", "Rosa"], style: "designer", img: "https://cdn2.jomashop.com/media/catalog/product/cache/b3e31d40bbb1abcc90b26106659d5d3f/g/u/guess-mens-seductive-homme-gift-set-fragrances-085715330260.jpg?width=800&height=800", name: "Guess Seductive", size: "Set 4p 100ml EDT", price: 75, cat: "sets", desc: "Set clásico con aroma magnético de pimienta rosa y mandarina.", stock: true },
  { id: 119, notes: [], style: "designer", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSGN91p44-Vs4dqTRzMUtXlwifLNNQpiRoRnSB40OCNIUTGrjs1f0HY9ZY26tShhv2fLM9U5HQsb9_ooowbFF6kI4GiXG9Y99H-QzfR3xtPDwg2fwltd_Zs", name: "Guess Seductive Noir", size: "Set 4p 75ml EDT", price: 65, cat: "sets", desc: "Set con aroma herbal y ambarado, muy elegante.", stock: false },
  { id: 120, notes: [], style: "fresco", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT3gnRTBmfQri9BEGL7as88K4DiAqI8uugYgDZWVWOQqjddNxAschVoYmCDybSQKH3hBPhMc9BP13AyBTn36JQgh8Svl59QjSF1K_2JE4s6hzSj4BcEqQ1I_w", name: "Guess Pink", size: "Set 4p 75ml EDT", price: 75, cat: "sets", desc: "Set femenino frutal-floral, fresco y juvenil.", stock: false },
  { id: 121, notes: [], style: "designer", img: "https://perfumeclub.com/cdn/shop/files/setversacedylan4pc3.4women.jpg?v=1746501178", name: "Versace Dylan", size: "Set 4p 100ml EDP", price: 130, cat: "sets", desc: "Set de lujo con aroma frutal, floral y amaderado.", stock: false },
  { id: 122, notes: [], style: "arabe", img: "https://fandi-perfume.com/cdn/shop/files/afnan-9pm-for-men-cologne-for-men-eau-de-parfum-3-4-oz-5-0-oz-gift-set-3-4-oz-edp-1217982514.jpg?v=1771432867&width=1240", name: "Afnan 9PM", size: "Set 3p 100ml EDP", price: 70, cat: "sets", desc: "Set del ultra popular clon dulce de fiesta.", stock: true },
  { id: 123, notes: [], style: "designer", img: "https://valenciaperfumes.com/cdn/shop/files/IMG-7848.png?v=1776721139&width=823", name: "Azzaro Wanted", size: "Set 3p 100ml EDT", price: 125, cat: "sets", desc: "Set de la fragancia cítrica y especiada con forma de tambor de revólver.", stock: false },
  { id: 124, notes: ["Vainilla", "Café"], style: "dulce", name: "Opium Black", size: "Set 3p 100ml EDP", price: 195, cat: "sets", desc: "Set premium de la icónica fragancia de café y vainilla.", stock: true },
  { id: 125, notes: ["Vainilla"], style: "dulce", img: "https://dlginternationaltrading.com/cdn/shop/files/images_ec2f4f09-a55a-4854-8b45-43cfc3b9f0e4.jpg?v=1753974476", name: "212 VIP Black", size: "Set 2p 10ml+100ml EDP", price: 140, cat: "sets", desc: "Incluye la botella grande y una versión de viaje de absenta y vainilla.", stock: false },
  { id: 126, notes: [], style: "arabe", img: "https://beautyhouse.com/cdn/shop/files/013oowfpwj.png?v=1731509772&width=2048", name: "Game of Spades Royale", size: "Set 4p 100ml EDP", price: 140, cat: "sets", desc: "Set de lujo con un perfil aromático intenso y oriental.", stock: true },
  { id: 127, notes: ["Vainilla"], style: "dulce", name: "Dolce & Gabbana The One Women", size: "Set 3p 75ml EDP", price: 145, cat: "sets", desc: "Set clásico elegante con notas de melocotón, vainilla y azucena.", stock: true },
  { id: 128, notes: [], style: "dulce", img: "https://fimgs.net/mdimg/perfume-thumbs/dark-375x500.66098.2x.avif", name: "Moschino Toy Bubble Gum", size: "Set 4p", price: 115, cat: "sets", desc: "Set completo con el perfume con olor a chicle de fresa.", stock: true },
];

const CATS = [
  { key: "todos", label: "Todo" },
  { key: "best", label: "Más vendidos" },
  { key: "hombre", label: "Hombre" },
  { key: "mujer", label: "Mujer" },
  { key: "unisex", label: "Unisex" },
  { key: "sets", label: "Sets" },
];

const REF = (id) => "REF. " + String(id).padStart(5, "0");

const NEW_ARRIVAL_IDS = [5, 2, 87];
const NEW_ARRIVALS = NEW_ARRIVAL_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
const STYLE_LABEL = { designer: "Diseñador", arabe: "Árabe", fresco: "Fresco", dulce: "Dulce" };
const BRANDS = ["Dior", "Viktor & Rolf", "Versace", "Valentino", "Azzaro", "Lattafa", "Armani", "Yves Saint Laurent"];

// ---------------------------------------------------------------------------
// SWATCH (placeholder art standing in for product photography)
// ---------------------------------------------------------------------------
function Swatch({ product, size = "normal", showFavorite = false, isFavorite = false, onToggleFavorite }) {
  const initial = product.name.trim()[0].toUpperCase();
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={"swatch swatch--" + product.cat + (size === "large" ? " swatch--large" : "")}>
      {product.img && !loaded && <div className="swatch__shimmer" />}
      {!product.stock && <span className="swatch__tag">Agotado</span>}
      {product.best && product.stock && <span className="swatch__seal">Best</span>}
      {showFavorite && (
        <button
          className={"swatch__fav" + (isFavorite ? " swatch__fav--active" : "")}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(product.id); }}
          aria-label="Favorito"
        >
          <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.35-10-9.28C.5 8.5 2 4.5 6 4c2.2-.28 3.9 1 6 3.5C14.1 5 15.8 3.72 18 4c4 .5 5.5 4.5 4 7.72C19 16.65 12 21 12 21z" /></svg>
        </button>
      )}
      {product.img ? (
        <img
          src={product.img}
          alt={product.name}
          className={"swatch__img" + (loaded ? " swatch__img--loaded" : "")}
          onLoad={() => setLoaded(true)}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
          loading="lazy"
        />
      ) : null}
      {!product.img && <span className="swatch__mono">{initial}</span>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN APP
// ---------------------------------------------------------------------------
export default function VecchiaApp() {
  const [view, setView] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cat, setCat] = useState("todos");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState(null);
  const [priceRange, setPriceRange] = useState("todos");
  const [availability, setAvailability] = useState("todos");
  const [styleFilter, setStyleFilter] = useState("todos");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftSort, setDraftSort] = useState(null);
  const [draftPrice, setDraftPrice] = useState("todos");
  const [draftAvail, setDraftAvail] = useState("todos");
  const [draftStyle, setDraftStyle] = useState("todos");

  const SORT_OPTIONS = [
    { value: "menor", label: "Menor a mayor" },
    { value: "mayor", label: "Mayor a menor" },
  ];
  const STYLE_OPTIONS = [
    { value: "todos", label: "Todos" },
    { value: "designer", label: "Designer" },
    { value: "arabe", label: "Árabes" },
    { value: "fresco", label: "Frescos" },
    { value: "dulce", label: "Dulces" },
  ];
  const PRICE_RANGES = [
    { value: "todos", label: "Todos los precios" },
    { value: "menos50", label: "Menos de $50" },
    { value: "50-100", label: "$50 – $100" },
    { value: "100-150", label: "$100 – $150" },
    { value: "mas150", label: "+$150" },
  ];
  const AVAILABILITY_OPTIONS = [
    { value: "todos", label: "Todos" },
    { value: "disponibles", label: "Disponibles" },
    { value: "agotados", label: "Agotados" },
  ];
  const activeFilterCount =
    (sort ? 1 : 0) + (priceRange !== "todos" ? 1 : 0) + (availability !== "todos" ? 1 : 0) + (styleFilter !== "todos" ? 1 : 0);

  function openFilters() {
    setDraftSort(sort);
    setDraftPrice(priceRange);
    setDraftAvail(availability);
    setDraftStyle(styleFilter);
    setFiltersOpen(true);
  }
  function applyFilters() {
    setSort(draftSort);
    setPriceRange(draftPrice);
    setAvailability(draftAvail);
    setStyleFilter(draftStyle);
    setFiltersOpen(false);
  }
  function clearFilters() {
    setDraftSort(null);
    setDraftPrice("todos");
    setDraftAvail("todos");
    setDraftStyle("todos");
  }

  const [selectedId, setSelectedId] = useState(null);
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState({});
  const [recent, setRecent] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [form, setForm] = useState({ nombre: "", telefono: "", direccion: "", pago: "Efectivo contra entrega" });
  const [orderNo, setOrderNo] = useState(null);
  const [toast, setToast] = useState(null);

  // load persisted cart / favorites / recently viewed (localStorage works on any real hosting)
  useEffect(() => {
    try {
      const c = localStorage.getItem("vecchia:cart");
      if (c) setCart(JSON.parse(c));
    } catch (e) {}
    try {
      const f = localStorage.getItem("vecchia:favorites");
      if (f) setFavorites(JSON.parse(f));
    } catch (e) {}
    try {
      const r = localStorage.getItem("vecchia:recent");
      if (r) setRecent(JSON.parse(r));
    } catch (e) {}
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try { localStorage.setItem("vecchia:cart", JSON.stringify(cart)); } catch (e) {}
  }, [cart, storageReady]);
  useEffect(() => {
    if (!storageReady) return;
    try { localStorage.setItem("vecchia:favorites", JSON.stringify(favorites)); } catch (e) {}
  }, [favorites, storageReady]);
  useEffect(() => {
    if (!storageReady) return;
    try { localStorage.setItem("vecchia:recent", JSON.stringify(recent)); } catch (e) {}
  }, [recent, storageReady]);

  function toggleFavorite(id) {
    setFavorites((f) => {
      const next = { ...f };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }

  function trackRecent(id) {
    setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 12));
  }

  function whatsappUrl(text) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }

  function askAboutProduct(product) {
    window.open(whatsappUrl("Hola, estoy interesado/a en " + product.name + " (" + product.size + ", $" + product.price + ")"), "_blank");
  }

  function notifyWhenAvailable(product) {
    window.open(whatsappUrl("Hola, ¿me avisan cuando llegue " + product.name + "?"), "_blank");
    flashToast("Le avisamos por WhatsApp ✓");
  }

  function shareProduct(product) {
    const text = product.name + " — $" + product.price + " · Vecchia Perfumes";
    if (navigator.share) {
      navigator.share({ title: product.name, text }).catch(() => {});
    } else {
      window.open(whatsappUrl(text), "_blank");
    }
  }

  function flashToast(msg) {
    setToast(msg);
    window.clearTimeout(flashToast._t);
    flashToast._t = window.setTimeout(() => setToast(null), 1800);
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (cat === "best") list = list.filter((p) => p.best);
    else if (cat !== "todos") list = list.filter((p) => p.cat === cat);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (styleFilter !== "todos") list = list.filter((p) => p.style === styleFilter);
    if (priceRange === "menos50") list = list.filter((p) => p.price < 50);
    else if (priceRange === "50-100") list = list.filter((p) => p.price >= 50 && p.price <= 100);
    else if (priceRange === "100-150") list = list.filter((p) => p.price > 100 && p.price <= 150);
    else if (priceRange === "mas150") list = list.filter((p) => p.price > 150);
    if (availability === "disponibles") list = list.filter((p) => p.stock);
    else if (availability === "agotados") list = list.filter((p) => !p.stock);
    if (sort === "menor") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "mayor") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [cat, query, sort, priceRange, availability, styleFilter]);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, n]) => n > 0)
        .map(([id, n]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty: n }))
        .filter((x) => x.product),
    [cart]
  );
  const cartCount = cartItems.reduce((s, x) => s + x.qty, 0);
  const cartTotal = cartItems.reduce((s, x) => s + x.qty * x.product.price, 0);
  const favCount = Object.keys(favorites).length;
  const favoriteProducts = useMemo(() => PRODUCTS.filter((p) => favorites[p.id]), [favorites]);
  const recentProducts = useMemo(() => recent.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean), [recent]);

  const selected = PRODUCTS.find((p) => p.id === selectedId);
  const similarProducts = useMemo(() => {
    if (!selected) return [];
    return PRODUCTS.filter(
      (p) => p.id !== selected.id && (p.style === selected.style || p.cat === selected.cat)
    ).slice(0, 6);
  }, [selectedId]);
  const bestsellers = useMemo(() => PRODUCTS.filter((p) => p.best), []);

  function goToCategory(key) {
    setCat(key);
    setQuery("");
    setView("catalog");
  }

  function menuGoTo(destination) {
    setMenuOpen(false);
    if (destination === "home") {
      setView("home");
    } else if (destination === "favorites") {
      setView("favorites");
    } else if (destination === "contacto") {
      window.open(whatsappUrl("Hola, tengo una consulta sobre Vecchia Perfumes"), "_blank");
    } else {
      goToCategory(destination);
    }
  }

  function openProduct(id) {
    setSelectedId(id);
    setQty(1);
    setView("product");
    trackRecent(id);
  }
  function addToCart(id, n) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + n }));
  }
  function setCartQty(id, n) {
    setCart((c) => ({ ...c, [id]: Math.max(0, n) }));
  }
  function submitOrder(e) {
    e.preventDefault();
    const orderId = "VP-" + Math.floor(100000 + Math.random() * 900000);
    const lines = cartItems.map(
      ({ product, qty }) => "• " + qty + "x " + product.name + " (" + product.size + ") — $" + product.price * qty
    );
    const message =
      "Hola, quiero confirmar mi pedido " + orderId + ":\n\n" +
      lines.join("\n") +
      "\n\nTotal: $" + cartTotal +
      "\n\nNombre: " + form.nombre +
      "\nTeléfono: " + form.telefono +
      "\nDirección: " + form.direccion +
      "\nPago: " + form.pago;
    window.open(whatsappUrl(message), "_blank");
    setOrderNo(orderId);
    setCart({});
    setView("done");
  }

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap');
        .app {
          --black: #101b33;
          --white: #ffffff;
          --grey-100: #eef0f4;
          --grey-200: #dde1e8;
          --grey-300: #c4cad6;
          --grey-500: #6b7280;
          font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
          color: var(--black);
          background: var(--white);
          max-width: 420px;
          margin: 0 auto;
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .app * { box-sizing: border-box; }
        .app button { font-family: inherit; cursor: pointer; }
        .app input, .app select { font-family: inherit; }

        /* ---------- header ---------- */
        .header {
          position: sticky; top: 0; z-index: 20; background: var(--white);
          border-bottom: 1px solid var(--grey-200);
        }
        .header__top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 18px 14px;
        }
        .header__icon { width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; background: none; border: none; position: relative; }
        .header__right { display: flex; align-items: center; gap: 18px; }
        .desktop-nav { display: none; }
        .header__icon svg { width: 20px; height: 20px; stroke: var(--black); fill: none; stroke-width: 1.3; }
        .logo {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 25px;
          letter-spacing: 0.025em;
          font-weight: 500;
          text-transform: uppercase;
          padding-left: 6px;
        }
        .logo--tap {
          background: none; border: none; color: inherit; padding-left: 6px;
          cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 1px;
        }
        .logo__main { line-height: 1; }
        .logo__sub {
          font-family: "Playfair Display", Georgia, serif; font-size: 8px; font-weight: 500;
          letter-spacing: 0.32em; text-transform: uppercase; color: var(--grey-500);
        }
        .badge {
          position: absolute; top: -6px; right: -8px;
          background: var(--black); color: var(--white);
          font-size: 9px; line-height: 15px; text-align: center;
          width: 15px; height: 15px; border-radius: 50%;
        }
        .search {
          padding: 0 18px 14px;
        }
        .search input {
          width: 100%; border: none; border-bottom: 1px solid var(--grey-300);
          padding: 8px 2px; font-size: 13px; letter-spacing: 0.02em; background: transparent;
          outline: none; color: var(--black);
        }
        .search input::placeholder { color: var(--grey-500); }
        .search input:focus { border-bottom-color: var(--black); }
        .chips {
          display: flex; gap: 20px; overflow-x: auto; padding: 0 18px 14px;
          scrollbar-width: none;
        }
        .chips::-webkit-scrollbar { display: none; }
        .chip {
          background: none; border: none; white-space: nowrap;
          font-size: 11px; letter-spacing: 0.09em; text-transform: uppercase;
          color: var(--grey-500); padding-bottom: 6px; border-bottom: 1px solid transparent;
        }
        .chip--active { color: var(--black); border-bottom-color: var(--black); }
        .sort-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 18px 14px; border-top: 1px solid var(--grey-200);
        }
        .sort-row__count { font-size: 11px; color: var(--grey-500); letter-spacing: 0.02em; }
        .filters-trigger {
          display: flex; align-items: center; gap: 7px; background: none; border: none;
          color: var(--black); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 4px 2px; cursor: pointer; position: relative;
        }
        .filters-trigger svg { width: 14px; height: 14px; stroke: var(--black); fill: none; stroke-width: 1.5; }
        .filters-trigger__count {
          width: 15px; height: 15px; border-radius: 50%; background: var(--black); color: var(--white);
          font-size: 9px; display: flex; align-items: center; justify-content: center; letter-spacing: 0;
        }

        /* ---------- filters sheet ---------- */
        .sheet-backdrop {
          position: fixed; inset: 0; background: rgba(16,27,51,0.35); z-index: 46;
          animation: overlayIn 0.3s ease both;
        }
        .sheet {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 47;
          background: var(--white); border-radius: 18px 18px 0 0;
          padding: 10px 22px 26px; max-width: 420px; margin: 0 auto;
          box-shadow: 0 -14px 40px rgba(16,27,51,0.16);
          animation: sheetIn 0.42s cubic-bezier(0.65, 0, 0.35, 1) both;
          max-height: 82vh; overflow-y: auto;
        }
        @keyframes sheetIn {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .sheet__handle { width: 36px; height: 4px; background: var(--grey-300); border-radius: 2px; margin: 6px auto 14px; }
        .sheet__top { display: flex; align-items: center; justify-content: space-between; }
        .sheet__title { font-family: "Playfair Display", Georgia, serif; font-size: 19px; }
        .sheet__section { margin-top: 22px; }
        .sheet__label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-500); margin-bottom: 10px; }
        .pill-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .pill {
          border: 1px solid var(--grey-300); background: var(--white); color: var(--black);
          font-size: 12px; padding: 9px 14px; border-radius: 30px;
          transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .pill--active { background: var(--black); color: var(--white); border-color: var(--black); }
        .pill:active { transform: scale(0.96); }
        .sheet__footer { display: flex; gap: 12px; margin-top: 28px; }
        .sheet__footer .btn-secondary, .sheet__footer .btn-primary { padding: 14px; }

        /* ---------- home ---------- */
        .home { padding-bottom: 50px; }
        .hero {
          position: relative; display: flex; flex-direction: column; align-items: center; text-align: center;
          padding: 78px 24px 40px; border-bottom: 1px solid var(--grey-200);
          overflow: hidden; min-height: 340px; justify-content: flex-end;
        }
        .hero__bg {
          position: absolute; inset: 0; background-size: cover; background-position: center 30%;
          filter: grayscale(1) contrast(1.05) brightness(1.02);
          transform: scale(1.02);
        }
        .hero__scrim {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.6) 45%, rgba(255,255,255,0.95) 78%, var(--white) 100%);
        }
        .hero__content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; }
        .hero__eyebrow {
          font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--grey-500);
          opacity: 0; animation: heroRise 0.7s ease 0.05s forwards;
        }
        .hero__logo {
          font-family: "Playfair Display", Georgia, serif; font-size: 56px; font-weight: 600; letter-spacing: 0.03em;
          text-transform: uppercase; line-height: 1.1; margin-top: 14px;
          opacity: 0; animation: heroRise 0.8s ease 0.18s forwards;
        }
        .hero__tag {
          font-size: 13px; font-style: italic; color: var(--grey-500); margin-top: 16px; max-width: 260px;
          line-height: 1.6; letter-spacing: 0.01em;
          opacity: 0; animation: heroRise 0.8s ease 0.34s forwards;
        }
        .hero__cta {
          margin-top: 26px; background: var(--black); color: var(--white); border: none;
          padding: 13px 34px; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          opacity: 0; animation: heroRise 0.8s ease 0.48s forwards;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .hero__cta:active { transform: scale(0.96); }
        @keyframes heroRise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .home-section__title {
          font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--grey-500);
          padding: 26px 18px 12px;
        }
        .home-section__title--row { display: flex; justify-content: space-between; align-items: baseline; }
        .home-section__link { background: none; border: none; font-size: 11px; letter-spacing: 0.05em; text-decoration: underline; color: var(--black); text-transform: none; }
        .tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; padding: 0 2px; }
        .tile {
          position: relative; aspect-ratio: 1 / 1; border: none; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
        }
        .tile__mono { font-family: Georgia, serif; font-size: 40px; color: rgba(16,27,51,0.16); }
        .tile__label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
        .strip { display: flex; gap: 2px; overflow-x: auto; padding: 0 2px 4px; scrollbar-width: none; }
        .strip::-webkit-scrollbar { display: none; }
        .strip__card { flex: 0 0 128px; border: none; background: none; text-align: left; padding: 0 8px 0 0; }
        .strip__card .card__name { font-size: 11.5px; margin-top: 8px; min-height: 28px; }
        .strip__card .card__price { font-size: 12px; margin-top: 3px; font-weight: 600; }
        .home-footer {
          text-align: center; font-size: 10.5px; color: var(--grey-500); line-height: 1.8;
          padding: 30px 18px 0; letter-spacing: 0.03em;
        }

        /* ---------- novedades ---------- */
        .news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; padding: 0 2px; }
        .news-card { position: relative; background: none; border: none; text-align: left; padding: 0 6px 0 0; }
        .news-card__badge {
          position: absolute; top: 8px; left: 8px; font-size: 8.5px; letter-spacing: 0.06em; text-transform: uppercase;
          background: var(--black); color: var(--white); padding: 4px 7px;
        }
        .news-card .card__name { font-size: 10.5px; margin-top: 8px; min-height: 26px; padding: 0 4px; }
        .news-card .card__price { font-size: 11.5px; margin-top: 2px; font-weight: 600; padding: 0 4px; }

        /* ---------- brand marquee ---------- */
        .brand-marquee {
          margin-top: 34px; padding: 18px 0; border-top: 1px solid var(--grey-200); border-bottom: 1px solid var(--grey-200);
          overflow: hidden; white-space: nowrap;
        }
        .brand-marquee__track {
          display: inline-flex; gap: 40px; animation: marquee 22s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .brand-marquee__item {
          font-family: Georgia, serif; font-style: italic; font-size: 15px; color: var(--grey-500); letter-spacing: 0.02em;
        }

        /* ---------- newsletter ---------- */
        .newsletter {
          margin-top: 34px; padding: 40px 24px; background: var(--grey-100); text-align: center;
        }
        .newsletter__title { font-family: Georgia, serif; font-size: 20px; }
        .newsletter__text { font-size: 12.5px; color: var(--grey-500); margin-top: 10px; max-width: 320px; margin-left: auto; margin-right: auto; line-height: 1.6; }
        .newsletter__cta {
          margin-top: 20px; background: var(--black); color: var(--white); border: none;
          padding: 13px 30px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ---------- catalog grid ---------- */
        .grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
          padding: 2px 2px 90px;
          flex: 1;
        }
        .card { background: none; border: none; text-align: left; padding: 0 10px 22px; }
        .card__name {
          font-size: 12px; letter-spacing: 0.01em; line-height: 1.35; margin-top: 10px;
          min-height: 32px;
        }
        .card__ref { font-size: 10px; color: var(--grey-500); letter-spacing: 0.06em; margin-top: 3px; }
        .card__price { font-size: 12.5px; margin-top: 5px; font-weight: 600; }
        .card__foot { display: flex; align-items: center; justify-content: space-between; margin-top: 5px; }
        .card__foot .card__price { margin-top: 0; }
        .card__add {
          width: 26px; height: 26px; border-radius: 50%; border: 1px solid var(--black);
          background: var(--white); display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1), background-color 0.2s ease;
        }
        .card__add svg { width: 12px; height: 12px; stroke: var(--black); fill: none; stroke-width: 1.8; }
        .card__add:active { transform: scale(0.85); background: var(--black); }
        .card__add:active svg { stroke: var(--white); }

        .empty { padding: 60px 24px; text-align: center; color: var(--grey-500); font-size: 13px; grid-column: 1 / -1; }
        .empty__cta {
          margin-top: 16px; display: inline-block; border: 1px solid var(--black);
          background: var(--white); padding: 10px 22px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* ---------- swatch (placeholder art) ---------- */
        .swatch {
          aspect-ratio: 3 / 4; width: 100%; position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
          background: repeating-linear-gradient(135deg, var(--grey-100) 0px, var(--grey-100) 26px, var(--grey-200) 26px, var(--grey-200) 27px);
        }
        .swatch--hombre { background-color: #e9edf3; }
        .swatch--mujer { background-color: #eef1f6; }
        .swatch--unisex { background-color: #e3e7ee; }
        .swatch--sets { background-color: #e6eaf1; }
        .swatch--large { aspect-ratio: 1 / 1; }
        .swatch__mono {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 64px; color: rgba(16,27,51,0.14); font-weight: 400;
        }
        .swatch--large .swatch__mono { font-size: 110px; }
        .swatch__img {
          width: 100%; height: 100%; object-fit: cover; object-position: center;
          opacity: 0; transform: scale(1.04);
          transition: opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .swatch__img--loaded { opacity: 1; transform: scale(1); }
        .swatch__tag {
          position: absolute; top: 8px; left: 8px; font-size: 9.5px; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--grey-500); background: rgba(255,255,255,0.9);
          padding: 3px 6px;
        }
        .swatch__seal {
          position: absolute; top: 8px; right: 8px; width: 30px; height: 30px; border-radius: 50%;
          border: 1px solid var(--black); display: flex; align-items: center; justify-content: center;
          font-size: 7.5px; letter-spacing: 0.05em; text-transform: uppercase; background: var(--white);
        }
        .swatch__shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%);
          background-size: 200% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
        @keyframes shimmer {
          from { background-position: 150% 0; }
          to { background-position: -50% 0; }
        }
        .swatch__fav {
          position: absolute; bottom: 8px; right: 8px; z-index: 2; width: 28px; height: 28px;
          border-radius: 50%; background: rgba(255,255,255,0.92); border: none;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .swatch__fav svg { width: 15px; height: 15px; stroke: var(--black); fill: none; stroke-width: 1.6; }
        .swatch__fav--active svg { fill: var(--black); }
        .swatch__fav:active { transform: scale(0.85); }

        /* ---------- product detail ---------- */
        .pd-back { display: flex; align-items: center; gap: 6px; padding: 16px 18px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; border: none; background: none; }
        .pd-back svg { width: 14px; height: 14px; stroke: var(--black); fill: none; stroke-width: 1.4; }
        .pd-body { padding: 0 18px 110px; flex: 1; }
        .pd-eyebrow-row { display: flex; align-items: center; justify-content: space-between; margin-top: 20px; }
        .pd-eyebrow { font-size: 10.5px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--grey-500); }
        .pd-share { background: none; border: none; padding: 4px; }
        .pd-share svg { width: 17px; height: 17px; stroke: var(--black); fill: var(--black); stroke-width: 0; }
        .pd-name { font-family: Georgia, serif; font-size: 22px; line-height: 1.3; margin-top: 6px; }
        .pd-ref { font-size: 11px; color: var(--grey-500); margin-top: 6px; letter-spacing: 0.05em; }
        .pd-price { font-size: 17px; font-weight: 600; margin-top: 14px; }
        .pd-desc { font-size: 13.5px; line-height: 1.7; color: #2c2c2c; margin-top: 16px; }
        .pd-notes { margin-top: 20px; }
        .pill--note { font-size: 11px; padding: 7px 12px; cursor: default; }
        .pd-stepper { display: flex; align-items: center; gap: 18px; margin-top: 26px; }
        .pd-stepper button { width: 34px; height: 34px; border: 1px solid var(--grey-300); background: var(--white); font-size: 16px; }
        .pd-stepper span { font-size: 14px; min-width: 16px; text-align: center; }
        .pd-agotado { font-size: 12px; color: var(--grey-500); margin-top: 26px; letter-spacing: 0.05em; text-transform: uppercase; }
        .pd-whatsapp {
          display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
          margin-top: 18px; padding: 13px; border: 1px solid var(--black); background: var(--white);
          font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--black);
        }
        .pd-whatsapp svg { width: 15px; height: 15px; stroke: var(--black); fill: none; stroke-width: 1.6; }
        .pd-similar { margin-top: 34px; }

        /* ---------- sticky action bars ---------- */
        .bar {
          position: sticky; bottom: 0; background: var(--white); border-top: 1px solid var(--grey-200);
          padding: 14px 18px; display: flex; gap: 12px; align-items: center;
        }
        .btn-primary {
          flex: 1; background: var(--black); color: var(--white); border: none; padding: 15px;
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; text-align: center;
        }
        .btn-primary:disabled { background: var(--grey-300); color: var(--grey-500); }
        .btn-secondary {
          flex: 1; background: var(--white); color: var(--black); border: 1px solid var(--black); padding: 15px;
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; text-align: center;
        }

        /* ---------- cart ---------- */
        .cart-body { flex: 1; padding: 4px 18px 20px; }
        .cart-title { font-size: 22px; font-family: Georgia, serif; padding: 22px 18px 4px; }
        .cart-row { display: flex; gap: 12px; padding: 16px 0; border-bottom: 1px solid var(--grey-200); }
        .cart-row .swatch { width: 76px; flex: none; aspect-ratio: 3/4; }
        .cart-row__info { flex: 1; display: flex; flex-direction: column; }
        .cart-row__name { font-size: 12.5px; line-height: 1.35; }
        .cart-row__price { font-size: 12px; color: var(--grey-500); margin-top: 4px; }
        .cart-row__foot { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
        .qty-stepper { display: flex; align-items: center; gap: 10px; }
        .qty-stepper button { width: 24px; height: 24px; border: 1px solid var(--grey-300); background: var(--white); font-size: 13px; line-height: 1; }
        .cart-row__remove { font-size: 10.5px; letter-spacing: 0.05em; text-transform: uppercase; color: var(--grey-500); background: none; border: none; text-decoration: underline; }
        .cart-summary { padding: 16px 18px; }
        .summary-line { display: flex; justify-content: space-between; font-size: 13px; padding: 6px 0; }
        .summary-line--total { font-weight: 600; font-size: 15px; border-top: 1px solid var(--grey-200); margin-top: 6px; padding-top: 12px; }

        /* ---------- checkout ---------- */
        .form-body { padding: 6px 18px 24px; flex: 1; }
        .field { margin-top: 20px; }
        .field label { display: block; font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--grey-500); margin-bottom: 8px; }
        .field input, .field select {
          width: 100%; border: none; border-bottom: 1px solid var(--grey-300); padding: 8px 2px;
          font-size: 14px; outline: none; background: transparent; color: var(--black);
        }
        .field input:focus, .field select:focus { border-bottom-color: var(--black); }
        .order-recap { margin-top: 30px; padding: 16px; background: var(--grey-100); font-size: 12.5px; }
        .order-recap div { display: flex; justify-content: space-between; padding: 3px 0; }

        /* ---------- confirmation ---------- */
        .done { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; }
        .done svg { width: 46px; height: 46px; stroke: var(--black); fill: none; stroke-width: 1.2; margin-bottom: 22px; }
        .done h1 { font-family: Georgia, serif; font-size: 20px; letter-spacing: 0.04em; }
        .done p { font-size: 13px; color: var(--grey-500); margin-top: 10px; line-height: 1.6; }
        .done .order-no { font-size: 13px; letter-spacing: 0.08em; margin-top: 18px; }
        /* ---------- side menu ---------- */
        .menu-overlay {
          position: fixed; inset: 0; background: rgba(16,27,51,0.35); z-index: 40;
          display: flex; animation: overlayIn 0.3s ease both;
        }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        .menu-panel {
          width: 78%; max-width: 320px; height: 100%; background: var(--white);
          display: flex; flex-direction: column; padding: 20px 24px;
          animation: panelIn 0.5s cubic-bezier(0.65, 0, 0.35, 1) both;
          box-shadow: 2px 0 24px rgba(16,27,51,0.12);
        }
        @keyframes panelIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        .menu-panel__top { display: flex; align-items: center; justify-content: space-between; }
        .menu-panel__logo {
          font-family: "Playfair Display", Georgia, serif; font-size: 21px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
        }
        .menu-panel__nav { display: flex; flex-direction: column; margin-top: 38px; gap: 4px; }
        .menu-panel__link {
          text-align: left; background: none; border: none; padding: 14px 2px;
          font-size: 20px; font-family: Georgia, serif; letter-spacing: 0.01em; color: var(--black);
          border-bottom: 1px solid var(--grey-200);
          opacity: 0; animation: linkIn 0.4s ease both;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .menu-panel__link:active { transform: translateX(4px); opacity: 0.65; }
        @keyframes linkIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .menu-panel__footer { margin-top: auto; padding-top: 20px; }
        .menu-panel__contact {
          display: flex; align-items: center; gap: 10px; background: var(--black); color: var(--white);
          border: none; padding: 13px 18px; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
          width: 100%; justify-content: center;
          transition: transform 0.15s ease;
        }
        .menu-panel__contact:active { transform: scale(0.97); }
        .menu-panel__contact svg { width: 16px; height: 16px; stroke: var(--white); fill: none; stroke-width: 1.6; }
        .menu-panel__note { font-size: 10.5px; color: var(--grey-500); text-align: center; margin-top: 14px; letter-spacing: 0.04em; }

        /* ---------- animations & micro-interactions ---------- */
        @keyframes viewIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .view-fade { animation: viewIn 0.6s cubic-bezier(0.65, 0, 0.35, 1) both; }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .card-in { animation: cardIn 0.65s cubic-bezier(0.65, 0, 0.35, 1) both; }

        .card, .tile, .strip__card, .chip, .hero__cta, .header__icon,
        .btn-primary, .btn-secondary, .empty__cta, .pd-back {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, background-color 0.25s ease, border-color 0.25s ease;
        }
        .card:active, .strip__card:active, .tile:active { transform: scale(0.98); }
        .header__icon:active { transform: scale(0.88); }
        .btn-primary:active:not(:disabled), .btn-secondary:active, .empty__cta:active, .hero__cta:active { transform: scale(0.97); }
        .chip { transition: color 0.25s ease, border-color 0.25s ease; }
        .pd-stepper button, .qty-stepper button {
          transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease;
        }
        .pd-stepper button:active, .qty-stepper button:active { transform: scale(0.85); background: var(--grey-100); }
        .tile { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .chips { scroll-behavior: smooth; }
        .card:active .swatch__img, .strip__card:active .swatch__img { transform: scale(1.05); }

        @keyframes badgePop {
          0% { transform: scale(0.4); opacity: 0; }
          55% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .badge { animation: badgePop 0.45s cubic-bezier(0.34, 1.2, 0.64, 1) both; }

        @keyframes toastIn {
          0% { opacity: 0; transform: translate(-50%, 10px); }
          12% { opacity: 1; transform: translate(-50%, 0); }
          88% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, 10px); }
        }
        .toast {
          position: fixed; left: 50%; bottom: 26px; transform: translate(-50%, 0);
          background: var(--black); color: var(--white); font-size: 12px; letter-spacing: 0.04em;
          padding: 12px 22px; z-index: 50; white-space: nowrap;
          animation: toastIn 1.8s ease both;
        }

        @keyframes circleDraw {
          from { stroke-dashoffset: 63; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes markDraw {
          from { stroke-dashoffset: 12; }
          to { stroke-dashoffset: 0; }
        }
        .done__circle {
          stroke-dasharray: 63; stroke-dashoffset: 63;
          animation: circleDraw 0.6s ease forwards;
        }
        .done__mark {
          stroke-dasharray: 12; stroke-dashoffset: 12;
          animation: markDraw 0.35s ease 0.55s forwards;
        }

        /* ================= DESKTOP / TABLET ================= */
        @media (min-width: 720px) {
          .app { max-width: 100%; }

          .header__top { max-width: 1180px; margin: 0 auto; padding: 22px 32px 16px; }
          .header__top .header__icon[aria-label="Menú"] { display: none; }
          .logo--tap { padding-left: 0; }
          .desktop-nav {
            display: flex; align-items: center; justify-content: flex-start; gap: 30px;
            max-width: 1180px; margin: 0 auto; padding: 4px 32px 18px; border-bottom: 1px solid var(--grey-200);
          }
          .desktop-nav__link {
            background: none; border: none; font-size: 11.5px; letter-spacing: 0.09em; text-transform: uppercase;
            color: var(--grey-500); padding: 4px 0; border-bottom: 1px solid transparent;
            transition: color 0.2s ease, border-color 0.2s ease;
          }
          .desktop-nav__link:hover, .desktop-nav__link--active { color: var(--black); border-bottom-color: var(--black); }
          .desktop-nav__link--contact { margin-left: auto; }
          .search { max-width: 1180px; margin: 0 auto; padding: 0 32px 16px; }
          .chips { max-width: 1180px; margin: 0 auto; padding: 0 32px 14px; flex-wrap: wrap; overflow: visible; }
          .sort-row { max-width: 1180px; margin: 0 auto; padding: 10px 32px 16px; }

          .home { max-width: 1180px; margin: 0 auto; }
          .hero { border-radius: 0 0 4px 4px; padding: 110px 24px 64px; }
          .hero__logo { font-size: 76px; }
          .hero__tag { max-width: 380px; font-size: 14px; }
          .tiles { grid-template-columns: repeat(4, 1fr); max-width: 1180px; margin: 0 auto; padding: 0; gap: 3px; }
          .home-section__title { max-width: 1180px; margin: 0 auto; padding-left: 32px; padding-right: 32px; }
          .strip { max-width: 1180px; margin: 0 auto; padding-left: 32px; padding-right: 32px; }
          .home-footer { max-width: 1180px; margin: 26px auto 0; }
          .news-grid { max-width: 1180px; margin: 0 auto; padding: 0 32px; grid-template-columns: repeat(3, 1fr); gap: 20px; }
          .newsletter { max-width: 1180px; margin: 34px auto 0; }

          .grid { grid-template-columns: repeat(4, 1fr); max-width: 1180px; margin: 0 auto; padding: 2px 30px 90px; gap: 22px 20px; }
          .card { padding: 0; }
          .card__name { min-height: 34px; }

          .pd-back, .pd-body, .bar { max-width: 1180px; margin: 0 auto; width: 100%; }
          .pd-body {
            display: flex; flex-wrap: wrap; gap: 12px 56px; padding: 8px 32px 90px; align-items: flex-start;
          }
          .pd-media { flex: 0 0 420px; position: sticky; top: 110px; }
          .pd-info { flex: 1 1 380px; padding: 0; }
          .pd-similar { flex-basis: 100%; }
          .pd-whatsapp { max-width: 360px; }

          .cart-title, .cart-body, .cart-summary { max-width: 1180px; margin: 0 auto; width: 100%; }
          .cart-body { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 40px; }
          .cart-row { grid-column: span 1; }

          .form-body { max-width: 620px; margin: 0 auto; width: 100%; }

          .menu-panel { max-width: 360px; }

          .sheet { left: 50%; right: auto; bottom: 32px; transform: translateX(-50%); max-width: 480px; border-radius: 18px; }
          @keyframes sheetIn {
            from { opacity: 0; transform: translate(-50%, 24px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }

          .toast { bottom: 40px; }
        }

        @media (min-width: 1024px) {
          .grid { grid-template-columns: repeat(5, 1fr); }
          .tiles { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>

      {/* ---------------- HEADER ---------------- */}
      {(view === "catalog" || view === "home" || view === "favorites") && (
        <div className="header">
          <div className="header__top">
            <button className="header__icon" aria-label="Menú" onClick={() => setMenuOpen(true)}>
              <svg viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <button className="logo logo--tap" onClick={() => setView("home")}>
              <span className="logo__main">Vecchia</span>
              <span className="logo__sub">Perfumes</span>
            </button>
            <div className="header__right">
              <button className="header__icon" aria-label="Favoritos" onClick={() => setView("favorites")}>
                <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.35-10-9.28C.5 8.5 2 4.5 6 4c2.2-.28 3.9 1 6 3.5C14.1 5 15.8 3.72 18 4c4 .5 5.5 4.5 4 7.72C19 16.65 12 21 12 21z" /></svg>
                {favCount > 0 && <span className="badge" key={"f" + favCount}>{favCount}</span>}
              </button>
              <button className="header__icon" aria-label="Carrito" onClick={() => setView("cart")}>
                <svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
                {cartCount > 0 && <span className="badge" key={cartCount}>{cartCount}</span>}
              </button>
            </div>
          </div>
          <nav className="desktop-nav">
            <button className={"desktop-nav__link" + (view === "home" ? " desktop-nav__link--active" : "")} onClick={() => setView("home")}>Inicio</button>
            <button className={"desktop-nav__link" + (view === "catalog" && cat === "hombre" ? " desktop-nav__link--active" : "")} onClick={() => goToCategory("hombre")}>Hombre</button>
            <button className={"desktop-nav__link" + (view === "catalog" && cat === "mujer" ? " desktop-nav__link--active" : "")} onClick={() => goToCategory("mujer")}>Mujer</button>
            <button className={"desktop-nav__link" + (view === "catalog" && cat === "unisex" ? " desktop-nav__link--active" : "")} onClick={() => goToCategory("unisex")}>Unisex</button>
            <button className={"desktop-nav__link" + (view === "catalog" && cat === "sets" ? " desktop-nav__link--active" : "")} onClick={() => goToCategory("sets")}>Sets de regalo</button>
            <button className={"desktop-nav__link" + (view === "catalog" && cat === "best" ? " desktop-nav__link--active" : "")} onClick={() => goToCategory("best")}>Más vendidos</button>
            <button className={"desktop-nav__link" + (view === "favorites" ? " desktop-nav__link--active" : "")} onClick={() => setView("favorites")}>Favoritos</button>
            <button className="desktop-nav__link desktop-nav__link--contact" onClick={() => window.open(whatsappUrl("Hola, tengo una consulta sobre Vecchia Perfumes"), "_blank")}>Contacto</button>
          </nav>
          {view === "catalog" && (
            <>
              <div className="search">
                <input placeholder="Buscar perfume…" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="chips">
                {CATS.map((c) => (
                  <button key={c.key} className={"chip" + (cat === c.key ? " chip--active" : "")} onClick={() => setCat(c.key)}>
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="sort-row">
                <span className="sort-row__count">{filtered.length} resultado{filtered.length === 1 ? "" : "s"}</span>
                <button className="filters-trigger" onClick={openFilters}>
                  <svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
                  Filtros
                  {activeFilterCount > 0 && <span className="filters-trigger__count">{activeFilterCount}</span>}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ---------------- FILTERS SHEET ---------------- */}
      {filtersOpen && (
        <>
          <div className="sheet-backdrop" onClick={() => setFiltersOpen(false)} />
          <div className="sheet">
            <div className="sheet__handle" />
            <div className="sheet__top">
              <span className="sheet__title">Filtros</span>
              <button className="header__icon" aria-label="Cerrar filtros" onClick={() => setFiltersOpen(false)}>
                <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <div className="sheet__section">
              <div className="sheet__label">Categoría y estilo</div>
              <div className="pill-row">
                {STYLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={"pill" + (draftStyle === opt.value ? " pill--active" : "")}
                    onClick={() => setDraftStyle(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sheet__section">
              <div className="sheet__label">Ordenar por precio</div>
              <div className="pill-row">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={"pill" + (draftSort === opt.value ? " pill--active" : "")}
                    onClick={() => setDraftSort(draftSort === opt.value ? null : opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sheet__section">
              <div className="sheet__label">Precio</div>
              <div className="pill-row">
                {PRICE_RANGES.map((opt) => (
                  <button
                    key={opt.value}
                    className={"pill" + (draftPrice === opt.value ? " pill--active" : "")}
                    onClick={() => setDraftPrice(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sheet__section">
              <div className="sheet__label">Disponibilidad</div>
              <div className="pill-row">
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={"pill" + (draftAvail === opt.value ? " pill--active" : "")}
                    onClick={() => setDraftAvail(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sheet__footer">
              <button className="btn-secondary" onClick={clearFilters}>Limpiar</button>
              <button className="btn-primary" onClick={applyFilters}>Aplicar filtros</button>
            </div>
          </div>
        </>
      )}

      {/* ---------------- HOME ---------------- */}
      {view === "home" && (
        <div className="home view-fade">
          <div className="hero">
            <div className="hero__bg" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&q=80)" }} />
            <div className="hero__scrim" />
            <div className="hero__content">
              <div className="hero__eyebrow">Barinas · Venezuela</div>
              <div className="hero__logo">Vecchia</div>
              <div className="hero__tag">&ldquo;Aromas que crean recuerdos inolvidables&rdquo;</div>
              <button className="hero__cta" onClick={() => goToCategory("todos")}>Ver colección</button>
            </div>
          </div>

          <div className="home-section__title">Comprar por categoría</div>
          <div className="tiles">
            {[
              { key: "hombre", label: "Hombre" },
              { key: "mujer", label: "Mujer" },
              { key: "unisex", label: "Unisex" },
              { key: "sets", label: "Sets de regalo" },
            ].map((t, i) => (
              <button key={t.key} className={"tile card-in swatch--" + t.key} style={{ animationDelay: i * 0.06 + "s" }} onClick={() => goToCategory(t.key)}>
                <span className="tile__mono">{t.label[0]}</span>
                <span className="tile__label">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="home-section__title home-section__title--row">
            <span>Más vendidos</span>
            <button className="home-section__link" onClick={() => goToCategory("best")}>Ver todos</button>
          </div>
          <div className="strip">
            {bestsellers.map((p, i) => (
              <button key={p.id} className="strip__card card-in" style={{ animationDelay: i * 0.07 + "s" }} onClick={() => openProduct(p.id)}>
                <Swatch product={p} />
                <div className="card__name">{p.name}</div>
                <div className="card__price">${p.price}</div>
              </button>
            ))}
          </div>

          <div className="home-section__title">Novedades</div>
          <div className="news-grid">
            {NEW_ARRIVALS.map((p, i) => (
              <button key={p.id} className="news-card card-in" style={{ animationDelay: i * 0.08 + "s" }} onClick={() => openProduct(p.id)}>
                <Swatch product={p} />
                <span className="news-card__badge">{STYLE_LABEL[p.style]}</span>
                <div className="card__name">{p.name}</div>
                <div className="card__price">${p.price}</div>
              </button>
            ))}
          </div>

          <div className="brand-marquee">
            <div className="brand-marquee__track">
              {BRANDS.concat(BRANDS).map((b, i) => (
                <span key={i} className="brand-marquee__item">{b}</span>
              ))}
            </div>
          </div>

          <div className="newsletter">
            <div className="newsletter__title">Sé el primero en enterarte</div>
            <div className="newsletter__text">Nuevos ingresos, ediciones limitadas y recomendaciones directo por WhatsApp.</div>
            <button
              className="newsletter__cta"
              onClick={() => window.open(whatsappUrl("Hola, quiero recibir novedades de Vecchia Perfumes"), "_blank")}
            >
              Unirme por WhatsApp
            </button>
          </div>

          {recentProducts.length > 0 && (
            <>
              <div className="home-section__title">Vistos recientemente</div>
              <div className="strip">
                {recentProducts.map((p, i) => (
                  <button key={p.id} className="strip__card card-in" style={{ animationDelay: i * 0.06 + "s" }} onClick={() => openProduct(p.id)}>
                    <Swatch product={p} />
                    <div className="card__name">{p.name}</div>
                    <div className="card__price">${p.price}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="home-footer">
            Envíos a todo el país · Atención por WhatsApp<br/>© 2026 Vecchia Perfumes
          </div>
        </div>
      )}

      {/* ---------------- CATALOG ---------------- */}
      {view === "catalog" && (
        <div className="grid view-fade" key={cat + query}>
          {filtered.length === 0 && (
            <div className="empty">
              No hay perfumes que coincidan con tu búsqueda.
              <div><button className="empty__cta" onClick={() => { setQuery(""); setCat("todos"); }}>Ver todo</button></div>
            </div>
          )}
          {filtered.map((p, i) => (
            <button key={p.id} className="card card-in" style={{ animationDelay: Math.min(i, 14) * 0.035 + "s" }} onClick={() => openProduct(p.id)}>
              <Swatch product={p} showFavorite isFavorite={!!favorites[p.id]} onToggleFavorite={toggleFavorite} />
              <div className="card__name">{p.name}</div>
              <div className="card__ref">{REF(p.id)} · {p.size}</div>
              <div className="card__foot">
                <div className="card__price">${p.price}</div>
                {p.stock && (
                  <button
                    className="card__add"
                    aria-label="Agregar al carrito"
                    onClick={(e) => { e.stopPropagation(); addToCart(p.id, 1); flashToast("Añadido al carrito ✓"); }}
                  >
                    <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ---------------- FAVORITES ---------------- */}
      {view === "favorites" && (
        <>
          <div className="cart-title">Tus favoritos</div>
          <div className="grid view-fade">
          {favoriteProducts.length === 0 && (
            <div className="empty">
              Aún no tienes favoritos.
              <div><button className="empty__cta" onClick={() => goToCategory("todos")}>Ver catálogo</button></div>
            </div>
          )}
          {favoriteProducts.map((p, i) => (
            <button key={p.id} className="card card-in" style={{ animationDelay: Math.min(i, 14) * 0.035 + "s" }} onClick={() => openProduct(p.id)}>
              <Swatch product={p} showFavorite isFavorite onToggleFavorite={toggleFavorite} />
              <div className="card__name">{p.name}</div>
              <div className="card__ref">{REF(p.id)} · {p.size}</div>
              <div className="card__foot">
                <div className="card__price">${p.price}</div>
                {p.stock && (
                  <button
                    className="card__add"
                    aria-label="Agregar al carrito"
                    onClick={(e) => { e.stopPropagation(); addToCart(p.id, 1); flashToast("Añadido al carrito ✓"); }}
                  >
                    <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                )}
              </div>
            </button>
          ))}
          </div>
        </>
      )}

      {/* ---------------- PRODUCT DETAIL ---------------- */}
      {view === "product" && selected && (
        <div className="view-fade" key={"p" + selected.id}>
          <button className="pd-back" onClick={() => setView("catalog")}>
            <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>
            Volver
          </button>
          <div className="pd-body">
            <div className="pd-media">
              <Swatch product={selected} size="large" showFavorite isFavorite={!!favorites[selected.id]} onToggleFavorite={toggleFavorite} />
            </div>
            <div className="pd-info">
            <div className="pd-eyebrow-row">
              <div className="pd-eyebrow">{selected.cat === "hombre" ? "Colección hombre" : selected.cat === "mujer" ? "Colección mujer" : selected.cat === "unisex" ? "Colección unisex" : "Set de regalo"}</div>
              <button className="pd-share" onClick={() => shareProduct(selected)} aria-label="Compartir">
                <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="M8.2 10.7l7.6-4.4M8.2 13.3l7.6 4.4" /></svg>
              </button>
            </div>
            <div className="pd-name">{selected.name}</div>
            <div className="pd-ref">{REF(selected.id)} · {selected.size}</div>
            <div className="pd-price">${selected.price}</div>
            <div className="pd-desc">{selected.desc}</div>

            {selected.notes && selected.notes.length > 0 && (
              <div className="pd-notes">
                <div className="sheet__label">Notas</div>
                <div className="pill-row">
                  {selected.notes.map((n) => (
                    <span key={n} className="pill pill--note">{n}</span>
                  ))}
                </div>
              </div>
            )}

            {selected.stock ? (
              <div className="pd-stepper">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            ) : (
              <div className="pd-agotado">Temporalmente agotado</div>
            )}

            <button className="pd-whatsapp" onClick={() => askAboutProduct(selected)}>
              <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              Consultar por WhatsApp
            </button>
            </div>

            {similarProducts.length > 0 && (
              <div className="pd-similar">
                <div className="home-section__title" style={{ padding: "0 0 12px" }}>Perfumes similares</div>
                <div className="strip">
                  {similarProducts.map((p) => (
                    <button key={p.id} className="strip__card" onClick={() => openProduct(p.id)}>
                      <Swatch product={p} />
                      <div className="card__name">{p.name}</div>
                      <div className="card__price">${p.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bar">
            {selected.stock ? (
              <>
                <button
                  className="btn-secondary"
                  onClick={() => { addToCart(selected.id, qty); flashToast("Añadido al carrito ✓"); setView("catalog"); }}
                >
                  Agregar al carrito
                </button>
                <button
                  className="btn-primary"
                  onClick={() => { addToCart(selected.id, qty); setView("checkout"); }}
                >
                  Comprar ahora
                </button>
              </>
            ) : (
              <button className="btn-primary" onClick={() => notifyWhenAvailable(selected)}>
                Avísame cuando llegue
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---------------- CART ---------------- */}
      {view === "cart" && (
        <div className="view-fade">
          <button className="pd-back" onClick={() => setView("catalog")}>
            <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>
            Seguir comprando
          </button>
          <div className="cart-title">Tu carrito</div>
          <div className="cart-body">
            {cartItems.length === 0 && (
              <div className="empty">
                Tu carrito está vacío.
                <div><button className="empty__cta" onClick={() => setView("catalog")}>Ver catálogo</button></div>
              </div>
            )}
            {cartItems.map(({ product, qty }, i) => (
              <div className="cart-row card-in" style={{ animationDelay: i * 0.05 + "s" }} key={product.id}>
                <Swatch product={product} />
                <div className="cart-row__info">
                  <div className="cart-row__name">{product.name}</div>
                  <div className="cart-row__price">${product.price} · {product.size}</div>
                  <div className="cart-row__foot">
                    <div className="qty-stepper">
                      <button onClick={() => setCartQty(product.id, qty - 1)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => setCartQty(product.id, qty + 1)}>+</button>
                    </div>
                    <button className="cart-row__remove" onClick={() => setCartQty(product.id, 0)}>Quitar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="cart-summary">
                <div className="summary-line"><span>Subtotal</span><span>${cartTotal}</span></div>
                <div className="summary-line"><span>Envío</span><span>A convenir</span></div>
                <div className="summary-line summary-line--total"><span>Total</span><span>${cartTotal}</span></div>
              </div>
              <div className="bar">
                <button className="btn-primary" onClick={() => setView("checkout")}>Finalizar compra</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ---------------- CHECKOUT ---------------- */}
      {view === "checkout" && (
        <div className="view-fade">
          <button className="pd-back" onClick={() => setView("cart")}>
            <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>
            Volver al carrito
          </button>
          <form className="form-body" onSubmit={submitOrder}>
            <div className="pd-eyebrow" style={{ marginTop: 0 }}>Datos de entrega</div>
            <div className="field">
              <label>Nombre completo</label>
              <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" />
            </div>
            <div className="field">
              <label>Teléfono</label>
              <input required value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="300 000 0000" />
            </div>
            <div className="field">
              <label>Dirección de entrega</label>
              <input required value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} placeholder="Calle, número, ciudad" />
            </div>
            <div className="field">
              <label>Método de pago</label>
              <select value={form.pago} onChange={(e) => setForm({ ...form, pago: e.target.value })}>
                <option>Efectivo contra entrega</option>
                <option>Transferencia bancaria</option>
              </select>
            </div>
            <div className="order-recap">
              <div><span>{cartCount} producto(s)</span><span>${cartTotal}</span></div>
              <div style={{ fontWeight: 600 }}><span>Total</span><span>${cartTotal}</span></div>
            </div>
            <div className="bar" style={{ padding: "22px 0 0", border: "none" }}>
              <button className="btn-primary" type="submit">Confirmar pedido</button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- CONFIRMATION ---------------- */}
      {view === "done" && (
        <div className="done view-fade">
          <svg viewBox="0 0 24 24" className="done__check">
            <circle cx="12" cy="12" r="10" className="done__circle" />
            <path d="M8 12.5l2.5 2.5L16 9" className="done__mark" />
          </svg>
          <h1>Pedido confirmado</h1>
          <p>Gracias por tu compra en Vecchia Perfumes.<br/>Te contactaremos para coordinar la entrega.</p>
          <div className="order-no">N.º de pedido: {orderNo}</div>
          <div className="bar" style={{ border: "none", width: "100%", marginTop: 30 }}>
            <button className="btn-secondary" onClick={() => setView("catalog")}>Seguir comprando</button>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="menu-panel__top">
              <span className="menu-panel__logo">Vecchia</span>
              <button className="header__icon" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
                <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>
              </button>
            </div>
            <nav className="menu-panel__nav">
              {[
                { label: "Inicio", dest: "home" },
                { label: "Hombre", dest: "hombre" },
                { label: "Mujer", dest: "mujer" },
                { label: "Unisex", dest: "unisex" },
                { label: "Sets de regalo", dest: "sets" },
                { label: "Favoritos", dest: "favorites" },
              ].map((item, i) => (
                <button
                  key={item.dest}
                  className="menu-panel__link"
                  style={{ animationDelay: i * 0.05 + "s" }}
                  onClick={() => menuGoTo(item.dest)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="menu-panel__footer">
              <button className="menu-panel__contact" onClick={() => menuGoTo("contacto")}>
                <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                Contacto
              </button>
              <div className="menu-panel__note">Barinas · Venezuela</div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast" key={toast + Date.now()}>
          {toast}
        </div>
      )}
    </div>
  );
}
