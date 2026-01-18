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
                    <li @click="changeSection('companies')">Mis Microempresas</li>
                    <li @click="changeSection('products')">Mis Clientes</li>
                    <li @click="changeSection('planes')">Mis Planes</li>
                    <li @click="changeSection('reports')">Reportes</li>
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
                        <tr v-for="company in companies" :key="company.nit">
                            <td>{{ company.nombre_microempresa }}</td>
                            <td
                                :class="{ 'active': company.estado === 'activa', 'inactive': company.estado !== 'activa' }">
                                <i
                                    :class="company.estado === 'activa' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                            </td>
                            <td>{{ company.plan.nombre_plan }}</td>
                            <td>
                                <button @click="confirmEditCompanyStatus(company)" class="btn-action">
                                    <i class="fas fa-sync-alt"></i> Editar Estado
                                </button>
                                <button @click="viewCompanyDetails(company)" class="btn-action">
                                    <i class="fas fa-eye"></i> Ver Más
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section v-if="currentSection === 'planes'" class="section-plans">
                <h2>Planes Disponibles</h2>

                <button @click="openAddPlanModal" class="btn-action">
                    <i class="fas fa-plus"></i> Añadir Plan
                </button>


                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="plan in plans" :key="plan.id">
                            <td>{{ plan.name }}</td>
                            <td>{{ plan.description }}</td>
                            <td>\${{ plan.price }}</td>
                            <td :class="{ 'active': plan.status === 'active', 'inactive': plan.status !== 'active' }">
                                <i
                                    :class="plan.status === 'active' ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
                            </td>
                            <td>
                                <button @click="editPlan(plan)" class="btn-action">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <!-- Modal de confirmación -->
            <div v-if="showConfirmationModal" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <h3>Confirmación</h3>
                    <p>¿Está seguro de {{ confirmationAction }} esta microempresa?</p>
                    <button @click="editCompanyStatus" class="btn-action">Sí, {{ confirmationAction }}</button>
                    <button @click="closeModal" class="btn-action">Cancelar</button>
                </div>
            </div>

            <div v-if="showEditModal" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <h3>Editar Plan</h3>
                    <div>
                        <label for="planName">Nombre</label>
                        <input v-model="selectedPlan.name" id="planName" type="text" />
                    </div>
                    <div>
                        <label for="planDescription">Descripción</label>
                        <input v-model="selectedPlan.description" id="planDescription" type="text" />
                    </div>
                    <div>
                        <label for="planPrice">Precio</label>
                        <input v-model="selectedPlan.price" id="planPrice" type="text" />
                    </div>
                    <div>
                        <label for="planStatus">Estado</label>
                        <select v-model="selectedPlan.status" id="planStatus">
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                    </div>
                    <button @click="savePlan" class="btn-action">Guardar cambios</button>
                    <button @click="closeModal" class="btn-action">Cancelar</button>
                </div>
            </div>

            <div v-if="showAddPlanModal" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <h3>Añadir Nuevo Plan</h3>
                    <div>
                        <label for="newPlanName">Nombre</label>
                        <input v-model="newPlan.name" id="newPlanName" type="text" />
                    </div>
                    <div>
                        <label for="newPlanDescription">Descripción</label>
                        <input v-model="newPlan.description" id="newPlanDescription" type="text" />
                    </div>
                    <div>
                        <label for="newPlanPrice">Precio</label>
                        <input v-model="newPlan.price" id="newPlanPrice" type="text" />
                    </div>
                    <div>
                        <label for="newPlanStatus">Estado</label>
                        <select v-model="newPlan.status" id="newPlanStatus">
                            <option value="active">Activo</option>
                            <option value="inactive">Inactivo</option>
                        </select>
                    </div>
                    <button @click="addPlan" class="btn-action">Añadir Plan</button>
                    <button @click="closeModal" class="btn-action">Cancelar</button>
                </div>
            </div>

            <!-- Modal para detalles de la microempresa -->
            <div v-if="showDetailsModal" class="modal-overlay" @click="closeModal">
                <div class="modal-content" @click.stop>
                    <h3>Detalles de la Microempresa</h3>
                    <p><strong>Nombre:</strong> {{ selectedCompany.nombre_microempresa }}</p>
                    <p><strong>Correo:</strong> {{ selectedCompany.usuario.email }}</p>
                    <p><strong>Plan:</strong> {{ selectedCompany.plan.nombre_plan }}</p>
                    <p><strong>Descripción del Plan:</strong> {{ selectedCompany.plan.descripcion }}</p>
                    <p><strong>Dirección:</strong> {{ selectedCompany.direccion }}</p>
                    <p><strong>Teléfono:</strong> {{ selectedCompany.telefono }}</p>
                    <p><strong>NIT:</strong> {{ selectedCompany.nit }}</p>
                    <p><strong>Horario de Atención:</strong> {{ selectedCompany.horario_atencion }}</p>
                    <button @click="closeModal" class="btn-action">Cerrar</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            currentSection: 'companies',
            companies: [],
            plans: [],
            selectedPlan: {},  // Almacena el plan seleccionado para editar
            newPlan: {
                name: '',
                description: '',
                price: '',
                status: 'active'
            },
            showEditModal: false,  // Controla la visibilidad del modal de edición de plan
            showAddPlanModal: false,
            showDetailsModal: false,
            selectedCompany: {},
        };
    },
    mounted() {
        this.getAllMicroempresas();
        this.getAllPlans();
    },
    methods: {
        changeSection(section) {
            this.currentSection = section;
            if (section === 'planes') {
                this.getAllPlans();
            }
        },
        async getAllPlans() {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/getAllPlans', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                    }
                });
                this.plans = response.data;  // Almacenar los planes obtenidos
            } catch (error) {
                console.error('Error al obtener los planes:', error);
            }
        },
        async getAllMicroempresas() {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/adminMicroempresas', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                    }
                });
                this.companies = response.data.microempresas;
            } catch (error) {
                console.error('Error al obtener las microempresas:', error);
            }
        },
        editPlan(plan) {
            this.selectedPlan = { ...plan };  // Crear una copia del plan seleccionado
            this.showEditModal = true;  // Mostrar el modal de edición
        },
        async savePlan() {
            try {
                const response = await axios.put(`http://localhost:8000/api/auth/updatePlan/${this.selectedPlan.id}`, this.selectedPlan, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                    }
                });
                const index = this.plans.findIndex(plan => plan.id === this.selectedPlan.id);
                if (index !== -1) {
                    this.plans[index] = response.data;  // Actualizar el plan en la lista local
                }
                this.showEditModal = false;  // Cerrar el modal
                this.$toast.success('Plan actualizado correctamente');  // Mostrar Toast de éxito
            } catch (error) {
                console.error('Error al guardar el plan:', error);
                this.$toast.error('Hubo un error al actualizar el plan');  // Mostrar Toast de error
            }
        },
        closeModal() {
            this.showEditModal = false;
            this.showDetailsModal = false;
        },
        viewCompanyDetails(company) {
            this.selectedCompany = company;
            this.showDetailsModal = true;
        },
        handleLogout() {
            try {
                axios.post('http://localhost:8000/api/auth/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
                    }
                }).then(() => {
                    localStorage.removeItem('auth-token');
                    localStorage.removeItem('nombre_completo');
                    this.$router.push('/login');
                }).catch(error => {
                    console.error('Error al cerrar sesión:', error);
                    this.$toast.error('Hubo un error al cerrar la sesión');
                });
            } catch (error) {
                console.error('Error al cerrar sesión:', error);
                this.$toast.error('Hubo un error al cerrar la sesión');
            }
        }
    }
};


