import Link from "next/link";


const MenuItem = ({ index }: { index: string }) => {
    
    return <li className="flex items-center my-2">
        <Link href={`${index.replace(' ', '-').toLowerCase()}`} className="font-bold">{index}</Link>
    </li>
};

export default MenuItem;