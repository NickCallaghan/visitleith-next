import { useState } from "react";
import Head from "next/head";
import { sanityClient } from "../lib/sanity";

interface PageProps {
    categories: [any];
}

export default function Home({ categories }: PageProps) {
    const [email, setEmail] = useState("");

    const handleClick = () => {
        if (email) {
            fetch("api/addUser", {
                method: "POST",
                body: JSON.stringify({
                    email,
                }),
            })
                .then((req) => req.json())
                .then(() => setEmail(""))
                .catch((err) => console.error(err));
        }
    };

    return (
        <>
            <Head>
                <title>visitleith.co.uk</title>
            </Head>
            <main>
                <div>
                    <h1>VisitLeith.co.uk</h1>
                    <h3>Coming soon...</h3>

                    <div>
                        {categories.map((cat) => (
                            <p key={cat._id}>{cat.name}</p>
                        ))}
                    </div>

                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />

                    <button onClick={handleClick}>Send Request</button>
                </div>
            </main>
        </>
    );
}

export async function getStaticProps() {
    const categories = await sanityClient.fetch(`*[_type == "category"]`);

    return { props: { categories } };
}
