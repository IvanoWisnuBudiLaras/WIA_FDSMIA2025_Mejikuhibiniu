// website/src/components/Nav.tsx
const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Showcase", href: "/Showcase" },
    { name: "Kontak", href: "/Contact" },
];
import Link from "next/link";
import TextAnimated from "./Effect/FontAnimated";
import Contact from "./Effect/TextAnimated";

export default function Nav() {
    return(
        <nav className="fixed top-0 left-1/2 z-20 mt-5 flex w-fit -translate-x-1/2 justify-center rounded-lg bg-[var(--Primary)]px-5 py-2.5">
            <ul className="flex gap-5 text-[#eeebd8]">
                {navigation.map((item) => (
                    <li key={item.name}>
                        <Link href={item.href}>
                            <TextAnimated text={item.name} />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}