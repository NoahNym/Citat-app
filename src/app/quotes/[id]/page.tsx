import { db } from "@/utils/db"
import Link from "next/link";


type PageByIdProps = {
    params: {
        id: number;
        quote: string;
    };


};

export default function PageById({ params }: PageByIdProps) {

    const onSubmit = async (data: FormData) => {
        "use server"
        db.query('UPDATE quotes SET author=$1, quote=$2 WHERE id=$3', [data.get('author'), data.get('quote'), params.id])
       

    }
const result = db.query('SELECT quote FROM quotes WHERE id=$1', []).toString()
    return (
        <div>
            <h1 className="text-4xl font-bold">{params.id}</h1>
            <form action={onSubmit} className="flex flex-col gap-1 items-start justify-start">
                <div>
                    <label htmlFor="quote">Quote</label><br />
                    <input
                        type="text"
                        name="quote"
                        className="border"
                        placeholder={result}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author</label><br />
                    <input type="text" name="author" className="border" />
                </div>


                <button className="bg-pink-700 text-white inline-block flex-0 px-4 py-2 rounded">Save</button>
                <Link href={"/"} > <button className="bg-blue-500 text-white inline-block flex-0 px-4 py-2 rounded">Back</button> </Link>
            </form>
        </div>
    );
}