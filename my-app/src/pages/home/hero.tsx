export function HeroSection() {
    return (
        <section className="pt-[140px] px-8 md:px-16 pb-20 min-h-screen bg-[#349C55]">
            <h1 className="text-[64px] md:text-[96px] font-normal text-black mb-8">
                FINQUEST
            </h1>

            <div className="max-w-[595px] mb-10">
                <p className="text-[14px] text-black leading-relaxed">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem
                </p>
            </div>

            <div className="flex gap-6 flex-wrap">
                <button className="bg-[#d9d9d9] h-[50px] px-8 text-[20px] text-black hover:bg-[#c9c9c9] transition-colors">
                    play now
                </button>
                <button className="bg-[#d9d9d9] h-[50px] px-8 text-[20px] text-black hover:bg-[#c9c9c9] transition-colors">
                    button
                </button>
            </div>
        </section>
    );
}
