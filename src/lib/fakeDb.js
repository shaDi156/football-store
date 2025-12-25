const STORAGE_KEY = 'football-jersey-db'

const baseShape = {
  orders: {}, // { [tableKey]: Order[] }
  users: {
    signups: [],
    logins: [],
  },
}

const sanitize = (value = '') => value.toString().trim()
const slug = (value = '') => sanitize(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const tableKeyForProduct = (title) => `orders:${slug(title) || 'product'}`

const load = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...baseShape }
    const parsed = JSON.parse(raw)
    return {
      orders: parsed.orders || {},
      users: parsed.users || { ...baseShape.users },
    }
  } catch (err) {
    console.error('Failed to read local db', err)
    return { ...baseShape }
  }
}

const persist = (data) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (err) {
    console.error('Failed to persist local db', err)
  }
}

const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

export const getOrdersForProduct = (title) => {
  const db = load()
  const key = tableKeyForProduct(title)
  return db.orders[key] || []
}

export const saveOrderForProduct = (title, order) => {
  const db = load()
  const key = tableKeyForProduct(title)
  const safeTitle = sanitize(title) || 'Untitled Product'
  const entry = {
    ...order,
    tableName: safeTitle,
    id: uid(),
    createdAt: new Date().toISOString(),
  }

  db.orders[key] = [...(db.orders[key] || []), entry]
  persist(db)
  return db.orders[key]
}

export const recordSignup = (user) => {
  const db = load()
  db.users.signups = [...db.users.signups, { ...user, id: uid(), createdAt: new Date().toISOString() }]
  persist(db)
  return db.users.signups
}

export const recordLogin = (user) => {
  const db = load()
  db.users.logins = [...db.users.logins, { ...user, id: uid(), createdAt: new Date().toISOString() }]
  persist(db)
  return db.users.logins
}

