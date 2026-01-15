<template>
  <div class="microempresa-dashboard-container">
    <!-- Barra lateral -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <i class="fas fa-cogs"></i>
        <span class="sidebar-title">DASHBOARD DE MICROEMPRESA</span>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li @click="changeSection('products')">Productos</li>
          <li @click="changeSection('inventory')">Inventario</li>
          <li @click="changeSection('reports')">Reportes</li>
          <li @click="changeSection('company')">Microempresa</li>
          <li @click="changeSection('users')">Vendedores</li>
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <main class="main-content">
      <header class="main-header">
        <h1>BIENVENIDO, SUPERUSUARIO</h1>
        <p>Gestiona tu microempresa de manera eficiente desde aquí</p>
      </header>

      <!-- Sección de Productos -->
      <section v-if="currentSection === 'products'" class="section-products">
        <h2>Gestión de Productos</h2>
        <button @click="showProductForm = true" class="btn-register">
          <i class="fas fa-plus"></i> Agregar Producto
        </button>

        <!-- Formulario de agregar producto -->
        <div v-if="showProductForm" class="form-modal">
          <div class="form-register">
            <h3>Agregar Producto</h3>
            <div class="form-field">
              <i class="fas fa-box"></i>
              <input v-model="newProduct.name" placeholder="Nombre del Producto" />
            </div>
            <div class="form-field">
              <i class="fas fa-tag"></i>
              <input v-model="newProduct.price" type="number" placeholder="Precio" />
            </div>
            <div class="form-field">
              <i class="fas fa-cogs"></i>
              <input v-model="newProduct.stock" type="number" placeholder="Stock Inicial" />
            </div>
            <button @click="addProduct" class="btn-submit">Agregar</button>
            <button @click="showProductForm = false" class="btn-cancel">Cancelar</button>
          </div>
        </div>

        <!-- Lista de productos -->
        <div class="products-list">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>${{ product.price }}</td>
                <td>{{ product.stock }}</td>
                <td>
                  <button @click="editProduct(product)" class="btn-action">
                    <i class="fas fa-edit"></i> Editar
                  </button>
                  <button @click="deleteProduct(product)" class="btn-action">
                    <i class="fas fa-trash-alt"></i> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Sección de Inventario -->
      <section v-if="currentSection === 'inventory'" class="section-inventory">
        <h2>Gestión de Inventario</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock Actual</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.stock }}</td>
              <td>
                <button @click="updateStock(product)" class="btn-action">
                  <i class="fas fa-sync-alt"></i> Actualizar Stock
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Sección de Reportes -->
      <section v-if="currentSection === 'reports'" class="section-reports">
        <h2>Reportes</h2>
        <button @click="viewReports" class="btn-action">
          <i class="fas fa-chart-line"></i> Ver Reportes
        </button>
        <p>Genera reportes detallados de ventas, productos, etc.</p>
      </section>

      <!-- Sección de Microempresa -->
      <section v-if="currentSection === 'company'" class="section-company">
        <h2>Información de Microempresa</h2>
        <p>Nombre: {{ company.name }}</p>
        <p>Plan: {{ company.plan }}</p>
        <p>Estado: <span :class="company.active ? 'active' : 'inactive'">{{ company.active ? 'Habilitada' : 'Deshabilitada' }}</span></p>
        <button @click="toggleCompanyStatus" class="btn-action">
          <i class="fas fa-sync-alt"></i> Habilitar/Deshabilitar
        </button>
      </section>

      <!-- Sección de Vendedores -->
      <section v-if="currentSection === 'users'" class="section-users">
        <h2>Vendedores Registrados</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td :class="{'active': user.active, 'inactive': !user.active}">
                <i :class="user.active ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              </td>
              <td>
                <button @click="toggleUserStatus(user)" class="btn-action">
                  <i class="fas fa-sync-alt"></i> Cambiar Estado
                </button>
                <button @click="deleteUser(user)" class="btn-action">
                  <i class="fas fa-trash-alt"></i> Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSection: 'products', // Controla qué sección se muestra
      showProductForm: false,
      newProduct: {
        name: '',
        price: 0,
        stock: 0,
      },
      products: [
        { id: 1, name: 'Producto 1', price: 10, stock: 100 },
        { id: 2, name: 'Producto 2', price: 20, stock: 50 },
      ],
      users: [
        { id: 1, username: 'vendedor1', email: 'vendedor1@example.com', role: 'vendedor', active: true },
        { id: 2, username: 'vendedor2', email: 'vendedor2@example.com', role: 'vendedor', active: false },
      ],
      company: {
        name: 'Microempresa 1',
        plan: 'Básico',
        active: true,
      }
    };
  },
  methods: {
    changeSection(section) {
      this.currentSection = section;
    },
    addProduct() {
      const newProduct = { ...this.newProduct, id: this.products.length + 1 };
      this.products.push(newProduct);
      this.newProduct = { name: '', price: 0, stock: 0 };
      this.showProductForm = false;
    },
    updateStock(product) {
      const newStock = prompt('Ingrese nuevo stock', product.stock);
      if (newStock) {
        product.stock = Number(newStock);
      }
    },
    toggleCompanyStatus() {
      this.company.active = !this.company.active;
    },
    toggleUserStatus(user) {
      user.active = !user.active;
    },
    deleteUser(user) {
      const index = this.users.indexOf(user);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    },
    viewReports() {
      alert('Ver reportes de ventas y productos');
    }
  }
};
</script>

<style scoped lang="scss">
/* Estilo general para la vista del Dashboard del superusuario */
.microempresa-dashboard-container {
  display: flex;
  height: 100vh;

  .sidebar {
    width: 250px;
    background-color: #1f3a64;
    color: white;
    padding: 20px;
    font-size: 16px;
    .sidebar-header {
      display: flex;
      align-items: center;
      margin-bottom: 40px;
      .sidebar-title {
        margin-left: 10px;
        font-weight: bold;
        font-size: 22px;
        text-transform: uppercase;
      }
      i {
        font-size: 30px;
      }
    }

    .sidebar-nav ul {
      list-style: none;
      padding: 0;
      li {
        margin: 15px 0;
        cursor: pointer;
        &:hover {
          color: #3498db;
        }
      }
    }
  }

  .main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #fff;

    h1 {
      font-size: 36px;
      color: #333;
      margin-bottom: 20px;
    }

    .section-products, .section-inventory, .section-reports, .section-users, .section-company {
      margin-bottom: 40px;

      h2 {
        font-size: 28px;
        margin-bottom: 20px;
      }

      .form-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;

        .form-register {
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          width: 400px;
          text-align: center;

          input {
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 8px;
            width: 100%;
            border: 1px solid #ddd;
          }

          button {
            width: 100%;
            padding: 12px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
          }

          .btn-cancel {
            background-color: #e0e0e0;
            margin-top: 10px;
          }
        }
      }

      table {
        width: 100%;
        border-collapse: collapse;
        th, td {
          padding: 10px;
          border: 1px solid #ddd;
        }

        .active {
          color: green;
        }

        .inactive {
          color: red;
        }
      }
    }
  }
}
</style>

