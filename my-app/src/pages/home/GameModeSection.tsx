export function GameModeSection() {
  return (
    <section className="py-20 bg-white min-h-[50vh] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-black">Game Modes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-gray-50">
            <h3 className="text-2xl font-bold mb-4 text-black">Single Player</h3>
            <p className="text-gray-600">Test your financial knowledge against the clock.</p>
          </div>
          <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-gray-50">
            <h3 className="text-2xl font-bold mb-4 text-black">Multiplayer</h3>
            <p className="text-gray-600">Compete with friends in real-time battles.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