</script>

<style scoped lang="scss">
.admin-dashboard-container {
    display: flex;
    height: 100vh;

    .sidebar {
        width: 250px;
        background-color: #2c3e50;
        color: white;
        padding: 20px;
        font-size: 16px;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

        .sidebar-header {
            display: flex;
            align-items: center;
            margin-bottom: 40px;
            padding: 10px;

            .sidebar-title {
                margin-left: 10px;
                font-weight: bold;
                font-size: 22px;
                text-transform: uppercase;
                letter-spacing: 1px;
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
                padding: 10px 0;
                font-size: 18px;
                cursor: pointer;
                border-bottom: 1px solid #34495e;
                transition: background-color 0.3s ease;

                &:hover {
                    color: #3498db;
                    background-color: #34495e;
                    border-radius: 5px;
                }
            }
        }
    }

    .main-content {
        flex-grow: 1;
        padding: 30px;
        background-color: #ecf0f1;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 10px;

        h1 {
            font-size: 36px;
            color: #2c3e50;
            margin-bottom: 20px;
            font-weight: 600;
        }

        .section-companies,
        .section-plans {
            h2 {
                font-size: 28px;
                margin-bottom: 20px;
                color: #2c3e50;
                font-weight: 600;
            }

            table {
                width: 100%;
                border-collapse: collapse;
                background-color: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

                th,
                td {
                    padding: 15px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                    color: #2c3e50;
                    font-size: 16px;
                }

                th {
                    background-color: #3498db;
                    color: white;
                    font-weight: 600;
                }

                .active {
                    color: #2ecc71;
                }

                .inactive {
                    color: #e74c3c;
                }

                tr:hover {
                    background-color: #f1f1f1;
                    cursor: pointer;
                }
            }
        }

        .btn-action {
            background-color: #3498db;
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease, transform 0.2s ease;

            &:hover {
                background-color: #2980b9;
                transform: translateY(-2px);
            }

            &:active {
                background-color: #2980b9;
                transform: translateY(2px);
            }

            i {
                margin-right: 8px;
            }
        }
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        background-color: #fff;
        padding: 30px;
        border-radius: 12px;
        width: 500px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        text-align: left;
        font-size: 16px;
        animation: slideIn 0.4s ease-out;

        h3 {
            color: #3498db;
            font-size: 24px;
            margin-bottom: 15px;
            font-weight: 600;
        }

        p {
            margin-bottom: 10px;
        }

        input,
        select {
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 8px;
            border: 1px solid #ddd;
        }

        button {
            background-color: #3498db;
            color: white;
            padding: 12px 0;
            width: 100%;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.3s ease;

            &:hover {
                background-color: #2980b9;
            }
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes slideIn {
        0% {
            transform: translateY(-20px);
            opacity: 0;
        }

        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
}
</style>
