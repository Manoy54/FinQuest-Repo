

export function FeaturesSection() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Learn</h3>
                        <p>Master financial concepts through interactive gameplay.</p>
                    </div>
                    <div className="p-6 bg-white rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Compete</h3>
                        <p>Climb the leaderboards and earn rewards.</p>
                    </div>
                    <div className="p-6 bg-white rounded shadow">
                        <h3 className="text-xl font-bold mb-2">Grow</h3>
                        <p>Track your progress and improve your financial literacy.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
