<template>
  <div class="forgot-password-container">
    <div class="forgot-password-box">
      <!-- Título -->
      <h2>Recuperar Contraseña</h2>
      <form @submit.prevent="handleForgotPassword">
        <!-- Correo electrónico -->
        <div class="input-group">
          <i class="fas fa-envelope icon"></i> <!-- Ícono de correo electrónico -->
          <input v-model="email" type="email" id="email" placeholder="Ingresa tu correo" required />
        </div>

        <!-- Botón de enviar -->
        <button type="submit" class="btn-submit">Enviar enlace de recuperación</button>
      </form>

      <!-- Enlace para volver al login -->
      <div class="back-link">
        <router-link to="/login">Volver al inicio de sesión</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    };
  },
  methods: {
    handleForgotPassword() {
      console.log('Correo enviado a:', this.email);
      // Aquí puedes agregar la lógica para enviar el correo de recuperación.
    }
  }
};
</script>

<style scoped lang="scss">
.forgot-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;

  .forgot-password-box {
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

    .btn-submit {
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

    .back-link {
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
