# VECCHIA PERFUMES — sitio reconstruido

## Cómo subirlo

Los archivos van **todos en la raíz del repositorio**, sin carpetas. Es a
propósito: el navegador del móvil no puede subir carpetas a GitHub, y cuando
los archivos de `assets/` se subían sueltos la web salía en blanco.

```
/                     ← raíz del repositorio
├── index.html        ← inicio
├── catalogo.html     ← catálogo con filtros y buscador
├── producto.html     ← ficha (producto.html?id=…)
├── marca.html        ← página de cada marca (marca.html?m=Lattafa)
├── favoritos.html
├── checkout.html
├── contacto.html
├── quiz.html
├── vecchia.css       ← todo el diseño
├── app.js            ← toda la lógica (carrito, buscador, tasa…)
├── data.js           ← EL CATÁLOGO: los 116 productos
├── robots.txt
├── sitemap.xml
├── vercel.json
├── mens-collection.html      ┐
├── woman-collection.html     │ redirecciones de las URLs antiguas
├── unisex-collection.html    │ (no las borres: mantienen vivos
├── gift-sets.html            │ los enlaces ya compartidos)
├── catalog.html              │
├── vecchia-quiz.html         ┘
├── README.md
└── LEEME.md
```

En GitHub: *Add file → Upload files* y selecciona **todos** los archivos.
No hace falta arrastrar ninguna carpeta.

**Antes de subir, borra del repositorio lo viejo** o quedarán dos versiones
mezcladas y verás la antigua:

- la carpeta `assets/` completa (CSS y JS viejos)
- `decants.html`
- `vecchia-perfumes.zip` (un zip subido sin descomprimir no sirve de nada)
- `site-variables.css`, `site-components.css`, `site-footer.css`,
  `site-utilities.js`

## Cómo editar el catálogo

Todo el catálogo vive en **`data.js`**, en un único array.
Para cambiar un precio, una foto o el stock, edita solo ese archivo:

```js
{
  "id": "asad-lattafa-100ml-edp",   // no lo cambies: es el enlace de la ficha
  "name": "Asad Lattafa 100ml EDP",
  "brand": "Lattafa",               // "" si no quieres mostrar marca
  "price": 50,                      // número, sin símbolo
  "image": "https://…",
  "alt": "Asad Lattafa 100ml EDP",  // texto alternativo (accesibilidad y SEO)
  "desc": "…",
  "family": "arabes",               // "arabes" | "designer"
  "genders": ["hombre"],            // hombre | mujer | unisex | sets
  "soldOut": false,                 // true = muestra AGOTADO y bloquea el pedido
  "bestseller": false,              // true = aparece en «Más vendidos»
  "nuevo": false                    // true = aparece en «Novedades»
}
```

Al guardar, el cambio se refleja en **todas** las páginas a la vez: home,
catálogo, buscador, ficha de producto, favoritos y carrito.

## Qué NO hace todavía (necesita servidor)

El pedido se cierra por WhatsApp con el mensaje ya redactado. Eso funciona hoy
sin ningún servidor. Lo que **no** existe y requeriría backend:

1. **Cobro con tarjeta en la web.** Necesita una pasarela (Stripe, Mercado Pago…)
   con su clave secreta en un servidor. La clave *nunca* puede ir en estos
   archivos: cualquiera vería el código fuente. Haría falta una función
   serverless (Vercel Functions) que cree la sesión de pago.
2. **Stock en tiempo real.** Hoy `soldOut` se edita a mano en `data.js`.
   Para stock automático haría falta una base de datos y un panel.
3. **Guardar los pedidos.** Ahora llegan a WhatsApp; no se almacenan.
4. **Favoritos entre dispositivos.** Se guardan en el navegador de cada
   visitante (localStorage). Para sincronizarlos haría falta login y base de datos.

## Paleta

Dos colores. Están al principio de `vecchia.css`:

```css
--white:#FFFFFF   /* fondo, tarjetas, modales, formularios */
--black:#000000   /* texto, iconos, bordes, botones */
```

Todo lo demás (bordes, texto secundario, separadores) es negro con opacidad,
no un color aparte. Las superficies oscuras — héroe, pie, buscador, baldosas
de foto — son negro puro con texto blanco.

Botones: fondo blanco, texto negro, borde negro; al pasar el ratón se
invierten. Esquinas prácticamente rectas (radio 0–1 px).

## Por qué unas fotos van sobre negro y otras sobre blanco

Tus 116 fotos vienen de **22 tiendas distintas** y cada archivo trae su propio
fondo incrustado: **72 con fondo oscuro** (las de fimgs.net) y **44 con fondo
claro**. Por eso antes se veía «cada foto de un color».

No se pueden repintar desde la web, así que cada tipo recibe el tratamiento
que hace desaparecer su fondo:

- **Fondo claro** → baldosa blanca + `mix-blend-mode:multiply`: el blanco de
  la foto se funde con el fondo y solo queda el frasco.
- **Fondo oscuro** → baldosa negra y foto a sangre (`object-fit:cover`): la
  foto cubre la baldosa entera, así que no se ve ningún recuadro.

El sitio lo decide solo, mirando si la URL contiene `dark-`. Si cambias una
foto, actualiza el campo `dark` de ese producto en `data.js`.

**Si quieres que todas vayan sobre blanco**, hay que sustituir esas 72 fotos
por versiones con fondo blanco. Prueba primero una URL en el navegador: si
`375x500` funciona en lugar de `dark-375x500`, es un buscar-y-reemplazar en
`data.js` y poner `"dark": false`. No lo hice yo porque desde aquí no tengo
acceso a internet para comprobarlo, y a ciegas se habrían roto las 72.

## Tasa euro → Bs

