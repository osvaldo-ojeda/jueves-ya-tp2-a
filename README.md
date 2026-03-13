# Clase 1: Control de Versiones Profesional con Git

## Objetivos
Al finalizar esta clase serán capaces de:
- Comprender la importancia de Git en el desarrollo de software moderno.
- Configurar un entorno de Git profesional.
- Dominar el flujo de trabajo básico y el de ramas (`Feature Branch Workflow`).
- Escribir mensajes de commit claros y convencionales.
- Colaborar en proyectos utilizando repositorios remotos como GitHub.

---

## 1. ¿Qué es Git y Por Qué Es Fundamental?
Git es un sistema de control de versiones distribuido. Es la herramienta estándar en la industria para rastrear cambios en el código, coordinar trabajo entre múltiples desarrolladores y mantener un historial limpio y navegable de un proyecto. Dominar Git es una habilidad no negociable para cualquier desarrollador.

---

## 2. Configuración Inicial (Setup de Profesional)

#### a) Instalación
Descarga e instala Git desde [https://git-scm.com](https://git-scm.com). Verifica con `git --version`.

#### b) Configuración de Identidad
Es crucial que cada commit tenga tu autoría correcta.
```bash
git config --global user.name "Tu Nombre Completo"
git config --global user.email "tu.correo@profesional.com"
```

#### c) Configuración del Editor y Salto de Línea
Configura tu editor preferido (ej. VS Code) y el manejo de saltos de línea según tu SO.
```bash
# Configurar VS Code como editor para commits y merges
git config --global core.editor "code --wait"

# Para Windows
git config --global core.autocrlf true
# Para macOS/Linux
git config --global core.autocrlf input
```

---

## 3. El Flujo de Trabajo Básico en Git

Un repositorio Git es una base de datos de "snapshots" (instantáneas) de tu proyecto.

1.  **`git init`**: Inicializa un nuevo repositorio en la carpeta actual. Crea un subdirectorio oculto `.git` que contiene toda la historia del proyecto.
2.  **`git status`**: Muestra el estado actual de tus archivos: `untracked` (nuevos), `modified` (cambiados), `deleted` (eliminados), o `staged` (listos para confirmar).

### 3.1. El Fichero `.gitignore`: Ignorando Archivos
Antes de añadir archivos, debemos decirle a Git qué ignorar. Es **fundamental** en proyectos de Node.js para no subir dependencias o secretos.

Crea un archivo llamado `.gitignore` en la raíz de tu proyecto.

**Ejemplo para Node.js:**
```
# Dependencias
node_modules/

# Archivos de logs
npm-debug.log

# Variables de entorno
.env
```

3.  **`git add <archivo>`**: Añade archivos al "Staging Area". Es el paso previo a tomar la instantánea. Usa `git add .` para añadir todos los archivos modificados (que no estén en `.gitignore`).

4.  **`git commit -m "mensaje"`**: Guarda la instantánea de los archivos del Staging Area en la base de datos de Git.

### 3.2. Mensajes de Commit Convencionales
Un historial es útil si sus mensajes son claros. La industria usa "Conventional Commits".
**Formato:** `<tipo>(<ámbito>): <descripción>`

- **`feat`**: Para una nueva funcionalidad (feature).
- **`fix`**: Para una corrección de error (bug fix).
- **`docs`**: Para cambios en la documentación.
- **`style`**: Cambios de formato, comas, etc. (sin impacto en la lógica).
- **`refactor`**: Refactorización de código.
- **`test`**: Añadir o modificar tests.

**Ejemplo:** `feat(auth): implementar registro de usuarios con email y password`

5.  **`git log`**: Muestra el historial de commits. Usa `git log --oneline --graph` para una vista compacta y gráfica.

---

### 3.3. Deshaciendo Cambios Locales

A veces, necesitamos deshacer acciones que hemos realizado en nuestro repositorio local.

-   **`git reset HEAD <archivo>` (o `git restore --staged <archivo>` en Git moderno):**
    *   **¿Qué hace?** Saca un archivo del "Staging Area" (área de preparación), devolviéndolo al estado "Modified" o "Untracked". Es útil si añadiste un archivo por error o si quieres hacer más cambios antes de confirmarlo.
    *   **Ejemplo:**
        ```bash
        git add mi_archivo.txt
        git status # Verás mi_archivo.txt en staged
        git reset HEAD mi_archivo.txt
        git status # mi_archivo.txt ya no está en staged
        ```

-   **`git checkout -- <archivo>` (o `git restore <archivo>` en Git moderno):**
    *   **¿Qué hace?** Descarta los cambios locales en un archivo, restaurándolo a la última versión confirmada (o a la versión en el Staging Area si ya lo habías añadido). **¡Cuidado!** Esto elimina los cambios no guardados y no se pueden recuperar.
    *   **Ejemplo:**
        ```bash
        # Modificas mi_archivo.txt
        git status # Verás mi_archivo.txt en modified
        git checkout -- mi_archivo.txt
        git status # mi_archivo.txt vuelve a su estado original (último commit)
        ```

---

## 4. Flujo de Trabajo con Ramas: Feature Branching
Nunca se trabaja directamente sobre la rama principal (`main` o `master`). El flujo profesional es:
1.  Crear una nueva rama para cada nueva funcionalidad o arreglo.
2.  Trabajar en esa rama.
3.  Cuando esté lista, fusionarla de vuelta a `main`.

- **`git branch <nombre-rama>`**: Crea una rama.
- **`git checkout <nombre-rama>`**: Cambia a una rama. O `git checkout -b <nombre-rama>` para crearla y cambiar a ella en un solo paso.
- **`git merge <nombre-rama>`**: Fusiona los cambios de `<nombre-rama>` en tu rama actual. Pueden ocurrir **conflictos** si los mismos archivos fueron modificados en ambas ramas. Deben resolverse manualmente.

**Visualizando `git merge` vs `git rebase`:**

**Escenario Inicial:**
```
      D -- E (mi-feature)
     /
A -- B -- C -- F -- G (main)
```
(Donde C es el punto de partida de `mi-feature`, y F, G son nuevos commits en `main`)

**Opción 1: Después de `git merge mi-feature` (estando en `main`):**
```
A -- B -- C -- F -- G -- H (main)
          \                 /
           D ----------- E
```
(H es un nuevo "merge commit" que une los historiales)

**Opción 2: Después de `git rebase main` (estando en `mi-feature`), y luego `git merge mi-feature` (estando en `main`):**
```
A -- B -- C -- F -- G -- D' -- E' (main)
```
(Historial lineal, los commits D y E se "reaplican" después de G)

- **`git branch -d <nombre-rama>`**: Elimina una rama **local** (solo si ya fue fusionada). Para forzar la eliminación (`-D`) si no ha sido fusionada.
- **`git branch -m <nuevo-nombre>`**: Renombra la rama en la que te encuentras.
- **`git push origin --delete <nombre-rama>`**: Elimina una rama **remota**.

**Flujo para renombrar una rama ya subida al remoto:**
1.  Renombra tu rama local: `git branch -m <nuevo-nombre>`
2.  Sube la nueva rama y ajústala para que siga los cambios remotos: `git push origin -u <nuevo-nombre>`
3.  Elimina la rama con el nombre antiguo del remoto: `git push origin --delete <nombre-antiguo>`

### 4.1. Rebase antes de Push: Manteniendo un Historial Limpio

Una práctica común en equipos profesionales es **rebasar tu rama de característica sobre la rama principal (`main`) antes de fusionarla o hacer `push`**. Esto crea un historial de commits lineal y limpio, evitando "merge commits" innecesarios.

**Visualizando `git rebase`:**

**Antes del rebase:**
```
      D -- E (mi-feature)
     /
A -- B -- C (main)
```

**Después de `git rebase main` (estando en `mi-feature`):**
```
A -- B -- C -- D' -- E' (mi-feature)
```
(Donde D' y E' son los commits D y E "reaplicados" sobre C)

**Pasos:**
1.  Asegúrate de estar en tu rama de característica: `git checkout mi-feature`
2.  Actualiza tu rama `main` local: `git checkout main && git pull origin main`
3.  Vuelve a tu rama de característica: `git checkout mi-feature`
4.  Rebasa tu rama sobre `main`: `git rebase main`
    *   Si hay conflictos, resuélvelos, luego `git add .` y `git rebase --continue`.
5.  Una vez terminado el rebase, tu rama estará actualizada con los últimos cambios de `main` y con un historial lineal.
6.  Ahora puedes hacer `git push origin mi-feature --force-with-lease` (si ya habías subido la rama antes) o `git push origin mi-feature` (si es la primera vez).

---

## 5. Colaborando con Repositorios Remotos (GitHub/GitLab)

- **`git clone <url>`**: Descarga un repositorio remoto a tu máquina local.
- **`git remote add origin <url>`**: Conecta tu repositorio local a uno remoto.
- **`git push -u origin <nombre-rama>`**: Sube tus commits a la rama remota.
- **`git pull`**: Descarga los cambios desde el repositorio remoto y los fusiona en tu rama local.

### 5.1. Manteniendo un Historial Limpio: `pull --rebase`
`git pull` crea un commit de fusión. Para un historial más limpio y lineal, muchos equipos prefieren `git pull --rebase`. Este comando descarga los cambios remotos y aplica tus commits locales por encima de ellos. ¡Esencialmente, es un `git fetch` seguido de un `git rebase` de tu rama local sobre la rama remota! (Ver la explicación visual de `rebase` en la sección 4.1). ¡Úsalo con cuidado y en ramas donde solo tú trabajes!

---

## 6. Ejercicio Práctico Reforzado

1.  **Configuración:** Realiza la configuración global de `user.name`, `user.email` y `core.editor`.
2.  **Crear Repositorio y `.gitignore`:**
    - Crea una carpeta `mi-api-profesional` e inicializa un repositorio Git.
    - Crea un archivo `.gitignore` y añade `node_modules/` y `.env`.
    - Crea un archivo `index.js` con un `console.log("Hola Mundo");`.
    - Haz tu primer commit usando un mensaje convencional (ej: `feat: inicializar proyecto`).
3.  **Feature Branch Workflow:**
    - Crea una rama `feature/agregar-readme`.
    - En esa rama, añade un archivo `README.md` con una descripción del proyecto.
    - Haz un commit con el mensaje `docs: agregar README.md`.
    - Vuelve a la rama `main` y fusiona la rama `feature/agregar-readme`.
    - Elimina la rama de la feature.
4.  **Conectar con GitHub:**
    - Crea un repositorio vacío en GitHub.
    - Conecta tu repositorio local con el remoto.
    - Sube tus cambios (`git push`).
5.  **Resolver un Conflicto:**
    - En GitHub, edita el `README.md` directamente.
    - En tu local, en la rama `main`, modifica la misma línea del `README.md` y haz un commit.
    - Intenta hacer `git pull`. Git detectará un conflicto. Resuélvelo en VS Code, y finaliza la fusión con `git add` y `git commit`.
6.  **Revertir un Commit:**
    - Haz un commit no deseado (ej. `feat: agregar funcionalidad rota`).
    - Usa `git log` para encontrar el hash del commit.
    - Usa `git revert <hash-del-commit>` para crear un nuevo commit que deshace los cambios. Haz `push` del reverso.
7.  **Deshacer Cambios Locales:**
    - Crea un archivo `temp.txt` con algún contenido.
    - Añádelo al Staging Area (`git add temp.txt`).
    - Luego, sácalo del Staging Area (`git reset HEAD temp.txt`). Verifica con `git status`.
    - Modifica `temp.txt` nuevamente.
    - Ahora, descarta esos cambios locales (`git checkout -- temp.txt`). Verifica que el archivo volvió a su estado anterior.

