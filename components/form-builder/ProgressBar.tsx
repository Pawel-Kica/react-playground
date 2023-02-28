export default function ProgressBar({ step }: { step: number }) {
    return (
        <header className="relative mb-2 flex">
            <div className="z-10">
                <div className="relative flex gap-12">
                    <div className="flex flex-col items-center">
                        <div className="flex w-full">
                            <div className="z-10 flex-1 bg-stone-m"></div>
                            <div className={`progress-box ${step >= 0 && 'bg-orange-m'}`}>1</div>
                            <div className="flex-1"></div>
                            <div
                                className={`absolute top-1/4 h-[3px] w-1/2 ${step > 0 ? 'bg-orange-m' : 'bg-cyan-m'}`}
                            ></div>
                        </div>
                        <div
                            className={`${
                                step >= 0 ? 'text-orange-m' : 'text-cyan-m'
                            } mt-2 text-center text-xs uppercase`}
                        >
                            account setup
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex">
                            <div className={`progress-box ${step >= 1 && 'bg-orange-m'}`}>2</div>
                            <div
                                className={`absolute left-1/2 top-1/4 h-[3px] w-1/2 ${
                                    step > 1 ? 'bg-orange-m' : 'bg-cyan-m'
                                }`}
                            ></div>
                        </div>
                        <div
                            className={`${
                                step >= 1 ? 'text-orange-m' : 'text-cyan-m'
                            } mt-2 text-center text-xs uppercase`}
                        >
                            personal details
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex w-full">
                            <div className="flex-1"></div>
                            <div className={`progress-box ${step >= 2 && 'bg-orange-m'}`}>3</div>
                            <div className="z-10 flex-1 bg-stone-m"></div>
                        </div>
                        <div
                            className={`${
                                step >= 2 ? 'text-orange-m' : 'text-cyan-m'
                            } mt-2 text-center text-xs uppercase`}
                        >
                            Residence details
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
