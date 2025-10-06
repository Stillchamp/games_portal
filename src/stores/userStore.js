import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const initialUsers = [
  {
    name: 'Aladejobi Suliat Bisole',
    email: 'aladejobi@gmail.com',
    type: 'Program Team',
    status: 'Active',
  },
  {
    name: 'Badeyori Ajoke Esther',
    email: 'badejoke@yahoo.com',
    type: 'Stakeholder',
    status: 'Active',
  },
  {
    name: 'Danladi Okafor',
    email: 'danladi.okafor@example.com',
    type: 'Program Team',
    status: 'Active',
  },
  {
    name: 'Ifunanya Nwosu',
    email: 'ifunanya.nwosu@example.com',
    type: 'Stakeholder',
    status: 'Inactive',
  },
]

export const useUserStore = defineStore('userStore', () => {
  const users = ref([...initialUsers])

  const totalUsers = computed(() => users.value.length)
  const activeUsers = computed(() => users.value.filter((user) => user.status === 'Active').length)
  const inactiveUsers = computed(
    () => users.value.filter((user) => user.status === 'Inactive').length,
  )

  function addUser({ firstName, lastName, email, role, status }) {
    const trimmedFirstName = firstName?.trim() ?? ''
    const trimmedLastName = lastName?.trim() ?? ''
    const fullName = [trimmedFirstName, trimmedLastName].filter(Boolean).join(' ')

    users.value.unshift({
      name: fullName || email,
      email,
      type: role,
      status,
    })
  }

  return {
    users,
    totalUsers,
    activeUsers,
    inactiveUsers,
    addUser,
  }
})
