import Link from 'next/link';
import Image from 'next/image';

export default function NavBar() {
    return (
        <nav className="flex justify-between align-center p-5">
            <div >
                    <Link 
                        href='/'
                    >
                        <Image
                            src="invoice.svg"
                            alt="Invoice"
                            height={40}
                            width={40}
                        />
                    </Link>
            </div>
            <div className="flex flex-row gap-2">
            <Link href="https://github.com/nazimboudeffa/devis-freelance-nextjs" passHref={true}>                   
            <Image
                src="github.svg"
                alt="GitHub"
                height={40}
                width={40} 
            />
            </Link>
            <Link href="https://fr.tipeee.com/nazimboudeffa" passHref={true}>                   
            <Image
                src="tipeee_tip_btn.svg"
                alt="tip"
                height={80}
                width={70} 
            />
            </Link>
            </div>
        </nav>
    )
};