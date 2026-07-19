# Setup de Base de Datos en Supabase

## Pasos para configurar las tablas

### 1. Entrá al Dashboard de Supabase
- Url: https://app.supabase.com
- Buscá tu proyecto `vclnmxffslmxhompegwa`

### 2. Abrí el SQL Editor
- Click en "SQL Editor" en el sidebar izquierdo
- Click en "New Query"

### 3. Ejecutá estos queries UNO POR UNO

#### Query 1: Crear tabla `mesas`
```sql
create table if not exists mesas (
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
Ejecutá con Ctrl+Enter o click en "Run"

#### Query 2: Crear tabla `standings`
```sql
create table if not exists standings (
  id serial primary key,
  pair text not null unique,
  pj int default 0,
  pg int default 0,
  pp int default 0,
  pts int default 0,
  updated_at timestamp default now()
);
```

#### Query 3: Crear tabla `bracket`
```sql
create table if not exists bracket (
  id int primary key default 1,
  cuartos jsonb,
  semis jsonb,
  final jsonb,
  updated_at timestamp default now()
);
```

#### Query 4: Insertar datos iniciales en `mesas`
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
```

#### Query 5: Insertar datos iniciales en `standings`
```sql
insert into standings (pair, pj, pg, pp, pts) values
('Mano de Hierro', 3, 3, 0, 9),
('Envido Va', 3, 3, 0, 9),
('Cuatro Vale', 3, 2, 1, 6),
('Los Cracks', 3, 2, 1, 6),
('Flor y Truco', 3, 1, 2, 3),
('Che Truco', 3, 1, 2, 3),
('Doble Nueve', 3, 0, 3, 0),
('La Junta', 3, 0, 3, 0);
```

#### Query 6: Insertar datos iniciales en `bracket`
```sql
insert into bracket (id, cuartos, semis, final) values (
  1,
  '[{"a":"Envido Va","b":"La Junta","winner":"Envido Va"},{"a":"Mano de Hierro","b":"Los Zurdos","winner":"Mano de Hierro"},{"a":"Los Cracks","b":"Doble Nueve","winner":null},{"a":"Cuatro Vale","b":"La Banda del Oro","winner":null}]'::jsonb,
  '[{"a":"Envido Va","b":"Mano de Hierro","winner":null},{"a":"TBD","b":"TBD","winner":null}]'::jsonb,
  '[{"a":"TBD","b":"TBD","winner":null}]'::jsonb
);
```

### 4. Verifica que todo funcionó
- En el sidebar, deberías ver las 3 tablas: `mesas`, `standings`, `bracket`
- Hacé click en cada una para verificar que los datos fueron insertados

## Listo! 🎉

Tu base de datos está lista. Ahora podés:
1. Clonar el repo
2. Instalar dependencias (`npm install`)
3. Correr localmente (`npm run dev`)
4. Deployar en Vercel
