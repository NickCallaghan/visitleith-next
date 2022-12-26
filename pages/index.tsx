import Head from "next/head";
import { sanityClient } from "../lib/sanity";

interface PageProps {
    categories: [any];
}

export default function Home({ categories }: PageProps) {
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
                </div>
            </main>
        </>
    );
}

export async function getStaticProps() {
    const categories = await sanityClient.fetch(`*[_type == "category"]`);

    return { props: { categories } };
}