Los precios se muestran en **dólares**, y el equivalente en bolívares se
calcula con la **tasa euro del BCV**. Aparece en las tarjetas, la ficha, el
carrito y el checkout. La lógica está en `app.js`, bloque `Rate`.

El pie de cada página dice con qué tasa se calculó, por ejemplo:
`Tasa euro: Bs 968,07 · actualizada el 11 de septiembre de 2026`.
Así el comprador ve el número exacto que se usó y no hay malentendidos.

**Cómo obtiene la tasa**, en este orden:

1. **Tasa manual** — si la escribes, manda sobre todo lo demás. En `app.js`:
   ```js
   manual: null,     // bolívares por euro, p. ej.  manual: 968.07
   ```
2. **La última tasa buena guardada** en el navegador del visitante.
3. **Las APIs**, en segundo plano:
   - `ve.dolarapi.com/v1/euros/oficial` (BCV) — comprobada y funcionando
   - `api.exchangerate.host` con `base=EUR` — respaldo

**Qué pasa si todo falla:** no se muestra ningún precio en bolívares. No sale
`NaN`, ni `undefined`, ni `$0`, ni «Tasa no configurada» — la línea en Bs
simplemente no existe y el sitio sigue funcionando en dólares.

Cualquier valor absurdo (texto, cero, negativo, mayor de diez millones) se
descarta y se conserva la tasa anterior.

> La clave de caché es `vecchia.rate.eur.v2`. Si algún día vuelves a la tasa
> dólar, cambia también esa clave: si no, quien ya visitó el sitio seguiría
> viendo cálculos hechos con la tasa vieja guardada en su navegador.

## Decants

Eliminada por completo: la página, el enlace del menú, el del pie, la sección
del inicio y la entrada del sitemap. No queda ninguna referencia en el código.


## Barra de aviso (la franja negra de arriba)

En `app.js`, dentro de `CFG`:

```js
notice: {
  text: 'Envíos a toda Venezuela · Coordinamos por WhatsApp',
  version: 1
}
```

- Cambia `text` por lo que quieras anunciar (una promoción, un horario…).
- **Sube el `version` a 2, 3, 4…** cada vez que cambies el mensaje. Si no lo
  subes, quien ya cerró la barra no verá el mensaje nuevo.
- Pon `text: ''` para que no aparezca ninguna barra.

## Descuento por cantidad

Viene **desactivado**. En `app.js`, dentro de `CFG`:

```js
discount: { minQty: 0, percent: 0 }
```

Para activar «2 o más, 10% de descuento»:

```js
discount: { minQty: 2, percent: 10 }
```

Se aplica solo, y aparece en el carrito, en el checkout y en el mensaje de
WhatsApp. Con `percent: 0` no se aplica ni se muestra nada.

El descuento se calcula en céntimos enteros y se redondea una sola vez sobre
el subtotal, así que **total = subtotal − descuento** siempre cuadra al
céntimo, incluso con porcentajes raros como el 7%.

## Compartir una fragancia

La ficha de cada perfume tiene «Compartir esta fragancia»: abre WhatsApp con
el nombre, la marca, el precio en dólares y bolívares, la disponibilidad y el
enlace a la ficha. Sin número de destino: lo elige quien comparte.

## Vistos recientemente

El inicio y la ficha muestran las últimas fragancias que ese visitante abrió.
Se guardan **solo los identificadores**, en su propio navegador, con un tope
de 8. Nada sale de su teléfono y no hace falta ningún servidor.

## Páginas de marca

`marca.html?m=Lattafa` es una página propia de cada marca, con su título,
su descripción, su H1 y sus migas para Google. `marca.html` sin parámetro
lista las 25 marcas.

Las 25 están en el `sitemap.xml`, así que Google las descubre solas.

> Aviso honesto: el título y la descripción de estas páginas los pone
> JavaScript al cargar. Google lo lee, pero una página con el título ya
> escrito en el HTML posiciona mejor. Si algún día quieres eso, hay que
> generar un archivo por marca (25 archivos) o añadir un paso de compilación.

## Notas sobre los datos

- Los 116 productos, precios, fotos y descripciones salen de tus páginas
  originales. No se inventó ninguno.
- **Los 116 productos tienen marca.** Los 31 que antes no la mostraban se
  investigaron uno por uno. La foto de la mayoría viene de fimgs.net y el
  número de su URL es el identificador de Fragrantica, así que la foto y la
  ficha oficial se corresponden con certeza. La tabla está en
  `gendata.py` → `BRAND_FIX`, con el número comprobado al lado de cada uno.
- Tres marcas estaban mal atribuidas porque el nombre del producto empieza
  por el nombre de la **línea**, no de la casa. Corregidas:
  - `Odyssey` → **Armaf** (8 productos: Mandarin Sky, Aoud, Aqua, White,
    Spectra, Mandarin Elixir, Aristo, Candee)
  - `Bad Boy` → **Carolina Herrera** (2: Le Parfum, Cobalt Électrique)
  - `Armani` → **Emporio Armani** (la línea Stronger With You). Acqua di Gio
    queda como **Giorgio Armani**, que es la casa correcta para esa línea.
  Si prefieres verlas como antes, cambia `BRAND_RENAME` en `gendata.py`.
- **Versace Eros** ($105) solo existía en la home antigua y no tenía categoría
  asignada. Está en el catálogo y en el buscador, pero no aparece al filtrar por
  Hombre / Mujer / Unisex. Para colocarlo, añade el género en `data.js`:
  `"genders": ["hombre"]`.
- Dos de los cuatro «más vendidos» están marcados como agotados en tus
  colecciones. Se respeta ese estado: se muestran con la etiqueta AGOTADO y
  la home prioriza los disponibles.
