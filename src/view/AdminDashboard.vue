<template>
    <div class="admin-dashboard-container">
        <!-- Barra lateral -->
        <aside class="sidebar">
            <div class="sidebar-header">
                <i class="fas fa-cogs"></i>
                <span class="sidebar-title">PANEL DE ADMINISTRACIÓN</span>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li @click="changeSection('users')">Usuarios</li>
                    <li @click="changeSection('companies')">Microempresas</li>
                    <li @click="changeSection('products')">Productos</li>
                    <li @click="changeSection('reports')">Reportes</li>
                    <li @click="changeSection('inventory')">Inventario</li>
                    <li @click="handleLogout()">Cerrar Sesión</li>
                </ul>
            </nav>
        </aside>

        <!-- Contenido principal -->
        <main class="main-content">
            <header class="main-header">
                <h1>BIENVENIDO, ADMINISTRADOR</h1>
                <p>Gestiona el sistema de manera eficiente desde aquí</p>
            </header>

            <!-- Sección de usuarios -->
            <section v-if="currentSection === 'users'" class="section-users">
                <h2>Gestión de Usuarios</h2>

                <!-- Botón para registrar vendedor -->
                <button @click="showRegisterForm = true" class="btn-register">
                    <i class="fas fa-user-plus"></i> Registrar Vendedor
                </button>

                <!-- Ventana Modal para Registrar Vendedor -->
                <div v-if="showRegisterForm" class="form-modal">
                    <div class="form-register">
                        <h3>Registrar Vendedor</h3>
                        <div class="form-field">
                            <i class="fas fa-user"></i>
                            <input v-model="newUser.username" placeholder="Usuario" />
                        </div>
                        <div class="form-field">
                            <i class="fas fa-envelope"></i>
                            <input v-model="newUser.email" type="email" placeholder="Correo electrónico" />
                        </div>
                        <div class="form-field">
                            <i class="fas fa-key"></i>
                            <input v-model="newUser.password" type="password" placeholder="Contraseña" />
                        </div>
                        <div class="form-field">
                            <i class="fas fa-id-badge"></i>
                            <select v-model="newUser.role">
                                <option value="vendedor">Vendedor</option>
                                <option value="admin">Administrador</option>

                            </select>
                        </div>
                        <button @click="registerUser" class="btn-submit">Registrar</button>
                        <button @click="showRegisterForm = false" class="btn-cancel">Cancelar</button>
                    </div>
                </div>


                <div class="users-list">
                    <input v-model="filterText" placeholder="Filtrar usuarios habilitados" class="search-input" />
                    <table>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in filteredUsers" :key="user.id">
                                <td>{{ user.username }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.role }}</td>
                                <td :class="{ 'active': user.active, 'inactive': !user.active }">
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
                </div>
            </section>

            <!-- Sección de microempresas -->
            <section v-if="currentSection === 'companies'" class="section-companies">
                <h2>Microempresas Registradas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre de la Empresa</th>
                            <th>Estado</th>
                            <th>Plan</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="company in companies" :key="company.id">
                            <td>{{ company.name }}</td>
                            <td :class="{ 'active': company.active, 'inactive': !company.active }">
                                <i :class="company.active ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                            </td>
                            <td>{{ company.plan }}</td>
                            <td>
                                <button @click="toggleCompanyStatus(company)" class="btn-action">
                                    <i class="fas fa-sync-alt"></i> Habilitar/Deshabilitar
                                </button>
                                <button @click="viewCompanyDetails(company)" class="btn-action">
                                    <i class="fas fa-eye"></i> Ver detalles
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <!-- Secciones de productos, reportes e inventario sin cambios -->
        </main>
    </div>
</template>

<script>

import axios from 'axios';
export default {
    data() {
        return {
            currentSection: 'users', // Controla qué sección se muestra
            showRegisterForm: false,
            newUser: {
                username: '',
                email: '',
                password: '',
                role: 'vendedor',  // Rol por defecto
            },
            filterText: '',
            users: [
                { id: 1, username: 'user1', email: 'user1@example.com', role: 'admin', active: true },
                { id: 2, username: 'user2', email: 'user2@example.com', role: 'vendedor', active: false },
            ],
            companies: [
                { id: 1, name: 'Empresa 1', plan: 'Básico', active: true },
                { id: 2, name: 'Empresa 2', plan: 'Premium', active: false },
            ],
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user =>
                user.username.toLowerCase().includes(this.filterText.toLowerCase()) && user.active
            );
        }
    },
    methods: {
        changeSection(section) {
            this.currentSection = section;
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
        registerUser() {
            const newUser = { ...this.newUser, id: this.users.length + 1, active: true };
            this.users.push(newUser);
            this.newUser = { username: '', email: '', password: '', role: 'vendedor' };
            this.showRegisterForm = false;
        },
        toggleCompanyStatus(company) {
            company.active = !company.active;
        },
        viewCompanyDetails(company) {
            alert(`Detalles de ${company.name}`);
        },

        async handleLogout() {
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

<style scoped lang="scss">
/* Estilo general */
.admin-dashboard-container {
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

        .section-users,
        .section-companies {
            margin-bottom: 40px;

            h2 {
                font-size: 28px;
                margin-bottom: 20px;
            }

            .form-register {
                margin-top: 20px;

                .form-field {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;

                    i {
                        margin-right: 10px;
                        font-size: 20px;
                    }

                    input,
                    select {
                        padding: 10px;
                        border-radius: 8px;
                        width: 100%;
                        border: 1px solid #ddd;
                    }
                }

                button {
                    background-color: #3498db;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    margin-top: 10px;
                }

                .btn-cancel {
                    background-color: #e0e0e0;
                    margin-left: 10px;
                }
            }

            .users-list table {
                width: 100%;
                border-collapse: collapse;

                th,
                td {
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

        .section-companies {
            h2 {
                font-size: 24px;
                margin-bottom: 20px;
            }

            table {
                width: 100%;
                border-collapse: collapse;

                th,
                td {
                    padding: 10px;
                    text-align: left;
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

        .btn-action {
            background-color: #3498db;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            border: none;
            cursor: pointer;

            &:hover {
                background-color: #2980b9;
            }
        }
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

            input,
            select {
                width: 100%;
                margin-bottom: 10px;
                padding: 10px;
                border-radius: 8px;
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
}
</style>
