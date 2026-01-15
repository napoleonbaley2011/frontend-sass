<template>
  <div class="login-container">
    <div class="login-box">
      <!-- Ícono de carrito de compras en lugar de imagen -->
      <div class="logo-container">
        <i class="fas fa-shopping-cart logo"></i> <!-- Ícono del carrito de compras -->
      </div>

      <!-- Título -->
      <h2>Bienvenido de Nuevo</h2>

      <!-- Formulario de login -->
      <form @submit.prevent="handleLogin">
        <!-- Usuario -->
        <div class="input-group">
          <i class="fas fa-user icon"></i> <!-- Ícono de usuario -->
          <input v-model="username" type="text" id="username" placeholder="Usuario" required />
        </div>
        
        <!-- Contraseña -->
        <div class="input-group">
          <i class="fas fa-lock icon"></i> <!-- Ícono de candado -->
          <div class="password-field">
            <input v-model="password" :type="passwordVisible ? 'text' : 'password'" id="password" placeholder="Contraseña" required />
            <span @click="togglePassword" class="eye-icon">
              <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </span>
          </div>
        </div>

        <button type="submit" class="btn-login">Iniciar sesión</button>
      </form>

      <!-- Enlaces debajo -->
      <div class="forgot-password">
        <router-link to="/forgot-password">¿Olvidaste tu contraseña?</router-link>
      </div>
      <div class="register-link">
        <router-link to="/register">¿No tienes una cuenta? Regístrate</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Enviar credenciales al backend para la autenticación
        const response = await this.$http.post('/api/login', {
          username: this.username,
          password: this.password,
        });

        // Supongamos que el backend devuelve el token y el rol
        const { token, role } = response.data;

        // Guardar token en localStorage
        localStorage.setItem('auth-token', token);

        // Redirigir al dashboard correspondiente según el rol
        if (role === 'admin') {
          this.$router.push('/admin');
        } else if (role === 'vendedor') {
          this.$router.push('/vendedor');
        } else {
          this.$router.push('/microempresa');
        }
      } catch (error) {
        console.error('Error de login:', error);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;

  .login-box {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 350px;
    text-align: center;

    /* Ícono del carrito de compras en la parte superior */
    .logo-container {
      margin-bottom: 20px;
      font-size: 50px; /* Tamaño del ícono */
      color: #1f3a64; /* Color azul marino */
    }

    h2 {
      font-size: 24px;
      color: #1f3a64; /* Azul marino */
      margin-bottom: 20px;
    }

    .input-group {
      margin: 15px 0;
      text-align: left;
      position: relative;

      .icon {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        font-size: 18px;
        color: #1f3a64; /* Icono de color azul marino */
      }

      input {
        width: 100%;
        padding: 12px 12px 12px 40px; /* Ajuste para el ícono */
        margin-top: 5px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        box-sizing: border-box;
      }
    }

    /* Campo de contraseña con el icono del ojo */
    .password-field {
      position: relative;

      .eye-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }

    .btn-login {
      width: 100%;
      padding: 14px;
      background-color: #1f3a64; /* Azul marino */
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;

      &:hover {
        background-color: #142a48; /* Azul más oscuro al pasar el mouse */
      }
    }

    /* Enlaces de "Olvidaste tu contraseña" y "Regístrate" */
    .forgot-password {
      margin-top: 15px;
      font-size: 14px;

      a {
        text-decoration: none;
        color: #1f3a64; /* Azul marino */

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .register-link {
      margin-top: 10px;
      font-size: 14px;

      a {
        text-decoration: none;
        color: #1f3a64; /* Azul marino */

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

