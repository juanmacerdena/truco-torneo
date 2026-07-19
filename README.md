# Torneo de Truco - UnTrucoUY

Sistema de gestión online para torneos de Truco con base de datos en tiempo real.

## Stack Tecnológico

- **Frontend**: React 18 + Next.js 14
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL (Supabase)
- **Hosting**: Vercel

## Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/juanmacerdena/truco-torneo.git
cd truco-torneo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

El archivo `.env.local` ya contiene las credenciales. No hay nada más que configurar.

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:3000`

## Configuración de Supabase

### Tablas necesarias

#### 1. Tabla `mesas`

```sql
create table mesas (
  id int primary key,
  a text not null,
  b text not null,
  scoreA int default 0,
  scoreB int default 0,
  set text check (set in ('malas', 'buenas')),
  status text check (status in ('libre', 'jugando', 'finalizada')),
  created_at timestamp default now()
);
```

#### 2. Tabla `standings`

```sql
create table standings (
  id serial primary key,
  pair text not null unique,
  pj int default 0,
  pg int default 0,
  pp int default 0,
  pts int default 0,
  updated_at timestamp default now()
);
```

#### 3. Tabla `bracket`

```sql
create table bracket (
  id int primary key default 1,
  cuartos jsonb,
  semis jsonb,
  final jsonb,
  updated_at timestamp default now()
);

-- Insertar datos iniciales
insert into bracket (id, cuartos, semis, final) values (
  1,
  '[{"a":"Envido Va","b":"La Junta","winner":"Envido Va"},{"a":"Mano de Hierro","b":"Los Zurdos","winner":"Mano de Hierro"},{"a":"Los Cracks","b":"Doble Nueve","winner":null},{"a":"Cuatro Vale","b":"La Banda del Oro","winner":null}]'::jsonb,
  '[{"a":"Envido Va","b":"Mano de Hierro","winner":null},{"a":"TBD","b":"TBD","winner":null}]'::jsonb,
  '[{"a":"TBD","b":"TBD","winner":null}]'::jsonb
);
```

### Insertar datos de ejemplo

```sql
insert into mesas values
(1, 'Los Cracks', 'Doble Nueve', 24, 18, 'malas', 'jugando'),
(2, 'Ni Fu Ni Fa', 'Truco Viejo', 12, 9, 'malas', 'jugando'),
(3, 'Envido Va', 'La Junta', 30, 22, 'buenas', 'finalizada'),
(4, 'Flor y Truco', 'Los Pibes', 5, 3, 'buenas', 'jugando'),
(5, 'Sin Cartas', 'Retruco FC', 0, 0, 'malas', 'libre'),
(6, 'La Banda del Oro', 'Cuatro Vale', 20, 27, 'malas', 'jugando'),
(7, 'Mano de Hierro', 'Los Zurdos', 30, 14, 'buenas', 'finalizada'),
(8, 'Che Truco', 'Doña Envido', 15, 15, 'malas', 'jugando');

insert into standings values
(1, 'Mano de Hierro', 3, 3, 0, 9),
(2, 'Envido Va', 3, 3, 0, 9),
(3, 'Cuatro Vale', 3, 2, 1, 6),
(4, 'Los Cracks', 3, 2, 1, 6),
(5, 'Flor y Truco', 3, 1, 2, 3),
(6, 'Che Truco', 3, 1, 2, 3),
(7, 'Doble Nueve', 3, 0, 3, 0),
(8, 'La Junta', 3, 0, 3, 0);
```

## Deploy en Vercel

### 1. Conectar repositorio

- Entrá a https://vercel.com
- Click "New Project"
- Selecciona tu repositorio de GitHub

### 2. Variables de entorno en Vercel

Vercel no usa tu `.env.local` local; cargalas en el dashboard del proyecto:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` o `SUPABASE_SECRET_KEY`

Usá los mismos valores que tenés en desarrollo para la URL y la key pública, y la service role key real para escritura desde las API routes.

### 3. Deploy

Click "Deploy" y Vercel hace todo automáticamente.

## Características

✅ **Gestión de Mesas**

- Ver todas las mesas en tiempo real
- Actualizar puntajes (admin)
- Cambiar estado de mesas

✅ **Standings**

- Tabla de posiciones actualizada
- Puntos, partidos jugados, ganados, perdidos

✅ **Bracket de Playoff**

- Visualización de cuartos, semis y final
- Seleccionar ganadores (admin)

✅ **Admin**

- Contraseña: `truco2026`
- Control total del torneo

## Notas

- El archivo `.env.local` tiene credenciales y NO debe commiterse a Git
- El `.gitignore` ya excluye este archivo
- Las credenciales son para el proyecto demo y se pueden regenerar en Supabase si es necesario

## Contacto

Para dudas o reportar bugs, creá un issue en GitHub.
