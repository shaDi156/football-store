import Navbar from './components/Navbar.jsx'
import Products from './components/Products.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Products />
      </main>
    </>
  )
}
