# Control Unity | Sistema de gestión de implementos y/o aulas educativas

Control unity es un aplicativo web el cual tiene la finalidad de agilizar los préstamos de aulas educativas e implementos que proporciona la UNICLARETIANA sede Quibdó.

[![Netlify Status](https://api.netlify.com/api/v1/badges/e3e53083-42e1-4740-9f26-33f43ba31b44/deploy-status)](https://app.netlify.com/sites/controlunity/deploys)

### [Tabla de contenido](#tabla-de-contenido)

1. [Entorno de ejecución](#entorno-de-ejecución)
1. [Comandos para ejecutar el proyecto](#comandos-para-ejecutar-el-proyecto)

## [Entorno de ejecución](#entorno-de-ejecución)

El aplicativo web **Control Unity** esta construido a base de frameworks javascript, para poder ejecutar todo sin problemas debes de tener ciertas dependencias instaladas globalmente:

1. [NodeJS](#nodejs)
2. [MongoDB](#mongodb)
3. [VueJS](#vuejs)

#### [NodeJS](#nodejs)

Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google.

> [Descargar Node.Js para sistemas basados en Windows o Mac](https://nodejs.org/es/download/)

> [Descargar Node.JS para distribuciones linux](https://nodejs.org/es/download/package-manager/)

Node.JS trae consigo instaladores de dependecias **Npm** y **Yarn** con los que podemos instalar dependencias necesarias para ejecutar correctamente el proyecto y con los cuales podemos instalar dependencias adicionales de llegar a requerirlas

Para verificar si Node.JS quedo instalado correctamente podmeos ingresar el siguiente comando en consola:

```bash
# verificar si tenemos node instalado globlamente
node -v o node --version
```

#### [MongoDB](#mongodb)

MongoDB es una base de datos distribuida, basada en documentos y de uso general que ha sido diseñada para desarrolladores de aplicaciones modernas y para la era de la nube. Ninguna otra ofrece un nivel de productividad de uso tan alto.

> [Manual de instalación](https://docs.mongodb.com/manual/installation/)

#### [VueJS](#vuejs)

Vue es un marco progresivo para construir interfaces de usuario. A diferencia de otros marcos monolíticos, Vue está diseñado desde cero para ser gradualmente adoptable. La biblioteca principal se centra solo en la capa de vista y es fácil de recoger e integrar con otras bibliotecas o proyectos existentes.

Para instalar **VueJS** es necesario hacerlo mendiante uno de los instaladores de paquetes ya se **Npm** o **Yarn** de la siguiente manera:

```bash
# latest stable
$ npm install global vue o npm i -g vue
$ yarn global add vue
```

#### Vue CLI

Vue proporciona una CLI oficial para el andamiaje rápido de aplicaciones ambiciosas de una sola página. Proporciona configuraciones de compilación incluidas en las baterías para un flujo de trabajo frontend moderno. Solo toma unos minutos comenzar a funcionar con las versiones de recarga en caliente, sin pelusa y listas para producción.

La CLI `( @vue/cli)` es un paquete npm instalado globalmente y proporciona el vuecomando en su terminal. Proporciona la capacidad de andamiar rápidamente un nuevo proyecto a través de `vue create`, o crear prototipos de nuevas ideas al instante `vue serve`. También puede administrar sus proyectos utilizando una interfaz gráfica de usuario a través de `vue ui`.

> Requisito de versión de node.js
> Vue CLI requiere [Node.js](https://nodejs.org/es/) versión 8.9 o superior (se recomienda 8.11.0+).

Para instalar el nuevo paquete, use uno de los siguientes comandos. Necesita privilegios de administrador para ejecutarlos a menos que se haya instalado npm en su sistema a través de un administrador de versiones de Node.js

```bash
npm install -g @vue/cli
O
yarn global add @vue/cli
```

Después de la instalación, tendrá acceso al vuebinario en su línea de comando. Puede verificar que esté instalado correctamente simplemente ejecutando vue, lo que debería presentarle un mensaje de ayuda con una lista de todos los comandos disponibles.

Puede verificar que tiene la versión correcta con este comando:

```bash
vue --version
```

> La CLI supone un conocimiento previo de Node.js y las herramientas de compilación asociadas. Si es nuevo en Vue o en las herramientas de compilación front-end, le recomendamos encarecidamente que consulte la **[guía](https://vuejs.org/v2/guide/)** sin ninguna herramienta de compilación antes de usar la CLI.

El frontend del proyecto esta basado en NuxtJS el cual es un marco progresivo basado en VueJS

#### NuxtJS

Nuxt es un marco diseñado para darle una arquitectura sólida siguiendo las pautas oficiales de Vue. Adoptable de forma incremental, se puede utilizar para crear todo, desde páginas de destino estáticas hasta complejas aplicaciones web listas para la empresa.
**[Nuxt.js docs.](https://nuxtjs.org/guide)**

**[⬆ Ir arriba](#tabla-de-contenido)**

#### [Comandos para ejecutar el proyecto](#comandos-para-ejecutar-el-proyecto)

Instalar dependencias del proyecto:

```bash
$ npm install ó $ npm -i
```

```bash
$ yarn install ó $ yarn i
```

Comandos para ejecutar el proyecto:

```bash
# servidor local con hot reload en localhost:3000
$ yarn dev

# Compilar para producción y lanzar proyecto compilado para producción en local
$ yarn build
$ yarn start

# Generar arvhicos estaticos
$ yarn generate
```

**[⬆ Ir arriba](#tabla-de-contenido)**

#### Demo del proyecto

[Control Unity | Sistema de gestión de implementos y/o aulas educativas](https://controlunity.netlify.app/ "Ir a control unity")

#### Usuarios de GitHub

**[Stiwar9816](https://github.com/Stiwar9816)**
**[JhonE17](https://github.com/JhonE17)**
