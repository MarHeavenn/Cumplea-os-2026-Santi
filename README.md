# Feliz Cumpleaños — Sistema Solo Leveling 🗡️

Página web hecha en Angular, con temática inspirada en las "ventanas de sistema"
y el leveo de Solo Leveling, para felicitar a tu novio.

## Cómo editar el contenido

Abre `src/app/app.component.ts` y edita las primeras líneas marcadas con
`✏️ EDITA ESTOS DATOS`:

- `nombre`: el nombre de tu novio.
- `edad`: su edad (se anima como si fuera su "nivel").
- `tituloEspecial`: un título tipo videojuego para él.
- `cartaFinal`: el mensaje que aparece al presionar el botón "¡ARISE!".

También puedes editar los arreglos `stats` (barras de estado) y `quests`
(registro de misiones) más abajo en el mismo archivo, con lo que tú quieras.

## Cómo correr el proyecto

Necesitas [Node.js](https://nodejs.org) instalado (versión 18 o superior).

```bash
npm install
npm start
```

Luego abre `http://localhost:4200` en tu navegador.

## Cómo generar la versión final para compartir

```bash
npm run build
```

Esto genera los archivos listos para publicar dentro de `dist/cumple-solo-leveling`.
Puedes subir esa carpeta a un hosting gratuito como Netlify, Vercel o GitHub Pages.
