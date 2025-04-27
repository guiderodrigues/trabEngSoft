import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#ed1f29] text-white flex items-center justify-between p-4">
        <button className="text-2xl">☰</button>
        <h1 className="text-3xl font-bold">Pizza</h1>
        <button className="w-8 h-8 text-white">
          <Link href="/perfil">
          <UserIcon/>
          </Link>
        </button>
      </header>

      {/* Conteúdo */}
      <main className="p-4 flex justify-center">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl text-zinc-950 font-bold mb-4">Cardápio</h2>

          {/* Lista de pizzas */}
          <div className="space-y-4">
              <Link href="/frango-com-catupiry" className='flex'>
            <div className="bg-white text-gray-600 font-semibold rounded-lg shadow p-4 flex">
              <img
                src="/frango.webp"
                alt="Frango com Catupiry"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold">Frango com Catupiry</h3>
                <p className="text-sm text-gray-400">
                  Ingredientes: Molho de tomate, queijo muçarela, frango desfiado temperado, Catupiry, orégano e massa tradicional.
                </p>
              </div>
            </div>
                </Link>

            <Link href="/portuguesa" className='flex'>
            <div className="bg-white text-gray-600 font-semibold rounded-lg shadow p-4 flex">
              <img
                src="/portuguesa.jpeg"
                alt="Portuguesa"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold">Portuguesa</h3>
                <p className="text-sm text-gray-400">
                  Ingredientes: Molho de tomate, queijo muçarela, presunto, ovos, cebola, azeitonas, pimentão, orégano e massa tradicional.
                </p>
              </div>
            </div>
            </Link>

            <Link href="/carne-seca-catupiry" className='flex'>
            <div className="bg-white text-gray-600 font-semibold rounded-lg shadow p-4 flex">
              <img
                src="/pizza-carne-seca.jpg"
                alt="Carne seca com Catupiry"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold">Carne seca com Catupiry</h3>
                <p className="text-sm text-gray-400">
                  Ingredientes: Molho de tomate, queijo muçarela, carne seca desfiada, Catupiry, cebola roxa, orégano e massa tradicional.
                </p>
              </div>
            </div>
            </Link>

            <Link href="/costela" className='flex'>
            <div className="bg-white text-gray-600 font-semibold rounded-lg shadow p-4 flex">
              <img
                src="/costela.jpg"
                alt="Costela"
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold">Costela</h3>
                <p className="text-sm text-gray-400">
                  Ingredientes: Molho de tomate, queijo muçarela, presunto, ovos, cebola, azeitonas, pimentão, orégano e massa tradicional.
                </p>
              </div>
            </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
