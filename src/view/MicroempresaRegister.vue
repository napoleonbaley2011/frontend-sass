<template>
  <div class="microempresa-register">
    <div class="form-container">
      <h2>Registro de Microempresa</h2>

      <form @submit.prevent="submitForm">
        <!-- Información de la empresa -->
        <div class="form-group">
          <i class="fas fa-building icon"></i>
          <input v-model="formData.companyName" type="text" id="company-name" placeholder="Nombre de la Empresa" required />
        </div>

        <div class="form-group">
          <i class="fas fa-envelope icon"></i>
          <input v-model="formData.email" type="email" id="email-contact" placeholder="Correo de Contacto" required />
        </div>

        <div class="form-group">
          <i class="fas fa-map-marker-alt icon"></i>
          <input v-model="formData.address" type="text" id="address" placeholder="Dirección de la Empresa" required />
        </div>

        <div class="form-group">
          <i class="fas fa-phone icon"></i>
          <input v-model="formData.phone" type="text" id="phone" placeholder="Teléfono de Contacto" required />
        </div>

        <!-- Selección de Plan y Mostrar Precio -->
        <div class="form-group">
          <label>Selecciona tu Plan</label> <!-- Título de los planes -->
          <select v-model="formData.plan" id="plan" required>
            <option value="basic">Básico - Bs 70/mes</option>
            <option value="premium">Premium - Bs 150/mes</option>
          </select>
        </div>

        <!-- Método de pago -->
        <div class="form-group">
          <label for="payment-method">Método de pago</label>
          <select v-model="formData.paymentMethod" id="payment-method" required>
            <option value="credit_card">Tarjeta de Crédito</option>
            <option value="qr">Pago por QR</option> <!-- Opción de pago por QR -->
          </select>
        </div>

        <!-- Generar QR si se selecciona Pago por QR -->
        <div v-if="formData.paymentMethod === 'qr'" class="form-group">
          <label>Escanea este código QR para realizar el pago:</label>
          <div class="qr-code">
            <!-- Generar un código QR utilizando una librería como 'qrcode' -->
            <img :src="qrCode" alt="Código QR" />
          </div>
        </div>

        <!-- Botón para enviar el formulario -->
        <button type="submit" class="btn-submit">Registrar Microempresa</button>
      </form>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'; // Importar la librería para generar QR

export default {
  data() {
    return {
      formData: {
        companyName: '',
        email: '',
        address: '',
        phone: '',
        plan: 'basic',  // Valor predeterminado: Plan Básico
        paymentMethod: 'credit_card',  // Valor predeterminado: Tarjeta de Crédito
      },
      qrCode: '', // Código QR generado
    };
  },
  watch: {
    // Cada vez que se seleccione "Pago por QR", genera el código QR
    'formData.paymentMethod': function (newValue) {
      if (newValue === 'qr') {
        // Generar el código QR
        this.generateQRCode();
      }
    }
  },
  methods: {
    generateQRCode() {
      const paymentDetails = `Pago por QR - ${this.formData.plan === 'basic' ? 'Básico' : 'Premium'} - Bs ${this.formData.plan === 'basic' ? 70 : 150}`;
      
      // Usamos la librería `qrcode` para generar el QR
      QRCode.toDataURL(paymentDetails)
        .then(url => {
          this.qrCode = url; // Almacenar el QR generado en la variable
        })
        .catch(err => {
          console.error('Error al generar el QR:', err);
        });
    },
    submitForm() {
      // Aquí puedes manejar el envío del formulario
      console.log('Formulario enviado:', this.formData);
      
      // Lógica para registrar la microempresa en el backend:
      // 1. Enviar datos al backend con la información de la empresa y el plan seleccionado
      // 2. Confirmar si la empresa fue registrada correctamente
      this.$router.push('/thank-you');  // Redirigir a una página de agradecimiento o a la página de inicio
    }
  }
};
</script>

<style scoped lang="scss">
.microempresa-register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;

  .form-container {
    width: 100%;
    max-width: 400px; /* Establecer un tamaño más pequeño */
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  h2 {
    font-size: 22px;
    margin-bottom: 20px;
    color: #333;
  }

  .form-group {
    margin-bottom: 1.2em;
    position: relative;
  }

  label {
    font-size: 14px;
    color: #333;
    margin-bottom: 0.5em;
    display: block;
  }

  .icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #2980b9;
  }

  input, select {
    width: 100%;
    padding: 10px 12px 10px 35px; /* Ajustado para los iconos */
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-sizing: border-box;
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #2980b9; /* Azul */
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #1f6392; /* Azul más oscuro al pasar el mouse */
  }

  /* Estilo para mostrar el QR generado */
  .qr-code {
    margin-top: 20px;
    img {
      width: 150px;
      height: 150px;
    }
  }
}
</style>
