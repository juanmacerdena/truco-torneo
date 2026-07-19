# Guía Completa: Push a GitHub + Deploy en Vercel

## PASO 1: Setupear la Base de Datos en Supabase (5 minutos)

⚠️ **PRIMERO**: Lee y sigue los pasos en `SETUP_DB.md`

Sin esto, la app no funcionará.

---

## PASO 2: Push a GitHub (3 minutos)

Abrí una terminal en tu computadora y navegá a la carpeta del proyecto:

```bash
cd ruta/a/tu/truco-torneo
```

### 2.1 Inicializar Git

```bash
git init
```

### 2.2 Agregar todos los archivos

```bash
git add .
```

### 2.3 Hacer commit inicial

```bash
git commit -m "Initial commit: Truco Torneo app"
```

### 2.4 Conectar con tu repositorio en GitHub

Reemplazá `juanmacerdena` con tu usuario:

```bash
git remote add origin https://github.com/juanmacerdena/truco-torneo.git
```

### 2.5 Pushear al repositorio

```bash
git branch -M main
git push -u origin main
```

✅ Listo! Tu código está en GitHub

---

## PASO 3: Deploy en Vercel (2 minutos)

### 3.1 Entrá a Vercel

- Url: https://vercel.com
- Loguéate (podés usar tu cuenta de GitHub)

### 3.2 Crear nuevo proyecto

- Click en "Add New..." → "Project"
- Buscá tu repo `truco-torneo`
- Click en "Import"

### 3.3 Configurar variables de entorno

En la sección "Environment Variables" de Vercel, agregá estas variables con tus valores reales:

```
NEXT_PUBLIC_SUPABASE_URL=https://vclnmxffslmxhompegwa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_7B0fuf7X93bXdcK7ooeZuw_VEFKaJ7h
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

Si ya usabas `SUPABASE_SECRET_KEY`, el backend lo sigue aceptando como fallback, pero en Vercel conviene dejar solo `SUPABASE_SERVICE_ROLE_KEY`.

### 3.4 Deploy

- Click en "Deploy"
- Esperá 1-2 minutos
- ✅ ¡Tu app está online!

Vercel te dará una URL como: `https://truco-torneo.vercel.app`

---

## Verificación Final

1. ✅ Entrá a https://github.com/juanmacerdena/truco-torneo → deberías ver tu código
2. ✅ Entrá a tu URL de Vercel → deberías ver el torneo funcionando
3. ✅ Probá cambiar un puntaje (con admin) → deberías ver los cambios guardarse

---

## Troubleshooting

### "Module not found: Can't resolve 'lucide-react'"

**Solución**: Vercel detectó mal las dependencias. En el dashboard:

- Settings → Build & Development Settings
- Marca "Override" en Install Command
- Poné: `npm install`

### "Database connection error"

**Solución**: Las variables de entorno no se setieron bien. Verificá en Vercel → Settings → Environment Variables que estén todas.

### La app carga pero sin estilos

**Solución**: Limpiar caché del navegador (Ctrl+Shift+Del) y recargar.

---

## Próximos Pasos

Cuando todo funcione:

1. **Modificar datos**: Podés editar los standings y mesas desde el SQL Editor de Supabase
2. **Agregar más tablas**: Si querés agregar jugadores, torneos pasados, etc.
3. **Cambiar contraseña de admin**: En el componente `TrucoTorneo.jsx`, línea ~57, cambiar `"truco2026"`

---

## Contacto

Si algo no funciona, creá un issue en GitHub con el error exacto.

¡Que disfrutes del torneo! ⭐
