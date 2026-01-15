<template>
  <div class="vendedor-dashboard-container">
    <!-- Barra lateral -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <i class="fas fa-cogs"></i>
        <span class="sidebar-title">DASHBOARD DE VENDEDOR</span>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li @click="changeSection('products')">Productos</li>
          <li @click="changeSection('sales')">Ventas</li>
          <li @click="changeSection('history')">Historial de Ventas</li>
          <li @click="changeSection('clients')">Clientes</li>
        </ul>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <main class="main-content">
      <header class="main-header">
        <h1>BIENVENIDO, VENDEDOR</h1>
        <p>Gestiona tus ventas y productos desde aquí</p>
      </header>

      <!-- Sección de Productos -->
      <section v-if="currentSection === 'products'" class="section-products">
        <h2>Productos Disponibles</h2>
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
                  <button @click="addToCart(product)" class="btn-action">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Sección de Ventas -->
      <section v-if="currentSection === 'sales'" class="section-sales">
        <h2>Registrar Venta</h2>
        <div class="form-sales">
          <div class="form-field">
            <i class="fas fa-cart-arrow-down"></i>
            <select v-model="selectedProduct">
              <option v-for="product in products" :key="product.id" :value="product.id">{{ product.name }}</option>
            </select>
          </div>
          <div class="form-field">
            <i class="fas fa-cash-register"></i>
            <input v-model="quantity" type="number" min="1" placeholder="Cantidad" />
          </div>
          <button @click="registerSale" class="btn-submit">Registrar Venta</button>
        </div>
      </section>

      <!-- Sección de Historial de Ventas -->
      <section v-if="currentSection === 'history'" class="section-history">
        <h2>Historial de Ventas</h2>
        <div class="sales-history">
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in salesHistory" :key="sale.id">
                <td>{{ sale.productName }}</td>
                <td>{{ sale.quantity }}</td>
                <td>${{ sale.totalPrice }}</td>
                <td>{{ sale.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Sección de Clientes -->
      <section v-if="currentSection === 'clients'" class="section-clients">
        <h2>Clientes Registrados</h2>
        <div class="clients-list">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="client in clients" :key="client.id">
                <td>{{ client.name }}</td>
                <td>{{ client.email }}</td>
                <td>{{ client.phone }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSection: 'products',  // Controla qué sección se muestra
      products: [
        { id: 1, name: 'Producto 1', price: 10, stock: 100 },
        { id: 2, name: 'Producto 2', price: 20, stock: 50 },
        { id: 3, name: 'Producto 3', price: 15, stock: 75 },
      ],
      selectedProduct: null,
      quantity: 1,
      salesHistory: [
        { id: 1, productName: 'Producto 1', quantity: 2, totalPrice: 20, date: '2023-06-15' },
        { id: 2, productName: 'Producto 2', quantity: 1, totalPrice: 20, date: '2023-06-16' },
      ],
      clients: [
        { id: 1, name: 'Cliente 1', email: 'cliente1@example.com', phone: '123-456-7890' },
        { id: 2, name: 'Cliente 2', email: 'cliente2@example.com', phone: '987-654-3210' },
      ]
    };
  },
  methods: {
    changeSection(section) {
      this.currentSection = section;
    },
    addToCart(product) {
      console.log(`Producto agregado al carrito: ${product.name}`);
      // Agregar lógica para el carrito de compras
    },
    registerSale() {
      const selectedProduct = this.products.find(product => product.id === this.selectedProduct);
      if (selectedProduct) {
        const sale = {
          id: this.salesHistory.length + 1,
          productName: selectedProduct.name,
          quantity: this.quantity,
          totalPrice: selectedProduct.price * this.quantity,
          date: new Date().toLocaleDateString(),
        };
        this.salesHistory.push(sale);
        selectedProduct.stock -= this.quantity; // Actualizar stock después de la venta
        this.quantity = 1; // Resetear cantidad
        console.log('Venta registrada:', sale);
      }
    }
  }
};
</script>

<style scoped lang="scss">
/* Estilo general para la vista del Dashboard del vendedor */
.vendedor-dashboard-container {
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

    .section-products, .section-sales, .section-history, .section-clients {
      margin-bottom: 40px;

      h2 {
        font-size: 28px;
        margin-bottom: 20px;
      }

      .form-field {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        i {
          margin-right: 10px;
          font-size: 20px;
        }
        input, select {
          padding: 10px;
          border-radius: 8px;
          width: 100%;
          border: 1px solid #ddd;
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

    .btn-submit, .btn-action {
      background-color: #3498db;
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 10px;

      &:hover {
        background-color: #2980b9;
      }
    }
  }
}
</style>
