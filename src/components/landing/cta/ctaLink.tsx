import Link from "next/link";

export default function CTALink({
    className,
    id,
}: {
    className?: string;
    id?: string;
}) {
    return (
        <Link
            id={id}
            href={"/catalogue"}
            className={`group/cta link-border relative flex aspect-square items-center justify-center self-center rounded-full bg-primary-900/60 px-6  xl:!bg-transparent ${className}`}
        >
            <span className="xl:group-hover/cta:scale-100 ease-out xl:group-focus/cta:ease-fancy-xl xl:group-hover/cta:ease-fancy-xl duration-500 xl:group-focus/cta:scale-100 transition-transform text-bold text-lg text-tertiary-400 mix-blend-difference lg:text-xl xl:text-4xl xl:scale-0 xl:group-hover/cta:text-tertiary-500 xl:group-focus/cta:text-tertiary-500 ">
                Do it!
            </span>

            <span className="pointer-events-none absolute inset-0 flex flex-row place-items-center overflow-hidden rounded-full text-lg leading-[2] md:text-xl lg:text-2xl xl:text-3xl">
                <span className="relative flex h-full w-1/2 -translate-x-full items-center overflow-hidden bg-tertiary-300 text-right text-primary-900 transition-all duration-300 ease-fancy group-hover/cta:opacity-0 group-focus/cta:opacity-0 dark:bg-primary-900 dark:text-primary-50 xl:translate-x-0 xl:group-hover/cta:-translate-x-full xl:group-focus/cta:-translate-x-full">
                    <span className="absolute left-0 w-[200%] text-center ">
                        Hover
                    </span>
                </span>
                <span className="relative flex h-full w-1/2 translate-x-full items-center overflow-hidden bg-tertiary-300 text-left text-primary-900 transition-all duration-300 ease-fancy group-hover/cta:opacity-0 group-focus/cta:opacity-0 dark:bg-primary-900 dark:text-primary-50 xl:translate-x-0 xl:group-hover/cta:translate-x-full xl:group-focus/cta:translate-x-full">
                    <span className="absolute right-0 w-[200%] text-center">
                        Hover
                    </span>
                </span>
            </span>
        </Link>
    );
}
