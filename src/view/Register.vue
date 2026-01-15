<template>
  <div class="register-container">
    <div class="register-box">
      <!-- Título -->
      <h2>Crear Cuenta</h2>
      <form @submit.prevent="handleRegister">
        <!-- Usuario -->
        <div class="input-group">
          <i class="fas fa-user icon"></i> <!-- Ícono de usuario -->
          <input v-model="username" type="text" id="username" placeholder="Usuario" required />
        </div>

        <!-- Correo electrónico -->
        <div class="input-group">
          <i class="fas fa-envelope icon"></i> <!-- Ícono de correo electrónico -->
          <input v-model="email" type="email" id="email" placeholder="Correo Electrónico" required />
        </div>

        <!-- Nombre -->
        <div class="input-group">
          <i class="fas fa-user-circle icon"></i> <!-- Ícono de nombre -->
          <input v-model="firstName" type="text" id="firstName" placeholder="Nombre" required />
        </div>

        <!-- Apellido -->
        <div class="input-group">
          <i class="fas fa-user-circle icon"></i> <!-- Ícono de apellido -->
          <input v-model="lastName" type="text" id="lastName" placeholder="Apellido" required />
        </div>

        <!-- Contraseña -->
        <div class="input-group password-field">
          <i class="fas fa-lock icon"></i> <!-- Ícono de candado -->
          <input v-model="password" :type="passwordVisible ? 'text' : 'password'" id="password" placeholder="Contraseña" required />
          <span @click="togglePassword" class="eye-icon">
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>

        <!-- Confirmar Contraseña -->
        <div class="input-group password-field">
          <i class="fas fa-lock icon"></i> <!-- Ícono de candado -->
          <input v-model="confirmPassword" :type="confirmPasswordVisible ? 'text' : 'password'" id="confirmPassword" placeholder="Confirmar Contraseña" required />
          <span @click="toggleConfirmPassword" class="eye-icon">
            <i :class="confirmPasswordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>

        <button type="submit" class="btn-register">Registrarse</button>
      </form>

      <!-- Enlace a Login -->
      <div class="login-link">
        <router-link to="/login">¿Ya tienes una cuenta? Inicia sesión</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      passwordVisible: false,
      confirmPasswordVisible: false
    };
  },
  methods: {
    handleRegister() {
      console.log('Usuario:', this.username);
      console.log('Correo:', this.email);
      console.log('Nombre:', this.firstName);
      console.log('Apellido:', this.lastName);
      console.log('Contraseña:', this.password);
      console.log('Confirmar Contraseña:', this.confirmPassword);
    },
    togglePassword() {
      this.passwordVisible = !this.passwordVisible;
    },
    toggleConfirmPassword() {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }
};
</script>

<style scoped lang="scss">
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;

  .register-box {
    background: #fff;
    padding: 30px;
    border-radius: 12px; /* Bordes redondeados */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    width: 400px;
    text-align: center;

    h2 {
      font-size: 26px;
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
        border-radius: 8px; /* Bordes redondeados */
        font-size: 14px;
        box-sizing: border-box;
      }
    }

    /* Contraseña y Confirmar Contraseña */
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

    .btn-register {
      width: 100%;
      padding: 14px;
      background-color: #1f3a64; /* Azul marino */
      color: white;
      border: none;
      border-radius: 8px; /* Bordes redondeados */
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;

      &:hover {
        background-color: #142a48; /* Azul más oscuro al pasar el mouse */
      }
    }

    /* Enlace de Login */
    .login-link {
      margin-top: 20px;
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
