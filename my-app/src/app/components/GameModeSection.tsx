

export function GameModeSection() {
    return (
        <section className="py-20 bg-white min-h-[50vh] flex items-center justify-center">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Game Modes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-bold mb-4">Single Player</h3>
                        <p>Test your financial knowledge against the clock.</p>
                    </div>
                    <div className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
                        <h3 className="text-2xl font-bold mb-4">Multiplayer</h3>
                        <p>Compete with friends in real-time battles.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
