<template>
  <div class="dashboard-container">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="logo">Microempresario</h2>

      <ul>
        <li @click="changeSection('perfil')">
          <i class="fas fa-user"></i> Mi Perfil
        </li>

        <li @click="changeSection('productos')">
          <i class="fas fa-box"></i> Productos
        </li>

        <li @click="changeSection('ventas')">
          <i class="fas fa-shopping-cart"></i> Ventas
        </li>

        <li @click="changeSection('vendedores')">
          <i class="fas fa-users"></i> Vendedores
        </li>

        <li @click="handleLogout()">
          <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
        </li>
      </ul>
    </aside>

    <!-- CONTENIDO -->
    <main class="content">

      <!-- PERFIL -->
      <section v-if="currentSection === 'perfil'">
        <h2>Mi Perfil</h2>
        <p><strong>Empresa:</strong> {{ empresa.nombre }}</p>
        <p><strong>Plan actual:</strong> {{ empresa.plan }}</p>
        <p><strong>Estado:</strong> {{ empresa.estado }}</p>

        <button class="btn-primary">
          <i class="fas fa-credit-card"></i> Renovar / Cambiar Plan
        </button>
      </section>

      <!-- PRODUCTOS -->
      <section v-if="currentSection === 'productos'">
        <div class="header-productos">
          <h2>Mis Productos</h2>

          <div class="acciones">
            <select v-model="filtroEstado">
              <option value="todos">Todos</option>
              <option value="activos">Habilitados</option>
              <option value="inactivos">Deshabilitados</option>
            </select>

            <button class="btn-primary" @click="mostrarModal = true">
              <i class="fas fa-plus"></i> Añadir Producto
            </button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio Unitario</th>
              <th>Stock</th>
              <th>Unidades</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="productosFiltrados.length === 0">
              <td colspan="6" class="tabla-vacia">
                No hay productos registrados
              </td>
            </tr>

            <tr v-for="p in productosFiltrados" :key="p.id">
              <td>{{ p.nombre_producto }}</td>
              <td>{{ p.precio_unitario }} Bs</td>
              <td>{{ p.stock }}</td>
              <td>{{ p.unidades }}</td>
              <td>
                <span :class="p.activo ? 'activo' : 'inactivo'">
                  {{ p.activo ? 'Habilitado' : 'Deshabilitado' }}
                </span>
              </td>
              <td class="acciones-tabla">
                <button @click="toggleProducto(p)">
                  <i class="fas fa-power-off"></i>
                </button>
                <button @click="deleteProducto(p.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- MODAL PRODUCTOS -->
      <div v-if="mostrarModal" class="modal-overlay">
        <div class="modal">
          <h3>Nuevo Producto</h3>

          <form @submit.prevent="addProduct" class="form-modern">

  <div class="form-group">
    <label>Nombre del producto</label>
    <input
      v-model="newProduct.nombre_producto"
      type="text"
      required
    />
  </div>

  <div class="form-row">
    <div class="form-group">
      <label>Precio unitario (Bs)</label>
      <input
        type="number"
        v-model="newProduct.precio_unitario"
        required
        min="0"
      />
    </div>
    
    <div class="form-group">
      <label>Stock</label>
      <input
        type="number"
        v-model="newProduct.stock"
        required
        min="0"
      />
    </div>
  </div>

  <div class="form-group">
    <label>Unidades</label>
    <input
      v-model="newProduct.unidades"
      placeholder="Ej: kg, unidades, cajas"
      required
    />
  </div>

  <div class="form-group">
    <label>Descripción</label>
    <textarea
      v-model="newProduct.descripcion"
      rows="3"
    ></textarea>
  </div>

  <div class="modal-actions">
    <button type="button" class="btn-cancelar" @click="cerrarModal">
      Cancelar
    </button>
    <button type="submit" class="btn-primary">
      Añadir Producto
    </button>
  </div>

</form>

        </div>
      </div>

      <!-- VENTAS -->
      <section v-if="currentSection === 'ventas'">
        <h2>Historial de Ventas</h2>
      </section>

      <!-- VENDEDORES -->
      <section v-if="currentSection === 'vendedores'">
        <h2>Gestión de Vendedores</h2>
      </section>

    </main>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      currentSection: 'perfil',
      mostrarModal: false,
      filtroEstado: 'todos',

      empresa: {
        nombre: '',
        plan: '',
        estado: ''
      },

      productos: [],

      newProduct: {
        nombre_producto: '',
        precio_unitario: '',
        stock: '',
        unidades: '',
        descripcion: ''
      }
    };
  },

  computed: {
    productosFiltrados() {
      if (this.filtroEstado === 'activos') {
        return this.productos.filter(p => p.activo);
      }
      if (this.filtroEstado === 'inactivos') {
        return this.productos.filter(p => !p.activo);
      }
      return this.productos;
    }
  },

  methods: {
    changeSection(section) {
      this.currentSection = section;
    },

    addProduct() {
      this.productos.push({
        id: Date.now(),
        ...this.newProduct,
        activo: true
      });
      this.cerrarModal();
    },

    cerrarModal() {
      this.mostrarModal = false;
      this.newProduct = {
        nombre_producto: '',
        precio_unitario: '',
        stock: '',
        unidades: '',
        descripcion: ''
      };
    },

    toggleProducto(producto) {
      producto.activo = !producto.activo;
    },

    deleteProducto(id) {
      this.productos = this.productos.filter(p => p.id !== id);
    },

    async handleLogout() {
      console.log(localStorage.getItem('auth-token'));
      try {
        await axios.post('http://localhost:8000/api/auth/logout', {}, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
          }
        });
        // Eliminar el token de autenticación del almacenamiento local
        localStorage.removeItem('auth-token');
        localStorage.removeItem('nombre_completo');

        // Redirigir al usuario a la página de inicio de sesión
        this.$router.push('/login');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background: #1f3a64;
  color: white;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 20px;
}

.header-productos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.acciones {
  display: flex;
  gap: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
}

.tabla-vacia {
  text-align: center;
  color: #777;
}

.activo {
  color: green;
}

.inactivo {
  color: red;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.btn-primary {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

.btn-cancelar {
  background: #ccc;
  border: none;
  padding: 8px 12px;
}
.form-modern {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
}


.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  margin-bottom: 4px;
  color: #555;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #999;
}

.input-icon input {
  padding-left: 32px;
}


</style>
