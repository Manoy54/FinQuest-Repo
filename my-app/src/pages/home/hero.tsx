import heroBg from '../../assets/images/image.png';

export function HeroSection() {
    return (
        <section
            className="pt-[140px] px-8 md:px-16 pb-20 min-h-screen relative flex flex-col justify-center"
            style={{
                backgroundImage: `url(${heroBg})`,
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />

            <div className="relative z-10">
                <h1 className="text-[64px] md:text-[96px] font-normal text-white mb-8 drop-shadow-lg">
                    FINQUEST
                </h1>

                <div className="max-w-[595px] mb-10">
                    <p className="text-[16px] text-white leading-relaxed font-medium drop-shadow-md">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in
                        the 1960s with the release of Letraset sheets containing Lorem
                    </p>
                </div>

                <div className="flex gap-6 flex-wrap">
                    <button className="bg-white text-black h-[50px] px-8 text-[20px] font-bold hover:bg-gray-200 transition-colors border-none">
                        play now
                    </button>
                    <button className="bg-transparent border-2 border-white h-[50px] px-8 text-[20px] text-white hover:bg-white/20 transition-colors">
                        button
                    </button>
                </div>
            </div>
        </section>
    );
}
