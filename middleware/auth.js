export default function ({ store, error }) {
    if (!store.state.authUser) {
      error({
        message: 'No tienes permisos suficientes para acceder, revisa tus credenciales',
        statusCode: 403
      })
    }
  }
  